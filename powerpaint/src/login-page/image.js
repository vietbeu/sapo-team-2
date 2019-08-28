import React, { Component } from 'react';
import img3 from '../images/login3.jpeg';
import img4 from '../images/login4.jpg';
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
            document.getElementById('image-background').style.backgroundImage="url("+img3+")";
            this.setState({imageNum: currentImage+1});
        }else {
            document.getElementById('image-background').style.backgroundImage="url("+img4+")";
            this.setState({imageNum: 0});
        }    
    }
    componentDidMount(){
        this.imageEffect=setInterval(this.changeImage, 5000);
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
                        modal
                        closeOnDocumentClick
                        contentStyle={{width: "60%",borderRadius:'6px'}}
                    >
                        {close=>(
                        <span className='info-popup'> <InfoPopup onClose={close}/> </span>
                        )}
                    </Popup></span></h2>
            </React.Fragment>
         );
    }
}
 
export default Image;