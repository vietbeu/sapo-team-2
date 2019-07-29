import React, { Component } from 'react';
import './App.css';
import FirstPage from './login-page'
import IntroPage from './intro-page';
import {BrowserRouter,Route,Switch} from 'react-router-dom';
import WelcomePage from './page/welcome';
import UserInfoManagement from './page/user-info-manage'
import ShopeeOverview from './page/shopee-overview';
import ShopOverview from './page/shop-overview';
import Product from './page/product';
class App extends Component {
  render() { 
    return (
      <BrowserRouter>
        <div>
          <Switch>
            <Route exact path="/" component={IntroPage}  />
            <Route path="/login" render={()=><FirstPage active={1}/>}/>
            <Route path="/signup" render={()=><FirstPage active={2}/>} />
            <Route path="/welcome" render={()=><WelcomePage/>} />
            <Route path='/userinfo' render={()=><UserInfoManagement/>}/>
            <Route path='/overview/shop/product' render={()=><Product/>} />
            <Route path='/overview/shop' render={()=><ShopOverview/>} />
            <Route path='/overview' render={()=><ShopeeOverview/>} />
            
          </Switch>
        </div>
    </BrowserRouter>
      );
  }
}
 
export default App;

