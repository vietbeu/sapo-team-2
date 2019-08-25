import React, { Component } from 'react'; 
import '../css/list-selected-products.css'
import Pagination from './pagination';

class ListProductSelected extends Component {
    state = {
        listProductSelected: this.props.listProductSelected,
        currentPage:1,
        itemPerPage:3,  
      }

    changePage = (index) =>{
      this.setState({currentPage:index});
    }
    handleClickDelItem=(e)=>{
        let item_id=e.target.getAttribute('value');
        let listProductSelected=this.state.listProductSelected;
        for (let i=0;i<listProductSelected.length;i++)
            if (listProductSelected[i].item.item_id == item_id) {listProductSelected.splice(i,1);console.log(i);break;}
        this.setState({listProductSelected:listProductSelected});
        this.props.onDelProductSelected(listProductSelected,item_id);
    }
    render() { 
        let listShop=JSON.parse(localStorage.getItem('listShop'));
        let listProductSelected = this.state.listProductSelected;
        const currentPage = this.state.currentPage;
        const itemPerPage = this.state.itemPerPage;
        const indexOfLastItem = currentPage * itemPerPage;
        const indexOfFirstItem = indexOfLastItem - itemPerPage;
        let numOfItem=listProductSelected.length;
        const numOfPage = Math.ceil(listProductSelected.length / itemPerPage);
        const currentList = listProductSelected.slice(indexOfFirstItem, indexOfLastItem);
        let rows =currentList.map ( x => {
            let shopName;
            let altImg,imgsText;
            for ( let i=0; i< listShop.length; i++){
                if (listShop[i].shop_id == x.shop_id) shopName=listShop[i].name;
                let images = x.item.images; 
                if (images.length>1 ) altImg = <img className='alt-img' src ={x.item.images[1]} alt='img'/>;
                else altImg = null;
                if (images.length>2) {
                    let num = images.length-2;
                    imgsText=<span className='imgs-text'>{'Còn '+num+' ảnh sản phẩm'}</span>;
                }
            }
            return (
            <>
            <tr className='data-row' key={x.item.item_id}>
                <td className='column-sku'>{shopName}</td>
                <td className='column-product-img' >
                    <img  width ='30%'src ={x.item.images[0]} alt='img'/>
                        <span>
                            {altImg}
                            {imgsText}
                        </span>
                </td>
                <td className='column-product-name' >{x.item.name}</td>
                <td className='column-del' value={x.item.item_id} onClick={this.handleClickDelItem}>
                    <i value={x.item.item_id} className="fa fa-trash" aria-hidden="true"></i>
                </td>
            </tr>  
            </>
        )}
        )
        return ( 
            <div id='popup-list-product-content'>
                <div id='plpc-header'>Danh sách sản phẩm đã được lựa chọn</div>
                <table>
                    <thead>
                        <th id='cl-shopname'>Tên gian hàng</th>
                        <th id='cl-imgs'>Ảnh sản phẩm</th>
                        <th id='cl-productname'>Tên sản phẩm</th>
                        <th id='cl-del'>Thao tác</th>
                    </thead>
                    <tbody>
                    {rows}
                    </tbody>
                </table>
                <div id='plpc-footer'>
                <Pagination numOfPage={numOfPage}
                    onChangePage={this.changePage} firstItem={indexOfFirstItem} lastItem={indexOfLastItem}
                    numOfItem={numOfItem} currentPage={currentPage} hideFooterMiddle={true}/>
                </div>
                <div id='plpc-footer-align'></div>
            </div>
         );
    }
}
 
export default ListProductSelected;