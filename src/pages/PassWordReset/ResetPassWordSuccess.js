// 密码重置成功
import React, { PropTypes } from 'react';
import * as vstyles from './VerifyPassWord.css';
import * as styles from '../../assets/stylesheets/common.css';
import { replace, goBack } from 'react-router-redux';
import { dispatch } from '../../store';
import CommonNavBar from '../CommonNavBar/';

import Cookies from 'js-cookie';
import Steps from './components/Steps';
const leftIcon = require('../../assets/images/login-back.png');
const RightIcon = require('../../assets/images/login-kefu.png');
const successImg = require('../../assets/images/password_success.png');

class ResetPassWordSuccess extends React.PureComponent {
  _handleSubmit() {
    dispatch(replace('login'));
  }
  render() {
      const usernames = Cookies.get('username');
      // const kflink=usernames?coustomServiceURL+'&info=userId%3D1%26name%3D'+usernames+'&s=1&enterurl='+${window.location.origin}+'/?#/index.me':coustomServiceURL+'&info=userId%3D1%26name%3D游客&s=1&enterurl='+${window.location.origin}+'/?#/login';
      const kflink = usernames ? `${coustomServiceURL}&info=userId%3D1%26name%3D${usernames}&s=1&enterurl=${window.location.origin}/mobile.html?reset-passWord-success` : `${coustomServiceURL}&info=userId%3D1%26name%3D游客&s=1&enterurl=${window.location.origin}/mobile.html?reset-passWord-success`

    return (
      <div>
        <CommonNavBar
           headerTitle={'忘记密码'}
           leftIcon={leftIcon}
           rightIcon={RightIcon}
           leftAction={() => { dispatch(replace('reset-new-password'))}}
           rightAction={() => {
               Cookies.set('cc','');
               window.location.href = kflink;
           }}
        />
        <div className={vstyles.passwordContent}>
          <div className={vstyles.successBody}>
              <div><img src={ successImg } className={vstyles.successImg} /></div>
              <div className={vstyles.successText1}>密码重置成功</div>
              <div>请点击底部按钮登录</div>
          </div>
        </div>
        <div className={styles.bottomButton}>
          <div className={styles.clickLoginFormButtom}
            onClick={() => {
              this._handleSubmit();
            }}
          >
             去 登 录
          </div>
        </div>
      </div>
    );
  }
}

export default ResetPassWordSuccess;
