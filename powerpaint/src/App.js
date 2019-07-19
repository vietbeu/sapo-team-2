import React from 'react';
import './App.css';
import FirstPage from './login-page'
import IntroPage from './intro-page';
import {BrowserRouter,Route} from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
        <div>
            <Route exact path="/" component={IntroPage}  />
            <Route path="/login" render={()=><FirstPage active={1}/>}/>
            <Route path="/signup" render={()=><FirstPage active={2}/>} />
        </div>
    </BrowserRouter>
  );
}
export default App;
