import React, { Component } from 'react';
import '../css/panel.css'

class Body extends Component {
    state = {  }
    render() { 
        return (
            <div className='body-panel'>
                {this.props.body}
            </div>
          );
    }
}
 
export default Body;
