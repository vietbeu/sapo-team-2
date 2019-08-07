import React, { Component } from 'react';
import '../css/shopeeheader.css';
import '../css/panel.css';
import axios from 'axios';
import Swal from 'sweetalert2';
import BodyShopOverView from '../component/shop-overview-body';
import Page from './page';
import AddShopButton from '../component/add-shop-button';
class ShopOverview extends Component {
    state = {}
    addShop=(shop_name)=>{
        const authen = 'Bearer '+localStorage.getItem('token');
        console.log(authen);
        axios.post('http://192.168.9.253:8181/api/v1/shop',{
            shop_id:Math.floor(Math.random() * 10000) ,
            name:shop_name
        },
        {headers: {
            'Authorization': authen,
        }})
        .then( (response)=>{
            if(response.data.success===1) {
                this.setState({isHiddenPopupAddShop:true});
                Swal.fire(
                    'Success!',
                    'Thêm Shop thành công',
                    'success'
                )
            }
            else if(response.data.success===0) 
            Swal.fire(
                'Fail!',
                'Tên shop đã tồn tại!',
                'error'
            );
            else Swal.fire(
                'Fail!',
                'Shop đã được liên kết rồi!',
                'error'
            );
        })
        .catch((error) => {
            Swal.fire(
                'Fail!',
                'Thêm shop thất bại! Xin vui lòng thử lại sau !',
                'error'
            );
        }) 
    }
    render() { 
        let text = (
            <>
                <span className='header-text'>
                    <div><i className="fa fa-angle-double-left fa-2x" aria-hidden="true"></i></div>
                    <div id='logo-shopee'></div>
                    <div id='location'>KÊNH SHOPEE/ Thông tin chi tiết</div>
                </span>
                <span id='header-button'>
                    <AddShopButton/>
                </span>
            </>
        )
        return (
            <>
                <Page text={text} body={<BodyShopOverView/>}/>
            </>
          );
    }
}
 
export default ShopOverview;