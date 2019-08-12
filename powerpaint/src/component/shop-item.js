import React, { Component } from 'react';

class ShopItem extends Component {
    state = {  }
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
                    name={shop.name} onClick={this.clickShop}>{shop.name}</td>
                    <td className='link-shop'>{'https://shopee.vn/shop/'+shop.shop_id}</td>
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