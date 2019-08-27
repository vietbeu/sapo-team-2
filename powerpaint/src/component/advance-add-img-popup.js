import React, { Component } from 'react';
import '../css/advance-popup.css';

class PopupAddImgAdvance extends Component {
    state = {  }
    render() { 
        return (
            <div id='popup-advance'> 
                <div id='pu-left-content'>
                    <div className='pu-content-header'>
                        Hình ảnh đã lựa chọn
                    </div>
                    <div className='pu-content-body'>
                        <img className='img-item-gl' src='https://kenh14cdn.com/2019/2/12/e8c1f9ab94f6f84b6198f8e972d41ac2-1549933518315510112791.jpg' alt='img'/>
                    </div>

                </div>
                <div id='pu-button'>
                    <div id='pu-bt-content'>
                        <button id='pu-bt-add'>Add</button>
                    </div>
                </div>
                <div id='pu-right-content'>
                    <div className='pu-content-header'>
                        Sản phẩm đã lựa chọn
                    </div>
                    <div className='pu-content-body'>
                        <table>
                            <th className='cl-cur-imgs'>Ảnh hiện tại</th>
                            <th className='cl-pro'>Sản phẩm</th>
                            <th className='cl-new-imgs'>Ảnh thêm mới</th>
                        </table>
                    </div>
                </div>
            </div>
          );
    }
}
 
export default PopupAddImgAdvance;