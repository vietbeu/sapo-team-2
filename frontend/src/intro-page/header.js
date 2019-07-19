import React, { Component } from 'react';
class Header extends Component {
    state = {  }
    redirect =()=> {
        window.location='/login';
    }
    render() { 
        return (
            <React.Fragment>
            <div className='logo'>
            </div>
            <div className='login-button'>
                <button onClick={this.redirect}>Đăng nhập</button>
            </div>
        </React.Fragment>
         );
    }
}
 
export default Header;