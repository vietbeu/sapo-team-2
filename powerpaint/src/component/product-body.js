import React, { Component } from 'react';
import '../css/product.css';
import '../css/table.css'
import ProductItem from './product-item';
import Pagination from './pagination';
import {API_Shopee} from './API';
import {partner_id} from './const';

class BodyProDuct extends Component {
    state = { 
        currentPage:1,
        itemPerPage:3,
        listItemsDetail:[],
     }
    async componentDidMount(){
      let shopid=205134;
      let timestamp = Date.now() / 1000 | 0;
      let URL_getItemsList = 'https://partner.uat.shopeemobile.com/api/v1/items/get';
      let body_getItemList = '{"partner_id": '+partner_id+', "shopid": '+shopid+', "timestamp": '+timestamp+
                            ',"pagination_offset": '+1+', "pagination_entries_per_page": '+100+'}';
      let listItems=[]; let listItemsDetail=[];
      await API_Shopee(URL_getItemsList, body_getItemList)
      .then (res=>{
        console.log(res.data.items);
        listItems=res.data.items;
        this.setState({listItems: res.data.items})
      })
      .catch((e)=> console.log(e));
      let URL_getItemDetail = 'https://partner.uat.shopeemobile.com/api/v1/item/get';
      await listItems.map(x =>{
        let body_getItemDetail = '{"partner_id": '+partner_id+', "shopid": '+shopid+', "timestamp": '+timestamp+
                                  ',"item_id": '+x.item_id+'}';
        API_Shopee(URL_getItemDetail, body_getItemDetail)
        .then (res=>{
          listItemsDetail.push(res.data);
        })
      })
      
      this.setState({listItemsDetail: listItemsDetail});
    }
  
    getItemPerPage = x => {
        this.setState({itemPerPage:x})
    }

    changePage = (index) =>{
      this.setState({currentPage:index});
    }

    
    render() { 
        
        const currentPage = this.state.currentPage;
        const itemPerPage = this.state.itemPerPage;
        const indexOfLastItem = currentPage * itemPerPage;
        const indexOfFirstItem = indexOfLastItem - itemPerPage;
        let   listItemsDetail = this.state.listItemsDetail;
        const numOfPage = Math.ceil(listItemsDetail.length / itemPerPage);
        const currentList = listItemsDetail.slice(indexOfFirstItem, indexOfLastItem);
        const renderList = currentList.map((x) => {
            return <ProductItem key={x.item.item_id} data={x} />;
          });
        return ( 
            <div id='product-overview-content'>
                <div id='select-acc'>
                    <select>
                        <option>baotrangbaby</option>
                        <option>baotrangbaby</option>
                        <option>baotrangbaby</option>
                    </select>
                 </div>
                 <div className='product-table'>
                     <div className='product-tb-content'>
                        <div className='search-bar'>
                            <span id='icon-search'><i className="fa fa-search" aria-hidden="true"></i></span>
                            <span><input type='text' placeholder='Tìm kiếm sản phẩm'></input></span>
                        </div>
                        <div className='tb-product-content'>
                            <table>
                                <thead>
                                    <tr>
                                        <th id='column-sku'>Mã SKU</th>
                                        <th id='column-product-img'>Ảnh sản phẩm</th>
                                        <th id='column-product-name'>Sản phẩm</th>
                                        <th id='column-shopee-status'>Trạng thái trên Shopee</th>
                                        <th id='column-update-status'>Trạng thái cập nhật</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {renderList}
                                </tbody>
                            </table>
                            <Pagination onChangeItemPerPage={this.getItemPerPage} numOfPage={numOfPage}
                              onChangePage={this.changePage}/>
                        </div>
                    </div>
                 </div>
                 <div className='footer-align'></div>


            </div>
         );
    }
}
 
export default BodyProDuct;