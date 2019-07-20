import React, { Component } from 'react';
import axios from 'axios';

class RegisterForm extends Component {
    state = { }


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

    
    validatePhone = (text) => {
        const regexp = /^(84|\+84}{|0)\d{9,10}$/;
        const result = regexp.exec(text);
        if (result !== null) {
            return { isPhoneValid: true,
                     errorPhoneMessage: ''};
        } else {
            return { isPhoneValid: false,
                     errorPhoneMessage: 'Số điện thoại không hợp lệ'};
        }
    }
    validationPhone = (e) => {
        const {isPhoneValid,errorPhoneMessage} = this.validatePhone(this.state.phone);
        this.setState({
            isPhoneValid: isPhoneValid,
            errorPhoneMessage: errorPhoneMessage
        })
    }

    validateEmail = (text) => {
        const regexp = /^[A-Za-z0-9_.]{6,32}@([a-zA-Z0-9]{2,12})(.[a-zA-Z]{2,12})+$/;
        const result = regexp.exec(text);
        if (result !== null) {
            return { isEmailValid: true,
                     errorEmailMessage: ''};
        } else {
            return { isEmailValid: false,
                     errorEmailMessage: 'Email không hợp lệ '};
        }
    }
    validationEmail = (e) => {
        const {isEmailValid,errorEmailMessage} = this.validateEmail(this.state.email);
        this.setState({
            isEmailValid: isEmailValid,
            errorEmailMessage: errorEmailMessage
        })
    }

    validatePass = (text) => {
        const regexp = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z]).{6,}$/;
        const result = regexp.exec(text);
        if (result !== null) {
            return { isPassValid: true,
                     errorPassMessage: ''};
        } else {
            return { isPassValid: false,
                     errorPassMessage: 'Mật khẩu cần có ít nhất 6 kí tự, ít nhất có 1 chữ cái viết hoa, 1 chữ cái thường và 1 chữ số '};
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
                            <div className='input'> 
                                <input type='text' placeholder='Họ và tên' required onChange={this.channgeName} autoComplete='off'/>
                            </div>
                            <div className='input'>
                                <input type='text' placeholder='Số điện thoại' autoComplete='off' 
                                onChange={this.changePhone} onBlur={this.validationPhone}/>
                                <div className='error'>
                                    <FormError isHidden={this.state.isPhoneValid} errorMessage={this.state.errorPhoneMessage} />
                                </div>
                            </div>
                            <div className='input'>
                                <input type='email' placeholder='Email' required autoComplete='off' 
                                onChange={this.changeEmail} onBlur={this.validationEmail}/>
                                <div className='error'>
                                    <FormError isHidden={this.state.isEmailValid} errorMessage={this.state.errorEmailMessage} />
                                </div>
                            </div>
                            <div className='input'>
                                <input type='password' placeholder='Mật khẩu' required autoComplete='off' 
                                onChange={this.changePass} onBlur={this.validationPass}/>
                                <div className='error'>
                                    <FormError isHidden={this.state.isPassValid} errorMessage={this.state.errorPassMessage} />
                                </div>
                            </div>
                            <div className='input'>
                                <input type='password' placeholder='Nhập lại mật khẩu' required autoComplete='off' 
                                onChange={this.changeConfirmPass} onBlur={this.validationConfirmPass}/>
                                <div className='error'>
                                    <FormError isHidden={this.state.isConfirmPassValid} errorMessage={this.state.errorConfirmMessage} />
                                </div>
                            </div>
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