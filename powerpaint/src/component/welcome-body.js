import React, { Component } from 'react';
import '../css/welcome-body.css'
import SettingMenu from '../component/setting'
import Crypto from 'crypto-js'
import { partner_id, serverFrIP, portFr,key} from './const';

class WelcomeBody extends Component {
    state = {  }
    redirectShopee=()=>{
        window.location.href='https://partner.shopeemobile.com/api/v1/shop/auth_partner?id='+partner_id+'&token='
        +this.getToken('http://'+serverFrIP+':'+portFr+'/overview',key)
        +'&redirect=http://'+serverFrIP+':'+portFr+'/overview';
    }
    getToken = (url, key) => Crypto.SHA256(key+url).toString();

    render() { 
        let menu;
        if (this.props.showMenu === true) menu=<SettingMenu/>;  
        else menu=null;
        return (
            <div className = 'body-wel'>
                {menu}
                <div className='content'>
                    <h1>Chào mừng {localStorage.getItem('username')} đến với Sapo Editor</h1>
                    <div className='description'>
                        <div>
                        Chúng tôi sẽ giúp bạn chỉnh sửa ảnh đơn giản và nhanh chóng, dễ dàng
                        chỉnh sửa hình ảnh sản phẩm và update lại lên sàn shopee.
                        </div>
                        <div>
                            Hãy thực hiện kết nối gian hàng trên shopee để sử dụng các tính năng của chúng tôi.
                            Sau khi thực hiện kết nối dữ liệu của quý khách sẽ được đồng bộ về hệ thống trong khoảng thời 
                            gian từ 15 đến 60 phút.
                        </div>
                    </div> 
                    <div id='footer'>
                        <button onClick={this.redirectShopee}> Kết nối Shopee</button>
                        <div id='signup'>
                            <span><a href='https://shopee.vn'>Đăng kí tại đây</a></span> nếu bạn chưa có gian hàng trên Shopee.
                        </div>
                    </div>
                </div>
            </div>
          );
    }
}
 
export default WelcomeBody;