import React, { Component } from 'react';
import axios from 'axios';

class RegisterForm extends Component {
    state = {  }
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
                            <input type='number' placeholder='Số điện thoại' autoComplete='off' onChange={this.changePhone}/>
                            <input type='email' placeholder='Email' required autoComplete='off' onChange={this.changeEmail}/>
                            <input type='password' placeholder='Mật khẩu' required autoComplete='off' onChange={this.changePass}/>
                            <input type='password' placeholder='Nhập lại mật khẩu' required autoComplete='off' onChange={this.changeConfirmPass}/>
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