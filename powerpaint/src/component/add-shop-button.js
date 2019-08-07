import React, { Component } from 'react';
import {key, URL_authorization, partner_id} from './const';
import Crypto from 'crypto-js'
class AddShopButton extends Component {
    state = {  }
    redirectShopee=()=>{
        window.location.replace(URL_authorization+'?id='+partner_id+'&token='
        +this.getToken('http://192.168.36.20:4200/overview',key)
        +'&redirect=http://192.168.36.20:4200/overview')
    }
    getToken = (url, key) => Crypto.SHA256(key+url).toString();
    render() { 
        return ( 
            <>
                <button onClick={this.redirectShopee}>Thêm gian hàng</button>
            </>
         );
    }
}
 
export default AddShopButton;