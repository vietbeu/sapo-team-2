import React, { Component } from 'react';

class ProductItem extends Component {
    state = {  }
    render() { 
        return ( 
            <tr className='data-row'>
                <td className='column-sku'>{this.props.id}</td>
                <td className='column-product-img'>{this.props.data.title}</td>
                <td className='column-product-name'>Máy ảnh chính hãng</td>
                <td className='column-shopee-status'>Hiển thị</td>
                <td className='column-update-status'>Thành công</td>
                <td className='column-set'>a</td>
            </tr>            
         );
    }
}
 
export default ProductItem;