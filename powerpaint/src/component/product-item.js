import React, { Component } from 'react';

class ProductItem extends Component {
    state = {  }
    redirectProductDetail=()=>{
        let product = this.props.data;
        localStorage.setItem('sku-detail',product.item.item_sku);
        localStorage.setItem('name-detail',product.item.name);
        localStorage.setItem('status-detail',product.item.status);
        localStorage.setItem('img-detail',JSON.stringify(product.item.images));
        localStorage.setItem('item-id-detail',product.item.item_id);
        window.location.replace('/product/detail?id='+product.item.item_id)
    }
    handleSelectProduct=(e)=>{
        this.props.onSelectProduct(e.target);
        console.log(e.target.value);
    }
    render() { 
        let product = this.props.data;
        
        return ( 
            <tr className='data-row' >
                <td className='column-checkbox'><input name='checkbox'type='checkbox' value={product.item.item_id} onClick={this.handleSelectProduct}/></td>
                <td className='column-sku'>{product.item.item_sku}</td>
                <td className='column-product-img' onClick={this.redirectProductDetail}><img  width ='70px' height = '70px'
                src ={product.item.images[0]} alt='img'/></td>
                <td className='column-product-name' onClick={this.redirectProductDetail}>{product.item.name}</td>
                <td className='column-shopee-status'>{product.item.status}</td>
                <td className='column-update-status'>Thành công</td>
            </tr>            
         );
    }
}
 
export default ProductItem;