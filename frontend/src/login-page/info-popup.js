import React from 'react';
import logo from '../images/logonew.png'

const InfoPopup = () => {
    return ( 
        <div className='popup-content'>
            <div className='popup-title'>
                <p>Thông tin liên hệ với đội ngũ hỗ trợ của Sapo Decorate</p>
            </div>
            <span className='logo-popup'><img src={logo} alt='logo'/></span>
            <span className='contact-popup'>
                <div className='contact-item'>
                    <span className='font-icon'><i className="fa fa-phone" aria-hidden="true"></i></span>
                    <span className='info'>0975867756</span>
                </div>
                <div className='contact-item'>
                    <span className='font-icon'><i className="fa fa-envelope" aria-hidden="true"></i></span>
                    <span className='info'>sapoteam2@gmail.com</span>
                </div>
                <div className='contact-item'>
                    <span className='font-icon'><i className="fa fa-map-marker" aria-hidden="true"></i></span>
                    <span className='info'>Tầng 8 toà nhà Ladeco, 266 Đội Cấn, Ba Đình, Hà Nội</span>
                </div>
                <div className='contact-item'>
                    <span className='font-icon'><i className="fa fa-clock-o" aria-hidden="true"></i></span>
                    <span className='info'>8:30 h - 20:00 h, Thứ 2 - Thứ 7</span>
                </div>
            </span>
        </div>
     );
}
 
export default InfoPopup;