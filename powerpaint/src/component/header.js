import React, { Component } from 'react';
import '../css/header.css'

class Header extends Component {
    state = {  }
    componentDidMount(){
        let name = String(localStorage.getItem('username')).replace(/ /g, "+");
        document.getElementById('avatar').style.backgroundImage =
        'url(https://ui-avatars.com/api/?rounded=true&size=50&background=27AE60&color=FFFFFF&name='+name+')';
    }
    handleCLickAvatar =(e)=> {
        e.preventDefault();
       this.props.isShowMenu();
    }
    render() { 
        let logo;
        if (this.props.logo===true) logo = (
            <div className='header-logo' onClick={()=> window.location.href='/overview'}></div>
        ); 
        else logo = null;
        return ( 
            <div className = 'header-content'>
                {logo}
                <div className='welcome'>
                    <span className='wel-text'>
                    {this.props.text}
                    </span>
                </div>
               
                <div className='info' id='avatar' onClick={this.handleCLickAvatar}>
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