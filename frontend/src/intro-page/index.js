import React from 'react';
import Header from './header';
import '../css/intro-page.css';
import IntroBody from './body';

const IntroPage = () => {
    return ( 
        <React.Fragment>
            <div className='intro-header'>
                <Header/>
            </div>
            <div className='intro-body'>
                <IntroBody/>
            </div>
        </React.Fragment>
     );
}
 
export default IntroPage;