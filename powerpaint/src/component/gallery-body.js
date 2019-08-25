import React, { Component } from 'react';
import img from '../images/img-1.jpg'
import Swal from 'sweetalert2';
import {serverIP,port,partner_id,serverFrIP,portFr} from './const';
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
      warningDialogStatus: 0,
      // listSelectedItems:JSON.parse(localStorage.getItem('products-selected')),
    }
    async componentDidMount(){
      const authen = 'Bearer '+localStorage.getItem('token');
      let images;
      await Axios.get('http://' + serverIP + ':'+port+'/api/v1/resources/search',
          {headers: {
              'Authorization': authen,
          }})
      .then ((response)=> {
        images=response.data;
        this.setState({images_gallery:response.data})
        localStorage.setItem('images_gallery', JSON.stringify(response.data));
      })
      // let images =this.state.images_gallery;
      let currentImgs;
      let listShop=JSON.parse(localStorage.getItem('listShop'));
      if(images.length>0){
        for (let i=0;i<images.length;i++) {
          if (images[i].shop_id==listShop[0].shop_id) currentImgs= images[i].photos;
        }
      }
      this.setState({currentImgs:currentImgs});
      this.checkLocation();
      this.styleDisabledButton();
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
    checkLocation=async()=>{
      let shop_id=this.state.shop_id;
      let images=this.state.images_gallery;
      if (window.location.href.indexOf('file')>0) {
        let file = await decodeURIComponent(window.location.href.split('file=')[1]);
        const authen = 'Bearer '+localStorage.getItem('token');
        await Axios.post('http://' + serverIP + ':'+port+'/api/v1/upload',
        {"item_id":null,"photo_url":file,"shop_id":shop_id},
            {headers: {
                'Authorization': authen,
            }})
        .then ( rsp =>{
            if (rsp.data.success===1){
              let url=rsp.data.url;
                for (let i=0;i<images.length;i++) {
                  if (images[i].shop_id==shop_id) images[i].photos.push(url);
                }
                this.updateStateImg(images);
                Swal.fire({
                  title: 'Thành công',
                  text: "Lưu ảnh chỉnh sửa thành công",
                  type: 'success',
                  confirmButtonColor: '#3085d6',
                  confirmButtonText: 'OK'
                }).then((result) => {
                  if (result.value) {
                    window.location.href='/gallery'; 
                  }
                })
            }else Swal.fire('Fail!', 'Lưu ảnh thất bại!','error' )
        })
        .catch(error=>Swal.fire('Thất bại!', 'Đã có lỗi xảy ra! Xin vui lòng thử lại sau','error' ) )  
      }
    }
    styleDisabledButton = () => {
      let btUpdate;
      btUpdate=document.getElementById('bt-update');
      btUpdate.setAttribute("disabled","disabled");
      if (this.props.gallery === true){
        let btAdd=document.getElementById('bt-add');
        btAdd.setAttribute("disabled","disabled");
        btAdd.style.backgroundColor='rgba(196, 196, 196, 0.5)';
        btAdd.style.color='#7B7B7B';
      }
      btUpdate.style.backgroundColor='rgba(196, 196, 196, 0.5)';
      btUpdate.style.color='#7B7B7B';
    }
    styleClickableButton= () =>{
      let btUpdate
      btUpdate=document.getElementById('bt-update');
      btUpdate.removeAttribute("disabled");
      btUpdate.style.backgroundColor='#007BFF';
      btUpdate.style.color='#FFFFFF';
      if (this.props.gallery === true){
        let btAdd=document.getElementById('bt-add');
        btAdd.removeAttribute("disabled");
        btAdd.style.backgroundColor='#007BFF';
        btAdd.style.color='#FFFFFF' ;
      }
      
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
          this.showWarning(1);
        }
      }
      if (listImgsSelected.length==0) {
        this.styleDisabledButton();
      }else {
        this.styleClickableButton();
      }
    }

    showWarning=(type)=>{
      this.setState({warningDialogStatus: type});
    }
    showWarningUpdate=()=>{
      let listCheckBox = JSON.parse(localStorage.getItem('products-selected'));
      if (listCheckBox === null || listCheckBox.length===0)
        Swal.fire('','Bạn chưa chọn sản phẩm','warning');
      else this.setState({warningDialogStatus:2});
    }
    showWarningAdd=()=>{
      let listCheckBox = JSON.parse(localStorage.getItem('products-selected'));
      if (listCheckBox === null || listCheckBox.length===0)
        Swal.fire('','Bạn chưa chọn sản phẩm','warning');
      else{
      let max = parseInt(localStorage.getItem('max-imgs'));
      if(this.state.listImgsSelected.length>max) this.setState({warningDialogStatus:3});
      else this.setState({warningDialogStatus: 4})
      }
    }
    hideWarningDialog=()=>{
      this.setState({warningDialogStatus:0});
    }
    redirectProductPage=()=>{
      let listImgs=this.state.listImgsSelected;
      localStorage.setItem('listImgsSelected',JSON.stringify(listImgs));
      window.location.replace('/product');
    }

    handleEditPhoto=(url)=>{
      window.location.href='https://www.ribbet.com/app/?_import='+url+ '&_export=http://'+serverFrIP+':'+portFr+'/gallery&_exclude=out,home,share& _export_title=SAVE_BUTTON_TITLE &_export_agent=browser&embed=true';

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
              this.setState({listImgsSelected:listImgsSelected});
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
    this.hideWarningDialog();
    let listFail=[];
    let listCheckBox = JSON.parse(localStorage.getItem('products-selected'));
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
    if (listFail.length==0)  {
      Swal.fire('Thành công', 'Cập nhật ảnh các sản phẩm thành công','success') ;
      localStorage.setItem('products-selected',null);
    }   
  }
    
  addToShopee=()=>{
    this.hideWarningDialog();
    let listFail=[];
    let listImgsSelected = this.state.listImgsSelected;
    let listCheckBox = JSON.parse(localStorage.getItem('products-selected'));
    for (let i=0;i<listCheckBox.length;i++){
      let item_id = listCheckBox[i].item.item_id;
      let shop_id = listCheckBox[i].shop_id;
      const authen = 'Bearer '+localStorage.getItem('token');
      Axios.post('http://' + serverIP + ':'+port+'/api/v1/test/addItemImg',{
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
    if (listFail.length==0)  {
      Swal.fire('Thành công', 'Cập nhật ảnh các sản phẩm thành công','success')
      localStorage.setItem('products-selected',null);
    }    
  }
  selectImgs=()=>{
    let listImgsSelected = this.state.listImgsSelected;
    this.props.onSelectImgs(listImgsSelected);
  }

    render() { 
        let listShop=JSON.parse(localStorage.getItem('listShop'));
        const listSelectShop = listShop.map(x=><option value={x.shop_id} key={x.shop_id}>{x.name}</option>);
        let textNumSelectedImgs;
        if (this.state.listImgsSelected.length>0) 
          textNumSelectedImgs=<span id='num-selected-imgs'>{'Đã chọn '+this.state.numOfImgSelected+' ảnh'}</span>;
        else textNumSelectedImgs=null;
        let footer;
        if (this.props.gallery === true)  footer = (
          <>
          {/* <button id='bt-ok' onClick={this.redirectProductPage}>Chọn sản phẩm</button> */}
          <button id='bt-delImgs' onClick={this.deleteListImgs}>Xoá hình ảnh</button>
          <button id='bt-update' onClick={this.showWarningUpdate}>Cập nhật và thay thế</button>
          <button id='bt-add' onClick={this.showWarningAdd}>Cập nhật và bổ sung</button>
          </>
        ); else footer = (
          <button id='bt-update' onClick={this.selectImgs}>Chọn ảnh</button>  
        )
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
          <ImgItem src={x} key={x} onDeleteImg={this.handleDeleteImg} onEditPhoto={this.handleEditPhoto}
            listImgsSelected={this.state.listImgsSelected} onSelectImg={this.handleCLickImgItem}/>
        )})
        return (
          <>
            <WarningDialog isHidden={this.state.warningDialogStatus} onClickExit={this.hideWarningDialog}
            listImgsSelected={this.state.listImgsSelected} onUpdateShopee={this.updateToShopee} onAddShopee={this.addToShopee}/>
            <div id='gallery-content'>
                <div id='select-acc'>
                    <span>
                        <select onChange={this.changeShop}>
                            {listSelectShop}
                        </select>
                        <span>
                          {textNumSelectedImgs}
                        </span>
                    </span>
                    <div className = 'up-img' onClick={this.handleCLickAddUrlImg}>Thêm ảnh từ URL</div>
                    <div className = 'up-img' onClick={this.handleCLickUpImg}>Thêm ảnh từ máy tính</div>
                </div>
                
                 <div className='gallery-table'>
                    {imgRenderList}
                 </div>
                 <div className='footer-gallery'>
                  {footer}
                 </div>
            </div>
          </>
          );
    }
}
 
