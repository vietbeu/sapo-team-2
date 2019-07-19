import React, { Component } from 'react';
import img3 from '../images/img3.jpg';
import img4 from '../images/img4.jpg';
import Popup from 'reactjs-popup';
import InfoPopup from './info-popup';

const imgBackground = [img3,img4] ;
class Image extends Component {
    state = {  
        imageNum : 0
    }

    changeImage = () =>{
        let currentImage=this.state.imageNum;
        if (currentImage < imgBackground.length -1){
            document.getElementById('image-background').style.backgroundImage='url("../images/img3.jpg")';
            this.setState({imageNum: currentImage+1});console.log(123);
        }else {
            document.getElementById('image-background').style.backgroundImage='url("../images/img4.jpg")';
            this.setState({imageNum: 0});console.log(456);
        }    
    }
    componentDidMount(){
        this.imageEffect=setInterval(this.changeImage, 3000);
    }
    componentWillUnmount(){
        clearInterval(this.imageEffect);
    }
    render() { 
        return ( 
            <React.Fragment>
                <h1>Chỉnh sửa ảnh sản phẩm trên Shopee</h1>
                <h2>Mọi thắc mắc xin liên hệ với chúng tôi
                    <span>
                    <Popup
                        trigger={<button id="hint"> tại đây </button>}
                        repositionOnResize={true}
                        modal
                        closeOnDocumentClick
                        contentStyle={{width: "80%"}}
                    >
                        <span className='info-popup'> <InfoPopup/> </span>
                    </Popup></span></h2>
            </React.Fragment>
         );
    }
}
 
export default Image;