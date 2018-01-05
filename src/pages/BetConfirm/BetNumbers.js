import React, { PropTypes } from 'react';
import Immutable from 'immutable';
import { connect } from 'react-redux';
import * as styles from './BetConfirm.css';
import * as LotteryAction from '../../actions/LotteryAction';
import { push, goBack } from 'react-router-redux';
import LotteryResult from './LotteryResult';
import LotteryTime from './LotteryTime';
import { dispatch } from '../../store';
import CommonNavBar from '../CommonNavBar/';
import Additional from './Additional';
const leftIcon = require('../../assets/images/login-back.png');
import { chooseFiveLids, danshiId } from '../../core/lottery/fanshuiData.js';


class BetNumber extends React.PureComponent {
  render() {
    let pickData = {};
    try{
      pickData = this.props.pickDataList.toJS()[0];
    }catch(e) {}
    const showNumber = (number) =>  {
      let numbers = number;
      if(!numbers || !pickData) {
        return;
      }
      // 龙虎号码显示
      if (pickData.way && pickData.way.indexOf('龙虎') > -1) {
            numbers = numbers && numbers.split('-');
            numbers = numbers && numbers.map(number => {
              if (number == '1') {
                return '龙';
              } else if (number == '2') {
                return '虎';
              } else if (number == '3') {
                return '和';
              }
            });
            numbers = numbers && numbers.join('-');
      }
      //11选5 号码显示
      if(chooseFiveLids.indexOf(Number(this.props.lId)) !== -1) {
        if(danshiId.indexOf(Number(pickData.playKindId)) !== -1) {
          if(pickData.playKindId == 493 || pickData.playKindId == 497) {
           numbers = numbers && numbers.split(',');
           numbers = numbers && numbers.map(number => {
             return `0${number}`.substr(-2);
           });
           numbers = numbers && numbers.join(',');
         } else if(pickData.playKindId  == 495 || pickData.playKindId  == 499) {
           numbers = numbers && numbers.split('-');
           numbers = numbers && numbers.map(number => {
             return `0${number}`.substr(-2);
           });
           numbers = numbers && numbers.join('-');
         } else {
           // 11选5 单式展示
           numbers = numbers && numbers.split('#');
           numbers = numbers && numbers.map(number => {
             return `0${number}`.substr(-2);
           });
           numbers = numbers && numbers.join('#');
         }
        }else if(pickData.playKindId  == 345 ) {
          // 11选5 定单双
          numbers = numbers && numbers.split('-');
          numbers = numbers && numbers.map(number => {
            if (number == '1') {
              return '0单5双';
            } else if (number == '2') {
              return '1单4双';
            } else if (number == '3') {
              return '2单3双';
            } else if (number == '4') {
              return '3单2双';
            } else if (number == '5') {
              return '4单1双';
            } else if (number == '6') {
              return '5单0双';
            }
          });
          numbers = numbers && numbers.join('-');
        } else {
          // 11选5 其他
          numbers = numbers && numbers.split(',');
          numbers = numbers && numbers.map(number => {
               number = number && number.split('-');
               number = number && number.map(number => {
                 return `0${number}`.substr(-2);
               });
               return number && number.join('-');
          });
          numbers = numbers && numbers.join(',');
        }
      }
      return numbers.split(',').map(item => `{${item}}`).join(',');    
    }
    return (
      <div>
        <CommonNavBar 
           headerTitle={'选号内容'}
           leftIcon={leftIcon}
           leftAction={() => { dispatch(goBack())}}
        />
        <div className={styles.showNumberAll}>{showNumber(pickData && pickData.number)}</div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    pickDataList: state.LotteryReducer.get('pickDataList'),
  };
};

export default connect(mapStateToProps)(BetNumber);
