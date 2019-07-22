import React, { Component } from 'react';
import '../css/user-info-manage-body.css';

class UserInfoManagementBody extends Component {
    state = {  }
    render() { 
        return ( 
            <div className='body'>
                <div className='body-content'>
                    <div className='body-title'>
                        <div id='account'>Tài khoản</div>
                        <p>{localStorage.getItem('username')}Van Dung</p>
                        <hr/>
                        <div className='body-note'>
                            <div>Thông tin tài khoản</div>
                            <div>Tất cả những thông tin liên quan đến tài khoản</div>
                        </div>
                        <div className='table-inf'>
                            <div className='info-content'>
                                <div id="title">Thông tin cá nhân</div>
                                <div className='row-info'>
                                    <span>Họ và tên</span>
                                    <span><input type='text' disabled value={localStorage.getItem('username')}/></span>
                                </div>    
                                <div className='row-info'>
                                        <span>Số điện thoại</span>
                                        <span><input type='text' disabled value={localStorage.getItem('phone')}/></span>
                                </div> 
                                <div className='row-info'>
                                    <span>Email</span>
                                    <span id='change-email'>Đổi mới</span>
                                    <span><input id='email' type='text' disabled value={localStorage.getItem('email')}/></span>
                                </div> 
                            </div>
                            <hr/>
                            <div className="info-content">
                                <div id="title">Đổi mật khẩu</div>
                                <div className='row-info'>Đổi mật khẩu mà bạn sử dụng để đăng nhập vào tài khoản 123456789@gmail.com</div>
                                <button id="change-pass-button">Đổi mật khẩu</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
         );
    }
}
 
export default UserInfoManagementBody;