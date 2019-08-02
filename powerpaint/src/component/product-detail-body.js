import React, { Component } from 'react';
import '../css/product-detail.css';
import Swal from 'sweetalert2';
import img from '../images/img3.jpg'
import Axios from 'axios';
import { serverIP,port } from './const';

class BodyProductDetail extends Component {
    state = { url:'' }
    
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
            Axios.post('http://' + serverIP + ':'+port+'/api/v1/upload?item_id=moe&img_order=1&photo_url='+url,{},
                {headers: {
                    'Authorization': authen,
                }});
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
        window.location.replace('https://www.ribbet.com/app/?_import='+url+ '&_export=http://192.168.36.20:4200/product/detail&_exclude=out,home,share& _export_title=SAVE_BUTTON_TITLE &_export_agent=browser&embed=true')
        //window.location.replace('/test');
    }

    render() { 
        let images = JSON.parse(localStorage.getItem('img-detail'));
        return ( 
            <div id='product-detail-body'>
                <div id='back'>
                    <i className="fa fa-angle-left" aria-hidden="true"></i><span>Quay lại danh sách sản phẩm</span>
                </div>
                <div id='product-name'>
                    Thìa cho bé
                </div>
                <div id='detail-content'>
                    <div id='left-detail-content'>
                        <div className='detail-row'>
                            <label>Tên sản phẩm</label>
                            <input type='text' value={localStorage.getItem('name-detail')}></input>
                        </div>
                        <div className='detail-row'>
                            <label>Mã SKU</label>
                            <input type='text' value={localStorage.getItem('sku-detail')}></input>
                        </div>
                        <div className='detail-row'>
                            <label>Trạng thái trên Shopee</label>
                            <input type='text' value={localStorage.getItem('status-detail')}></input>
                        </div>
                    </div>
                    <div id='right-detail-content'>
                        <div id='menu-img'>
                            <div className='menu-img-item' value={1} onClick={this.handleCLickImgItem}>Ảnh sản phẩm</div>
                            <div className='menu-img-item' value={2} onClick={this.handleCLickAddUrlImg}>Thêm ảnh từ URL</div>
                            <div className='menu-img-item' value={3} onClick={this.handleCLickUpImg}>Thêm ảnh từ máy tính</div>
                        </div>
                        <div id='img-field'>
                            <img  onClick={this.editPhoto} src={images[0]}/>
                            <img src={images[1]}/>
                            <img src={images[2]}/>
                            <img src={img}/>
                            <img src={img}/>
                            <img src={img}/>
                            <img src={img}/>
                            <img src={img}/>
                            <img src={img}/>
                            <img src={img}/>
                            <img src={this.state.url}/>
                        </div>
                        <div id='right-content-footer'>
                            <div id='update-button'>
                                <button>Cập nhật lên Shopee</button>     
                            </div>
                        </div>
                    </div>
                </div>
            </div>
         );
    }
}
 
export default BodyProductDetail;