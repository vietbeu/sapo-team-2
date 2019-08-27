import React, { Component } from 'react';

class ImgAdvancePopup extends Component {
    state = {
        isChosen:false
    }
    handleClickImg=()=>{
        if (this.state.isChosen===false){
            this.setState({isChosen:true});
            this.props.onClickImg(this.props.url)
        }else {
            this.props.onRemoveImg(this.props.url);
            this.setState({isChosen:false});
        }
    }
    render() { 
        return (
            <div className='pu-img-container' onClick={this.handleClickImg}>
                <img className='pu-img-item' src={this.props.url} alt='img'/>
            </div>
          );
    }
}
 
export default ImgAdvancePopup;