import React, { Component } from 'react';
import {serverIP,port,partner_id} from './const';
import Axios from 'axios';

class ListCategories extends Component {
    state = {  
        listCategories:JSON.parse(localStorage.getItem('list-categories')),
        lv1:'',lv2:'',lv3:'',
        isHiddenLv2:true,isHiddenLv3:true,
    }

    handleChangeCateLv1=(e)=>{
        let category=JSON.parse(e.target.value);
        this.setState({lv1: category.category_id,lv2:'',lv3:'',isHiddenLv2:false,isHiddenLv3:true});
        this.props.onChangeCategory(this.state.listCategories,category.category_id,'','',category.category_name);
    }
    handleChangeCateLv2=(e)=>{
        let category=JSON.parse(e.target.value);
        this.setState({lv2:category.category_id,isHiddenLv3:false});
        this.props.onChangeCategory(this.state.listCategories,this.state.lv1,category.category_id,'',category.category_name);
    }
    handleChangeCateLv3=(e)=>{
        let category=JSON.parse(e.target.value);
        this.props.onChangeCategory(this.state.listCategories,this.state.lv1,this.state.lv2,category.category_id,category.category_name);
    }
    
    render() { 
        let listCategories=this.state.listCategories;
        let lv1=this.state.lv1;
        let lv2=this.state.lv2;
        let categoriesLv1=[],categoriesLv2=[],categoriesLv3=[];
        let isHiddenLv2 = this.state.isHiddenLv2, isHiddenLv3=this.state.isHiddenLv3;
        let boxLv2,boxLv3;
        
        listCategories.map(x => {
            if (x.parent_id ===0) categoriesLv1.push(x);
            })
        let listCateLv1=categoriesLv1.map(x => <option value={JSON.stringify(x)} key ={x.category_id}>{x.category_name}</option> );
        let listCateLv2=[], listCateLv3=[];
        listCategories.map(x => {
            if (x.parent_id ==lv1) categoriesLv2.push(x);
        })
        listCateLv2=categoriesLv2.map(x => <option value={JSON.stringify(x)} key ={x.category_id}>{x.category_name}</option> )
        listCategories.map(x => {
            if (x.parent_id ==lv2) categoriesLv3.push(x);
        })
        listCateLv3=categoriesLv3.map(x => <option value={JSON.stringify(x)} key ={x.category_id}>{x.category_name}</option> )

        if (isHiddenLv2 === false) boxLv2 = (
            <select onChange={this.handleChangeCateLv2}>
                <option hidden>Chọn danh mục</option>
                {listCateLv2}
            </select>
        ); else boxLv2=null;
        if (isHiddenLv3 === false) boxLv3 = (
            <select  onChange={this.handleChangeCateLv3}>
                <option hidden>Chọn danh mục</option>
                {listCateLv3}
            </select>
        ); else boxLv3 =null;

        return (
            <>
            <select onChange={this.handleChangeCateLv1}>
                <option hidden>Chọn danh mục</option>
                {listCateLv1}
            </select>
            {boxLv2}
            {boxLv3}
            </>
          );
    }
}
 
export default ListCategories;
