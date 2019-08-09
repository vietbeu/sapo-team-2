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

class ChangePassForm extends Component {
    state = {  }

    changeCurPass=(e)=>{
        this.setState({curPass:e.target.value});
    }
    changeNewPass=(e)=>{
        this.setState({newPass:e.target.value})
    }
    changeConfirmPass=(e)=>{
        this.setState({confirmPass:e.target.value})
    }

    validatePass = (text) => {
        const regexp = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z]).{8,}$/;
        const result = regexp.exec(text);
        if (result !== null) {
            return { isPassValid: true,
                     errorPassMessage: ''};
        } else {
            return { isPassValid: false,
                     errorPassMessage: 'Mật khẩu cần có ít nhất 8 kí tự, ít nhất có 1 chữ cái viết hoa, 1 chữ cái thường và 1 chữ số '};
        }
    }
    validationPass = (e) => {
        const {isPassValid,errorPassMessage} = this.validatePass(this.state.pass);
        this.setState({
            isPassValid: isPassValid,
            errorPassMessage: errorPassMessage
        })
    }


    validationConfirmPass = () => {
        if (this.state.confirmPass === this.state.pass)
            this.setState( {isConfirmPassValid: true, errorConfirmMessage: ''})
        else this.setState({isConfirmPassValid: false, errorConfirmMessage: 'Không khớp với mật khẩu '})
    }
    render() { 
        if (!this.props.isHidden) { return null;}
    return (
        <>
            <div className='row1-change-pass'>
                <label>Mật khẩu hiện tại</label>
                <div><input type='text' onChange={this.changeCurPass}></input></div>
            </div>
            <div className='row2-change-pass'>
                <span id='new-pass'>
                    <label>Mật khẩu mới</label>
                    <div><input type='password' onChange={this.changeNewPass} onKeyUp={this.validationPass}></input></div>
                    <div className='error'>
                        <FormError isHidden={this.state.isPassValid} errorMessage={this.state.errorPassMessage} />
                    </div>
                </span>
                <span id ='confirm-pass'>
                    <label>Xác nhận mật khẩu mới</label>
                    <div><input type='password' onChange={this.changeConfirmPass} onKeyUp={this.validationConfirmPass}></input></div>
                    <div className='error'>
                        <FormError isHidden={this.state.isConfirmPassValid} 
                        errorMessage={this.state.errorConfirmMessage} />
                    </div>
                </span>
            </div> 
            <button id='bt-changepass'>OK</button>
        </>   
        )
    }
}

const FormError=(props) =>{
    if (props.isHidden) { return null;}
    return ( <div>{props.errorMessage}</div>)
}
 

