import React, { Component } from 'react';
import '../css/shopeeheader.css'
import '../css/panel.css'
import Table from '../component/overview-table';
import PopUpAddShop from '../component/add-shop-popup';
import axios from 'axios';
import Swal from 'sweetalert2';
import Page from './page';
import { serverIP,port } from '../component/const';
import AddShopButton from '../component/add-shop-button';
class ShopeeOverview extends Component {
    state = {
        isHiddenPopupAddShop:true,
      }
    componentDidMount(){
        if (window.location.href.indexOf('shop_id')>0) {
            this.setState({isHiddenPopupAddShop:false});
            this.setState({shop_id: window.location.href.split('=')[1]})
        }
    }
    openNav=()=>{
        document.getElementById('left-panel').style.width='15%';
        document.getElementById('right-panel').style.width='85%';
    }
    closeNav=()=>{
        document.getElementById('left-panel').style.width='5%';
        document.getElementById('right-panel').style.width='95%';
    }
    
    
    addShop=(shop_name)=>{
        const authen = 'Bearer '+localStorage.getItem('token');
        console.log(authen);
        axios.post('http://'+serverIP+':'+port+'/api/v1/shop',{
            shop_id:this.state.shop_id ,
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
                setTimeout(
                    () => {
                      window.location.replace('/overview');
                    },
                    2 * 1000
                  );
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
                    <div id='location'>KÊNH SHOPEE/ Tổng quan</div>
                </span>
                <span id='header-button'>
                    <AddShopButton/>
                </span>
            </>
        )
        let body = (
            <>
                <PopUpAddShop onAddShop={this.addShop} isHidden={this.state.isHiddenPopupAddShop}/>
                <div id='title-overview-table'>Thông tin tất cả gian hàng</div>
                <div>
                    <Table/>
                </div>
            </>    
        )
        return (
            <>
                <Page text={text} body={body}/>            
            </>
          );
    }
}
 
export default ShopeeOverview;