import React, { Component } from 'react';
import axios from 'axios';

class RegisterForm extends Component {
    state = { 
        isPhoneValid: true,
        errorPhoneMessage:'',
     }


    clickForgetPass = () => {
        this.props.onClickForgetPass();
    }

    channgeName = (e) => {
        this.setState({name: e.target.value})
    }
    changePhone = (e) => {
        this.setState({phone: e.target.value})
    }
    changeEmail = (e) => {
        this.setState({email: e.target.value})
    }
    changePass = (e) => {
        this.setState({pass: e.target.value})
    }
    changeConfirmPass = (e) => {
        this.setState({confirmPass: e.target.value})
    }


    validatePhone = (checkingText) => {
        const regexp = /^\d{10,11}$/;
        const checkingResult = regexp.exec(checkingText);
        if (checkingResult !== null) {
            return { isPhoneValid: true,
                     errorPhoneMessage: ''};
        } else {
            return { isPhoneValid: false,
                     errorPhoneMessage: 'Số điện thoại phải có 10 - 11 chữ số.'};
        }
    }
    validationPhone = (e) => {
        const {isPhoneValid,errorPhoneMessage} = this.validatePhone(this.state.phone);
        this.setState({
            isPhoneValid: isPhoneValid,
            errorPhoneMessage: errorPhoneMessage
        })
    }

    validateEmail = (emailText) => {
        
    }
    
    handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://192.168.9.253:8181/api/v1/registration', {
			username: this.state.name,
			email: this.state.email,
            password: this.state.pass,
            password_confirm:this.state.confirmPass,
		  })
		.then(function (response) {
			if(response.data.success===1) {
                alert("Đăng ký thành công !");
            }else alert("Email đã tồn tại");
		})
		.catch(function (error) {
			alert("Đăng ký thất bại! Hãy thử lại")
		});
    }
    render() { 
        return ( 
            <React.Fragment>
                <label>
                    Thông tin đăng ký
                </label>
                <div className='register-form'>
                    <form onSubmit={this.handleSubmit}>
                        <div>
                            <input type='text' placeholder='Họ và tên' required onChange={this.channgeName} autoComplete='off'/>
                            <input type='number' placeholder='Số điện thoại' autoComplete='off' 
                            onChange={this.changePhone} onBlur={this.validationPhone}/>
                            <FormError isHidden={this.state.isPhoneValid} errorMessage={this.state.errorPhoneMessage} />
                            <input type='email' placeholder='Email' required autoComplete='off' 
                            onChange={this.changeEmail} onBlur={this.validationEmail}/>
                            <input type='password' placeholder='Mật khẩu' required autoComplete='off' 
                            onChange={this.changePass} onBlur={this.validationPass}/>
                            <input type='password' placeholder='Nhập lại mật khẩu' required autoComplete='off' 
                            onChange={this.changeConfirmPass} onBlur={this.validationConfirmPass}/>
                        </div>
                        <button className='submit' type='submit' >Đăng ký</button>
                        <button onClick={this.clickForgetPass} className='forget-pass'>Quên mật khẩu?</button>
                    </form>
                    
                </div>
                </React.Fragment>
         );
    }
}
 
export default RegisterForm;


const FormError=(props) =>{
    if (props.isHidden) { return null;}
    return ( <div>{props.errorMessage}</div>)
}