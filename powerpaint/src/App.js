import React, { Component } from 'react';
import './App.css';
import FirstPage from './login-page'
import IntroPage from './intro-page';
import {BrowserRouter,Route} from 'react-router-dom';
import WelcomePage from './page/welcome';
import UserInfoManagement from './page/user-info-manage'
class App extends Component {
  state = {
    username:'',
    }
  render() { 
    return (
      <BrowserRouter>
        <div>
            <Route exact path="/" component={IntroPage}  />
            <Route path="/login" render={()=><FirstPage active={1}/>}/>
            <Route path="/signup" render={()=><FirstPage active={2}/>} />
            <Route path="/welcome" render={()=><WelcomePage/>} />
            <Route path='/userinfo' render={()=><UserInfoManagement/>}/>
        </div>
    </BrowserRouter>
      );
  }
}
 
export default App;

