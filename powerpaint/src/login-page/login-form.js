import React, { Component } from 'react';
import axios from 'axios';

class LoginForm extends Component {
    state={ }
    
    clickForgetPass = () => {
        this.props.onClickForgetPass();
    }
    changeEmail = (e) => {
        this.setState({email: e.target.value})
    }
    changePass = (e) => {
        this.setState({pass: e.target.value})
    }
    handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://192.168.9.253:8181/login',{
            email: this.state.email,
			password: this.state.pass
		})
        .then( (respone)=>{
            if(respone.data.success===1){
                alert('Đăng nhập thành công');
            }
        })
        .catch((error) => {
            if(error.request.status ===401) 
                alert('Email hoặc mật khẩu không đúng');
            else  alert('Đăng nhập thất bại! Hãy thử lại sau')
            }
        ) 
    }
    render() { 
        return ( 
            <React.Fragment>
                <label>
                    Thông tin đăng nhập
                </label>
                <form onSubmit={this.handleSubmit}> 
                    <div className='input'>
                        <input type='email' placeholder='Email' required autoComplete='off' onChange={this.changeEmail}/>
                    </div>   
                    <div>
                        <input type='password' placeholder='Mật khẩu' required autoComplete='off' onChange={this.changePass}/>
                    </div>   
                    <button className='submit' type='submit' >Đăng nhập</button>
                    <button onClick={this.clickForgetPass} className='forget-pass'>Quên mật khẩu?</button>
                </form>
            </React.Fragment>
         );
    }
}
 
export default LoginForm;