import React, { Component } from 'react';
import '../css/product-detail.css';
import Swal from 'sweetalert2';
import img from '../images/img3.jpg'
import Axios from 'axios';
import { serverIP,port,partner_id, URL_UpdateItemImg, URL_InsertItemImg, URL_DeleteItemImg } from './const';
import {API_Shopee} from './API';

class BodyProductDetail extends Component {
    state = { 
        item_id:localStorage.getItem('item-id-detail'),
        shop_id:localStorage.getItem('shop-id-detail'),
        images : JSON.parse(localStorage.getItem('img-detail')),
        name : localStorage.getItem('name-detail'),
        sku : localStorage.getItem('sku-detail'),
        status: localStorage.getItem('status-detail'),
    }
    
    async componentDidMount(){
        let images = this.state.images;
        let shop_id=this.state.shop_id;
        if (window.location.href.indexOf('file')>0) {
            let file = await decodeURIComponent(window.location.href.split('file=')[1]);
            this.setState({file: file})
            const authen = 'Bearer '+localStorage.getItem('token');
            await Axios.post('http://' + serverIP + ':'+port+'/api/v1/upload',
            {"item_id":localStorage.getItem('item-id-detail'),"img_order":2,"photo_url":file,"shop_id":shop_id},
                {headers: {
                    'Authorization': authen,
                }})
            .then ( rsp =>{
                if (rsp.data.success===1){
                    images[localStorage.getItem('indexOfImg')] = file;
                    this.setState({images:images});
                    Swal.fire(
                        'Success!',
                        'Lưu ảnh chỉnh sửa thành công!',
                        'success'
                    )      
                }else Swal.fire(
                    'Fail!',
                    'Lưu ảnh chỉnh sửa thất bại!',
                    'error'
                ) 
            })
            
        }
        
    }
    updateStateImg=(images)=>{
        localStorage.setItem('img-detail',JSON.stringify(images));
        this.setState({images:images});
    }
    getPhotoFromCLoud = () => {
        let shopid=this.state.shop_id;
        const authen = 'Bearer '+localStorage.getItem('token');
        console.log(authen);
        let images=this.state.images;
        Axios.get('http://' + serverIP + ':'+port+'/api/v1/resources/search/prod?shop_id='+shopid+'&item_id='+this.state.item_id,
        
            {headers: {
                'Authorization': authen,
            }})
        .then ((res)=> {
            for( let i=0;i<res.data.length;i++){
            images.push(res.data[i]);
            }
            this.setState({images: images })
        })
    }

    updateItemImgToShopee = (e) =>{
        let shopid=this.state.shop_id;
        let item_id=this.state.item_id;
        let myImgs=this.state.images;
        let img='[';
        for (let i=0;i<myImgs.length-1;i++){
            img+='"'+myImgs[i]+'",'
        }
        img+='"'+myImgs[myImgs.length-1]+'"]'
        let timestamp = Date.now() / 1000 | 0;
        let URL_updateItemImg = URL_UpdateItemImg;
       // let body_updateItemImg = '{"partner_id": '+partner_id+', "shopid": '+shopid+', "timestamp": '+timestamp+
         //                     ',"item_id": '+item_id+', "images":'+img+' }';
         let body_updateItemImg = '"partner_id": '+partner_id+', "shopid": '+shopid+
                              ',"item_id": '+item_id+', "images":'+img;
                              console.log(img);
        //API_Shopee(URL_updateItemImg, body_updateItemImg)
        const authen = 'Bearer '+localStorage.getItem('token');
        let images=this.state.images;
        Axios.post('http://' + serverIP + ':'+port+'/api/v1/test/updateItemImg',{
            partner_id:partner_id,
            shopid:shopid,
            item_id:item_id,
            images:myImgs
        },
            {headers: {
                'Authorization': authen,
            }})
        .then (rsp => {
            if (rsp.data.error == null)
                Swal.fire(
                    'Success!',
                    'Update ảnh trên Shopee thành công!',
                    'success'
                )
            else Swal.fire(
                'Fail!',
                'Cập nhật ảnh thất bại!',
                'error'
            )})
        .catch(error => 
            Swal.fire(
                'Fail!',
                'Đã có lỗi xảy ra! Cập nhật ảnh thất bại',
                'error'
            ))      
      }
      
