import React, { Component } from 'react';

class Test extends Component {
    state = {  }
    componentDidMount(){
        document.getElementById('iframe').style.width='100%';
        document.getElementById('iframe').style.height='100vh';
    }
    render() { 
        return (
            <>
                <iframe id='iframe' src={localStorage.getItem('iframe-url')}/>
            </>
          );
    }
}
 
export default Test;