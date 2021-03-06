import React, { Component } from 'react';
import '../css/shopeeheader.css'
import '../css/panel.css'
import Table from '../component/overview-table';
import PopUpAddShop from '../component/add-shop-popup';
import axios from 'axios';
import Swal from 'sweetalert2';
import Page from './page';
import { serverIP,port, partner_id } from '../component/const';
import AddShopButton from '../component/add-shop-button';
class ShopeeOverview extends Component {
    state = {
        isHiddenPopupAddShop:true,
      }
    async componentDidMount(){
        if (window.location.href.indexOf('shop_id')>0) {
            this.setState({isHiddenPopupAddShop:false});
            this.setState({shop_id: parseInt(window.location.href.split('=')[1])})
            const { value: shopname } = await Swal.fire({
                title: 'Tên Shop',
                text:'Bạn có thể đặt tên cho shop để dễ dàng quản lý',
                input: 'text',
                inputPlaceholder: 'Hãy nhập tên shop',
                showCancelButton:true,
                cancelButtonText:'Bỏ qua',
                confirmButtonText:'Lưu'
            })            
            if (shopname) {
                this.addShop(shopname);
            }else{
                const authen = 'Bearer '+localStorage.getItem('token');
                axios.post('http://'+serverIP+':'+port+'/api/v1/test/getShopInfo',{
                    shopid:this.state.shop_id ,
                    partner_id:parseInt(partner_id),
                },
                {headers: {
                    'Authorization': authen,
                }})
                .then(rsp => {console.log(rsp.data);this.addShop(rsp.data.shop_name)})
                .catch(()=> Swal.fire('Thêm shop thất bại','Đã có lỗi xảy ra! Xin vui lòng thử lại sau!'))
            }
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
                {/* <PopUpAddShop onAddShop={this.addShop} isHidden={this.state.isHiddenPopupAddShop}/> */}
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