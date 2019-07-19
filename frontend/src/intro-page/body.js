import React, { Component } from 'react';

class IntroBody extends Component {
    state = {  }
    redirect =()=> {
        window.location='/signup';
    }
    render() { 
        return (
            <div className='body-content'>
                <div className='body-title'>Chỉnh sửa ảnh sản phẩm trên Shopee</div>
                <div className='body-description'>Sapo Decorate sẽ giúp bạn chỉnh sửa hình ảnh trên Shopee và cập nhật
                lại hình ảnh sản phẩm lên sàn dễ dàng và hiệu quả</div>
                <div>
                    <button onClick={this.redirect}>Đăng ký</button>
                </div>
            </div>
          );
    }
}
 
export default IntroBody;

