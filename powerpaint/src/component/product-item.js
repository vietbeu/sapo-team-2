import React, { Component } from 'react';

class ProductItem extends Component {
    state = {  }
    redirectProductDetail=()=>{
        let product = this.props.data;
        localStorage.setItem('sku-detail',product.item.item_sku);
        localStorage.setItem('name-detail',product.item.name);
        localStorage.setItem('status-detail',product.item.status);
        localStorage.setItem('img-detail',JSON.stringify(product.item.images))
        window.location.replace('/product/detail')
    }
    render() { 
        let product = this.props.data;
        
        return ( 
            <tr className='data-row' onClick={this.redirectProductDetail}>
                <td className='column-sku'>{product.item.item_sku}</td>
                <td className='column-product-img'><img  width ='70px' height = '70px'
                src ={product.item.images[0]} alt='img'/></td>
                <td className='column-product-name'>{product.item.name}</td>
                <td className='column-shopee-status'>{product.item.status}</td>
                <td className='column-update-status'>Thành công</td>
            </tr>            
         );
    }
}
 
export default ProductItem;