import React, { PropTypes } from 'react';
import * as styles from './styles.css';
import * as commonStyles from '../../assets/stylesheets/common.css';
import { push, goBack, replace } from 'react-router-redux';
import { dispatch } from '../../store';
const image1 = require('../../assets/images/ios-image1.png');
const image2 = require('../../assets/images/ios-image2.png');
const image3 = require('../../assets/images/ios-image3.png');
const image4 = require('../../assets/images/ios-image4.png');
const image5 = require('../../assets/images/ios-image5.png');

class IOSExplain extends React.PureComponent {
  render() {
    return (
      <div className={styles.iosBody}>
         <div className={styles.iosTitle}>新手安装指引</div>
         <div className={styles.iosTitle1}>打开APP提示 未信任的企业级开发者 请按照如下步骤操作</div>
         <div className={styles.iosTitle2}><span className={styles.spanStyle}>1</span> 点击 ”设置”</div>
         <div><img src={image1} width="40%" /></div>
         <div className={styles.iosTitle2}><span className={styles.spanStyle}>2</span> 在 ”设置” 页面，点击“通用”</div>
         <div><img src={image2} width="100%" /></div>
         <div className={styles.iosTitle2}><span className={styles.spanStyle}>3</span> 在 “通用/一般” 页面， 点击 “设备管理/装置管理”</div>
         <div><img src={image3} width="100%" /></div>
         <div className={styles.iosTitle2}><span className={styles.spanStyle}>4</span> <span className={styles.iosTitle3}>在 “设备管理/装置管理” 页面选择企业级APP列表中 “Beijing JinKao easy networ...” 应用</span></div>
         <div><img src={image4} width="100%" /></div>
         <div className={styles.iosTitle2}><span className={styles.spanStyle}>5</span> 在选择应用信任后点击 “信任”</div>
         <div><img src={image5} width="100%" /></div>
      </div>
    );
  }
}

export default IOSExplain;
