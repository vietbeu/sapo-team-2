import React, { Component } from 'react';
import '../css/product-detail.css'

class ImgItem extends Component {
    state = {
        src:this.props.src,
        showButton:false,
        isChosen:false
    }

    showEditImgMenu=(e)=>{
        this.setState({showButton:true})
    }
    hideEditImgMenu=(e) =>{
        this.setState({showButton:false})
    }
    handleCLickImgItem=(e)=>{
        let isChosen = this.state.isChosen;
        let imgItems = document.getElementsByClassName('img-item');
        let listImgsSelected = this.props.listImgsSelected;
        let maxImg = parseInt(localStorage.getItem('max-imgs'));
        if (isChosen===true ){
            for (let i=0 ; i<imgItems.length ; i++){
                if (imgItems[i].getAttribute('value')=== this.state.src) {
                  imgItems[i].setAttribute('style','outline: none  ');     
                }            
            }
            this.setState({isChosen:false});      
        }
        else if  (isChosen===false  && listImgsSelected.length <= maxImg - 1) {
            for (let i=0 ; i<imgItems.length ; i++){
                if (imgItems[i].getAttribute('value')=== this.state.src) {
                  imgItems[i].setAttribute('style','outline:1px solid red');  
                }            
            }
            this.setState({isChosen:true});      
        }
        this.props.onSelectImg(this.state.src, !isChosen);
    }
    handleDeleteImg=(e)=>{
        this.props.onDeleteImg(this.state.src);
    }
    render() { 
        let src = this.props.src;
        let key = this.props.key;
        let showButton = this.state.showButton;
        let editButton;
        if (showButton === true) editButton= (
            <span className='img-button'>
                <button onClick={this.editPhoto}  className='edit-bt-gallery'>
                    <i className="fa fa-pencil" aria-hidden="true"></i>
                </button>
                <button  onClick={this.handleDeleteImg} className='edit-bt-gallery'>
                    <i className="fa fa-trash" aria-hidden="true" ></i>
                </button>
            </span>            
        );
        else editButton=null;
        return (
            <>
            <span className='img-item' value={src} key={key} onClick={this.handleCLickImgItem}
                onMouseOver={this.showEditImgMenu} onMouseLeave={this.hideEditImgMenu}>
                <img className='img-content'  src={src} alt='img' />
                <span className='img-button'>
                {editButton}
            </span>       
            </span>
            </>
          );
    }
}
 
export default ImgItem;