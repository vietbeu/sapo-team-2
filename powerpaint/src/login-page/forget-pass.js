import React, { Component } from 'react';
import Axios from 'axios';
import { serverIP,port } from '../component/const';
import Swal from 'sweetalert2';

class ForgetPass extends Component {
    state = {  }
    changeEmail = (e) => {
        this.setState({email: e.target.value})
    }
    handleSubmitForgerPassForm = () =>{
        let email = this.state.email;
        const authen = 'Bearer '+localStorage.getItem('token');
        Axios.post('http://'+serverIP+':'+port+'/api/v1/user/resetPassword?email='+email,
        {headers: {
            'Authorization': authen,
        }})
        .then (rsp => {
            if (rsp.data.success === 1) Swal.fire({text: rsp.data.message, width:'50%'});
            else Swal.fire('Fail!', 'Email không đúng','error');
        })
        .catch ( e => Swal.fire('Fail!', 'Đã có lỗi xảy ra! XIn vui lòng thử lại sau','error') )
    }
    render() { 
        return (
            <React.Fragment>
                <label>
                    Quên mật khẩu
                </label>
                <div className='forget-pass-form'>
                    <label>Nhập email của bạn để tạo mật khẩu mới</label>
                    <input type='email' placeholder='Hãy nhập email đã đăng ký' required onChange={this.changeEmail}/>
                </div>
                <button className='forget-pass'>Quay lại</button>
                <button className='submit' onClick={this.handleSubmitForgerPassForm}>Gửi</button>
            </React.Fragment>
          );
    }
}
 
export default ForgetPass;