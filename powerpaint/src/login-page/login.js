import React, { Component } from 'react';
import '../css/login-page.css';
import LoginForm from './login-form';
import RegisterForm from './register-form';
import ForgetPass from './forget-pass';
//import axios from 'axios';

class Login extends Component {
	constructor(props){
		super(props);
		this.state={
			active: props.active
		}
	}
    /*componentDidMount(){
		console.log('start');
        //this.testAPI();
		/*axios.get('http://192.168.9.253:8181/api/v1/hello')
		
		.then(function (response) {
			console.log(response.data.funct)
		})
		
		.catch(function (error) {
			
			console.log(error);
		})*/

		/*axios.post('http://192.168.9.253:8181/api/v1/login', {
			email: 'tranphung@gmail.com',
			password: '123456'
		  })
		.then(function (response) {
			console.log(response.data)
		})
		
		.catch(function (error) {
			
			console.log(error);
		})
		axios.post('http://192.168.9.253:8181/api/v1/registration', {
			username:"avs",
			email: 'tranphung1@gmail.com',
			
			password: '123456',password_confirm:'123456'
		  })
		.then(function (response) {
			console.log(response.data)
		})
		
		.catch(function (error) {
			
			console.log(error);
		})
}*/
    /*testAPI = () => {
		let headers = new Headers();

		headers.append('Content-Type', 'application/json');
		headers.append('Accept', 'application/json');
	  
		headers.append('Access-Control-Allow-Origin', 'http://127.0.0.1:3000');
		headers.append('Access-Control-Allow-Credentials', 'true');
		headers.append("Access-Control-Allow-Headers", "Origin, X-Requested-With,");
		headers.append('GET', 'POST', 'OPTIONS');
        fetch('https://cors-anywhere.herokuapp.com/http://192.168.9.253:8181/api/v1/hello',{headers:headers,credentials: 'include',
		method: 'GET',})
        .then(rsp => rsp.json())
		.then(data =>console.log(data))
		.catch(() => console.log("Can’t access response. Blocked by browser?"))      
    }*/
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
		if (this.state.active===1) {
			activeComponent=<LoginForm  onClickForgetPass={this.showForgetPassForm}/>;		
		}
		else if (this.state.active===2) {
			activeComponent =<RegisterForm onClickForgetPass={this.showForgetPassForm}/>;	
		}
		else {
			activeComponent=<ForgetPass/>;
		}
        return (
			<React.Fragment>
				<div className='row'>
						<label id='register' onClick={this.clickRegister}>Đăng ký</label>
						<label id='login' onClick={this.clickLogin} >Đăng nhập</label>
				</div>
				<div className='form'>
					{activeComponent}		
					<div className='more'>		
						<div>Bạn có thể đăng nhập nhanh bằng tài khoản</div>
						<button>
							<i className="fa fa-facebook fa-2x" aria-hidden="true"></i>
							<span id='face-login'>Facebook</span> 
						</button>
					</div>
				</div>
				
			</React.Fragment>
          );
    }
}
 
export default Login;