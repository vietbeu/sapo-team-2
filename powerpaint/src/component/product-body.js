import React, { Component } from 'react';
import '../css/product.css';
import '../css/table.css'
import ProductItem from './product-item';
import Pagination from './pagination';
import {API_Shopee} from './API';
import {partner_id, URL_GetItemsList, URL_GetItemDetail,serverIP,port} from './const';
import Axios from 'axios';
import Swal from 'sweetalert2';
import ListCategories from './list-categoties';
import Popup from 'reactjs-popup';
import ListProductSelected from './list-product-selected';
import FilerCondition from './filter-condition';
import {listFilterCondition} from './filter-conditon-row';


class BodyProDuct extends Component {
    state = { 
        currentPage:1,
        itemPerPage:20,
        listItems:[],
        listItemsDetail:[],
       // shop_id:94115363,
        searchKey:'',
        listCheckBox:[],
        searchList:[],
        maxImg : 0,
        listUpdatedItem:[],
        onFilter:false,
     }
    componentDidMount(){
      let listShop = JSON.parse(localStorage.getItem('listShop'));
      console.log(listShop[0].shop_id);
      this.setState({shop_id: listShop[0].shop_id});
      this.getProductItem(listShop[0].shop_id);
      this.getUpdatedItems(listShop[0].shop_id);
    }

