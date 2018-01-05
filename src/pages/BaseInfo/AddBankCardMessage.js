// 密码重置成功
import React, { PropTypes } from 'react';
import * as Bstyles from './styles.css';
import * as styles from '../../assets/stylesheets/common.css';
import { replace, goBack } from 'react-router-redux';
import { dispatch } from '../../store';
import CommonNavBar from '../CommonNavBar/';
const leftIcon = require('../../assets/images/login-back.png');
import Suo from '../../assets/images/suo.svg';

class AddBankCardMessage extends React.PureComponent {
  render() {
    return (
      <div>
        <CommonNavBar 
           headerTitle={'新增银行卡'}
           leftIcon={leftIcon}
           leftAction={() => { dispatch(goBack())}}
        />
        <div className={Bstyles.passwordContent}>   
          <div className={Bstyles.successBody}>
              <div><Suo className={Bstyles.successImg} /></div>
              <div className={Bstyles.successText1}>需要设置安全密码和密保问题后才可新增银行卡</div>
          </div>
        </div>
        <div className={styles.bottomButton}>
          <div className={styles.clickLoginFormButtom}
            onClick={() => {
              dispatch(replace('set-money-password'));
            }}
          >
             去设置
          </div>
        </div>
      </div>
    );
  }
}

export default AddBankCardMessage;
