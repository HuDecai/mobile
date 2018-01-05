// 组合所有组件  root component

import React, { PropTypes } from 'react';
import { Toast } from 'antd-mobile';
import * as LoginAction from '../../actions/LoginAction';
import * as styles from './styles.css';
const leftIcon = require('../../assets/images/login-back.png');
import { push, goBack } from 'react-router-redux';
import { dispatch } from '../../store';
import Cookies from 'js-cookie';
import { pk10Lids, pk10NumsColor as Colors, HongBo, LanBo, LvBo } from '../LotteryRecord/common/LotteryLidsData';

class TrendCard extends React.PureComponent {
  getNumber(number){
    return `0${number}`.substr(-2);
  }
  showLotterNum(lId) {
    const views = [];
    const data = this.props.trendList.toJS()[0];
    if(pk10Lids.indexOf(lId) !== -1) {
      // pk10
      const number = data.result.split(',');
      number.map((item, key) => {
        views.push(
          <div className={styles.pk10NumStyle} style={{ background: `${Colors[item-1]}` }}>{item}</div>
        )
      })
      
    }else if(lId == 15) {
      const numbers = data.result.split('+');
      const number = numbers[0].split(',');
      number.map((item, key) => {
        const Styles = this.getNumberStyle(Number(item));
        views.push(
          <div className={Styles}>{item}</div>
        )
      });
      views.push(
        <div style={{ fontSize: '5vw', marginRight: '2vw' }}> + </div>
      )
      const Styles = this.getNumberStyle(Number(numbers[1]));
      views.push(
        <div className={Styles}>{numbers[1]}</div>
      )
    }else if(lId == 26) {
      const number = data.result.split(',');
      number.map((item, key) => {
        views.push(
          <div className={styles.numStyle}>{this.getNumber(item)}</div>
        )
      })
    }else {
      const number = data.result.split(',');
      number.map((item, key) => {
        views.push(
          <div className={styles.numStyle}>{item}</div>
        )
      })
    }
    return views;
  }
  getNumberStyle(number) {
    let Styles = null;
    if(HongBo.indexOf(number) !== -1) {
      Styles = styles.ballOne;
    }else if(LanBo.indexOf(number) !== -1) {
      Styles= styles.ballThree;
    }else if(LvBo.indexOf(number) !== -1) {
      Styles= styles.ballTwo;
    }
    return Styles;
  }
  showLotteryQuShi(trendList) {
    const views = [];
    if(trendList) {
      trendList.map((item, key) => {
        const number = item.get('result').split(',');
        if(key) {
          views.push(
            <div className={styles.listItem}>
                <div style={{ marginRight: '2vw'}}>第{item.get('expect')}期</div>
                <div style={{ display: 'flex' }}>{
                  number && number.map((item) => {
                    return <div style={{ marginRight: '1vw' }}>{item}</div>
                  })
                }</div>
            </div>
          );
        }
      })
    }
    return views;
  }
  render() {
    let expect = '';
    try{
      expect = this.props.trendList.toJS()[0].expect;
    }catch(e){  
    }
    return (
      <div className={styles.trendCard}>
        <div className={styles.trendHeader}>
            <div
              onClick={() => {
                dispatch(push(`lottery-record/${this.props.lId}`));
              }}
            ><span className={styles.lotteryName}>{this.props.lotteryName}</span>
            &nbsp;<span className={styles.lotteryQishu}>第{expect}期</span></div>
            <div className={styles.lotteryTouZhu}
               onClick={() => {
                 dispatch(push(`/lottery/${this.props.lId}`));
               }}
            >去投注 >> </div>
        </div>
        <div className={styles.lotteryNums}
          onClick={() => {
            dispatch(push(`lottery-record/${this.props.lId}`));
          }}
        >
            {this.showLotterNum(this.props.lId)}
        </div>
        <div
          onClick={() => {
            dispatch(push(`lottery-record/${this.props.lId}`));
          }}
        >
            {this.showLotteryQuShi(this.props.trendList)}
        </div>
      </div>
    );
  }
}

export default TrendCard;
