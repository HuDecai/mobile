// 组合所有组件  root component

import React, { PropTypes } from 'react';
import { Toast, List } from 'antd-mobile';
import CommonNavBar from '../CommonNavBar/';
import * as styles from './styles.css';
const leftIcon = require('../../assets/images/login-back.png');
import { push, goBack } from 'react-router-redux';
import { dispatch } from '../../store';
import Cookies from 'js-cookie';

class PlayTime extends React.PureComponent {
  render() {
    return (
      <div>
          <CommonNavBar 
             headerTitle={'开奖时间'}
             leftIcon={leftIcon}
             leftAction={() => { dispatch(goBack())}}
          />
          <div className={styles.helpContent}>
         <div className={styles.playInfoTitle}>
            <div className={styles.playInfoItem1}>彩种组</div>
            <div className={styles.playInfoItem1}>彩种</div>
            <div className={styles.playInfoItem2}>彩种开奖时间说明</div>
         </div>
         <div className={styles.playInfoContent}>
            <div className={styles.playInfoContentItem}>
              <div className={styles.playInfoItem1}/>
              <div className={styles.playInfoItem1}>重庆时时彩</div>
              <div className={styles.playInfoItem3}>开奖时间分为白天10:00-22:00和夜场22:05～01:55两场，开奖频率为白天10分钟和夜场5分钟，共120期。</div>
            </div>
            <div className={styles.playInfoContentItem}>
              <div className={styles.playInfoItem1}/>
              <div className={styles.playInfoItem1}>澳门时时彩</div>
              <div className={styles.playInfoItem3}>开奖时间24小时不间断，5分钟一期，共288期。</div>
            </div>
            <div className={styles.playInfoContentItem}>
              <div className={styles.playInfoItem1}>时时彩系列</div>
              <div className={styles.playInfoItem1}>天津时时彩</div>
              <div className={styles.playInfoItem3}>开奖时间白天09：10分至23:00，10分钟一期，共84期。</div>
            </div>
            <div className={styles.playInfoContentItem}>
              <div className={styles.playInfoItem1}/>
              <div className={styles.playInfoItem1}>新加坡分分彩</div>
              <div className={styles.playInfoItem3}>开奖时间24小时不间断，1分钟一期，共1440期。</div>
            </div>
            <div className={styles.playInfoContentItem}>
              <div className={styles.playInfoItem1}/>
              <div className={styles.playInfoItem1}>加拿大三分彩</div>
              <div className={styles.playInfoItem3}>开奖时间24小时不间断，3分钟一期，共480期。</div>
            </div>
            <div className={styles.playInfoContentItem}>
              <div className={styles.playInfoItem1}/>
              <div className={styles.playInfoItem1}>黑龙江时时彩</div>
              <div className={styles.playInfoItem3}>开奖时间为08:50-22:40， 10分钟一期，共84期。</div>
            </div>
         </div>
         <div className={styles.playInfoContent}>
            <div className={styles.playInfoContentItem}>
              <div className={styles.playInfoItem1}>PK10系列</div>
              <div className={styles.playInfoItem1}>北京PK10</div>
              <div className={styles.playInfoItem3}>开奖时间为09:07-23:57，5分钟一期，共179期。</div>
            </div>
            <div className={styles.playInfoContentItem}>
              <div className={styles.playInfoItem1}/>
              <div className={styles.playInfoItem1}>德国赛车</div>
              <div className={styles.playInfoItem3}>开奖时间24小时不间断，5分钟一期，共480期。</div>
            </div>
         </div>
         <div className={styles.playInfoContent}>
            <div className={styles.playInfoContentItem}>
              <div className={styles.playInfoItem1}/>
              <div className={styles.playInfoItem1}>广东11选5</div>
              <div className={styles.playInfoItem3}>开奖时间为09:10-23:00，10分钟一期，共84期。</div>
            </div>
            <div className={styles.playInfoContentItem}>
              <div className={styles.playInfoItem1}>11选5系列</div>
              <div className={styles.playInfoItem1}>江西11选5</div>
              <div className={styles.playInfoItem3}>开奖时间为09:10-23:00， 10分钟一期，共84期。</div>
            </div>
            <div className={styles.playInfoContentItem}>
              <div className={styles.playInfoItem1}/>
              <div className={styles.playInfoItem1}>山东11选5</div>
              <div className={styles.playInfoItem3}>开奖时间为8:35-22:55，10分钟一期，共87期。</div>
            </div>
            <div className={styles.playInfoContentItem}>
              <div className={styles.playInfoItem1}/>
              <div className={styles.playInfoItem1}>香港11选5</div>
              <div className={styles.playInfoItem3}>开奖时间24小时不间断，5分钟一期，共480期。</div>
            </div>
         </div>
         <div className={styles.playInfoContent}>
            <div className={styles.playInfoContentItem}>
              <div className={styles.playInfoItem1}/>
              <div className={styles.playInfoItem1}>福彩3D开奖</div>
              <div className={styles.playInfoItem3}>开奖时间21:30，每天开奖一期。</div>
            </div>
            <div className={styles.playInfoContentItem}>
              <div className={styles.playInfoItem1}>其他系列</div>
              <div className={styles.playInfoItem1}>体彩排列3</div>
              <div className={styles.playInfoItem3}>开奖时候20:45左右，每天开奖一期。</div>
            </div>
            <div className={styles.playInfoContentItem}>
              <div className={styles.playInfoItem1}/>
              <div className={styles.playInfoItem1}>香港彩</div>
              <div className={styles.playInfoItem3}>开奖时间为21:34左右，正常开奖时间为每周二，四，六开奖。</div>
            </div>
         </div>
      </div>
      </div>
    );
  }
}

export default PlayTime;
