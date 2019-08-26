import React, { Component } from 'react';
import '../css/filter.css'
import ListCategories from './list-categoties';
import FilterConditionRow from './filter-conditon-row';
import {listFilterCondition} from './filter-conditon-row';

class FilterCondition extends Component {
    state = { 
        numOfRow:0,
        filterConditionChosen:[],
        nextRow:false,
        listCate:[],
        shopeeStatus:'',
     }
    clearAllState=()=>{
        this.setState({
            numOfRow:0,
            filterConditionChosen:[],
            nextRow:false,
            listCate:[],
            lv1:'',lv2:'',lv3:'',
            shopeeStatus:'', 
        })
    }
    handleChooseCondition=(option,rowIndex)=>{
        let filterConditionChosen=this.state.filterConditionChosen;
        // if (filterConditionChosen.indexOf(option)<0) filterConditionChosen.push(option);
        filterConditionChosen[rowIndex]=option;
        this.setState({filterConditionChosen:filterConditionChosen});
        if (filterConditionChosen.length<listFilterCondition.length) this.setState({nextRow:true});
    }
    handleDelCondition=(condition)=>{
        let filterConditionChosen=this.state.filterConditionChosen;
        let index = filterConditionChosen.indexOf(condition);
        filterConditionChosen.splice(index,1);
        this.setState({filterConditionChosen:filterConditionChosen})
    }
    changeCategory=(list,lv1,lv2,lv3,cate_name)=>{
        this.setState({listCate:list,lv1:lv1,lv2:lv2,lv3:lv3,cate_name:cate_name});
    }
    changeStatusFilter=(option)=>{
        // this.props.onChangeStatusFilter(option);
        this.setState({shopeeStatus:option});
    }
    showResult=()=>{
        let listCate = this.state.listCate;
        let lv1=this.state.lv1;
        let lv2=this.state.lv2;
        let lv3=this.state.lv3;
        let shopeeStatus = this.state.shopeeStatus;
        let cate_name=this.state.cate_name;
        this.props.onShowResult(listCate,lv1,lv2,lv3,cate_name,shopeeStatus,this.state.filterConditionChosen);
        let arr=[undefined,null,''];
        if(arr.indexOf(lv1) <0 || arr.indexOf(shopeeStatus)<0)
            this.props.onTurnOnFilter();
        // this.props.onChangeCategory(listCate,lv1,lv2,lv3);
        // this.props.onChangeStatusFilter(this.state.option);
    }
    render() { 
        // let filterConditionRow,optionRows,nextRow;
        // optionRows=listFilterCondition.map(x => {
        //     if (this.state.filterConditionChosen.indexOf(listFilterCondition.indexOf(x)) >=0) return null;
        //     return <option value={listFilterCondition.indexOf(x)} key={x}>{x}</option>
        // })
        // filterConditionRow= <FilterConditionRow/>;
        let nextRow;
        if(this.state.nextRow === true) 
        nextRow = <FilterConditionRow rowIndex={1} onChangeCategory={this.changeCategory} onChangeStatusFilter={this.changeStatusFilter}
        onChooseCondition={this.handleChooseCondition} onDelCondition={this.handleDelCondition}
        filterConditionChosen={this.state.filterConditionChosen} onReset={this.clearAllState} />;
        else nextRow=null;
        
        return (
            <div className='filter-form'>
                <div id='filte-form-content'>
                    <label>Hiển thị sản phẩm theo</label>
                    <FilterConditionRow rowIndex={0} onChangeCategory={this.changeCategory} onChangeStatusFilter={this.changeStatusFilter}
                    onChooseCondition={this.handleChooseCondition} onDelCondition={this.handleDelCondition}
                    filterConditionChosen={this.state.filterConditionChosen} onReset={this.clearAllState} />
                    {nextRow}
                    <button id='filter-bt' onClick={this.showResult}>Lọc</button>
                </div>
            </div>
          );
    }
}
 
export default FilterCondition;