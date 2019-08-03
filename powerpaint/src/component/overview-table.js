import React, { Component } from 'react'; 
import '../css/table.css';
import axios from 'axios';
import Crypto from 'crypto-js';
import Swal from 'sweetalert2';
import ShopItem from './shop-item';
import {key,serverIP,port} from './const';

class Table extends Component {
    state = {  
        listShop:[]
        
    }
    componentDidMount(){
        this.getShop();
    }
    getShop=()=>{
        const authen = 'Bearer '+localStorage.getItem('token');
        console.log(authen);
        axios.get('http://'+serverIP+':'+port+'/api/v1/shop',
        {headers: {
            'Authorization': authen,
        }})
        .then( (response)=> {
            this.setState({listShop:response.data});
        })
        .catch((error) => {
            Swal.fire(
                'Fail!',
                'Tải danh sách shop thất bại! Xin vui lòng thử lại sau !',
                'error'
            );
        }) 
    }

    getSignatureBaseString = (url, body) => {
        return url+"|"+body;
    }

    getAuthSignature = (message, secret) => {
        let hash = Crypto.HmacSHA256(message, secret).toString();
        return hash;
    }
    
    API_getShopInfo = (url, body) => {
        let authen = this.getAuthSignature(this.getSignatureBaseString(url,body), key);
        console.log(this.getSignatureBaseString(url,body));
        console.log(authen);
        axios.post(url, body, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': authen
            }
        }
        )
        .then(response => {
            console.log(123);
            this.setState({shop: response.data});
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        })  
    }
    
   /* componentDidMount(){
        const partner_id = 840386;
        const shopid = 205134;
        let timestamp = Date.now() / 1000 | 0;
        let URL_getShopInfo = 'https://partner.uat.shopeemobile.com/api/v1/shop/get';
        let body_getShopInfo = '{"partner_id": '+partner_id+', "shopid": '+shopid+', "timestamp": '+timestamp+'}';
        this.API_getShopInfo(URL_getShopInfo, body_getShopInfo);

        /*let URL_getOrdersList = 'https://partner.uat.shopeemobile.com/api/v1/orders/basics';
        let body_getOdersList = '{"partner_id": '+partner_id+', "shopid": '+shopid+', "timestamp": '+timestamp+
        ', ""

}*/
    render() { 
        let list = this.state.listShop;
        let listShop = list.map((x)=><ShopItem shop={x} key={x.id}/>);
        localStorage.setItem('listShop',JSON.stringify(list));
        return (
            <div className='table-sh'>
                <table>
                    <thead>
                        <tr>
                            <th className='column-shopname'>Tên gian hàng</th>
                            <th className='column-linkshop'>Link gian hàng</th>
                            <th className='column-date'>Ngày kết nối</th>
                            <th className='column-status'>Trạng thái</th>
                           {/* <th className='column-ordernum'>Đơn hàng</th>
                            <th className='column-productnum'>Sản phẩm</th>*/}
                        </tr>
                    </thead>
                    <tbody>
                        {listShop}
                    </tbody>
                </table>
            </div>
          );
    }
}
 
export default Table;