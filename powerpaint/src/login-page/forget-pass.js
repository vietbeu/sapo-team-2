import React, { Component } from 'react';
import Axios from 'axios';
import { serverIP,port } from '../component/const';
import Swal from 'sweetalert2';

class ForgetPass extends Component {
    state = {
        isHiddenMessage:true,
        emailSubmit:'',
      }
    changeEmail = (e) => {
        this.setState({email: e.target.value})
    }
    handleSubmitForgerPassForm = () =>{
        let email = this.state.email;
        this.setState({emailSubmit:email});
        Axios.post('http://'+serverIP+':'+port+'/api/v1/user/resetPassword?email='+email)
        .then (rsp => {
            if (rsp.data.success === 1) //Swal.fire({text: rsp.data.message, width:'50%'});
                this.setState({isHiddenMessage:false});
            else Swal.fire('Fail!', 'Email không đúng','error');
        })
        .catch ( e => Swal.fire('Fail!', 'Đã có lỗi xảy ra! XIn vui lòng thử lại sau','error') )
    }
    render() { 
        let message; let isHiddenMessage=this.state.isHiddenMessage;
        if ( isHiddenMessage===true) message =null;
        else message=<p>{'Một tin nhắn được gửi đến email '+this.state.emailSubmit+' Hãy đăng nhập vào email để đổi mật khẩu'}</p>
        return (
            <React.Fragment>
                <label>
                    Quên mật khẩu
                </label>
                <div className='forget-pass-form'>
                    <label>Nhập email của bạn để tạo mật khẩu mới</label>
                    {message}
                    <input type='email' placeholder='Hãy nhập email đã đăng ký' required onChange={this.changeEmail}/>
                </div>
                <button className='submit' onClick={this.handleSubmitForgerPassForm}>Gửi</button>
                <button className='forget-pass'>Quay lại</button>
            </React.Fragment>
          );
    }
}
 
export default ForgetPass;