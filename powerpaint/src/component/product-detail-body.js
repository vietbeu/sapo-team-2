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
        shop_id:205134,
        images : JSON.parse(localStorage.getItem('img-detail')),
        name : localStorage.getItem('name-detail'),
        sku : localStorage.getItem('sku-detail'),
        status: localStorage.getItem('status-detail'),
    }
    
    async componentDidMount(){
        this.getPhotoFromCLoud();
        if (window.location.href.indexOf('file')>0) {
            let file = await decodeURIComponent(window.location.href.split('file=')[1]);
            this.setState({file: file})
            const authen = 'Bearer '+localStorage.getItem('token');
            await Axios.post('http://' + serverIP + ':'+port+'/api/v1/upload',
            {"item_id":localStorage.getItem('item-id-detail'),"img_order":2,"photo_url":file,"shop_id":205134},
                {headers: {
                    'Authorization': authen,
                }});
        }
    }

    getPhotoFromCLoud = () => {
        const authen = 'Bearer '+localStorage.getItem('token');
        console.log(authen);
        let images=this.state.images;
        Axios.get('http://' + serverIP + ':'+port+'/api/v1/resources/search/prod?shop_id=205134&item_id='+this.state.item_id,
        
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

    updateItemImgToShopee = async(e) =>{
        let shopid=this.state.shop_id;
        let item_id=this.state.item_id;
        let images='["https://i.pinimg.com/originals/8c/9b/e5/8c9be58b401296b4cd601e8f279be65a.jpg","https://i.pinimg.com/originals/8c/9b/e5/8c9be58b401296b4cd601e8f279be65a.jpg","https://i.pinimg.com/originals/8c/9b/e5/8c9be58b401296b4cd601e8f279be65a.jpg"]';
        ;
        let myImgs=this.state.images;
        let img='[';
        for (let i=0;i<myImgs.length-1;i++){
            img+='"'+myImgs[i]+'",'
        }
        img+='"'+myImgs[myImgs.length-1]+'"]'
        let timestamp = Date.now() / 1000 | 0;
        let URL_updateItemImg = URL_UpdateItemImg;
        let body_updateItemImg = '{"partner_id": '+partner_id+', "shopid": '+shopid+', "timestamp": '+timestamp+
                              ',"item_id": '+item_id+', "images":["'+'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/G-Dragon_Infinite_Challenge_2015.jpg/250px-G-Dragon_Infinite_Challenge_2015.jpg","https://cf.shopee.vn/file/bae9d3044b5e4e2e746adc77597792a6","https://cf.shopee.vn/file/bae9d3044b5e4e2e746adc77597792a6"]}';
        await API_Shopee(URL_updateItemImg, body_updateItemImg)
        .then (rsp => console.log(rsp.data))
        .catch(error => console.log(error))      
      }
      
    insertImgToShopee = () =>{
        let shopid=this.state.shop_id;
        let item_id=this.state.item_id;
        let url='"https://i.pinimg.com/originals/8c/9b/e5/8c9be58b401296b4cd601e8f279be65a.jpg"';
        let timestamp = Date.now() / 1000 | 0;
        let URL_insertItemImg = URL_InsertItemImg;
        let body_insertItemImg = '{"partner_id": '+partner_id+', "shopid": '+shopid+', "timestamp": '+timestamp+
                              ',"item_id": '+item_id+', "image_position":'+1+',"image_url": '+url+'}';
        API_Shopee(URL_insertItemImg, body_insertItemImg)
        .then (rsp => console.log(rsp.data))
        .catch(error => console.log(error))      
    }

    deleteImgFromShopee = () => {
        let shopid=this.state.shop_id;
        let item_id=this.state.item_id;
        let url='"https://i.pinimg.com/originals/8c/9b/e5/8c9be58b401296b4cd601e8f279be65a.jpg"';
        let timestamp = Date.now() / 1000 | 0;
        let URL_insertItemImg = URL_DeleteItemImg;
        let body_insertItemImg = '{"partner_id": '+partner_id+', "shopid": '+shopid+', "timestamp": '+timestamp+
                              ',"item_id": '+item_id+', "positions":['+1+']}';
        API_Shopee(URL_insertItemImg, body_insertItemImg)
        .then (rsp => console.log(rsp.data))
        .catch(error => console.log(error))         
    }
    async handleCLickAddUrlImg(e){
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
            {"item_id":localStorage.getItem('item-id-detail'),"img_order":1,"photo_url":url,"shop_id":205134},
                {headers: {
                    'Authorization': authen,
                }})
            .then (()=> {
                Swal.fire({
                    title: 'Ảnh vừa tải lên',
                    imageUrl: url,
                    imageAlt: 'The uploaded picture'
                  })
            })
            .catch(error =>
                Swal.fire(
                    'Fail!',
                    'Tải ảnh lên thất bại!',
                    'error'
                  ))
          }
    }
    async handleCLickUpImg(e){
        let menuItem =document.getElementsByClassName('menu-img-item');
        for (let i=0 ; i < menuItem.length; i++) menuItem[i].style.color='#7B7B7B';
        menuItem[e.target.getAttribute('value')-1].setAttribute('style','color:#0084FF;');
        const {value: file} = await Swal.fire({
            title: 'Thêm ảnh từ máy tính ',
            input: 'file',
            inputAttributes: {
              
              'aria-label': 'Upload your profile picture'
            }
          }) 
          if (file) {
            console.log(file);
            const reader = new FileReader
            reader.onload = (e) => {
                let url = e.target.result;
                const authen = 'Bearer '+localStorage.getItem('token');
                console.log(authen);
                Axios.post('http://' + serverIP + ':'+port+'/api/v1/upload',
                {"item_id":localStorage.getItem('item-id-detail'),"img_order":1,"photo_url":url,"shop_id":205134},
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
    handleCLickImgItem=(e)=>{
        this.handleCLickMenuImgItem(e.target.getAttribute('value'));
    }
    handleCLickMenuImgItem(index){
        let menuItem =document.getElementsByClassName('menu-img-item');
        for (let i=0 ; i < menuItem.length; i++) menuItem[i].style.color='#7B7B7B';
        menuItem[index-1].setAttribute('style','color:#0084FF;');
    }

    editPhoto(e){
        let url = e.target.getAttribute('src');
        localStorage.setItem('iframe-url','https://www.ribbet.com/app/?_import='+url+ '&_export=http://192.168.36.20:4200/product/detail&_exclude=out,home,share& _export_title=SAVE_BUTTON_TITLE &_export_agent=browser&embed=true')
        window.location.replace('https://www.ribbet.com/app/?_import='+url+ '&_export=http://localhost:4200/product/detail&_exclude=out,home,share& _export_title=SAVE_BUTTON_TITLE &_export_agent=browser&embed=true')
        //window.location.replace('/test');
    }

    render() { 
        let images = this.state.images;
        let shopeeImgs= images.map(x =>  <img src={x} alt='img' key={images.indexOf(x)}onClick={this.editPhoto}/>)
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
                                <button onClick={this.deleteImgFromShopee}>Cập nhật lên Shopee</button>     
                            </div>
                        </div>
                    </div>
                </div>
            </div>
         );
    }
}
 
export default BodyProductDetail;