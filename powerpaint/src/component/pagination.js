import React, { Component } from 'react';
import '../css/pagination.css'

class Pagination extends Component {
    state = {  }
    getItemPerPage = e => {
        this.props.onChangeItemPerPage(e.target.value);
    }
    render() { 
        return ( 
            <div className='tb-footer'>
                <span id='footer-left'>Hiển thị kết quả từ 1-20 trên tổng số 614 kết quả</span>
                <span id='footer-middle'>
                     Hiển thị <select onChange={this.getItemPerPage}>
                                <option>1</option>
                                <option>3</option>
                                <option>5</option>
                             </select> kết quả
                </span>
                <span id='footer-right'>
                    <button>Trang đầu</button>
                    <button>1</button>
                    <button>2</button>
                    <button>3</button>
                    <button>Trang cuối</button>
                </span>
            </div>              
         );
    }
}
 
export default Pagination;