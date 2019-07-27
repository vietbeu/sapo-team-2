import React, { Component } from 'react';
import '../css/welcome-body.css'
import SettingMenu from '../component/setting'
import Crypto from 'crypto-js'
const key= '26f76c014a453d1fb248f35e2a42d3c655fd97a9e671b79d3dfa59eb876bb43e';
class WelcomeBody extends Component {
    state = {  }
    redirectShopee=()=>{
        window.location.replace('https://partner.uat.shopeemobile.com/api/v1/shop/auth_partner?id=840386&token='
        +this.getToken('http://192.168.36.20:4200/overview',key)
        +'&redirect=http://192.168.36.20:4200/overview')
    }
    getToken = (url, key) => Crypto.SHA256(key+url).toString();

    render() { 
        let menu;
        if (this.props.showMenu === true) menu=<SettingMenu/>;  
        else menu=null;
        return (
            <div className = 'body'>
                {menu}
                <div className='content'>
                    <h1>Chào mừng {localStorage.getItem('username')} đến với Sapo Decorate</h1>
                    <div className='description'>
                        <div>
                        Chúng tôi sẽ giúp bạn chỉnh sửa ảnh đơn giản và nhanh chóng, dễ dàng
                        chỉnh sửa sản phẩm và update lại lên sàn shopee.
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
                            <span>Đăng kí tại đây</span> nếu bạn chưa có gian hàng trên Shopee.
                        </div>
                    </div>
                </div>
            </div>
          );
    }
}
 
export default WelcomeBody;