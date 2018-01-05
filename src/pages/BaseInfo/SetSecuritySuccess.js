// 密码重置成功
import React, { PropTypes } from 'react';
import * as Tstyles from './styles.css';
import * as commonStyles from '../../assets/stylesheets/common.css';
import { replace, goBack } from 'react-router-redux';
import { dispatch } from '../../store';
import CommonNavBar from '../CommonNavBar/';
const leftIcon = require('../../assets/images/login-back.png');
const successImg = require('../../assets/images/password_success.png');

class SetSecuritySuccess extends React.PureComponent {
  render() {
    return (
      <div>
        <CommonNavBar 
           headerTitle={'设置密保问题'}
           leftIcon={leftIcon}
           leftAction={() => { dispatch(replace('personal-setting'))}}
        />
        <div className={Tstyles.successBody}>
            <div><img src={ successImg } className={Tstyles.successImg} /></div>
            <div className={Tstyles.successText1}>密保问题修改成功</div>
        </div>
        <div className={commonStyles.bottomButton}>
          <div className={commonStyles.clickLoginFormButtom}
            onClick={() => {
              dispatch(replace('personal-setting'));
            }}
          >
             返 回
          </div>
        </div>
      </div>
    );
  }
}

export default SetSecuritySuccess;
