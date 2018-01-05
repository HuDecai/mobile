// 密码重置成功
import React, { PropTypes } from 'react';
import * as Tstyles from './styles.css';
import * as styles from '../../assets/stylesheets/common.css';
import { replace, goBack, push } from 'react-router-redux';
import { dispatch } from '../../store';
import CommonNavBar from '../CommonNavBar/';
const leftIcon = require('../../assets/images/login-back.png');
import Suo from '../../assets/images/suo.svg';

class MoneyPassWordPrompt extends React.PureComponent {
  render() {
    return (
      <div>
        <CommonNavBar 
           headerTitle={'忘记密码'}
           leftIcon={leftIcon}
           leftAction={() => { dispatch(goBack())}}
        />
        <div className={Tstyles.passwordContent}>   
          <div className={Tstyles.successBody}>
              <div><Suo className={Tstyles.successImg} /></div>
              <div className={Tstyles.successText1}>需要设置资金密码后才能提现</div>
          </div>
        </div>
        <div className={styles.bottomButton}>
          <div className={styles.clickLoginFormButtom}
            onClick={() => {
              dispatch(replace('set-money-password'));
            }}
          >
             设置资金密码
          </div>
        </div>
      </div>
    );
  }
}

export default MoneyPassWordPrompt;
