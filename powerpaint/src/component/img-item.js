import React, { Component } from 'react';
import '../css/product-detail.css'

class ImgItem extends Component {
    state = {
        src:this.props.src,
        showButton:false,
        isChosen:false
    }
    componentDidMount(){
        let listImgsSelected = this.props.listImgsSelected;
        let index = listImgsSelected.indexOf(this.state.src);
        if (index>=0)   {
            this.setState({isChosen:true});
            let imgItems = document.getElementsByClassName('img-item-gl');
            for (let i=0 ; i<imgItems.length ; i++){
                if (imgItems[i].getAttribute('value')=== this.state.src) {
                  imgItems[i].setAttribute('style','outline:1px solid red');  
                }            
            }
        }
    }
    showEditImgMenu=(e)=>{
        this.setState({showButton:true})
    }
    hideEditImgMenu=(e) =>{
        this.setState({showButton:false})
    }
    handleCLickImgItem=(e)=>{
        let isChosen = this.state.isChosen;
        let imgItems = document.getElementsByClassName('img-item-gl');
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
        else if  (isChosen===false  && listImgsSelected.length <= 8) {
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
    handleEditPhoto=()=>{
        this.props.onEditPhoto(this.state.src);
    }
    render() { 
        let src = this.props.src;
        let showButton = this.state.showButton;
        let editButton;
        if (showButton === true) editButton= (
            <span className='img-button-gl'>
                <button onClick={this.handleEditPhoto}  className='edit-bt-gallery'>
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
            <span className='img-item-gl' value={src} key={src} onClick={this.handleCLickImgItem}
                onMouseOver={this.showEditImgMenu} onMouseLeave={this.hideEditImgMenu}>
                <img className='img-content-gl'  src={src} alt='img' />
                <span className='img-button-gl'>
                {editButton}
                </span>       
            </span>
            </>
          );
    }
}
 
export default ImgItem;