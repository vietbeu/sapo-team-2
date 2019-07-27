import React, { Component } from 'react';
import '../css/welcome-page.css'
import Header from '../component/header';
import WelcomeBody from '../component/welcome-body';

class WelcomePage extends Component {
    state = { 
        showMenu:false
     }
    showMenuDialog=()=>{
        let isShowDialog = this.state.showMenu;
        if ( isShowDialog===false ) this.setState({showMenu:true});
        if ( isShowDialog===true) this.setState({showMenu:false});
    }
    render() { 
        let isShowDialog=this.state.showMenu;
        let body;
        if (isShowDialog===true) body=<WelcomeBody showMenu={true}/>;
        if (isShowDialog===false) body=<WelcomeBody showMenu={false}/>;
        return ( 
            <div className='welcome-page'>
                <div className='header'>
                    <Header isShowMenu={this.showMenuDialog} text={'Xin chào '+localStorage.getItem('username')}/>
                </div>
                <div className='body-welcome'>
                    {body}
                </div>
            </div>
         );
    }
}
 
export default WelcomePage;