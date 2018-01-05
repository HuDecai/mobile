// 组合所有组件  root component

import React, { PropTypes } from 'react';
import { Toast, List } from 'antd-mobile';
import CommonNavBar from '../CommonNavBar/';
import * as styles from './styles.css';
const leftIcon = require('../../assets/images/login-back.png');
import { push, goBack } from 'react-router-redux';
import { dispatch } from '../../store';
import Cookies from 'js-cookie';

class AboutUs extends React.PureComponent {
  render() {
    return (
      <div>
          <CommonNavBar 
             headerTitle={'关于我们'}
             leftIcon={leftIcon}
             leftAction={() => { dispatch(goBack())}}
          />
          <div className={styles.helpContent}>
            <div className={styles.firstItem}><div>关于我们:</div></div>
            <div className={styles.firstItemImg}><div>亿合娱乐成立于2013年，是面向全球华人提供高端线上娱乐的18小时在线彩票娱乐，亿和娱乐在菲律宾拥有合法博彩执照，与多个国际知名投注平台合作。您的信息保密性对我们来说是最重要的，我们将提供128位SSL加密传输与MD5加密密码，在最大程度上保障您的信息安全。</div></div>
            <br/>
            <div className={styles.firstItem}><div>公平诚信:</div></div>
            <div className={styles.firstItemImg}><div>亿合娱乐作为与多个国际知名游戏平台合作的在线娱乐运营商，我们对接入的所有平台均经过严格的筛选，只选用国际知名在线娱乐平台。保证让每位玩家在一个公平、公正的环境下进行游戏。同时菲律宾政府Philippine Bookkeeping Authority会对游戏平台的数据进行监控确保游戏的公平性和真实性。</div></div>
            <br/>
            <div className={styles.firstItem}><div>高效存取款:</div></div>
            <div className={styles.firstItemImg}><div>亿合娱乐一直注重用户体验，高效快速的存取款业务是用户最实在的体验，所以我们一直致力于开发最新的收支业务和人员培训保证高效的存取款，保证5分钟存提款到账，为你快速享受游戏乐趣提供最大保证。</div></div>
            <br/>
            <div className={styles.firstItem}><div>精心客服团队:</div></div>
            <div className={styles.firstItemImg}><div>亿合娱乐自成立以来，每一年我们都通过优秀培训生计划，为我们的精英客服团队不断输入专业素质全面的优秀人员，每一个团队客服均经过严格的筛选及专业培训，用心为玩家提供优质的服务体验。全天候24小时为您提供专业、贴心的VIP服务，让您有宾至如归的感觉。</div></div>
         </div>
      </div>
    );
  }
}

export default AboutUs;