export default BodyGallery;


class WarningDialog extends Component {
  state = {  
    type:this.props.type,
  }
  handleExit=()=>{
    this.props.onClickExit();
  }
  handleUpdateToShopee=()=>{
    this.props.onUpdateShopee();
  }
  handleAddToShopee=()=>{
    this.props.onAddShopee();
  }
  render() { 
    let header,body,footer,type=this.props.isHidden;
    let listImgsSelected=this.props.listImgsSelected;
    if (this.props.isHidden === 0) return null;
    else {
      if (type==1){
        header='Thông báo cập nhật hình ảnh lên Shopee';
        body='Hiện tại bạn đã chọn quá số lượng 9 ảnh, bạn cần chọn lại số lượng hình ảnh phù hợp để chúng tôi '
        +'hỗ trợ bạn cập nhật lên Shopee đảm bảo đúng những quy định mà Shopee đặt ra cho người bán hàng'
        footer=<button id='bt-ok' onClick={this.handleExit}>Chọn lại</button>;
      }
      if (type===2){
        header='Thông báo cập nhật và thay thế hình ảnh';
        body=(
          <>
          <div>{'Bạn đã lựa chọn '+listImgsSelected.length+' hình ảnh'}</div>
          <div>Bạn có chắc chắn muốn thay thế toàn bộ những hình ảnh mà bạn đã lựa chọn cho 
            tất cả những hình ảnh của sản phẩm?</div>
          </>
        );
        footer=(
          <>
          <button id='bt-ok' onClick={this.handleUpdateToShopee}>Đồng ý</button>
          <button id='bt-exit' onClick={this.handleExit}>Thoát</button>
          </>
        )
      }
      if (type===3){
        header='Thông báo cập nhật hình ảnh lên Shopee';
        body='Bạn chỉ có thể lựa chọn tối đa '+localStorage.getItem('max-imgs') +' hình ảnh, bạn cần chọn lại số lượng hình ảnh phù hợp để chúng tôi '
        +'hỗ trợ bạn cập nhật lên Shopee đảm bảo đúng những quy định mà Shopee đã đặt ra cho người mua hàng.'
        footer=<button id='bt-ok' onClick={this.handleExit}>Chọn lại</button>;
      }
      if (type===4){
        header='Thông báo cập nhật và bổ sung hình ảnh';
        body=(
          <>
          <div>{'Bạn đã lựa chọn '+listImgsSelected.length+' hình ảnh'}</div>
          <div>Bạn có chắc chắn muốn bổ sung toàn bộ những hình ảnh mà bạn đã lựa chọn vào hình ảnh của các sản 
            phẩm mà bạn đã lựa chọn?</div>
          </>
        )
        footer = (
          <>
          <button id='bt-ok' onClick={this.handleAddToShopee}>Đồng ý</button>
          <button id='bt-exit' onClick={this.handleExit}>Thoát</button>
          </>
        )
      }
      return (
      <dialog id='warning-dialog' open>
        <div id='header-wn-dl'>
          <p>{header}</p>
        </div>
        <div id='body-wn-dl'>
          {body}
        </div>
        <div id='footer-wn-dl'>
          {footer}
        </div>
      </dialog>
      );
    }
  }
}
 
