// 密码重置成功
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import * as styles from './styles.css';
import { push, goBack, replace } from 'react-router-redux';
import { dispatch } from '../../store';
import CommonNavBar from '../CommonNavBar/';
const leftIcon = require('../../assets/images/login-back.png');
const successImg = require('../../assets/images/password_success.png');

class ExchangeSuccess extends React.PureComponent {
  render() {
    return (
      <div>
        <CommonNavBar 
           headerTitle={'兑换成功'}
           leftIcon={leftIcon}
           leftAction={() => { dispatch(goBack()) }}
        />
        <div className={styles.successBody}>
            <div><img src={ successImg } className={styles.successImg} /></div>
            <div className={styles.successText1}>兑换成功！</div>
            <div className={styles.successText1}>消耗积分<span> {this.props.changePoints.get('points')}</span>积分</div>
            <div className={styles.successText1}>系统已将<span> {this.props.changePoints.get('pointsMoney')}</span>元 资金放入您的账户中</div>
            <div className={styles.successText2}
               onClick={() => {
                 dispatch(replace('fund-details'));
               }}
            >查看资金明细</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    changePoints: state.HomePageReducer.get('changePoints'),
  };
};

export default connect(mapStateToProps)(ExchangeSuccess);
