import React, { Component } from 'react';
import '../css/pagination.css'

class Pagination extends Component {
    state = {  }
    getItemPerPage = e => {
        this.props.onChangeItemPerPage(e.target.value);
    }
    changePage = e =>{
        this.props.onChangePage(e.target.value);
    }
    render() { 
        let button=[];
        for (let i=1 ; i <= this.props.numOfPage ; i++){
            button.push(<button value={i} key ={i} onClick={this.changePage}>{i}</button>);
        }
        return ( 
            <div className='tb-footer'>
                <span id='footer-left'>Hiển thị kết quả từ 1-20 trên tổng số 614 kết quả</span>
                <span id='footer-middle'>
                     Hiển thị <select onChange={this.getItemPerPage}>
                                <option>10</option>
                                <option>30</option>
                                <option>50</option>
                             </select> kết quả
                </span>
                <span id='footer-right'>
                    <button>Trang đầu</button>
                    {button}
                    <button>Trang cuối</button>
                </span>
            </div>              
         );
    }
}
 
export default Pagination;