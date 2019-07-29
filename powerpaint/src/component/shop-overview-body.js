import React, { Component } from 'react';
import '../css/shop-overview.css';

class BodyShopOverView extends Component {
    state = {  }
    render() { 
        return (
            <>
            <div id='title-overview-table'>Thông tin chi tiết gian hàng abcxyz </div>
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
                                    Đang kết nối 
                                    <span> baotrangbayby99</span>
                                </div>
                                <div className='link-shop'>https://shopee.vn/shop/94115363</div>
                                <div>(Ngày kết nối: 15/01/2019 10:40) </div>
                            </div>
                        </div>
                        <div id='right-tb-footer'>
                            <button>Gỡ bỏ tài khoản này</button>
                        </div>
                    </div>
                </div>
            </div>
            </>
          );
    }
}
 
export default BodyShopOverView ;