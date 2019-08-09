import React, { Component } from 'react';
import img from '../images/img-1.jpg'
import Swal from 'sweetalert2';
import {serverIP,port} from './const';
import Axios from 'axios';

class BodyGallery extends Component {
    state = { 
     // images_gallery:[],
      images_gallery: JSON.parse(localStorage.getItem('images_gallery')),
      currentImgs:[],
      shop_id:94115363,
      listImgsSelected:[],
      isHideWarningDialog: false,
    }
    componentDidMount(){
      let images=this.state.images_gallery;
      let currentImgs;
      if(images.length>0){
        for (let i=0;i<images.length;i++) {
          console.log(images[i].shop_id==this.state.shop_id);
          if (images[i].shop_id==this.state.shop_id) currentImgs= images[i].photos;
        }
      }
      this.setState({currentImgs:currentImgs});
    }
    getGallery=()=>{
      const authen = 'Bearer '+localStorage.getItem('token');
      Axios.get('http://' + serverIP + ':'+port+'/api/v1/resources/search',
          {headers: {
              'Authorization': authen,
          }})
      .then ((response)=> {
        this.setState({images_gallery:response.data})
        localStorage.setItem('images_gallery', JSON.stringify(response.data));
      })
                
    }

    changeShop=(e)=>{
      this.setState({shop_id:e.target.value});
      let images=this.state.images_gallery;
      let currentImgs;
      console.log(images);
      if(images.length>0){
        for (let i=0;i<images.length;i++) {
          console.log(images[i].shop_id==e.target.value);
          if (images[i].shop_id==e.target.value) currentImgs= images[i].photos;
        }
      }
      console.log(currentImgs);
      this.setState({currentImgs:currentImgs});
    }
    async handleCLickAddUrlImg(e){
        const {value: url} = await Swal.fire({
            title: 'Thêm ảnh từ URL',
            input: 'url',
            inputPlaceholder:'Hãy nhập URL',
            inputAttributes: {
              autocapitalize: 'off',
            },
            showCancelButton: true,
            cancelButtonText:'Huỷ',
            confirmButtonText: 'Thêm ảnh',
            showLoaderOnConfirm: true,
        })
        if (url) {
            const authen = 'Bearer '+localStorage.getItem('token');
            Axios.post('http://' + serverIP + ':'+port+'/api/v1/upload?item_id=moe&img_order=1&photo_url='+url,{},
                {headers: {
                    'Authorization': authen,
                }});
          }
    }
    async handleCLickUpImg(e){
        const {value: file} = await Swal.fire({
            title: 'Thêm ảnh từ máy tính ',
            input: 'file',
            inputAttributes: {
              
              'aria-label': 'Upload your profile picture'
            }
          }) 
          if (file) {
            console.log(file);
            const reader = new FileReader();
            reader.onload = (e) => {
                let url = e.target.result;
                const authen = 'Bearer '+localStorage.getItem('token');
                console.log(authen);
                Axios.post('http://' + serverIP + ':'+port+'/api/v1/uploadTest?item_id=123&img_order=1',{photo_url:url},
                            {headers: {
                    'Authorization': authen,
                }});
              Swal.fire({
                title: 'Ảnh vừa tải lên',
                imageUrl: e.target.result,
                imageAlt: 'The uploaded picture'
              })
            }
            console.log(reader.readAsDataURL(file))
          }
    }

