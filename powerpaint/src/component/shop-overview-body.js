import React, { Component } from 'react';
import '../css/shop-overview.css';
import {port,serverIP} from './const';
import axios from 'axios';
import Swal from 'sweetalert2';

class BodyShopOverView extends Component {
    state = { 
        status: localStorage.getItem('shop-status'),
        numberOfItems:0,
        numOfUpdatedItem:0,
        shop_id:localStorage.getItem('shop-id'),
     }
    async componentDidMount(){
        await this.getProductItem();
        await this.getUpdatedItems();
    }
    async getProductItem(){
        // let timestamp = Date.now() / 1000 | 0;
        let more=true;
        let offset=0; 
        let listItems=[]; let numberOfItems=0;
        while(more){
          listItems= await axios.get('http://'+serverIP+':'+port+'/api/v1/test/getItemList?offset='
                                        +offset+'&shopid='+this.state.shop_id+'&entries='+100,
                                        {headers:{
                                            'Authorization':'Bearer '+localStorage.getItem('token'),
                                        }})
          offset+=100;
          more =listItems.data.more;
          numberOfItems+= listItems.data.items.length;
        }
        this.setState({numberOfItems:numberOfItems});
      }
    getUpdatedItems=()=>{
      let listUpdatedItem=[];
      const authen = 'Bearer '+localStorage.getItem('token');
      axios.get('http://' + serverIP + ':'+port+'/api/v1/products?shopid='+this.state.shop_id,
          {headers: {
              'Authorization': authen,
          }}) 
      .then ( rsp => {
        listUpdatedItem=rsp.data;
        console.log(listUpdatedItem);
        this.setState({numOfUpdatedItem:listUpdatedItem.length});
      } )    
    }
    deleteAccount=()=>{
        Swal.fire({
            title: 'Ngừng kết nối?',
            text: "Thao tác này sẽ ngừng kết nối tài khoản Sapo Editor với tài khoản hiện tại",
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
        let status,lockIcon;
        if (this.state.status==='1') {
            buttonChangeShopStatus=<button id='bt-disconnect' onClick={this.deleteAccount}>Gỡ bỏ tài khoản này</button>;
            status='Đang kết nối';
            lockIcon=<span id='lock'><i className="fa fa-lock fa-stack-1x "></i></span>
        }else  if (this.state.status==='0')  {
            buttonChangeShopStatus=<button id='bt-reconnect'onClick={this.connectAccount}>Kết nối tài khoản này</button>
            status='Ngừng kết nối';
            lockIcon=<span id='unlock'><i className="fa fa-lock fa-stack-1x "></i></span>
        }
        return (
            <>
            <div id='title-overview-table'>{'Thông tin chi tiết gian hàng '+localStorage.getItem('shop-name')} </div>
            <div id='shop-overview-content'>
                <div id='left-content'>
                    <div id='account-info-table'>
                        <div id='table-caption'>Thông tin của tài khoản</div>
                        <div id='tb-content'>
                            <span >TỔNG SỐ SẢN PHẨM
                                <div></div><br/>
                                <div></div><br/>
                                <div>{this.state.numberOfItems}</div></span>
                            <span id='margin'>TỔNG SỐ SẢN PHẨM ĐÃ CẬP NHẬT LẠI ẢNH
                                <div></div><br/>
                                <div>{this.state.numOfUpdatedItem}</div>
                            </span>
                        </div>
                    </div>
                    <div id='account-info-table'>
                        <div id='table-caption'>Hướng dẫn sử dụng</div>
                        <div id='tb-help-content'>
                            <ul>
                                <li><span><a href='https://support.sapo.vn/tong-quan-ban-hang-tren-shopee' target="_blank">
                                    Hướng dẫn cách thêm gian hàng</a></span></li>
                                <li><span><a href='https://support.sapo.vn/tong-quan-ban-hang-tren-shopee' target="_blank">
                                    Hướng dẫn cách sử dụng tool chỉnh ảnh trên shopee</a></span></li>
                                <li><span><a href='https://support.sapo.vn/tong-quan-ban-hang-tren-shopee' target="_blank">
                                    Hướng dẫn cách quản lý ảnh hiệu quả với Sapo Editor</a></span></li>
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
                                    {lockIcon}
                                </span>
                            </div>
                            <div id='shop-info'>
                                <div>
                                    <i className="fa fa-globe" aria-hidden="true"></i>
                                    {status} 
                                    <span> {localStorage.getItem('shop-name')}</span>
                                </div>
                                <div className='link-shop'>
                                    <a href={'https://shopee.vn/shop/'+this.state.shop_id} target="_blank">
                                        {'https://shopee.vn/shop/'+this.state.shop_id}
                                    </a>
                                </div>
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