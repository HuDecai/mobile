import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import * as styles from './BetSuccess.css';
import * as commonStyles from '../../assets/stylesheets/common.css';
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
           headerTitle={'投注成功'}
           leftIcon={leftIcon}
           leftAction={() => { dispatch(goBack()) }}
        />
        <div className={styles.successBody}>
            <div><img src={ successImg } className={styles.successImg} /></div>
            <div className={styles.successText1}>成功投注！</div>
            {this.props.betInfo.get('lId') == 15 && 
              <div>
                <div className={styles.successText1}>期号 {this.props.betInfo.get('expect')} 期</div>
                <div className={styles.successText1}>投注金额<span> {this.props.betInfo.get('money')}</span>元</div>
              </div>}
            <div className={styles.successText2}
               onClick={() => {
                 const lId = this.props.betInfo.get('lId');
                 if(lId == 15) {
                   dispatch(replace('HongKong-recode'));
                 }else {
                   if(this.props.betInfo.get('isChase')) {
                     dispatch(replace('chase-recode'));
                   }else {
                     dispatch(replace('bet-record'));
                   }
                 }
               }}
            >查看记录</div>
        </div>
        {/*   form button   */}
        <div className={commonStyles.bottomButton}>
          <div className={commonStyles.clickLoginFormButtom}
            onClick={() => {
              dispatch(goBack());
            }}
          >
             继续投注
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    betInfo: state.HKBetReducer.get('betInfo'),
  };
};

export default connect(mapStateToProps)(ExchangeSuccess);
