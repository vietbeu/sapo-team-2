import React, { Component } from 'react';
import '../css/product.css';
import '../css/table.css'
import ProductItem from './product-item';
import Pagination from './pagination';
import {API_Shopee} from './API';
import {partner_id, URL_GetItemsList, URL_GetItemDetail} from './const';
import Swal from 'sweetalert2';

class BodyProDuct extends Component {
    state = { 
        currentPage:1,
        itemPerPage:20,
        listItems:[],
        listItemsDetail:[],
        shop_id:205134,
        searchKey:'',
        listCheckBox:[],
     }
    componentDidMount(){
      this.getProductItem();
    }

    async getProductItem(){
      let shopid=this.state.shop_id;
      let timestamp = Date.now() / 1000 | 0;
      let more=true;
      let offset=0;
      let URL_getItemsList = URL_GetItemsList;
      let URL_getItemDetail = URL_GetItemDetail;
      
      let listItems=[]; let listItemsDetail=[];
      while(more){
        let body_getItemList = '{"partner_id": '+partner_id+', "shopid": '+shopid+', "timestamp": '+timestamp+
                            ',"pagination_offset": '+offset+', "pagination_entries_per_page": '+100+'}';
        listItems= await API_Shopee(URL_getItemsList, body_getItemList);
        offset+=100;
        more =listItems.data.more;
        listItems.data.items.map(async x =>{
          let body_getItemDetail = '{"partner_id": '+partner_id+', "shopid": '+shopid+', "timestamp": '+timestamp+
                                    ',"item_id": '+x.item_id+'}';
          let itemsDetail = await API_Shopee(URL_getItemDetail, body_getItemDetail);
          await listItemsDetail.push(itemsDetail.data);
          //console.log(listItemsDetail);
        })
      this.setState((prevState,props)=>{ return {listItemsDetail: listItemsDetail}});
    }
      //this.setState({listItemsDetail: listItemsDetail});
    }
    changeShop = (e) => {
      this.setState({shop_id:e.target.value});
      this.getProductItem();
      console.log(this.state.shop_id)
    }
  
    getItemPerPage = x => {
        this.setState({itemPerPage:x})
        this.setState({currentPage:1})
    }

    changePage = (index) =>{
      this.setState({currentPage:index});
    }

    changeSearchBar = (e) =>{
      this.setState({searchKey: e.target.value});
      this.searchResult(e.target.value);
    }
    searchResult = (k) => {
      let key=this.convertString(k);
      let searchResultList=[];let curList= this.state.listItemsDetail;
      curList.map(x => {
          if( this.convertString(x.item.name).indexOf(key)>=0 || this.convertString(x.item.item_sku).indexOf(key)>=0 
          || this.convertString(x.item.status).indexOf(key)>=0 ) searchResultList.push(x);
      });
      this.setState({searchList:searchResultList});  
    }
    convertString(str) {
      str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ|À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "a");
      str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ|È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "e");
      str = str.replace(/ì|í|ị|ỉ|ĩ|Ì|Í|Ị|Ỉ|Ĩ/g, "i");
      str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ|Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "o");
      str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ|Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "u");
      str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ|Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "y");
      str = str.replace(/đ|Đ/g, "d");
      str.toLowerCase();
      return str;
  }

  handleSelectProduct=(box)=>{
    let checkBox=this.state.listCheckBox;
    let itemId = box.value;
    if (box.checked && checkBox.indexOf(itemId)<0) {
      checkBox.push(itemId);
      this.setState({listCheckBox: checkBox});
    }
    else if (!box.checked){
      let i= checkBox.indexOf(itemId);
      if(i>=0) checkBox.splice(i,1);
      this.setState({listCheckBox:checkBox})
    };
  }
  selectAllProduct=(e)=>{
    let checkBoxes= document.getElementsByName('checkbox');
    for (let i=0; i<checkBoxes.length; i++){
      checkBoxes[i].checked=e.target.checked;
      this.handleSelectProduct(checkBoxes[i]);
    }
  }

    render() { 
        let listShop=JSON.parse(localStorage.getItem('listShop'));
        const currentPage = this.state.currentPage;
        const itemPerPage = this.state.itemPerPage;
        const indexOfLastItem = currentPage * itemPerPage;
        const indexOfFirstItem = indexOfLastItem - itemPerPage;
        let   listItemsDetail = this.state.listItemsDetail;
        let activeList=[];
        if(this.state.searchKey==='' || this.state.searchKey=== null)  activeList=listItemsDetail;
        else activeList=this.state.searchList;
        let numOfItem=activeList.length;
        const numOfPage = Math.ceil(activeList.length / itemPerPage);
        const currentList = activeList.slice(indexOfFirstItem, indexOfLastItem);
        const renderList = currentList.map((x) => {
            return <ProductItem key={x.item.item_id} data={x} onSelectProduct={this.handleSelectProduct} />;
          });
        const listSelectShop = listShop.map(x=><option value={x.shop_id} key={x.shop_id}>{x.name}</option>);

        let thRow;
        if(this.state.listCheckBox.length>0) thRow=(
          <>
          <th id='bulk-action' colSpan='6'>
            <div id='checkbox-row'>
            <input type='checkbox' onClick={this.selectAllProduct}/>
            <span>{'Đã chọn '+this.state.listCheckBox.length+' danh mục'}</span>
            <select>
              <option hidden>Chọn thao tác</option>
              <option>Thay thế hình ảnh</option>
              <option>Cập nhật lên Shopee</option>
              <option>Xoá sản phẩm</option>
            </select>  
            </div>  
          </th>
          </>
        );else thRow=(
          <>
            <th id='bulk-action'>
              <div id='checkbox-icon'>
              <input type='checkbox' onClick={this.selectAllProduct}/>
              </div>
            </th>
            <th id='column-sku'>Mã SKU</th>
            <th id='column-product-img'>Ảnh sản phẩm</th>
            <th id='column-product-name'>Sản phẩm</th>
            <th id='column-shopee-status'>Trạng thái trên Shopee</th>
            <th id='column-update-status'>Trạng thái cập nhật</th>
          </>
        );      

        return ( 
            <div id='product-overview-content'>
                <div id='select-acc'>
                    <select onChange={this.changeShop}>
                        {listSelectShop}
                    </select>
                 </div>
                 <div className='product-table'>
                     <div className='product-tb-content'>
                        <div className='search-bar'>
                            <span id='icon-search'><i className="fa fa-search" aria-hidden="true"></i></span>
                            <span><input onChange={this.changeSearchBar} type='text' placeholder='Tìm kiếm sản phẩm'></input></span>
                        </div>
                        <div className='tb-product-content'>
                            <table>
                                <thead>
                                    <tr>
                                       {thRow} 
                                    </tr>
                                </thead>
                                <tbody>
                                    {renderList}
                                </tbody>
                            </table>
                            <Pagination onChangeItemPerPage={this.getItemPerPage} numOfPage={numOfPage}
                              onChangePage={this.changePage} firstItem={indexOfFirstItem} lastItem={indexOfLastItem}
                              numOfItem={numOfItem} currentPage={currentPage}/>
                        </div>
                    </div>
                 </div>
                 <div className='footer-align'></div>
            </div>
         );
    }
}
 
export default BodyProDuct;