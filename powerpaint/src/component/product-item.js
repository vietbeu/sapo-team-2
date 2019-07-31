import React, { Component } from 'react';

class ProductItem extends Component {
    state = {  }
    render() { 
        let product = this.props.data;

        return ( 
            <tr className='data-row'>
                <td className='column-sku'>{product.item.item_sku}</td>
                <td className='column-product-img'><img  width ='70px' height = '70px'
                src ={product.item.images} alt='img'/></td>
                <td className='column-product-name'>{product.item.name}</td>
                <td className='column-shopee-status'>{product.item.status}</td>
                <td className='column-update-status'>Thành công</td>
            </tr>            
         );
    }
}
 
export default ProductItem;