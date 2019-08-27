import React, { Component } from 'react';

class SelectedProduct extends Component {
    state = {  }
    handleSelectProduct=(e)=>{
        this.props.onSelect(e.target);
    }
    render() { 
        let product=this.props.product;
        let images = product.images; let altImg,imgsText;
        if (images.length>1 ) altImg = <img className='alt-img' src ={product.images[1]} alt='img'/>;
        else altImg = null;
        if (images.length>2) {
            let num = images.length-2;
            imgsText=<span className='txt-img'>{'Còn '+num+' ảnh sản phẩm'}</span>;
        }
        return (
            <tr className='product-row' >
                <td className='cl-tick'><input name='checkbox'type='checkbox' key={product.item_id} id={product.item_id}
                value={JSON.stringify(product)} onClick={this.handleSelectProduct} /></td>
                <td className='cl-curimg'>
                    <img  width ='80%'src ={product.images[0]} alt='img'/>
                </td>
                <td className='cl-pro' onClick={this.redirectProductDetail}>{product.name}</td>
                <td className='cl-new-imgs'>
                    <div className='list-new-imgs'>
                        <img  width ='70vh'src ={product.images[0]} alt='img'/>
                        <img  width ='70vh'src ={product.images[0]} alt='img'/>
                        <img  width ='70vh'src ={product.images[0]} alt='img'/>
                        <img  width ='70vh'src ={product.images[0]} alt='img'/>
                        <img  width ='70vh'src ={product.images[0]} alt='img'/>
                        <img  width ='70vh'src ={product.images[0]} alt='img'/>
                    </div>
                </td>
            </tr>    
          );
    }
}
 
export default SelectedProduct;