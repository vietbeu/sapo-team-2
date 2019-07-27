import React, { Component } from 'react';
import '../css/addshop.css'
class PopUpAddShop extends Component {
    state = {  }
    addShop=(e)=>{
        e.preventDefault();
        this.props.onAddShop(this.state.shop_name);
    }
    handleChangeShopName=(e)=>{
        e.preventDefault();
        this.setState({shop_name: e.target.value})
    }
    render() { 
        if (this.props.isHidden===true) return null;
        else
        return ( 
            <dialog className='add-shop-dialog' open>
                    <p>Kết nối gian hàng</p>
                    <div className='popup-addshop-body'>
                        <div id='body-content'>
                            <div className='message'>
                                <div>Vui lòng chờ 1-2 tiếng để thông tin đơn hàng và sản phẩm được cập nhật trên hệ thống </div>
                                <div>Vui lòng đặt tên gian hàng trên Sapo Decorate để phân biệt với các gian hàng khác</div>
                            </div>
                            <div className='input-shopname'>
                                <label> Tên gian hàng</label>
                                <input type='text' required onChange={this.handleChangeShopName}/>
                            </div>
                            <div className='footer-button'>
                                <button id="access" onClick={this.addShop}>Kết nối gian hàng</button>
                                <button id='reset'>Làm mới</button>
                            </div>
                        </div>
                    </div>
            </dialog>
         );
    }
}
 
export default PopUpAddShop;