import React from 'react';
import logo from '../images/sapo_p.jpg'

const InfoPopup = () => {
    return ( 
        <div className='popup-content'>
            <div className='popup-title'>
                <p>Thông tin liên hệ với đội ngũ hỗ trợ của Sapo Editor</p>
            </div>
            <span className='logo-popup'><img src={logo} alt='logo'/></span>
            <span className='contact-popup'>
                <div className='contact-item'>
                    <span className='font-icon'><i className="fa fa-phone" aria-hidden="true"></i></span>
                    0975867756
                </div>
                <div className='contact-item'>
                    <span className='font-icon'><i className="fa fa-envelope" aria-hidden="true"></i></span>
                    sapoteam2@gmail.com
                </div>
                <div className='contact-item'>
                    <span className='font-icon'><i className="fa fa-map-marker" aria-hidden="true"></i></span>
                    Tầng 8 toà nhà Ladeco, 266 Đội Cấn, Ba Đình, Hà Nội
                </div>
                <div className='contact-item'>
                    <span className='font-icon'><i className="fa fa-clock-o" aria-hidden="true"></i></span>
                    8:30 h - 20:00 h, Thứ 2 - Thứ 7
                </div>
            </span>
        </div>
     );
}
 
export default InfoPopup;