    async getProductItem(shopid){
      let timestamp = Date.now() / 1000 | 0;
      let more=true;
      let offset=0;
      // let URL_getItemsList = URL_GetItemsList;
      // let URL_getItemDetail = URL_GetItemDetail;    
      let listItems=[]; let listItemsDetail=[];
      while(more){
        // let body_getItemList = '{"partner_id": '+partner_id+', "shopid": '+shopid+', "timestamp": '+timestamp+
        //                     ',"pagination_offset": '+offset+', "pagination_entries_per_page": '+100+'}';
        //listItems= await API_Shopee(URL_getItemsList, body_getItemList);
        listItems= await Axios.get('http://'+serverIP+':'+port+'/api/v1/test/getItemList?offset='+offset+'&shopid='+shopid+'&entries='+100)
        offset+=100;
        more =listItems.data.more;
        listItems.data.items.map(async x =>{
          // let body_getItemDetail = '{"partner_id": '+partner_id+', "shopid": '+shopid+', "timestamp": '+timestamp+
          //                           ',"item_id": '+x.item_id+'}';
          //let itemsDetail = await API_Shopee(URL_getItemDetail, body_getItemDetail);
        let itemsDetail = await Axios.get('http://'+serverIP+':'+port+'/api/v1/test/getItemDetail?item_id='+x.item_id+'&shopid='+shopid);
          await listItemsDetail.push(itemsDetail.data);
          //console.log(listItemsDetail);
          this.setState((prevState,props)=>{ return {listItemsDetail: listItemsDetail}});
        })
      }
    }
    getUpdatedItems=(shop_id)=>{
      let listUpdatedItem=[];
      const authen = 'Bearer '+localStorage.getItem('token');
      Axios.get('http://' + serverIP + ':'+port+'/api/v1/products?shopid='+shop_id,
          {headers: {
              'Authorization': authen,
          }}) 
      .then ( rsp => {
        listUpdatedItem=rsp.data;
        console.log(listUpdatedItem);
        this.setState({listUpdatedItem:listUpdatedItem});
      } )    
    }
    changeShop = (e) => {
      this.setState({shop_id:e.target.value,onFilter:false});
      this.getProductItem(e.target.value);
      this.getUpdatedItems(e.target.value);
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
      let key=this.convertString(k);console.log(key);
      let searchResultList=[];let curList= this.state.listItemsDetail;
      curList.map(x => {
        console.log(this.convertString(x.item.status).indexOf(key));
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
      return str.toLowerCase();
  }

  handleSelectProduct=(box)=>{
    let checkBoxes=this.state.listCheckBox;
    let item = JSON.parse(box.value);
    let maxImg = this.state.maxImg;
    let numImg = item.images.length;
    let numImgs=[]; let check=0;
    if (box.checked && checkBoxes.indexOf(item)<0) {
      for (let i=0 ; i< checkBoxes.length ; i++)
        if (checkBoxes[i].item.item_id == item.item_id) {check+=1;break}
      if (check===0){
        checkBoxes.push({item:item,shop_id:this.state.shop_id});
        if (numImg > maxImg) { maxImg=numImg;this.setState({maxImg:numImg});}
        this.setState({listCheckBox: checkBoxes});
      }
    }
    else if (!box.checked){
      //let i= checkBoxes.indexOf({item:item,shop_id:this.state.shop_id});
      for (let i=0 ; i< checkBoxes.length ; i++){
        console.log(checkBoxes[i].item.item_id);
        if (checkBoxes[i].item.item_id == item.item_id) {console.log(i);
        checkBoxes.splice(i,1);
        break;}
      }
      // console.log(checkBoxes); 
      // console.log(item); 
      // console.log(i);
      // if(i>=0) checkBoxes.splice(i,1);
      if (numImg == maxImg) {
        checkBoxes.map( x => {
          numImgs.push(x.item.images.length);
        })
        maxImg = Math.max(...numImgs);
      }
      this.setState({listCheckBox:checkBoxes})
    };
    console.log(maxImg);
  }
  selectAllProduct=(e)=>{
    let checkBoxes= document.getElementsByName('checkbox');
    for (let i=0; i<checkBoxes.length; i++){
      checkBoxes[i].checked=e.target.checked;
      this.handleSelectProduct(checkBoxes[i]);
    }
  }
  removeSelectedProduct=(list)=>{
    this.setState({listCheckBox:list});
  }
  handleChageOperation=(e)=>{
    let option = e.target.value;
    if (option == 1) {this.updateToShopee();}
    if (option == 0) this.deleteProduct();
    if (option == 2) this.chooseImgsForProducts();
  }
  updateToShopee=()=>{
    let listFail=[];
    Swal.fire({
      title: 'Bạn đã chắc chắn chưa?',
      text: "Chúng tôi sẽ cập nhật hình ảnh của tất cả sản phẩm bạn đã chọn",
      type: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'OK'
    })
    .then((result) => {
      if (result.value) {
        let listCheckBox = this.state.listCheckBox;
        console.log(listCheckBox);
        let listImgsSelected = JSON.parse(localStorage.getItem('listImgsSelected'));
        for (let i=0;i<listCheckBox.length;i++){
          let item_id = listCheckBox[i].item_id;
          let shop_id = this.state.shop_id;
          const authen = 'Bearer '+localStorage.getItem('token');
          Axios.post('http://' + serverIP + ':'+port+'/api/v1/test/updateItemImg',{
            partner_id:partner_id,
            shopid:shop_id,
            item_id:item_id,
            images:listImgsSelected,
          },{headers: {'Authorization': authen,}})
          .then (rsp => {
            if (rsp.data.error == null) console.log(1);
            else listFail.push(item_id)})
          .catch(error => 
            Swal.fire('Fail!','Đã có lỗi xảy ra! Cập nhật ảnh thất bại','error')
            )      
        }
        console.log(listFail);
        if (listFail.length==0)  Swal.fire('Thành công', 'Cập nhật ảnh các sản phẩm thành công','success')    
      }
    })  
  }
  chooseImgsForProducts=()=>{
    localStorage.setItem('products-selected',JSON.stringify(this.state.listCheckBox));
    localStorage.setItem('max-imgs',9 - this.state.maxImg);
    window.location.href='/gallery';
  }
  showFilterResult=(listCategories,lv1,lv2,lv3,shopeeStatus,filterChosen)=>{
    if(filterChosen.length>0 && (arr.indexOf(lv1) <0 || arr.indexOf(shopeeStatus)<0)){
      let listResult=[];
      if (filterChosen.indexOf(listFilterCondition[1])>=0){
        listResult=this.showCategoryFilterResult(listCategories,lv1,lv2,lv3);
        if (filterChosen.indexOf(listFilterCondition[0])>=0){
          listResult=this.showStatusFilterResult(shopeeStatus,listResult);
        }
      }
      else if (filterChosen.indexOf(listFilterCondition[0])>=0) {
        listResult= this.showStatusFilterResult(shopeeStatus,this.state.listItemsDetail);
      }
      if (listResult.length<=0) Swal.fire('','Không có sản phẩm nào thoả mãn','info')
    }else this.setState({onFilter:false});
  }
  showCategoryFilterResult=(listCategories,lv1,lv2,lv3)=>{
    let searchResultList=[];let curList= this.state.listItemsDetail;
    if(arr.indexOf(lv3)<0){
      curList.map(x => {
        if (x.item.category_id==lv3) searchResultList.push(x);
      });
    }
    else if (arr.indexOf(lv2)<0){
      let categoriesLv3=[];
      listCategories.map(x => {
        if (x.parent_id ==lv2) categoriesLv3.push(x);
      })
      for (let i=0; i<categoriesLv3.length;i++){
        curList.map(x => {
          if (x.item.category_id==categoriesLv3[i].category_id) searchResultList.push(x);
        });
      }
    }
    else if (arr.indexOf(lv1)<0){
      let categoriesLv3=[],categoriesLv2=[];
      listCategories.map(x => {
        if (x.parent_id ==lv1) categoriesLv2.push(x);
      })
      for (let i=0; i<categoriesLv2.length;i++){
        listCategories.map(x => {
          if (x.parent_id ==categoriesLv2[i].category_id) categoriesLv3.push(x);
        })
      }
      for (let i=0; i<categoriesLv3.length;i++){
        curList.map(x => {
          // console.log(x.item.category_id);
          // console.log(categoriesLv3[i]);
          if (x.item.category_id==categoriesLv3[i].category_id) searchResultList.push(x);
        });
      }
    }else searchResultList=this.state.listItemsDetail;
    this.setState({searchList:searchResultList}); 
    console.log(searchResultList);
    return searchResultList;
  }
  showStatusFilterResult=(status,list)=>{
    let searchResultList=[];
    if (arr.indexOf(status)<0){
      // let curList= this.state.listItemsDetail;
      let curList=list;
      curList.map(x => {
          if(x.item.status === status) searchResultList.push(x);
      });
      this.setState({searchList:searchResultList});    
    } 
    return searchResultList;  
  }
  turnOnFilter=()=>{
    this.setState({onFilter:true});
  }
  turnOffFilter=()=>{
    this.setState({onFilter:false});
  }

    render() { 
      let listShop=JSON.parse(localStorage.getItem('listShop'));
      const currentPage = this.state.currentPage;
      const itemPerPage = this.state.itemPerPage;
      const indexOfLastItem = currentPage * itemPerPage;
      const indexOfFirstItem = indexOfLastItem - itemPerPage;
      let   listItemsDetail = this.state.listItemsDetail;
      let activeList=[];
      console.log(this.state.searchList.length);
      if(this.state.onFilter===false && (this.state.searchKey==='' || this.state.searchKey=== null))  activeList=listItemsDetail;
      else activeList=this.state.searchList;
      let numOfItem=activeList.length;
      const numOfPage = Math.ceil(activeList.length / itemPerPage);
      const currentList = activeList.slice(indexOfFirstItem, indexOfLastItem);
      const renderList = currentList.map((x) => {
        return <ProductItem key={x.item.item_id} data={x} onSelectProduct={this.handleSelectProduct} listUpdatedItem={this.state.listUpdatedItem}
                    shop_id={this.state.shop_id} listCheckBox={this.state.listCheckBox}/>;
      });
      const listSelectShop = listShop.map(x=><option value={x.shop_id} key={x.shop_id}>{x.name}</option>);
        
      let thRowDefault = (
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
      )
      let thRow,listCheckBox=this.state.listCheckBox,count = 0; 
      if(this.state.listCheckBox.length>0) 
      for (let i=0;i<listCheckBox.length;i++)
        if (listCheckBox[i].shop_id== this.state.shop_id) count+=1;
      if (count >0)  
        thRow=(
          <>
          <th id='bulk-action' colSpan='6'>
            <div id='checkbox-row'>
            <input type='checkbox' onClick={this.selectAllProduct}/>
            <span>{'Đã chọn '+count+' sản phẩm'}</span>
            <select onChange={this.handleChageOperation}>
              <option hidden>Chọn thao tác</option>
              <option value={3}>Thêm hình ảnh sản phẩm</option>
              <option value={2}>Chọn hình ảnh</option>
              <option value={1}>Thay thế hình ảnh sản phẩm</option>
              <option value={0}>Xoá sản phẩm</option>
            </select>  
            </div>  
          </th>
          </>
        );else thRow = thRowDefault;
        
        let buttonShowSelectedItemList=null;
        if(this.state.listCheckBox.length>0) buttonShowSelectedItemList=(
          <Popup
                trigger={<button id="bt-show-selected-list"> Xem danh sách sản phẩm đã chọn </button>}
                modal
                closeOnDocumentClick
                contentStyle={{width: "75%",borderRadius:'6px',padding:'0%'}}
              >
                {close=>(
                <>
                <button className='exit-popup-bt' onClick={close}><i className="fa fa-times" aria-hidden="true"></i></button>
                <ListProductSelected listProductSelected={this.state.listCheckBox} onDelProductSelected={this.removeSelectedProduct}/>
                </>
                )}
          </Popup>   
        )
        let buttonTurnOffFilter=null;
        if(this.state.onFilter===true) buttonTurnOffFilter=(
          <button id='bt-off-filter' onClick={this.turnOffFilter}>
            <i className="fa fa-times" aria-hidden="true"></i>&nbsp;Đang lọc
          </button>)
        return ( 
          <>
            {buttonShowSelectedItemList}       
            <div id='product-overview-content'>
                <div id='select-acc'>
                    <select onChange={this.changeShop}>
                        {listSelectShop}
                    </select>
                    {/* <ListCategories onChangeCategory={this.showResult}/> */}
                 </div>
                 <div className='product-table'>
                     <div className='product-tb-content'>
                        <div className='search-bar'>
                          <Popup
                            trigger={<button id="bt-filter"> Lọc sản phẩm &nbsp;<i className="fa fa-caret-down" aria-hidden="true"></i></button>}
                            position="bottom left"
                            on="click"
                            contentStyle={{width:'auto',marginLeft:'0vw',marginTop:'1%'}}
                          >
                            {close =>(
                            <>
                            <button className='exit-popup-bt' onClick={close}><i className="fa fa-times" aria-hidden="true"></i></button>
                            <FilerCondition onShowResult={this.showFilterResult} onTurnOnFilter={this.turnOnFilter}/>
                            </>
                            )}
                          </Popup>                                    
                          <span id='icon-search'><i className="fa fa-search" aria-hidden="true"></i></span>
                          <span><input onChange={this.changeSearchBar} type='text' placeholder='Tìm kiếm sản phẩm'></input></span>
                        </div>
                        {buttonTurnOffFilter}
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
                            <div className='tb-footer'>
                            <Pagination onChangeItemPerPage={this.getItemPerPage} numOfPage={numOfPage}
                              onChangePage={this.changePage} firstItem={indexOfFirstItem} lastItem={indexOfLastItem}
                              numOfItem={numOfItem} currentPage={currentPage}/>
                            </div>
                        </div>
                    </div>
                 </div>
                 <div className='footer-align'></div>
            </div>
            </>
         );
    }
}
 
export default BodyProDuct;

const arr =[null,undefined,'']