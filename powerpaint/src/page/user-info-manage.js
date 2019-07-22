import React, { Component } from 'react';
import Header from '../component/header';
import UserInfoManagementBody from '../component/user-info-manage-body';

class UserInfoManagement extends Component {
    state = {  }
    render() { 
        return (
            <React.Fragment>
            <div className='header'>
                <Header/>
            </div>
            <div className='body'>
                <UserInfoManagementBody/>
            </div>
            </React.Fragment>
          );
    }
}
 
export default UserInfoManagement ;