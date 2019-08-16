import React, { Component } from 'react';
import '../css/shop-overview.css';
import {port,serverIP} from './const';
import axios from 'axios';
import Swal from 'sweetalert2';

class BodyShopOverView extends Component {
    state = { 
        status: localStorage.getItem('shop-status'),
     }

    deleteAccount=()=>{
        Swal.fire({
            title: 'Are you sure?',
            text: "Bạn có chắc chắn muốn ngừng kết nối shop?",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'OK'
          }).then((result) => {
            if (result.value) {
                const authen = 'Bearer '+localStorage.getItem('token');
                axios.delete('http://' + serverIP + ':'+port+'/api/v1/shop/'+localStorage.getItem('shop-id'),
                {headers: {
                    'Authorization': authen,
                }})
                .then(()=>{
                    Swal.fire(
                        'Succes!',
                        'Ngừng kết nối shop thành công! ',
                        'success'
                    );
                    this.setState({status:'0'});
                    setTimeout(
                        () => {
                          window.location.href='/overview';
                        },
                        2 * 1000
                      );
                })
                .catch((error) => {
                    Swal.fire(
                        'Fail!',
                        'Ngừng kết nối shop thất bại! Xin vui lòng thử lại sau !',
                        'error'
                    );
                }) 
            }
          })
    }
    connectAccount = () => {
        const authen = 'Bearer '+localStorage.getItem('token');
        axios.post('http://' + serverIP + ':'+port+'/api/v1/shop/activate/'+localStorage.getItem('shop-id'),{},
            {headers: {'Authorization': authen,}})
        .then(()=>{
            Swal.fire('Succes!','Kết nối shop thành công! ','success');
            this.setState({status:'1'});
        })
        .catch (e=>Swal.fire('Fail!','Kết nối shop thất bại! ','error'))
    }
    render() { 
        let buttonChangeShopStatus;
        let status;
        if (this.state.status==='1') {
            buttonChangeShopStatus=<button onClick={this.deleteAccount}>Gỡ bỏ tài khoản này</button>;
            status='Đang kết nối';
        }else  if (this.state.status==='0')  {
            buttonChangeShopStatus=<button onClick={this.connectAccount}>Kết nối tài khoản này</button>
            status='Ngừng kết nối';
        }
        return (
            <>
            <div id='title-overview-table'>{'Thông tin chi tiết gian hàng '+localStorage.getItem('shop-name')} </div>
            <div id='shop-overview-content'>
                <div id='left-content'>
                    <div id='account-info-table'>
                        <div id='table-caption'>Thông tin của tài khoản</div>
                        <div id='tb-content'>
                            <span >TỔNG SỐ ĐƠN HÀNG<div>30</div></span>
                            <span id='margin'>TỔNG SỐ SẢN PHẨM<div>40</div></span>
                        </div>
                    </div>
                    <div id='account-info-table'>
                        <div id='table-caption'>Hướng dẫn sử dụng</div>
                        <div id='tb-help-content'>
                            <ul>
                                <li><span>Hướng dẫn cách thêm gian hàng</span></li>
                                <li><span>Hướng dẫn cách sử dụng tool chỉnh ảnh trên shopee</span></li>
                                <li><span>Hướng dẫn cách quản lý ảnh hiệu quả với Sapo Decorate</span></li>
                            </ul>
                        </div>
                    </div>
                </div> 
                <div id='right-content'>
                    <div id='account-info-table'>
                        <div  id='right-tb-caption'>Tài khoản đang kết nối</div>
                        <div id='right-tb-body'>
                            <div id='logo_2'></div>
                            <div id='lock-icon'>
                                <span className="fa-stack fa-lg">
                                    <i className="fa fa-circle-thin fa-stack-2x"></i>
                                    <span id='lock'><i className="fa fa-lock fa-stack-1x "></i></span>
                                </span>
                            </div>
                            <div id='shop-info'>
                                <div>
                                    <i className="fa fa-globe" aria-hidden="true"></i>
                                    {status} 
                                    <span> {localStorage.getItem('shop-name')}</span>
                                </div>
                                <div className='link-shop'>{'https://shopee.vn/shop/'+localStorage.getItem('shop-id')}</div>
                                <div>{'Ngày kết nối: '+localStorage.getItem('shop-create_date')} </div>
                            </div>
                        </div>
                        <div id='right-tb-footer'>
                            {buttonChangeShopStatus}
                        </div>
                    </div>
                </div>
            </div>
            </>
          );
    }
}
 
export default BodyShopOverView ;