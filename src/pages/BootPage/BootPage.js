import React, { PropTypes } from 'react';
import * as styles from './styles.css';
import * as commonStyles from '../../assets/stylesheets/common.css';
import { push, goBack, replace } from 'react-router-redux';
import { dispatch } from '../../store';
const leftIcon = require('../../assets/images/register-left.png');
const bootPage = require('../../assets/images/mobile-boot-img.png');
const androidIcon = require('../../assets/images/ad-icon.png');
const iosIcon = require('../../assets/images/ios-icon.png');

class BootPage extends React.PureComponent {
  render() {
    var u = navigator.userAgent;
    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    return (
      <div className={styles.body}>
        <div className={styles.navBar}>
          <div className={styles.leftAction}><img src={leftIcon} className={styles.leftImg} /></div>
        </div>
        <div>
           <img src={bootPage} className={styles.imgBody} />
           <div className={styles.button}>
             {isAndroid ? 
                <img src={androidIcon} className={styles.imgStyle} 
                  onClick={() => {window.open('https://fir.im/kzcm')}}
                /> 
                : isiOS ? 
                  <div>
                     <img src={iosIcon} className={styles.imgStyle} onClick={() => {window.open('https://fir.im/7rh5')}}/>
                     <div className={styles.text} onClick={() => {dispatch(push('ios-explain'))}}>IOS系统受信任设置教程</div>
                  </div> 
                : <div />}
           </div>
        </div>
      </div>
    );
  }
}

export default BootPage;
