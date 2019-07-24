import React, { Component } from 'react';
import '../css/header.css'
class SettingMenu extends Component {
    state = {  }
    render() { 
        return (
            <dialog className='setting-menu' open>
                <div><label>{localStorage.getItem('username')}</label></div>
                <div id='user-status'><label>Đang hoạt động</label></div>
                <hr/>
                <div>
                    <button>
                        <span><i className="fa fa-user-circle-o" aria-hidden="true"></i></span>
                        <span id='setting-item'>Tài khoản</span>
                    </button>
                </div>
                <div>
                    <button>
                        <span><i className="fa fa-power-off" aria-hidden="true"></i></span>
                        <span id='setting-item'>Đăng xuất</span>
                    </button>
                </div>
            </dialog>
          );
    }
}
 
export default SettingMenu;