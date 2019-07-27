import React, { Component } from 'react'; 
import '../css/table.css';
import axios from 'axios';
import Crypto from 'crypto-js'

const TEST_KEY = '26f76c014a453d1fb248f35e2a42d3c655fd97a9e671b79d3dfa59eb876bb43e'; 

class Table extends Component {
    state = {  
        shop:{
            shop_name:'',
            shop_id:'',
        }
        
    }


    getSignatureBaseString = (url, body) => {
        return url+"|"+body;
    }

    getAuthSignature = (message, secret) => {
        let hash = Crypto.HmacSHA256(message, secret).toString();
        return hash;
    }
    
    API_getShopInfo = (url, body) => {
        let authen = this.getAuthSignature(this.getSignatureBaseString(url,body), TEST_KEY);
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
    API_getOrdersList = (url, body) => {
        let authen = this.getAuthSignature(this.getSignatureBaseString(url,body), TEST_KEY);

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
            this.setState({oderList: response.data.orders});
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        })
            
        
    }
    componentDidMount(){
        const partner_id = 840386;
        const shopid = 205134;
        let timestamp = Date.now() / 1000 | 0;
        let URL_getShopInfo = 'https://partner.uat.shopeemobile.com/api/v1/shop/get';
        let body_getShopInfo = '{"partner_id": '+partner_id+', "shopid": '+shopid+', "timestamp": '+timestamp+'}';
        this.API_getShopInfo(URL_getShopInfo, body_getShopInfo);

        /*let URL_getOrdersList = 'https://partner.uat.shopeemobile.com/api/v1/orders/basics';
        let body_getOdersList = '{"partner_id": '+partner_id+', "shopid": '+shopid+', "timestamp": '+timestamp+
        ', ""*/

}
    render() { 
        return (
            <div className='table-sh'>
                <table>
                    <thead>
                        <tr>
                            <th className='column-shopname'>Tên gian hàng</th>
                            <th className='column-linkshop'>Link gian hàng</th>
                            <th className='column-date'>Ngày kết nối</th>
                            <th className='column-ordernum'>Đơn hàng</th>
                            <th className='column-productnum'>Sản phẩm</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className='data-row'>
                            <td>{this.state.shop.shop_name}</td>
                            <td className='link-shop'>{'https://shopee.vn/shop/'+this.state.shop.shop_id}</td>
                            <td>22/7/2019 15:20</td>
                            <td id='data-num'>40</td>
                            <td id='data-num'>60</td>
                        </tr>
                    </tbody>
                </table>
            </div>
          );
    }
}
 
export default Table;