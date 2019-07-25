import React, { Component } from 'react';
import Header from '../component/header';
import '../css/shopeeheader.css'
import Table from '../component/overview-table';
class ShopeeOverview extends Component {
    state = {  }
    render() { 
        let text = (
            <>
                <span className='header-text'>
                    <div><i className="fa fa-angle-double-left fa-2x" aria-hidden="true"></i></div>
                    <div id='logo-shopee'></div>
                    <div id='location'>KÊNH SHOPEE/ Tổng quan</div>
                </span>
                <span id='header-button'>
                    <button>Thêm gian hàng</button>
                </span>
            </>
        )
        return (
            <>
                <div className='header' >
                    <Header isShowMenu={this.showMenuDialog} text={text}/>
                </div>
                <div>
                    <Table/>
                </div>
            </>
          );
    }
}
 
export default ShopeeOverview;