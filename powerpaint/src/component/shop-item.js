import React, { Component } from 'react';
import {serverIP,port,partner_id} from './const';
import axios from 'axios';
import avtDefault from '../images/avt-shop-default.png'
import Swal from 'sweetalert2'

class ShopItem extends Component {
    state = { 
        avatar:null,
     }

    componentDidMount(){
        const authen = 'Bearer '+localStorage.getItem('token');
        let avatar=[];
        axios.post('http://' + serverIP + ':'+port+'/api/v1/test/getShopInfo',
        {
            partner_id:parseInt(partner_id),
            shopid:this.props.shop.shop_id,
        },
        {headers: {
            'Authorization': authen,
        }})
        .then ( rsp => {
            if(rsp.data.images.length>0){
                avatar=rsp.data.images[0];
                this.setState({avatar:avatar});
            }
        })
    }
    formatDay=(timestamp)=> {
        let date = new Date(timestamp);
        let month = date.getMonth()+1;
        let year = date.getFullYear();
        let day = date.getDate();
        let hour = date.getHours();
        if (hour<10) hour='0'+hour;
        let min = date.getMinutes();
        if (min<10) min='0'+min;
        return day+'/'+month+'/'+year+' '+hour+':'+min;
    }
    clickShop=(e)=>{
        localStorage.setItem('shop-id',e.target.getAttribute('id'));
        localStorage.setItem('shop-create_date',e.target.getAttribute('date'));
        localStorage.setItem('shop-name',e.target.getAttribute('name'));
        localStorage.setItem('shop-status',this.props.shop.status);
        window.location.href='/shop';
    }
    handleDeleteShop=()=>{
        Swal.fire({
            title: 'Xoá gian hàng này?',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'OK'
          }).then((result) => {
            if (result.value) 
                this.props.onDeleteShop();
          })        

    }
    render() { 
        let shop=this.props.shop; let avt=this.state.avatar;
        let shopStatus,srcAvt;
        if (avt === null || avt===[] || avt === '') srcAvt=avtDefault;
        else srcAvt=avt;
        if (shop.status===1) shopStatus=<td className='active-status'>Đang hoạt động</td>
        else shopStatus = <td className='deactive-status'>Ngừng hoạt động </td>
        return (
            <>
                <tr className='data-row'>
                    <td className='shop-name' id={shop.shop_id} date={this.formatDay(shop.createDate)} 
                    name={shop.name} onClick={this.clickShop}>
                        <span className='shop-avatar' id={shop.shop_id} date={this.formatDay(shop.createDate)} 
                    name={shop.name}>
                            <img width='40%'  src={srcAvt} alt={shop.shop_id} id={shop.shop_id} date={this.formatDay(shop.createDate)} 
                    name={shop.name}/>
                            </span>
                        {' '+shop.name}
                    </td>
                    <td className='link-shop'>
                        <a href={'https://shopee.vn/shop/'+shop.shop_id} target="_blank">{'https://shopee.vn/shop/'+shop.shop_id}</a></td>
                    <td className='connect-date'>{this.formatDay(shop.createDate)}</td>
                    {shopStatus}
                    <td><i className="fa fa-trash-o" aria-hidden="true" onClick={this.handleDeleteShop}></i></td>
                </tr>   
            </>         
          );
    }
}
 
export default ShopItem;