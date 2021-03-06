import React, { Component } from 'react';
import Header from '../component/header';
import UserInfoManagementBody from '../component/user-info-manage-body';

class UserInfoManagement extends Component {
    state = { 
        showMenu:false,
     }
    showMenuDialog=()=>{
        let isShowDialog = this.state.showMenu;
        if ( isShowDialog===false ) this.setState({showMenu:true}); 
        if ( isShowDialog===true) this.setState({showMenu:false});
    }
    render() { 
        let isShowDialog=this.state.showMenu;
        let body;
        if (isShowDialog===true) body=<UserInfoManagementBody showMenu={true}/>;
        if (isShowDialog===false) body=<UserInfoManagementBody showMenu={false}/>;
        return (
            <React.Fragment>
            <div className='header' >
                <Header logo={true} isShowMenu={this.showMenuDialog}/>
            </div>
            <div className='body-userinfo'>
                {body}
            </div>
            </React.Fragment>
          );
    }
}
 
export default UserInfoManagement ;