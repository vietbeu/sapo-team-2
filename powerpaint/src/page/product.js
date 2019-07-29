import React, { Component } from 'react';
import BodyProDuct from '../component/product-body';
import Page from './page';

class Product extends Component {
    state = {  }
    
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
                <Page text={text} body={<BodyProDuct/>}></Page>
            </>
          );
    }
}
 
export default Product;