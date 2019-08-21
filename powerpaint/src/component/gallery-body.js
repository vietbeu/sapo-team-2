import React, { Component } from 'react';
import img from '../images/img-1.jpg'
import Swal from 'sweetalert2';
import {serverIP,port,partner_id} from './const';
import Axios from 'axios';
import { async } from 'q';
import ImgItem from './img-item';

class BodyGallery extends Component {
    state = { 
     // images_gallery:[],
      images_gallery: JSON.parse(localStorage.getItem('images_gallery')),
      currentImgs:[],
      shop_id:JSON.parse(localStorage.getItem('listShop'))[0].shop_id,
      listImgsSelected:[],
      numOfImgSelected:0,
      isHideWarningDialog: true,
    }
    componentDidMount(){
      let images=this.state.images_gallery;
      let currentImgs;
      let listShop=JSON.parse(localStorage.getItem('listShop'));
      if(images.length>0){
        for (let i=0;i<images.length;i++) {
          if (images[i].shop_id==listShop[0].shop_id) currentImgs= images[i].photos;
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
      let listImgsSelected=this.state.listImgsSelected;
      let currentImgs;
      if(images.length>0){
        for (let i=0;i<images.length;i++) {
         // console.log(images[i].shop_id==e.target.value);
          if (images[i].shop_id==e.target.value) currentImgs= images[i].photos;
        }
      }
      //console.log(currentImgs);
      this.setState({currentImgs:currentImgs});
      let imgItems = document.getElementsByClassName('img-content');
      for (let i=0 ; i<imgItems.length ; i++)imgItems[i].setAttribute('style','outline: none'); 
      for (let i=0 ; i<imgItems.length ; i++)
        for (let j=0;j<listImgsSelected.length;j++)
          if (imgItems[i].getAttribute('src')==listImgsSelected[j]) {
            console.log(imgItems[i].getAttribute('src'));
            console.log(listImgsSelected[j]);
            imgItems[i].setAttribute('style','outline:  2px solid red');       
          }
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
    handleCLickUpImg=async(e)=>{
      let shop_id=this.state.shop_id;
      let images=this.state.images_gallery;
      const {value: file} =  await Swal.fire({
        title: 'Thêm ảnh từ máy tính ',
        input: 'file',
        inputAttributes: {
          'aria-label': 'Upload your picture'
          }
        }) 
      if (file) {
        if (file.type != "image/jpeg" && file.type != "image/jpg" && file.type != "image/png")
          Swal.fire('Fail!','Vui lòng chọn file có định dạng jpeg/jpg/png!','error' );
        else if(file.size > 2097152) 
          Swal.fire('Fail!','Vui lòng chọn ảnh có dung lượng nhỏ hơn 2MB!','error');
        else {
          let newURL;
          const reader = new FileReader();
          reader.onload = (e) => {
            newURL=e.target.result;
            const authen = 'Bearer '+localStorage.getItem('token');
            Axios.post('http://' + serverIP + ':'+port+'/api/v1/upload',
                {"item_id":null,"photo_url":newURL,"shop_id":shop_id},
                              {headers: {'Authorization': authen,
            }})
            .then ( rsp => {
              if (rsp.data.success===1){
                let url=rsp.data.url;
                for (let i=0;i<images.length;i++) {
                  if (images[i].shop_id==shop_id) images[i].photos.push(url);
                }
                this.updateStateImg(images);
                Swal.fire({title: 'Ảnh vừa tải lên',imageUrl: e.target.result,imageAlt: 'The uploaded picture'})
              }else Swal.fire('Fail!', 'Lưu ảnh thất bại!','error' )
            })   
          }
          console.log(reader.readAsDataURL(file))
        }}
  }
  handleCLickAddUrlImg=async(e)=>{
    let shop_id=this.state.shop_id;
    let images = this.state.images_gallery;
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
        Axios.post('http://' + serverIP + ':'+port+'/api/v1/upload',
        {"item_id":localStorage.getItem('item-id-detail'),"photo_url":url,"shop_id":shop_id},
            {headers: {
                'Authorization': authen,
            }})
        .then ((rsp)=> {
            if (rsp.data.success==1){
              for (let i=0;i<images.length;i++) 
                if (images[i].shop_id==shop_id) images[i].photos.push(rsp.data.url);
              this.updateStateImg(images);
              Swal.fire({ title: 'Ảnh vừa tải lên',imageUrl: url,imageAlt: 'The uploaded picture'})
            }else Swal.fire(
                'Fail!',
                'Vui lòng chọn ảnh có dung lương nhỏ hơn 2MB và định dạng jpeg/jpg/png',
                'error'
            )
            })
        .catch(error =>
            Swal.fire(
                'Fail!',
                'Tải ảnh lên thất bại!',
                'error'
              ))
      }
}
    updateStateImg=(images)=>{
      this.setState({images_gallery:images});
      localStorage.setItem('images_gallery',JSON.stringify(images));
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
    handleCLickImgItem=(src,isChosen) =>{
      let listImgsSelected = this.state.listImgsSelected;
      let index = listImgsSelected.indexOf(src);
      let maxImg=parseInt(localStorage.getItem('max-imgs'));
      if (index>=0){
        listImgsSelected.splice(index,1);
        this.setState({numOfImgSelected: listImgsSelected.length});
        console.log(listImgsSelected);        
      }else{
        if (listImgsSelected.length <= 8){
          listImgsSelected.push(src);
          this.setState({numOfImgSelected: listImgsSelected.length});
          console.log(listImgsSelected); 
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
    redirectProductPage=()=>{
      let listImgs=this.state.listImgsSelected;
      localStorage.setItem('listImgsSelected',JSON.stringify(listImgs));
      window.location.replace('/product');
    }

    handleDeleteImg=(url) => {
      let shop_id=this.state.shop_id;
      let images =this.state.images_gallery;
      let listImgsSelected=this.state.listImgsSelected;
      Swal.fire({
          title: 'Xoá ảnh này?',
          text: "",
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'OK'
        }).then((result) => {
          if (result.value) {
             Axios.delete("http://"+serverIP+':'+port+'/api/v1/image/delete',
             {headers: {
              'Authorization': 'Bearer '+localStorage.getItem('token'),
             },
             data:{
               'URLs':[url],
             }
            })
             .then ( rsp => {
              for (let i=0;i<images.length;i++) 
                if (images[i].shop_id==shop_id) images[i].photos.splice(images[i].photos.indexOf(url),1);
              this.updateStateImg(images);
              listImgsSelected.splice(listImgsSelected.indexOf(url),1);
               Swal.fire('Thành công!','Xoá ảnh thành công','success')
             })
             .catch(e => Swal.fire('Xoá ảnh thất bại!','Xin vui lòng thử lại sau','error') )
          }
        })
  }

  deleteListImgs=()=>{
    let listImgsSelected = this.state.listImgsSelected;
    let shop_id=this.state.shop_id;
    let images =this.state.images_gallery;
    Swal.fire({
      title: 'Xoá '+listImgsSelected.length+' ảnh đã chọn?',
      text: "",
      type: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'OK'
    }).then((result) => {   
      if (result.value) {
        Axios.delete("http://"+serverIP+':'+port+'/api/v1/image/delete',
        {headers: {
         'Authorization': 'Bearer '+localStorage.getItem('token'),
        },
        data:{
          'URLs':listImgsSelected,
        }
        })
        .then ( rsp => {
          for (let j=0;j<listImgsSelected.length;j++){
            for (let i=0;i<images.length;i++) 
              if (images[i].shop_id==shop_id) images[i].photos.splice(images[i].photos.indexOf(listImgsSelected[j]),1);
            this.updateStateImg(images);
          }
          this.setState({listImgsSelected:[]});
          Swal.fire('Thành công!','Xoá ảnh thành công','success')
         })
         .catch(e => Swal.fire('Xoá ảnh thất bại!','Xin vui lòng thử lại sau','error') )      
    }}) 
  }

  updateToShopee=()=>{
    let listFail=[];
    Swal.fire({
      title: 'Bạn đã chắc chắn chưa?',
      text: "Chúng tôi sẽ cập nhật hình ảnh của tất cả sản phẩm bạn đã chọn",
      type: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'OK'
    })
    .then((result) => {
      if (result.value) {
        let listCheckBox = JSON.parse(localStorage.getItem('products-selected'));
        //console.log(listCheckBox);
        let listImgsSelected = this.state.listImgsSelected;
        for (let i=0;i<listCheckBox.length;i++){
          let item_id = listCheckBox[i].item.item_id;
          let shop_id = listCheckBox[i].shop_id;
          const authen = 'Bearer '+localStorage.getItem('token');
          Axios.post('http://' + serverIP + ':'+port+'/api/v1/test/updateItemImg',{
            partner_id:partner_id,
            shopid:shop_id,
            item_id:item_id,
            images:listImgsSelected,
          },{headers: {'Authorization': authen,}})
          .then (rsp => {
            if (rsp.data.error == null) console.log(1);
            else listFail.push(item_id)})
          .catch(error => 
            Swal.fire('Fail!','Đã có lỗi xảy ra! Cập nhật ảnh thất bại','error')
            )      
        }
        console.log(listFail);
        if (listFail.length==0)  Swal.fire('Thành công', 'Cập nhật ảnh các sản phẩm thành công','success')    
      }
    })  
  }

    render() { 
        let listShop=JSON.parse(localStorage.getItem('listShop'));
        const listSelectShop = listShop.map(x=><option value={x.shop_id} key={x.shop_id}>{x.name}</option>);
        let currentImgs=[];currentImgs=this.state.currentImgs;
        let imgRenderList=[];
        if(currentImgs.length>0) imgRenderList=currentImgs.map(x=>{
          let key  =currentImgs.indexOf(x);
          return(
          // <span className='img-item' value={key} key={key} onClick={this.handleCLickImgItem}
          // onMouseOver={this.showEditImgMenu} onMouseLeave={this.hideEditImgMenu}>
          //   <img className='img-content' value={key}  src={x} alt='img' />
          //   <span className='img-button'>
          //       <button value={key} src={x} onClick={this.editPhoto}  className='edit-bt'>
          //           <i src={x} className="fa fa-pencil" value={key} aria-hidden="true"></i>
          //       </button>
          //       <button value={key} src={x} onClick={this.handleDeleteImg} className='edit-bt'>
          //           <i className="fa fa-trash" aria-hidden="true" src={x}  value={key}></i>
          //       </button>
          //   </span>
          // </span>
          <ImgItem src={x} key={x} onDeleteImg={this.handleDeleteImg}
            listImgsSelected={this.state.listImgsSelected} onSelectImg={this.handleCLickImgItem}/>
        )})
        return (
          <>
            <WarningDialog isHidden={this.state.isHideWarningDialog} 
            onClickCancel={this.hideWarningDialog} onClickOK={this.redirectProductPage}/>
            <div id='gallery-content'>
                <div id='select-acc'>
                    <span>
                        <select onChange={this.changeShop}>
                            {listSelectShop}
                        </select>
                        <button onClick={this.getGallery}>GET</button>
                        <span>
                          <span>{'Đã chọn '+this.state.numOfImgSelected+' ảnh'}</span>
                        </span>
                    </span>
                    <div className = 'up-img' onClick={this.handleCLickAddUrlImg}>Thêm ảnh từ URL</div>
                    <div className = 'up-img' onClick={this.handleCLickUpImg}>Thêm ảnh từ máy tính</div>
                </div>
                
                 <div className='gallery-table'>
                    {imgRenderList}
                 </div>
                 <div className='footer-gallery'>
                  <button id='bt-ok' onClick={this.redirectProductPage}>Chọn sản phẩm</button>
                  <button onClick={this.deleteListImgs}>Xoá</button>
                  <button id='bt-update' onClick={this.updateToShopee}>Cập nhật lên Shopee</button>
                 </div>
            </div>
          </>
          );
    }
}
 
export default BodyGallery;


class WarningDialog extends Component {
  state = {  }
  clickCancel=()=>{
    this.props.onClickCancel();
  }
  clickOK=()=>{
    this.props.onClickOK();
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
          <button id='bt-ok' onClick={this.clickOK}>Chọn sản phẩm</button>
          <button id='bt-cancel' onClick={this.clickCancel}>Huỷ</button>
        </div>
      </dialog>
      );
  }
}
 
