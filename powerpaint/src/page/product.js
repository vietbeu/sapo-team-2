import React, { Component } from 'react';
import Header from '../component/header';
import NavBar from '../component/navbar'
import BodyProDuct from '../component/product-body';
import Body from '../component/body';

class Product extends Component {
    state = {  }
    openNav=()=>{
        document.getElementById('left-panel').style.width='15%';
        document.getElementById('right-panel').style.width='85%';
    }
    closeNav=()=>{
        document.getElementById('left-panel').style.width='5%';
        document.getElementById('right-panel').style.width='95%';
    }
    render() { 
        let text = (
            <>
                <span className='header-text'>
                    <div><i className="fa fa-angle-double-left fa-2x" aria-hidden="true"></i></div>
                    <div id='logo-shopee'></div>
                    <div id='location'>KÊNH SHOPEE/ Sản phẩm</div>
                </span>
                <span id='header-button'>
                    <button>Thêm gian hàng</button>
                </span>
            </>
        )
        return (
            <>
            <div id='left-panel'>
                <NavBar onCloseNav={this.closeNav} onOpenNav={this.openNav}/>
            </div>
            <div id='right-panel'>
                <div className='header' >
                    <Header isShowMenu={this.showMenuDialog} text={text}/>
                </div>
                <Body body={<BodyProDuct/>}/>
            </div>
            </>
          );
    }
}
 
export default Product;