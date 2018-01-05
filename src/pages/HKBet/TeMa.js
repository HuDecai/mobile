import React, { PropTypes } from 'react';
import Immutable from 'immutable';
import * as HKBetAction from '../../actions/HKBetAction';
import styles from './styles.css';
const HongBo = [1,2,7,8,12,13,18,19,23,24,29,30,34,35,40,45,46];
const LanBo = [3,4,9,10,14,15,20,25,26,31,36,37,41,42,47,48];
const LvBo = [5,6,11,16,17,21,22,27,28,32,33,38,39,43,44,49];

export default class TeMa extends React.PureComponent {
  remove(val) {
    const status = this.props.touzhuDetail
    var index = status.indexOf(val);
    if (index > -1) {
       status.splice(index, 1);
    }
    HKBetAction.xiaZhuNumber({numbers: [...status]});
  }
  changeState(value) {
    if(this.props.touzhuDetail.indexOf(value) !== -1) {
      // 删除
      const delData = this.remove(value);
    } else {
      // 添加
      const status = [...this.props.touzhuDetail, value].sort();
      HKBetAction.xiaZhuNumber({numbers: status });
    }
  }
  render() {
    const getNumber =(number) => {
      return `0${number}`.substr(-2);
    }
    const showTeMaCard = (hongKongTeMa) => {
      const views = [];
      if(hongKongTeMa) {
        hongKongTeMa.map((item, key) => {
          let Styles = null;
          if(HongBo.indexOf(item.get('number')) !== -1) {
            Styles = styles.ballOne;
          }else if(LanBo.indexOf(item.get('number')) !== -1) {
            Styles= styles.ballThree;
          }else if(LvBo.indexOf(item.get('number')) !== -1) {
            Styles= styles.ballTwo;
          }
          views.push(
            <div 
              key={key}
              onClick={() => { this.changeState(getNumber(item.get('number'))) }}
              className={ this.props.touzhuDetail.indexOf(getNumber(item.get('number'))) !== -1 ? styles.selectPlayContentCard : styles.playContentCard}
            >
               <div className={Styles}>{getNumber(item.get('number'))}</div>
               <div>{item.get('bonus')}</div>
            </div>
          )
        })
      }
      return views;
    }
    return (
      <div className={styles.playContent}>
         {showTeMaCard(this.props.hongKongTeMa)}
      </div>
    );
  }
}
