import React, { Component } from 'react';
import '../css/login-page.css';
import LoginForm from './login-form';
import RegisterForm from './register-form';
import ForgetPass from './forget-pass';
import ResetPassForm from './reset-pass';
//import axios from 'axios';

class Login extends Component {
	constructor(props){
		super(props);
		this.state={
			active: props.active
		}
	}
    componentDidMount(){
		if (this.state.active===1) this.clickLogin();
		if (this.state.active===2) this.clickRegister();
	}
		
	clickLogin = () => {
		this.setState({active:1});
		document.getElementById("login").style.borderBottom= '#0084FF solid 2px';
		document.getElementById("register").style.borderBottom= '#C4CDD5 solid 2px';
	}
	clickRegister = () => {
		this.setState({active :2})
		document.getElementById("register").style.borderBottom= '#0084FF solid 2px';
		document.getElementById("login").style.borderBottom= '#C4CDD5 solid 2px';
	}

	showForgetPassForm = () => {
		this.setState({active:3})
	}
    render() {
		let activeComponent; 
		let loginFB=(
			<div className='more'>		
				<div>Bạn có thể đăng nhập nhanh bằng tài khoản</div>
				<button>
					<i className="fa fa-facebook fa-2x" aria-hidden="true"></i>
					<span id='face-login'>Facebook</span> 
				</button>
			</div>
		);
		if (this.state.active===1) {
			activeComponent=<LoginForm  onClickForgetPass={this.showForgetPassForm}/>;		
		}
		else if (this.state.active===2) {
			activeComponent =<RegisterForm onClickForgetPass={this.showForgetPassForm}/>;	
		}
		else if(this.state.active===3) {
			activeComponent=<ForgetPass/>;
			loginFB=null;
		}
		else {
			activeComponent=<ResetPassForm/>
			loginFB=null;
		}
        return (
			<React.Fragment>
				<div className='row'>
						<label id='register' onClick={this.clickRegister}>Đăng ký</label>
						<label id='login' onClick={this.clickLogin} >Đăng nhập</label>
				</div>
				<div className='form'>
					{activeComponent}		
					{/* {loginFB} */}
				</div>
				
			</React.Fragment>
          );
    }
}
 
export default Login;