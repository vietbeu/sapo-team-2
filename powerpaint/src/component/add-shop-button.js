import React, { Component } from 'react';
import {key, URL_authorization, partner_id, serverFrIP, portFr} from './const';
import Crypto from 'crypto-js'
class AddShopButton extends Component {
    state = {  }
    redirectShopee=()=>{
        window.location.href=URL_authorization+'?id='+partner_id+'&token='
        +this.getToken('http://'+serverFrIP+':'+portFr+'/overview',key)
        +'&redirect=http://'+serverFrIP+':'+portFr+'/overview';
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