    showEditImgMenu=(e)=>{
      let buttons = document.getElementsByClassName('edit-bt');
      for(let i = 0 ; i< buttons.length;i++) 
          if(buttons[i].getAttribute('value')==e.target.getAttribute('value'))
              buttons[i].style.display='inline';
    }
    hideEditImgMenu=(e) =>{
      let buttons = document.getElementsByClassName('edit-bt');
      for(let i = 0 ; i< buttons.length;i++) buttons[i].style.display='none';   
    }
    handleCLickImgItem=(e) =>{
      let url = e.target.getAttribute('src');
      let listImgsSelected = this.state.listImgsSelected;
      let value = e.target.getAttribute('value');
      let index = listImgsSelected.indexOf(url);
      let imgItems = document.getElementsByClassName('img-content');
      
      if (index>=0){
        listImgsSelected.splice(index,1);
        console.log(listImgsSelected);
        for (let i=0 ; i<imgItems.length ; i++)
          if (imgItems[i].getAttribute('value')===value) imgItems[i].setAttribute('style','outline: none');           
      }else{
        if (listImgsSelected.length<=3){
          listImgsSelected.push(url);
          console.log(listImgsSelected);
          for (let i=0 ; i<imgItems.length ; i++)
            if (imgItems[i].getAttribute('value')===value) imgItems[i].setAttribute('style','outline:  2px solid red');   
        }else {
          this.showWarning();
        }
      }
    }

    showWarning=()=>{
      this.setState({isHideWarningDialog: false});
    }
    hideWarningDialog=()=>{
      this.setState({isHideWarningDialog:true});
    }

    render() { 
        let listShop=JSON.parse(localStorage.getItem('listShop'));
        const listSelectShop = listShop.map(x=><option value={x.shop_id} key={x.shop_id}>{x.name}</option>);
        let currentImgs=[];currentImgs=this.state.currentImgs;
        let imgRenderList=[];
        if(currentImgs.length>0) imgRenderList=currentImgs.map(x=>{
          let key  =currentImgs.indexOf(x);
          return(
          <span className='img-item' value={key} key={key} onClick={this.handleCLickImgItem}
          onMouseOver={this.showEditImgMenu} onMouseLeave={this.hideEditImgMenu}>
            <img className='img-content' value={key}  src={x} alt='img' />
            <span className='img-button'>
                <button value={key} src={x} onClick={this.editPhoto}  className='edit-bt'>
                    <i src={x} className="fa fa-pencil" value={key} aria-hidden="true"></i>
                    </button>
                <button value={key}  onClick={this.handleDeleteImg} className='edit-bt'>
                    <i className="fa fa-trash" aria-hidden="true" value={key}></i>
                    </button>
            </span>
          </span>
        )})
        return (
          <>
            <WarningDialog isHidden={this.state.isHideWarningDialog} onClickCancel={this.hideWarningDialog}/>
            <div id='gallery-content'>
                <div id='select-acc'>
                    <span>
                        <select onChange={this.changeShop}>
                            {listSelectShop}
                        </select>
                        <button onClick={this.getGallery}>GET</button>
                    </span>
                    <div className = 'up-img' onClick={this.handleCLickAddUrlImg}>Thêm ảnh từ URL</div>
                    <div className = 'up-img' onClick={this.handleCLickUpImg}>Thêm ảnh từ máy tính</div>
                </div>
                
                 <div className='gallery-table'>
                    {imgRenderList}
                 </div>
                 <div className='footer-align'></div>
            </div>
          </>
          );
    }
}
 
export default BodyGallery;


class WarningDialog extends Component {
  state = {  }
  clickCancel=(e)=>{
    this.props.onClickCancel();
  }
  render() { 
    if (this.props.isHidden === true) return null;
    else return (
      <dialog id='warning-dialog' open>
        <div id='header-wn-dl'>
          <p>Thông báo lựa chọn sản phẩm</p>
        </div>
        <div id='body-wn-dl'>
          Hiện tại bạn đã chọn tối đa 9 ảnh và bạn cần phải chọn sản phẩm để thay thế ảnh.
          <div>Click vào Chọn sản phẩm để chúng tôi hỗ trợ bạn lựa chọn sản phẩm phù hợp. Chúng tôi sẽ thay thế 
          tất cả hình ảnh sản phẩm</div>
        </div>
        <div id='footer-wn-dl'>
          <button id='bt-ok' >Chọn sản phẩm</button>
          <button id='bt-cancel' onClick={this.clickCancel}>Huỷ</button>
        </div>
      </dialog>
      );
  }
}
 
