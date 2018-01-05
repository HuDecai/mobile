// 组合所有组件  root component

import React, { PropTypes } from 'react';
import { Toast, List } from 'antd-mobile';
import CommonNavBar from '../CommonNavBar/';
import * as styles from './styles.css';
const leftIcon = require('../../assets/images/login-back.png');
import { push, goBack } from 'react-router-redux';
import { dispatch } from '../../store';
import Cookies from 'js-cookie';

class Tixian extends React.PureComponent {
  render() {
    return (
      <div>
          <CommonNavBar 
             headerTitle={'提现须知'}
             leftIcon={leftIcon}
             leftAction={() => { dispatch(goBack())}}
          />
          <div className={styles.helpContent}>
            <div className={styles.firstItem}><div className={styles.firstTitle}/><div>提现支持银行:</div></div>
            <div className={styles.firstItemImg}><div>亿合目前支持13家中国工商银行，建设银行，农业银行，中国银行，招商银行，民生银行，兴业银行，交通银行，邮政银行，光大银行，广发银行，华夏银行，中信银行的提现业务。</div></div>
            <br/>
            <div className={styles.firstItem}><div className={styles.firstTitle}/><div>提现时间:</div></div>
            <div className={styles.firstItemImg}><div>每天早10点到第二天的凌晨2点的工作时间内，均可进行提现业务。</div></div>
            <br/>
            <div className={styles.firstItem}><div className={styles.firstTitle}/><div>提现要求:</div></div>
            <div className={styles.firstItemImg}><div>需要达到存款的流水百分30%即可提现。</div></div>
            <br/>
            <div className={styles.firstItem}><div className={styles.firstTitle}/><div>提现限额:</div></div>
            <div className={styles.firstItemImg}><div>单次最低提现额度为100元，最高目前支持50,000元，单日最高提现为3次。（提现无需任何手续费）</div></div>
            <br/>
            <div className={styles.firstItem}><div className={styles.firstTitle}/><div>一个账户最多绑定银行卡几张？</div></div>
            <div className={styles.firstItemImg}><div>一个账号最多可以绑定5张银行卡，同一张卡同时只能绑定在一个平台账号上，不能在其他账号上再次绑定该银行卡，客户在前台无法看到本人绑定的银行卡账户名和开户行地址，绑定或者修改银行卡两个小时后才能提款。（重新绑定或者删除银行卡都需要输入已绑定银行卡信息。）</div></div>
            <br/>
            <div className={styles.firstItem}><div className={styles.firstTitle}/><div>绑定银行卡注意事项:</div></div>
            <div className={styles.firstItemImg}>
              <div>
                  <div>1.银行卡信息锁定后，不能增加新卡绑定，锁定的银行卡信息不能进行修改和删除。</div>
                  <div>2.请务必正确填写开户行和银行卡号码、匹配姓名。匹配姓名作为取款、重置密码等凭证，用户不能自行修改。</div>
                  <div>3.银行卡资料仅作取款用，在注册时可以不填，不过在提款之前请务必填写详细。姓名必须与银行卡户名相同，否则提款将不成功。</div>
              </div>
            </div>
         </div>
      </div>
    );
  }
}

export default Tixian;
