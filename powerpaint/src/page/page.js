import React, { Component } from 'react';
import NavBar from '../component/navbar';
import Header from '../component/header';
import Body from '../component/body';

class Page extends Component {
    state = { 
        showMenu:false
    }

    showMenuDialog=()=>{
        let isShowDialog = this.state.showMenu;
        if ( isShowDialog===false ) this.setState({showMenu:true});
        if ( isShowDialog===true) this.setState({showMenu:false});
    }

    openNav=()=>{
        document.getElementById('left-panel').style.width='15%';
        document.getElementById('right-panel').style.width='85%';
    }
    closeNav=()=>{
        document.getElementById('left-panel').style.width='5%';
        document.getElementById('right-panel').style.width='95%';
    }
    render() { 
        return (
            <>
            <div id='left-panel'>
                <NavBar onCloseNav={this.closeNav} onOpenNav={this.openNav} />
            </div>
            <div id='right-panel'>
                <div className='header' >
                    <Header isShowMenu={this.showMenuDialog} text={this.props.text}/>
                </div>
                <Body body={this.props.body} isShowMenu={this.state.showMenu}/>
            </div>
            </>
          );
    }
}
 
export default Page;
