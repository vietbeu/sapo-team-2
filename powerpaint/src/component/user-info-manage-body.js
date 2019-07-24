import React, { Component } from 'react';
import '../css/user-info-manage-body.css';
import SettingMenu from './setting';


class UserInfoManagementBody extends Component {
    constructor(props){
        super(props);
        this.state={
            changePass:false,
        }
    }
    
    showChangePassForm=()=>{
        this.setState({changePass:true});
        document.getElementById('change-pass-button').style.display='none';
    } 
    render() { 
        let menu;
        if (this.props.showMenu === true) menu=<SettingMenu/>;  
        else menu=null;
        return ( 
            <>
                {menu}
                <div className='body-content'>
                    <div className='body-title'>
                        <div id='account'>Tài khoản</div>
                        <p>{localStorage.getItem('username')}</p>
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
                                <div className='row-info'>Đổi mật khẩu mà bạn sử dụng để đăng nhập vào tài khoản {localStorage.getItem('email')}</div>
                                <button id="change-pass-button" onClick={this.showChangePassForm}>Đổi mật khẩu</button>
                                <ChangePassForm isHidden={this.state.changePass}/>
                            </div>
                        </div>
                    </div>
                </div>
            </>
         );
    }
}
 
export default UserInfoManagementBody;

const ChangePassForm=(props)=>{
    if (!props.isHidden) { return null;}
    return (
        <>
            <div className='row1-change-pass'>
                <label>Mật khẩu hiện tại</label>
                <div><input type='text'></input></div>
            </div>
            <div className='row2-change-pass'>
                <span id='new-pass'>
                    <label>Mật khẩu mới</label>
                    <div><input type='text'></input></div>
                </span>
                <span id ='confirm-pass'>
                <label>Mật khẩu mới</label>
                <div><input type='text'></input></div>
                </span>
            </div> 
        </>   
        )
}
