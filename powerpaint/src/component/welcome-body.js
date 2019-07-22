import React, { Component } from 'react';
import '../css/welcome-body.css'

class WelcomeBody extends Component {
    state = {  }
    render() { 
        return (
            <div className = 'body'>
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
                        <button> Kết nối Shopee</button>
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