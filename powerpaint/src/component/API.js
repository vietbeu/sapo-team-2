import {key} from './const';
import axios from 'axios';
import Crypto from 'crypto-js';


export const API_Shopee = async(url, body) => {
    let authen = getAuthSignature(getSignatureBaseString(url,body), key);
    let res = await axios.post(url, body, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': authen,
            'Access-Control-Allow-Origin': '*'
        }
    })
    .catch(function (error) {
        console.log(error);
    })  
    return res;
}

const getSignatureBaseString = (url, body) => {
    return url+"|"+body;
}

const getAuthSignature = (message, secret) => {
    let hash = Crypto.HmacSHA256(message, secret).toString();
    return hash;
}
