import React, { Component } from 'react';
import '../css/pagination.css'

class Pagination extends Component {
    state = {  }
    getItemPerPage = e => {
        this.props.onChangeItemPerPage(e.target.value);
    }
    changePage = e =>{
        this.props.onChangePage(e.target.value);
        let buttons = document.getElementById('footer-right').getElementsByTagName('button');
        for (let i=0 ; i<buttons.length ; i++) {
            buttons[i].style.background='#ffffff';
            buttons[i].style.color='#007BFF';
        }
        buttons[e.target.value].style.background='#007BFF';
        buttons[e.target.value].style.color='#ffffff';
    }
    render() { 
        let button=[];
        for (let i=1 ; i <= this.props.numOfPage ; i++){
            button.push(<button value={i} key ={i} onClick={this.changePage}>{i}</button>);
        }
        let firstItem = this.props.firstItem+1;
        let lastItem =this.props.lastItem;
        if (lastItem > this.props.numOfItem) lastItem=this.props.numOfItem;
        return ( 
            <div className='tb-footer'>
                <span id='footer-left'>{'Hiển thị kết quả từ '+firstItem+'-'+lastItem
                                        +' trên tổng số '+this.props.numOfItem+' kết quả'}</span>
                <span id='footer-middle'>
                     Hiển thị <select onChange={this.getItemPerPage}>
                                <option>20</option>
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