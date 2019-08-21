import React, { Component } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import '../css/login-page.css';
import { serverIP,port } from '../component/const';

class ResetPassForm extends Component {
    state = {  }

    handleChangePass = (e) =>{
        this.setState({pass: e.target.value})
    }
    handleChangeConfirmPass = (e) => {
        this.setState({confirmPass: e.target.value})
    }
    validateNewPass = (text) => {
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
    validationNewPass = (e) => {
        const {isPassValid,errorPassMessage} = this.validateNewPass(this.state.pass);
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
        if (this.state.isPassValid===true && this.state.isConfirmPassValid=== true){
            axios.post('http://'+serverIP+':'+port+'/api/v1/user/resetPassword/step2', {
                token: window.location.href.split('token=')[1],
                new_password: this.state.pass,
            })
            .then(function (response) {
                if(response.data.success===1) {
                    Swal.fire(
                        'Đổi mật khẩu thành công!',
                        'Bạn có thể đăng nhập bằng mật khẩu mới!',
                        'success'
                      );
                    setTimeout(
                        () => {
                          window.location.href='/login';
                        },
                        2 * 1000
                    );
                }else Swal.fire(
                    'Đổi mật khẩu thất bại!',
                    'Token đã hết hạn!',
                    'error'
                  );
            })
            .catch(function (error) {
                Swal.fire(
                    'Đổi mật khẩu thất bại!',
                    'Đã có lỗi xảy ra! Xin vui lòng thử lại sau',
                    'error'
                  );
            });
        }else Swal.fire(
            'Đổi mật khẩu thất bại!',
            'Vui lòng điền các thông tin theo yêu cầu!',
            'error'
          );
    }
    render() { 
        return ( 
            <div id='reset-form'>
                <label>
                    Tạo mật khẩu mới
                </label>
                <form onSubmit={this.handleSubmit}>
                    <label>Bạn đang thay đổi mật khẩu của bạn</label>
                    <div className='input-row'>
                        <input type='password' required placeholder='Mật khẩu mới' onChange={this.handleChangePass}
                        onKeyUp={this.validationNewPass}/>
                        <div className='error'>
                            <FormError isHidden={this.state.isPassValid} errorMessage={this.state.errorPassMessage} />
                        </div>
                    </div>
                    <div className='input-row'>
                        <input type='password' required placeholder='Nhập lại mật khẩu mới' onChange={this.handleChangeConfirmPass}
                        onKeyUp={this.validationConfirmPass}/>
                        <div className='error'>
                        <FormError isHidden={this.state.isConfirmPassValid} errorMessage={this.state.errorConfirmMessage} />
                        </div>
                    </div>
                    <button type='submit'>Gửi</button>
                </form>
            </div>
         );
    }
}
 
export default ResetPassForm;

const FormError=(props) =>{
    if (props.isHidden) { return null;}
    return ( <div>{props.errorMessage}</div>)
}