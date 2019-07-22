import React, { Component } from 'react';
import '../css/welcome-page.css'
import Header from '../component/header';
import WelcomeBody from '../component/welcome-body';

class WelcomePage extends Component {
    state = {  }
    render() { 
        return ( 
            <div className='welcome-page'>
                <div className='header'>
                    <Header/>
                </div>
                <div className='body'>
                    <WelcomeBody/>
                </div>
            </div>
         );
    }
}
 
export default WelcomePage;