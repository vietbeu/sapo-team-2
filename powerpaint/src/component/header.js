import React, { Component } from 'react';
import '../css/header.css'
import Popup from 'reactjs-popup'
class Header extends Component {
    state = {  }
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
               
                <div className='info'>
                    <span><Popup
                            trigger={<button className="button">  </button>}
                            position="bottom left"
                            on="hover"
                            >
                            a
                            </Popup>
                            </span>
                </div>
                <div className='help'>
                    <div>
                    <i className="fa fa-question-circle fa-2x" aria-hidden="true"></i>
                    </div>
                    <div id='help-label'>
                    Trợ giúp
                    </div>
                </div>
            </div>
         );
    }
}
 
export default Header;