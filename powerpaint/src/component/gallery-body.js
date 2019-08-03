import React, { Component } from 'react';
import img from '../images/img-1.jpg'
import Swal from 'sweetalert2';
import {serverIP,port} from './const';
import Axios from 'axios';

class BodyGallery extends Component {
    state = {  }

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
    render() { 
        let listShop=JSON.parse(localStorage.getItem('listShop'));
        const listSelectShop = listShop.map(x=><option value={x.shop_id} key={x.shop_id}>{x.name}</option>);
        return (
            <div id='gallery-content'>
                <div id='select-acc'>
                    <span>
                        <select onChange={this.changeShop}>
                            {listSelectShop}
                        </select>
                    </span>
                    <div className = 'up-img' onClick={this.handleCLickAddUrlImg}>Thêm ảnh từ URL</div>
                    <div className = 'up-img' onClick={this.handleCLickUpImg}>Thêm ảnh từ máy tính</div>
                </div>
                
                 <div className='gallery-table'>
                    <img src={img} alt='img'/>
                    <img src={img} alt='img'/>
                    <img src={img} alt='img'/>
                    <img src={img} alt='img'/>
                    <img src={img} alt='img'/>
                    <img src={img} alt='img'/>
                    <img src={img} alt='img'/>
                    <img src={img} alt='img'/>
                    <img src={img} alt='img'/>
                    <img src={img} alt='img'/>
                    <img src={img} alt='img'/>
                    <img src={img} alt='img'/>
                    <img src={img} alt='img'/>
                    <img src={img} alt='img'/>
                    <img src={img} alt='img'/>
                    <img src={img} alt='img'/>
                    <img src={img} alt='img'/>
                    <img src={img} alt='img'/>
                    <img src={img} alt='img'/>
                    <img src={img} alt='img'/>
                    <img src={img} alt='img'/>
                    <img src={img} alt='img'/>
                    <img src={img} alt='img'/>
                    <img src={img} alt='img'/>

                 </div>
                 <div className='footer-align'></div>
            </div>
          );
    }
}
 
export default BodyGallery;