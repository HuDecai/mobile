// 组合所有组件  root component

import React, { PropTypes } from 'react';
import { Toast, List } from 'antd-mobile';
import CommonNavBar from '../CommonNavBar/';
import * as styles from './styles.css';
const leftIcon = require('../../assets/images/login-back.png');
import { push, goBack } from 'react-router-redux';
import { dispatch } from '../../store';
import Cookies from 'js-cookie';

class Safe extends React.PureComponent {
  render() {
    return (
      <div>
          <CommonNavBar 
             headerTitle={'安全须知'}
             leftIcon={leftIcon}
             leftAction={() => { dispatch(goBack())}}
          />
          <div className={styles.helpContent}>
            <div>
                <div>1.注册之后请及时登录账户，修改登录密码和设置资金密码，完善密保问题。</div><br/>
                <div>2.妥善保管好您的登录密码，资金密码，密保问题，切勿相信他人以任何理由向您索要登录账户、登录密码、提现密码。</div><br/>
                <div>3.切勿相信他人告知的虚假优惠信息（请以平台公告为准，如有问题请咨询在线客服）</div><br/>
                <div>4.避免轻易接受陌生人给您传送的图片或者文件，以免您的电脑中病毒或木马导致账号被盗，定期对电脑进行安全检查。</div><br/>
                <div>5.忘记密码通过忘记密码取回，验证账号登入密码，资金密码，密保问题，重新修改登入密码或通过在线客服联系提供相关资料，审核完善后发送邮箱更改密码。</div>
           </div>
         </div>
      </div>
    );
  }
}

export default Safe;
