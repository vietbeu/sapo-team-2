import React, { Component } from 'react';
import '../css/product.css';
import '../css/table.css'
import ProductItem from './product-item';
import Pagination from './pagination';

const newsList = [
    {
      "id": "abc01",
      "title": "The Highs and Lows of Life as a Black Editor in Chief",
      "content": "ct1"
    },
    {
      "id": "abc02",
      "title": "The Real Reason Apple Wants You to Use Its Sign-in Service",
      "content": "ct2"
    },
    {
      "id": "abc03",
      "title": "Men Need To Think More About Fertility",
      "content": "ct3"
    },
    {
      "id": "abc04",
      "title": "Reactive Streams and Kotlin Flows",
      "content": "ct4"
    },
    {
      "id": "abc05",
      "title": "The Incredible Creative Power of the Index Card",
      "content": "ct5"
    },
    {
      "id": "abc06",
      "title": "The Man Who Helped the Beatles Admit It’s Getting Better",
      "content": "ct6"
    },
    {
      "id": "abc07",
      "title": "Facebook Can Resolve Its Issues — How Will We Resolve Ours?",
      "content": "ct7"
    },
    {
      "id": "abc08",
      "title": "The Personal Newsletter Fad Needs to End",
      "content": "ct8"
    },
    {
      "id": "abc09",
      "title": "How Do You Know You Have a Good Idea?",
      "content": "ct9"
    },
    {
      "id": "abc10",
      "title": "Ronaldo & Messi",
      "content": "ct10"
    }
  ]
class BodyProDuct extends Component {
    state = { 
        currentPage:1,
        itemPerPage:3,
     }
    choosePage=(e)=>{
        this.setState({})
    }
    getItemPerPage = x => {
        this.setState({itemPerPage:x})
    }
    render() { 
        const currentPage = this.state.currentPage;
        const itemPerPage = this.state.itemPerPage;
        const indexOfLastItem = currentPage * itemPerPage;
        const indexOfFirstItem = indexOfLastItem - itemPerPage;
        const currentList = newsList.slice(indexOfFirstItem, indexOfLastItem);
        const renderList = currentList.map((x, index) => {
            return <ProductItem id={index + 1 + (currentPage - 1)*itemPerPage} key={index} data={x} />;
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
                                        <th id='column-set'>Thao tác</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {renderList}
                                </tbody>
                            </table>
                            <Pagination onChangeItemPerPage={this.getItemPerPage}/>
                        </div>
                    </div>
                 </div>
                 <div className='footer-align'></div>


            </div>
         );
    }
}
 
export default BodyProDuct;