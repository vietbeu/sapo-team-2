import React, { Component } from 'react';

class ForgetPass extends Component {
    state = {  }
    changeEmail = (e) => {
        this.setState({email: e.target.value})
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
                <button className='submit' onSubmit={this.handleSubmit}>Gửi</button>
            </React.Fragment>
          );
    }
}
 
export default ForgetPass;