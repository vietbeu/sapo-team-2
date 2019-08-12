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
import ProductDetailPage from './page/product-detail';
import Test from './component/test';
import GalleryPage from './page/gallery';
import ResetPassForm from './login-page/reset-pass';
class App extends Component {
  render() { 
    let id=205134;
    return (
      <BrowserRouter>
        <div>
          <Switch>
            <Route exact path="/" component={IntroPage}  />
            <Route path="/login" render={()=><FirstPage active={1}/>}/>
            <Route path="/signup" render={()=><FirstPage active={2}/>} />
            <Route path="/welcome" render={()=><WelcomePage/>} />
            <Route path='/userinfo' render={()=><UserInfoManagement/>}/>
            <Route path='/product/detail' render={()=><ProductDetailPage/>} />
            <Route path={'/product'} render={()=><Product/>} />
            <Route path={'/shop'} 
                render={()=><ShopOverview/>} />
            <Route path='/overview' render={()=><ShopeeOverview/>} />
            <Route path='/reset-pass' render={()=><ResetPassForm/>}/>
            <Route path='/test' render={()=><Test/>} />
            <Route path='/gallery' render={()=><GalleryPage/>} />
          </Switch>
        </div>
    </BrowserRouter>
      );
  }
}
 
export default App;

