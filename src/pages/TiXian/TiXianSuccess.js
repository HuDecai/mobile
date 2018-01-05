// 密码重置成功
import React, { PropTypes } from 'react';
import * as Tstyles from './styles.css';
import { replace, goBack } from 'react-router-redux';
import { dispatch } from '../../store';
import CommonNavBar from '../CommonNavBar/';
const leftIcon = require('../../assets/images/login-back.png');
const successImg = require('../../assets/images/password_success.png');

class TixianSuccess extends React.PureComponent {
  render() {
    return (
      <div>
        <div>   
          <CommonNavBar 
             headerTitle={'提现成功'}
             leftIcon={leftIcon}
             leftAction={() => { dispatch(goBack())}}
          />
          <div className={Tstyles.successBodys}>
              <div><img src={ successImg } className={Tstyles.successImgs} /></div>
              <div className={Tstyles.successText1}>提现申请成功</div>
          </div>
        </div>
      </div>
    );
  }
}

export default TixianSuccess;
