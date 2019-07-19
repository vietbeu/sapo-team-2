import React, { Component } from 'react';
import Login from './login';
import Image from './image'

class FirstPage extends Component {
    state = {  }
    render() { 
        return ( 
            <div className='first-page'>
            <span className='image-background' id='image-background'>
                <Image/>
            </span>
            <span className='form-container'>
                <Login active={this.props.active}/>
            </span>
        </div>
         );
    }
}
 
export default FirstPage;

