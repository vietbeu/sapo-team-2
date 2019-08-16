import React, { Component } from 'react';
import {serverIP,port,partner_id} from './const';
import axios from 'axios';

class ShopItem extends Component {
    state = {  }

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
    render() { 
        let shop=this.props.shop;
        let shopStatus;
        if (shop.status===1) shopStatus=<td className='active-status'>Đang hoạt động</td>
        else shopStatus = <td className='deactive-status'>Ngừng kết nối </td>
        return (
            <>
                <tr className='data-row'>
                    <td className='shop-name' id={shop.shop_id} date={this.formatDay(shop.createDate)} 
                    name={shop.name} onClick={this.clickShop}>
                        <span className='shop-avatar' id={shop.shop_id}>
                            <img width='40%'  src={this.state.avatar} alt={shop.shop_id}/>
                            </span>
                        {' '+shop.name}
                    </td>
                    <td className='link-shop' onClick={()=> window.location.href='https://shopee.vn/shop/'+shop.shop_id}>
                        {'https://shopee.vn/shop/'+shop.shop_id}</td>
                    <td className='connect-date'>{this.formatDay(shop.createDate)}</td>
                    {shopStatus}
                    {/*<td id='data-num'>40</td>
                    <td id='data-num'>60</td>*/}
                </tr>   
            </>         
          );
    }
}
 
export default ShopItem;