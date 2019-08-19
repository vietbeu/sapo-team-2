import React, { Component } from 'react';

class ProductItem extends Component {
    state = { 
        product: this.props.data,
     }
    componentDidMount(){
        let listCheckBox=[];
        if(this.props.listCheckBox != null) listCheckBox=this.props.listCheckBox;
        let checkboxes = document.getElementsByName('checkbox');
        for (let i=0; i<listCheckBox.length ; i++){
            if (listCheckBox[i].item.item_id===this.state.product.item.item_id)
            for (let i=0; i<checkboxes.length ; i++){
                let item_id=checkboxes[i].getAttribute('id');
                if (item_id==this.state.product.item.item_id) checkboxes[i].checked=true;
            }
        }
    }
    redirectProductDetail=()=>{
        let product = this.state.product;
        localStorage.setItem('sku-detail',product.item.item_sku);
        localStorage.setItem('name-detail',product.item.name);
        localStorage.setItem('status-detail',product.item.status);
        localStorage.setItem('img-detail',JSON.stringify(product.item.images));
        localStorage.setItem('item-id-detail',product.item.item_id);
        localStorage.setItem('shop-id-detail',this.props.shop_id)
        window.location.href='/product/detail?id='+product.item.item_id;
    }
    handleSelectProduct=(e)=>{
        this.props.onSelectProduct(e.target);
        //console.log(e.target.value);
    }
    render() { 
        let product = this.state.product;
        let category = product.item.category_id;
        let status;
        switch(product.item.status) {
            case 'NORMAL':
                status='Hiển thị';
                break;
            case 'BANNED':
                status= 'Khoá';
                break;
            case 'DELETED':
                status= 'Đã xoá';
                break;
            case 'UNLIST':
                status= 'Ẩn';
                break;
            default:
                status='';
          }
        let images = product.item.images; let altImg,imgsText;
        if (images.length>1 ) altImg = <img className='alt-img' src ={product.item.images[1]} alt='img'/>;
        else altImg = null;
        if (images.length>2) {
            let num = images.length-2;
            imgsText=<span className='imgs-text'>{'Còn '+num+' ảnh sản phẩm'}</span>;
        }
        return ( 
            <tr className='data-row' >
                <td className='column-checkbox'><input name='checkbox'type='checkbox' key={product.item.item_id} id={product.item.item_id}
                value={JSON.stringify(product.item)} onClick={this.handleSelectProduct} /></td>
                <td className='column-sku'>{product.item.item_sku}</td>
                <td className='column-product-img' onClick={this.redirectProductDetail}>
                    <img  width ='30%'src ={product.item.images[0]} alt='img'/>
                    <span>
                        {altImg}
                        {imgsText}
                    </span>
                </td>
                <td className='column-product-name' onClick={this.redirectProductDetail}>{product.item.name}</td>
                <td className='column-shopee-status'>{status}</td>
                <td className='column-update-status'>Thành công</td>
            </tr>            
         );
    }
}
 
export default ProductItem;