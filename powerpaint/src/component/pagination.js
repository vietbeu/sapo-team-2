import React, { Component } from 'react';
import '../css/pagination.css'

class Pagination extends Component {
    state = {  }
    getItemPerPage = e => {
        this.props.onChangeItemPerPage(e.target.value);
    }
    componentDidMount(){
        this.reStyleButtonPagination(this.props.currentPage);
    }
    reStyleButtonPagination=(value)=>{
        let buttons = document.getElementsByClassName('index-button');
        for (let i=0 ; i<buttons.length ; i++) {
            if (buttons[i].value===value){
                buttons[i].style.background='#007BFF';
                buttons[i].style.color='#ffffff';
            }else{
            buttons[i].style.background='#ffffff';
            buttons[i].style.color='#007BFF';
            }
        }
    }
    changePage = e =>{
        this.props.onChangePage(e.target.value);
        let buttons = document.getElementsByClassName('index-button');
        this.reStyleButtonPagination(e.target.value)
    }
    render() { 
        let button=[];let i;
        let numOfPage=this.props.numOfPage; 
        let buttonFooter;
        let showItemPerPageOption;
        if(this.props.hideFooterMiddle === true) showItemPerPageOption = null;
        else showItemPerPageOption=(
            <span id='footer-middle'>
                Hiển thị <select onChange={this.getItemPerPage}>
                    <option>20</option>
                    <option>30</option>
                    <option>50</option>
                </select> kết quả
            </span>            
        )
        if (numOfPage===1){
            buttonFooter = null;
        }else{
            buttonFooter = (
                <>
                {showItemPerPageOption}
                <span id='footer-right'>
                    <button className='index-button' onClick={this.changePage} value={1}>Trang đầu</button>
                    {button}    
                    <button className='index-button' onClick={this.changePage} value={this.props.numOfPage}>Trang cuối</button>
                </span>
                </>
            )
            if (numOfPage<3) for (i=1;i<= numOfPage;i++) button[i]=<button className='index-button' value={i} key={i} 
                onClick={this.changePage}>{i}</button>;
            else if(this.props.currentPage==1) {
                for (i=0;i<3;i++){
                    button[i] = <button className='index-button'value={i+1} key ={i+1} 
                    onClick={this.changePage}>{i+1}</button>
                }
            }else if (this.props.currentPage==numOfPage){
                for (i=0;i<3;i++){
                    button[i] = <button className='index-button'value={numOfPage-2+i} key ={numOfPage-2+i} 
                    onClick={this.changePage}>{numOfPage-2+i}</button>
                }
            }
            else for (let i=0 ; i < 3 ; i++){
                let valueOfButton = this.props.currentPage-1+i;
                if( valueOfButton<=0 || valueOfButton>numOfPage) button[i]=null;
                else button[i] =<button className='index-button'value={valueOfButton} key ={valueOfButton} 
                    onClick={this.changePage}>{valueOfButton}</button>;
            }
        }
        let firstItem = this.props.firstItem+1;
        if(this.props.numOfItem===0) firstItem=0;
        let lastItem =this.props.lastItem;
        if (lastItem > this.props.numOfItem) lastItem=this.props.numOfItem;
        return ( 
            <>
                <span id='footer-left'>{'Hiển thị kết quả từ '+firstItem+'-'+lastItem
                                        +' trên tổng số '+this.props.numOfItem+' kết quả'}</span>
                {buttonFooter}
            </>              
         );
    }
}
 
export default Pagination;