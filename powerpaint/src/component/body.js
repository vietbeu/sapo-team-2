import React, { Component } from 'react';
import '../css/panel.css'
import SettingMenu from './setting';

class Body extends Component {
    state = {}
    render() { 
        let menu;
        if(this.props.isShowMenu===true) menu = <SettingMenu/>
        else menu =null;
        return (
            <div className='body-panel'>
                {menu}
                <div id = 'margin-top'/>
                {this.props.body}
            </div>
          );
    }
}
 
export default Body;
