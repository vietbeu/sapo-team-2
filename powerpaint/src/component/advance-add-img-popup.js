import React, { Component } from 'react';
import '../css/advance-popup.css';
import SelectedProduct from './selected-product';
import ImgAdvancePopup from './img-advance-popup';

class PopupAddImgAdvance extends Component {
    state = { 
        listImgs:this.props.listImgs,
        listProducts:this.props.listProducts,
        listSelectedProducts:this.props.listSelectedProducts,
        listSelectedImgs:[],
        listAddImg:{
            listNewImgs:[],
            item:'',
        }
    }
    handleClickImg=(url)=>{
        let listSelectedImgs=this.state.listSelectedImgs;
        listSelectedImgs.push(url);
        this.setState({listSelectedImgs:listSelectedImgs});
    }
    handleRemoveImg=(url)=>{
        let listSelectedImgs=this.state.listSelectedImgs;
        let index = listSelectedImgs.indexOf(url);
        listSelectedImgs.splice(index,1);
        this.setState({listSelectedImgs:listSelectedImgs})
    }
    handleAddImgsToProduct=()=>{
        let listImgs=this.state.listImgs;
    }
    handleSelectProduct=(input)=>{
        console.log(input);
        console.log(JSON.parse(input).getAttribute('value'));
    }
    render() { 
        console.log(this.state.listSelectedImgs);
        let listProducts=this.state.listProducts;
        let listImgs=this.state.listImgs;
        let listProductsRender=[],listImgsRender;
        listProductsRender=listProducts.map(x=>(
            <SelectedProduct product={x.item} key={x.item.item_id} onSelect={this.handleSelectProduct}listImgsAdd={this.state.listSelectedImgs}/>
        ))
        listImgsRender=listImgs.map ( x => (
            <ImgAdvancePopup url={x} key={x} onClickImg={this.handleClickImg} onRemoveImg={this.handleRemoveImg}/>
        ))
        return (
            <div id='popup-advance'> 
                <div id='pu-left-content'>
                    <div className='pu-content-header'>
                        Hình ảnh đã lựa chọn
                    </div>
                    <div className='pu-content-body'>
                      {listImgsRender} 
                    </div>

                </div>
                <div id='pu-button'>
                    <div id='pu-bt-content'>
                        <button id='pu-bt-add' onClick={this.handleAddImgsToProduct}>Add</button>
                    </div>
                </div>
                <div id='pu-right-content'>
                    <div className='pu-content-header'>
                        Sản phẩm đã lựa chọn
                    </div>
                    <div className='pu-content-body'>
                        <table>
                            <th className='cl-tick'></th>
                            <th className='cl-cur-imgs'>Ảnh bìa</th>
                            <th className='cl-pro'>Sản phẩm</th>
                            <th className='cl-new-imgs'>Ảnh thêm mới</th>
                            {listProductsRender}
                        </table>
                    </div>
                </div>
            </div>
          );
    }
}
 
export default PopupAddImgAdvance;