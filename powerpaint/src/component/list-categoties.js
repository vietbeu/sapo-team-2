import React, { Component } from 'react';
import {serverIP,port,partner_id} from './const';
import Axios from 'axios';

class ListCategories extends Component {
    state = {  
        listCategories:JSON.parse(localStorage.getItem('list-categories')),
        lv1:'',lv2:'',lv3:'',
    }

    handleChangeCateLv1=(e)=>{
        this.setState({lv1: e.target.value,lv2:'',lv3:''});
        this.props.onChangeCategory(this.state.listCategories,e.target.value,'','');
    }
    handleChangeCateLv2=(e)=>{
        this.setState({lv2:e.target.value});
        this.props.onChangeCategory(this.state.listCategories,this.state.lv1,e.target.value,'');
    }
    handleChangeCateLv3=(e)=>{
        this.props.onChangeCategory(this.state.listCategories,this.state.lv1,this.state.lv2,e.target.value);
    }
    
    render() { 
        let listCategories=this.state.listCategories;
        let lv1=this.state.lv1;
        let lv2=this.state.lv2;
        let categoriesLv1=[],categoriesLv2=[],categoriesLv3=[];
        listCategories.map(x => {
            if (x.parent_id ===0) categoriesLv1.push(x);
            })
        let listCateLv1=categoriesLv1.map(x => <option value={x.category_id} key ={x.category_id}>{x.category_name}</option> );
        let listCateLv2=[], listCateLv3=[];
        listCategories.map(x => {
            if (x.parent_id ==lv1) categoriesLv2.push(x);
        })
        listCateLv2=categoriesLv2.map(x => <option value={x.category_id} key ={x.category_id}>{x.category_name}</option> )
        listCategories.map(x => {
            if (x.parent_id ==lv2) categoriesLv3.push(x);
        })
        listCateLv3=categoriesLv3.map(x => <option value={x.category_id} key ={x.category_id}>{x.category_name}</option> )
        return (
            <>
            <select onChange={this.handleChangeCateLv1}>
                <option hidden></option>
                {listCateLv1}
            </select>
            <select onChange={this.handleChangeCateLv2}>
                <option hidden></option>
                {listCateLv2}
            </select>
            <select  onChange={this.handleChangeCateLv3}>
                <option hidden></option>
                {listCateLv3}
            </select>
            </>
          );
    }
}
 
export default ListCategories;