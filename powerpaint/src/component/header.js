import React, { Component } from 'react';
import '../css/header.css'
import Popup from 'reactjs-popup'
import Axios from 'axios';
class Header extends Component {
    state = {  }
    componentDidMount(){
        document.getElementById('avatar').style.backgroundImage =
        'url(https://ui-avatars.com/api/?rounded=true&size=50&background=27AE60&color=FFFFFF&name=Le+Viet)';

    }
    render() { 
        return ( 
            <div className = 'header-content'>
                <div className='header-logo'>
                </div>
                <div className='welcome'>
                    <span className='wel-text'>
                    Xin chào {localStorage.getItem('username')}
                    </span>
                </div>
               
                <div className='info' id='avatar'>
                </div>
                <button className='header-button' onClick={() =>
                    alert("Hãy liên hệ với chúng tôi qua  số điện thoại 0975867756 hoặc email sapoteam2@gmail.com")}>
                    <div className='help'>
                        <div>
                            <span className="fa-stack fa-lg">
                                <i className="fa fa-circle-o fa-stack-2x"></i>
                                <i className="fa fa-question fa-stack-1x fa-inv "></i>
                            </span>
                        </div>
                        <div id='help-label'>
                        Trợ giúp
                        </div>
                    </div>
                </button>
            </div>
         );
    }
}
 
export default Header;