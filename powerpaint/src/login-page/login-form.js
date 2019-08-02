import React, { Component } from 'react';
import axios from 'axios';
import {serverIP,port} from '../component/const'
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

    getShop = ( ) => {
        const authen = 'Bearer '+localStorage.getItem('token');
        console.log(authen);
        axios.get('http://'+serverIP+':'+port+'/api/v1/shop',
        {headers: {
            'Authorization': authen,
        }})
        .then( (response)=> {
            if (response.data.length>0) window.location.replace('/overview');
            else window.location.replace('/welcome')
        })
        .catch((error) => {
        }) 
    }

    handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://'+serverIP+':'+port+'/api/v1/login',{
            email: this.state.email,
			password: this.state.pass
		})
        .then( (response)=>{
            if(response.data.success===1){
               localStorage.setItem("username",response.data.username);
               localStorage.setItem('email',response.data.email);
               localStorage.setItem('phone',response.data.phone);
               localStorage.setItem('id',response.data.id);
               localStorage.setItem('shop',response.data.shop);
               localStorage.setItem('token',response.data.token);
               this.getShop();
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