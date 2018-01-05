import React, { PropTypes } from 'react';
import Immutable from 'immutable';
import * as HKBetAction from '../../actions/HKBetAction';
import styles from './TwoSides.css';

export default class TwoSides extends React.PureComponent {
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
    const showTwoSidesCard = (hongKongTwoSide) => {
      const views = [];
      if(hongKongTwoSide) {
        hongKongTwoSide.map((item, key) => {
          views.push(
            <div onClick={() => { this.changeState(item.get('number')) }} 
            className={ this.props.touzhuDetail.indexOf(item.get('number')) !== -1 ? styles.selectPlayContentCard : styles.playContentCard}
            >
              <div>{item.get('name')}</div>
              <div>{item.get('bonus')}</div>
            </div>
          )
        })
      }
      return views;
    }
    return (
      <div className={styles.playContent}>
         {showTwoSidesCard(this.props.hongKongTwoSide)}
      </div>
    );
  }
}
