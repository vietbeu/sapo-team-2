import React, { Component } from 'react';
import ListCategories from './list-categoties';
export const listFilterCondition=['Trạng thái trên Shopee','Danh mục sản phẩm'];

class FilterConditionRow extends Component {
    state = { 
        shopeeStatus:false,
        categories:false,
        showNextConditionRow:false,
    }
    componentWillUnmount(){
        this.props.onReset();
    }
    handleChangeSelectLv0=(e)=>{
        let option = e.target.value;
        if (option == 'Trạng thái trên Shopee') {this.setState({shopeeStatus:true,categories:false});}
        if (option == 'Danh mục sản phẩm') {this.setState({categories:true,shopeeStatus:false});}
        this.props.onChooseCondition(option,this.props.rowIndex);
    }
    changeCategory=(list,lv1,lv2,lv3)=>{
        this.props.onChangeCategory(list,lv1,lv2,lv3);
    }
    changeStatusFilter=(e)=>{
        let option = e.target.value;
        this.props.onChangeStatusFilter(option);
    }
    handleDelCondition=(e)=>{
        let condition=e.target.getAttribute('value');
        if (condition ===listFilterCondition[0]) this.setState({shopeeStatus:false});
        if (condition ===listFilterCondition[1]) this.setState({categories:false});
        this.props.onDelCondition(condition);
    }
    render() { 
        let shopeeStatus,categories;
        if (this.state.shopeeStatus=== true) (
            shopeeStatus=(
            <span>
                <select className='filter-detail' onChange={this.changeStatusFilter}>
                    <option hidden>Chọn điều kiện lọc</option>
                    <option value='NORMAL'>Hiển thị</option>
                    <option value='UNLIST'>Ẩn</option>
                    <option value='BANNED'>Khoá</option>
                    <option value='DELETED'>Đã xoá</option>
                </select>
            </span>
        )) ; else shopeeStatus=null;
        if (this.state.categories === true) 
            categories =<ListCategories className='filter-detail'onChangeCategory={this.changeCategory}/>
        else categories = null;
        let defaultOption;
        if  (this.state.shopeeStatus === true) defaultOption=<option value={listFilterCondition[0]}>{listFilterCondition[0]}</option>;
        else if (this.state.categories=== true) defaultOption=<option value={listFilterCondition[1]}>{listFilterCondition[1]}</option>;
        else defaultOption=<option hidden>Chọn điều kiện lọc</option>
        let filterConditionChosen=this.props.filterConditionChosen,i;
        let optionRows=listFilterCondition.map(x=>{
            for ( i=0;i<filterConditionChosen.length;i++)
                if (filterConditionChosen[i]===x) return null;
                return <option value={x} key={x}>{x}</option>
        })
        let type;
        if(this.state.shopeeStatus === true) type=listFilterCondition[0];
        else if (this.state.categories === true) type=listFilterCondition[1];
        return (
            <div className='filter-row'>
            <span>
                <select onChange={this.handleChangeSelectLv0}>
                    {defaultOption}
                    {optionRows}
                    {/* <option value={0}>Trạng thái trên Shopee</option>
                    <option value={1}>Danh mục sản phẩm</option> */}
                </select>    
            </span> 
            <span>
            {shopeeStatus}
            {categories}
            </span><i className="fa fa-trash" aria-hidden="true" value={type} onClick={this.handleDelCondition}></i>
            </div>     
          );
    }
}
 
export default FilterConditionRow;