import React, { Component } from 'react';
import '../css/panel.css';
import '../css/gallery.css';
import Page from './page';
import BodyGallery from '../component/gallery-body';
import AddShopButton from '../component/add-shop-button';
class GalleryPage extends Component {
    state = {}
   
    render() { 
        let text = (
            <>
                <span className='header-text'>
                    <div><a href='/overview'><i className="fa fa-angle-double-left fa-2x" aria-hidden="true"></i></a></div>
                    <div id='logo-shopee'></div>
                    <div id='location'>KÊNH SHOPEE/ Thư viện ảnh</div>
                </span>
                <span id='header-button'>
                    <AddShopButton/>
                </span>
            </>
        )
        return (
            <>
                <Page text={text} body={<BodyGallery gallery={true}/>}/>
            </>
          );
    }
}
 
export default GalleryPage;