import React, { Component } from 'react';
import Page from './page';
import BodyProductDetail from '../component/product-detail-body';
import AddShopButton from '../component/add-shop-button';

class ProductDetailPage extends Component {
    state = {  }
    render() { 
        let text = (
            <>
                <span className='header-text'>
                    <div><i className="fa fa-angle-double-left fa-2x" aria-hidden="true"></i></div>
                    <div id='logo-shopee'></div>
                    <div id='location'>KÊNH SHOPEE/ Thông tin chi tiết sản phẩm</div>
                </span>
                <span id='header-button'>
                    <AddShopButton/>
                </span>
            </>
        )
        return (
            <>
                <Page text={text} body={<BodyProductDetail/>}/>
            </>
          );
    }
}
 
export default ProductDetailPage;