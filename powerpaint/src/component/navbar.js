import React, { Component } from 'react';
import '../css/navbar.css'

class NavBar extends Component {
    state = { 
        isHiddenSubMenu:true,
        isHiddenBar:true,
     }
    componentDidMount(){
        let name = String(localStorage.getItem('username')).replace(/ /g, "+");
        document.getElementById('bottom-avatar').style.backgroundImage =
        'url(https://ui-avatars.com/api/?rounded=true&size=50&background=27AE60&color=FFFFFF&name='+name+')';
        //this.styleCloseBar();
    }

    handleSubMenu=()=>{
        if (this.state.isHiddenBar===true){
            this.styleOpenBar();
        }
        let isHideMenu = this.state.isHiddenSubMenu;
        if (isHideMenu === true ) this.setState({isHiddenSubMenu: false});
        else if (isHideMenu === false )this.setState({isHiddenSubMenu: true})
    }
    redirect = (url) =>{
        window.location.href=url;
    }

    styleCloseBar(){
        this.props.onCloseNav();
        this.setState({isHiddenBar:true});
        let obj =document.getElementsByClassName('nav-text');
        for(let i=0;i<obj.length;i++)obj[i].style.display='none';

        document.getElementsByClassName('sapo-logo')[0].style.display='none';
        document.getElementById('bottom-avatar').style.width='90%';

        obj =document.getElementsByClassName('nav-icon');
        for(let i=0;i<obj.length;i++)obj[i].firstChild.style.textAlign='center';
        document.getElementById('bar-icon').style.width='100%';  
        if (this.state.isHiddenSubMenu === false)
            document.getElementsByClassName('sub-menu')[0].style.display='none'; 
        this.setState({isHiddenSubMenu:true}); 
    }
    styleOpenBar(){
        this.props.onOpenNav();
        this.setState({isHiddenBar:false});
        let obj =document.getElementsByClassName('nav-text');
        for(let i=0;i<obj.length;i++)obj[i].style.display='inline';

        document.getElementsByClassName('sapo-logo')[0].style.display='inline';
        document.getElementById('bottom-avatar').style.width='30%';
        document.getElementById('bar-icon').style.width='20%';

        obj =document.getElementsByClassName('nav-icon');
        for(let i=0;i<obj.length;i++)obj[i].firstChild.style.textAlign='left';
    }
    clickBarIcon=(e)=>{
        e.preventDefault();
        if (this.state.isHiddenBar===false){
            this.styleCloseBar();          
        }else{
            this.styleOpenBar();         
        }
    }
    render() { 
        return (
            <div className='nav-bar'>
                <div className='navbar-header'>
                    <div className='sapo-logo'></div>
                    <div id='bar-icon'><i className="fa fa-bars fa-2x" aria-hidden="true" onClick={this.clickBarIcon}></i></div>
                </div>
                <div className='navbar-body'>
                    <div className='navbar-body-row'>
                        <span className='nav-icon'><i className="fa fa-home fa-2x" aria-hidden="true"></i></span>
                        <span className='nav-text'>Tổng quan</span>
                    </div>
                    <div className='navbar-body-row' onClick={()=>this.redirect('/product')}>
                        <span className='nav-icon'><i className="fa fa-cube fa-2x" aria-hidden="true"></i></span>
                        <span className='nav-text'>Sản phẩm</span>
                    </div>
                    <div className='navbar-body-row' onClick={()=>{this.redirect('/gallery')}}>
                        <span className='nav-icon'><i className="fa fa-picture-o fa-2x" aria-hidden="true"></i></span>
                        <span className='nav-text'>Thư viện ảnh</span>
                    </div>
                    <SubMenu isHidden={this.state.isHiddenSubMenu} redirect={this.redirect}/>
                    <div className='row-bottom' onClick={this.handleSubMenu}>
                        <span id='bottom-avatar'></span>
                        <span className='nav-text'>{localStorage.getItem('username')}</span>
                    </div>
                </div>
            </div>
          );
    }
}
 
export default NavBar;

class SubMenu extends Component {
    state = {  }
    redirect=(e)=>{
        this.props.redirect(e.target.getAttribute('url'));
    }
    render() { 
        if (this.props.isHidden === true) return null;
        else return ( 
            <div className='sub-menu'>
                <div className='sub-menu-row'>
                    <span><i className="fa fa-phone" aria-hidden="true"></i></span>
                    <span className='sub-menu-text'>Hotline 1900 6750</span>
                </div>
                <div className='sub-menu-row'>
                    <span><i className="fa fa-info-circle" aria-hidden="true"></i></span>
                    <span className='sub-menu-text'>Trợ giúp</span>
                </div>
                <div className='sub-menu-row' url='/userinfo' onClick={this.redirect}>
                    <span url='/userinfo'><i className="fa fa-user" aria-hidden="true"></i></span>
                    <span url='/userinfo' className='sub-menu-text'>Hồ sơ cá nhân</span>
                </div>
                <div className='sub-menu-row' url='/login' onClick={this.redirect}>
                    <span url='/login'><i className="fa fa-sign-out" aria-hidden="true"></i></span>
                    <span url='/login' className='sub-menu-text'>Thoát</span>
                </div>
            </div>
         );
    }
}
 
