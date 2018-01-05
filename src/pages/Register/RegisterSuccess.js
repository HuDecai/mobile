import React, { PropTypes } from 'react';
import * as styles from './styles.css';
import * as commonStyles from '../../assets/stylesheets/common.css';
import { push, goBack, replace } from 'react-router-redux';
import { dispatch } from '../../store';
const leftIcon = require('../../assets/images/register-left.png');
const RightIcon = require('../../assets/images/register-rigth.png');

const successImg = require('../../assets/images/password_success.png');

class RegisterSuccess extends React.PureComponent {
  render() {
    return (
      <div>
        <div className={styles.navBar}>
          <div className={styles.leftAction}><img src={leftIcon} className={styles.leftImg} /></div>
          <div className={styles.headerTitle}>新用户注册</div>
          <div className={styles.rightAction} />
        </div>
        <div className={styles.successBody}>
            <div><img src={ successImg } className={styles.successImg} /></div>
            <div className={styles.successText1}>注册成功</div>
            <div className={styles.successText1}>请点击底部按钮去下载<span style={{ color: '#459ad6' }}>亿合娱乐APP</span></div>
        </div>
        {/*   form button   */}
        <div className={commonStyles.bottomButton}>
          <div className={commonStyles.clickLoginFormButtom}
            onClick={() => {
              dispatch(replace('boot-page'))
            }}
          >
             去 下 载
          </div>
        </div>
      </div>
    );
  }
}

export default RegisterSuccess;