    insertImgToShopee = () =>{
        let shopid=this.state.shop_id;
        let item_id=this.state.item_id;
        let url='"https://photo-3-baomoi.zadn.vn/w1000_r1/2019_05_09_329_30650795/94bb21e2e5a30cfd55b2.jpg"';
        let timestamp = Date.now() / 1000 | 0;
        let URL_insertItemImg = URL_InsertItemImg;
        let body_insertItemImg = '{"partner_id": '+partner_id+', "shopid": '+shopid+', "timestamp": '+timestamp+
                              ',"item_id": '+item_id+', "image_position":'+1+',"image_url": '+url+'}';
        API_Shopee(URL_insertItemImg, body_insertItemImg)
        .then (rsp => console.log(rsp.data))
        .catch(error => console.log(error))      
    }

    deleteImgFromShopee = (positions) => {
        // let shopid=this.state.shop_id;
        // let item_id=this.state.item_id;
        let images=this.state.images;
        // let timestamp = Date.now() / 1000 | 0;
        // let URL_delItemImg = URL_DeleteItemImg;
        // let body_delItemImg = '{"partner_id": '+partner_id+', "shopid": '+shopid+', "timestamp": '+timestamp+
        //                       ',"item_id": '+item_id+', "positions":['+positions+']}';
        images.splice(positions-1,1);
        this.updateStateImg(images);
        // API_Shopee(URL_delItemImg, body_delItemImg)
        // .then (rsp => {
        //     console.log(rsp.data.error!=null);
        //     if (rsp.data.error != null)
        //         Swal.fire(
        //             'Fail!',
        //             'Xoá ảnh thất bại!',
        //             'error'
        //         )
        //     else {
        //         //images.splice(positions-1,1);
        //         //this.setState({images:images});
        //         Swal.fire(
        //             'Success!',
        //             'Xoá ảnh thành công!',
        //             'succes'
        //         ) 
        //     }
        //     })
        // .catch(error => console.log(error))         
    }
    handleCLickAddUrlImg=async(e)=>{
        let shop_id=this.state.shop_id;
        let images = this.state.images;
        //this.handleCLickMenuImgItem(e.target.getAttribute('value'));
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
                    images.push(rsp.data.url);
                    this.updateStateImg(images);
                    Swal.fire({
                        title: 'Ảnh vừa tải lên',
                        imageUrl: url,
                        imageAlt: 'The uploaded picture'
                    })
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
     handleCLickUpImg=async(e)=>{
        let shop_id=this.state.shop_id;
        let images=this.state.images;
        // let menuItem =document.getElementsByClassName('menu-img-item');
        // for (let i=0 ; i < menuItem.length; i++) menuItem[i].style.color='#7B7B7B';
        // menuItem[e.target.getAttribute('value')-1].setAttribute('style','color:#0084FF;');
        const {value: file} =  await Swal.fire({
            title: 'Thêm ảnh từ máy tính ',
            input: 'file',
            inputAttributes: {
              'aria-label': 'Upload your picture'
            }
          }) 
          if (file) {
            if (file.type != "image/jpeg" && file.type != "image/jpg" && file.type != "image/png")
                Swal.fire(
                    'Fail!',
                    'Vui lòng chọn file có định dạng jpeg/jpg/png!',
                    'error'
                );
            else if(file.size > 2097152) 
                Swal.fire(
                    'Fail!',
                    'Vui lòng chọn ảnh có dung lượng nhỏ hơn 2MB!',
                    'error'
                );
            else {
                let newURL;
                const reader = new FileReader();
                reader.onload = (e) => {
                    // var image = new Image();
                    // image.onload=function(){
                    //     var canvas=document.createElement("canvas");
                    //     var context=canvas.getContext("2d");
                    //     if (image.width>image.height){
                    //     canvas.width=750;
                    //     const scaleFactor = canvas.width / image.width;
                    //     canvas.height=image.height*scaleFactor;
                    //     }else{
                    //         canvas.height=750;
                    //         const scaleFactor = canvas.height / image.height;
                    //         canvas.width=image.width*scaleFactor;    
                    //     }
                    //     context.drawImage(image,
                    //         0,
                    //         0,
                    //         image.width,
                    //         image.height,
                    //         0,
                    //         0,
                    //         canvas.width,
                    //         canvas.height
                    //     );
                        
                    //     newURL=canvas.toDataURL();
                    //     // images.push(newURL);
                    //     // console.log(newURL)
                    //     // localStorage.setItem('img-detail',JSON.stringify(images));
                        
                    //  }
                    newURL=e.target.result;
                    console.log(newURL);
                    const authen = 'Bearer '+localStorage.getItem('token');
                    Axios.post('http://' + serverIP + ':'+port+'/api/v1/upload',
                    {"item_id":localStorage.getItem('item-id-detail'),"photo_url":newURL,"shop_id":shop_id},
                                {headers: {
                        'Authorization': authen,
                    }})
                    .then ( rsp => {
                        if (rsp.data.success===1){
                            let url=rsp.data.url;
                            images.push(url);
                            this.updateStateImg(images);
                            Swal.fire({
                                title: 'Ảnh vừa tải lên',
                                imageUrl: e.target.result,
                                imageAlt: 'The uploaded picture'
                            })
                        }else Swal.fire(
                            'Fail!',
                            'Lưu ảnh thất bại!',
                            'error'
                        )

                    })
                
            }
            console.log(reader.readAsDataURL(file))
          }}
    }
    readFile=(file)=>{
        console.log(file);
            const reader = new FileReader();
            reader.onload = (e) => {
                let url = e.target.result;
                console.log(url);
            }
    }
    
    handleCLickImgItem=(e)=>{
        this.handleCLickMenuImgItem(e.target.getAttribute('value'));
    }
    handleCLickMenuImgItem(index){
        let menuItem =document.getElementsByClassName('menu-img-item');
        for (let i=0 ; i < menuItem.length; i++) menuItem[i].style.color='#7B7B7B';
        menuItem[index-1].setAttribute('style','color:#0084FF;');
    }

    editPhoto=(e)=>{
        let url = e.target.getAttribute('src');
        localStorage.setItem('indexOfImg',e.target.getAttribute('value'));
        window.location.replace('https://www.ribbet.com/app/?_import='+url+ '&_export=http://localhost:4200/product/detail&_exclude=out,home,share& _export_title=SAVE_BUTTON_TITLE &_export_agent=browser&embed=true')
        //window.location.replace('/test');
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
    handleDeleteImg=(e) => {
        let index = parseInt(e.target.getAttribute('value'))+1;
        console.log(index);
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
                this.deleteImgFromShopee(index);
            }
          })
    }
    render() { 
        let images = this.state.images;
        let imgTxt;
        let shopeeImgs = images.map( x => {
            let key  =images.indexOf(x);
            if (key===0) imgTxt='bìa';
            else imgTxt=key+1;
            return(
            <span value={key} key={key} className='img-item' onMouseOver={this.showEditImgMenu} onMouseLeave={this.hideEditImgMenu}>
                <img  value={key} src={x} alt='img' />
                <span value={key}className='img-button'>
                    <button src={x} onClick={this.editPhoto} value={key} className='edit-bt'>
                        <i value={key} src={x} className="fa fa-pencil" aria-hidden="true"></i>
                        </button>
                    <button value={key} onClick={this.handleDeleteImg} className='edit-bt'>
                        <i value={key} className="fa fa-trash" aria-hidden="true"></i>
                        </button>
                </span>
                <div className='img-text'>{'Ảnh '+imgTxt}</div>
            </span>
        )})
        //let shopeeImgs= images.map(x =>  <img src={x} alt='img' key={images.indexOf(x)}onClick={this.editPhoto}/>)
        return ( 
            <div id='product-detail-body'>
                <div id='back'>
                    <i className="fa fa-angle-left" aria-hidden="true"></i><span>Quay lại danh sách sản phẩm</span>
                </div>
                <div id='product-name'>
                    {this.state.name}
                </div>
                <div id='detail-content'>
                    <div id='left-detail-content'>
                        <div className='detail-row'>
                            <label>Tên sản phẩm</label>
                            <input type='text' value={this.state.name}></input>
                        </div>
                        <div className='detail-row'>
                            <label>Mã SKU</label>
                            <input type='text' value={this.state.sku}></input>
                        </div>
                        <div className='detail-row'>
                            <label>Trạng thái trên Shopee</label>
                            <input type='text' value={this.state.status}></input>
                        </div>
                    </div>
                    <div id='right-detail-content'>
                        <div id='menu-img'>
                            <div className='menu-img-item' value={1} onClick={this.handleCLickImgItem}>Ảnh sản phẩm</div>
                            <div className='menu-img-item' value={2} onClick={this.handleCLickAddUrlImg}>Thêm ảnh từ URL</div>
                            <div className='menu-img-item' value={3} onClick={this.handleCLickUpImg}>Thêm ảnh từ máy tính</div>
                        </div>
                        <div id='img-field'>
                            {shopeeImgs}              
                        </div>
                        <div id='right-content-footer'>
                            <div id='update-button'>
                                <button onClick={this.updateItemImgToShopee}>Cập nhật lên Shopee</button>     
                            </div>
                        </div>
                    </div>
                </div>
            </div>
         );
    }
}
 
export default BodyProductDetail;