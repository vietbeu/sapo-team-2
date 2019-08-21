import React, { Component } from 'react';
import '../css/filter.css'
import ListCategories from './list-categoties';

class FilterCondition extends Component {
    state = { 
        shopeeStatus:false,
        categories:false,
     }
    
    handleChangeSelectLv1=(e)=>{
        let option = e.target.value;
        if (option == 1) this.setState({shopeeStatus:true,categories:false});
        if (option == 2) this.setState({shopeeStatus:false,categories:true});
    }

    changeCategory=(list,lv1,lv2,lv3)=>{
        this.props.onChangeCategory(list,lv1,lv2,lv3);
    }
    changeStatusFilter=(e)=>{
        let option = e.target.value;
        this.props.onChangeStatusFilter(option);
        console.log(option);
    }
    render() { 
        let shopeeStatus,categories;
        if (this.state.shopeeStatus=== true) shopeeStatus=(
            <select onChange={this.changeStatusFilter}>
                <option hidden>Chọn điều kiện lọc</option>
                <option value='NORMAL'>Hiển thị</option>
                <option value='UNLIST'>Ẩn</option>
                <option value='BANNED'>Khoá</option>
                <option value='DELETED'>Đã xoá</option>
            </select>
        ) ; else shopeeStatus=null;
        if (this.state.categories === true) categories =<ListCategories onChangeCategory={this.changeCategory}/>
        else categories = null;
        
        return (
            <div className='filter-form'>
                <div id='filte-form-content'>
                <label>Hiển thị sản phẩm theo</label>
                <select onChange={this.handleChangeSelectLv1}>
                    <option hidden>Chọn điều kiện lọc</option>
                    <option value={1}>Trạng thái trên Shopee</option>
                    <option value={2}>Danh mục sản phẩm</option>
                </select>
                {shopeeStatus}
                {categories}
                </div>
            </div>
          );
    }
}
 
export default FilterCondition;