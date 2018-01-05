import React from 'react';
import { push } from 'react-router-redux';
import { dispatch } from '../../store';
import styles from './styles.css';
const notice = require('../../assets/images/home-news.png');
const chongzhi = require('../../assets/images/home-page-chongzhi.png');
const duihuan = require('../../assets/images/home-page-jifen.png');

class HomePageUserInfo extends React.PureComponent {
  render() {
    const useMoney = this.props.userCaptial.get('useMoney');
    const points = this.props.userCaptial.get('points');
    return (
      <div className={styles.content}>
          <div className={styles.card1}>
              <div className={styles.card1Text}>用户余额</div>
              <div className={styles.card1Value}>￥{useMoney?useMoney.toFixed(3):0}</div>
          </div>
          <div className={styles.line} />
          <div className={styles.card1}>
              <div className={styles.card1Text}>累计积分</div>
              <div className={styles.card1Value}>{points}</div>
          </div>
          <div className={styles.card2}
              onClick={() => {
                dispatch(push('recharge'));
              }}
          >
              <div><img src={chongzhi} className={styles.card2Img} /></div>
              <div>快速充值</div>
          </div>
          <div className={styles.line2} />
          <div className={styles.card2}
             onClick={() => {
               dispatch(push('exchange'));
             }}
          >
              <div><img src={duihuan} className={styles.card2Img} /></div>
              <div>积分兑换</div>
          </div>
      </div>
    );
  }
}

export default HomePageUserInfo;
