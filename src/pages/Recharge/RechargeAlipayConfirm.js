// 支付宝转账
import React, { PropTypes } from 'react';
import { Toast } from 'antd-mobile';
import { connect } from 'react-redux';
import * as styles from './styles.css';
import * as commonStyles from '../../assets/stylesheets/common.css';
import { push, goBack } from 'react-router-redux';
import { dispatch } from '../../store';
import CommonNavBar from '../CommonNavBar/';
const leftIcon = require('../../assets/images/login-back.png');
import copy from 'copy-to-clipboard';

class RechargeAlipayConfirm extends React.PureComponent {

  render() {
    const bankInfo = this.props.bankInfos.toJS()[0];
    return (
      <div>
          <CommonNavBar
             headerTitle={'支付宝转账'}
             leftIcon={leftIcon}
             leftAction={() => { dispatch(goBack())}}
          />
          <div className={commonStyles.bodyContent}>
            <div className={styles.titleText}>充值确认</div>
            <div className={styles.rechargeDetailContainer}>
                <div className={styles.rechargeDetailBankContainer}>
                    <div className={styles.rechargeDetailSubTitle}>
                      <div className={styles.rechargeDetailSubTitle1}>充值银行： </div>
                      <div>支付宝</div>
                    </div>
                </div>

                <div className={styles.rechargeDetailBankContainer}>
                  <div className={styles.rechargeDetailSubTitle}>
                       <div className={styles.rechargeDetailSubTitle1}>充值金额：</div>
                       <div style={{ color: '#de3c4b'}}>{this.props.rechargeInfo && this.props.rechargeInfo.get('money')}元</div>
                  </div>
                  <div
                      className={styles.copyButton}
                      onClick={() => { copy(this.props.rechargeInfo.get('money'));Toast.info('复制成功', 2)}}
                  >
                    复 制
                  </div>
                </div>

                <div className={styles.rechargeDetailBankContainer}>
                  <div className={styles.rechargeDetailSubTitle}>
                      <div className={styles.rechargeDetailSubTitle1}>支付宝名称：</div>
                      <div>{this.props.rechargeInfo && this.props.rechargeInfo.get('alipayName')}</div>
                  </div>
                  <div
                      className={styles.copyButton}
                      onClick={() => { copy(this.props.rechargeInfo.get('alipayName'));Toast.info('复制成功', 2)}}
                  >
                    复 制
                  </div>
                </div>
            </div>
            <div className={styles.titleText}>收款方信息</div>
            <div className={styles.rechargeDetailContainer}>
                <div className={styles.rechargeDetailBankContainer}>
                    <div className={styles.rechargeDetailSubTitle}>
                      <div className={styles.rechargeDetailSubTitle1}>收款银行： </div>
                      <div>{bankInfo && bankInfo.bank_name}</div>
                    </div>
                </div>

                <div className={styles.rechargeDetailBankContainer}>
                  <div className={styles.rechargeDetailSubTitle}>
                      <div className={styles.rechargeDetailSubTitle1}>收款账户名：</div>
                      <div>{bankInfo && bankInfo.account_name}</div>
                  </div>
                  <div
                      className={styles.copyButton}
                      onClick={() => { copy(bankInfo.account_name);Toast.info('复制成功', 2)}}
                  >
                    复 制
                  </div>
                </div>

                <div className={styles.rechargeDetailBankContainer}>
                  <div className={styles.rechargeDetailSubTitle} >
                      <div className={styles.rechargeDetailSubTitle1}>收款帐号：</div>
                      <div>{bankInfo && bankInfo.card_no}</div>
                  </div>
                  <div
                      className={styles.copyButton}
                      onClick={() => { copy(bankInfo.card_no);Toast.info('复制成功', 2) }}
                  >
                    复 制
                  </div>
                </div>


                <div className={styles.rechargeDetailBankContainer}>
                  <div className={styles.rechargeDetailSubTitle}>
                        <div className={styles.rechargeDetailSubTitle1}>开户行地址：</div>
                        <div>{bankInfo && bankInfo.open_bank}</div>
                  </div>
                  <div
                      className={styles.copyButton}
                      onClick={() => { copy(bankInfo.open_bank);Toast.info('复制成功', 2)}}
                  >
                    复 制
                  </div>
                </div>

                 <div className={styles.rechargeDetailBankContainer}>
                    <div className={styles.rechargeDetailSubTitle}>
                        <div className={styles.rechargeDetailSubTitle1}>附言：</div>
                        <div style={{ color: '#de3c4b'}}>{this.props.bankCode}</div>
                    </div>
                    <div
                        className={styles.copyButton}
                        onClick={() => { copy(this.props.bankCode);message.success('复制成功') }}
                    >
                      复 制
                    </div>
              </div>
            </div>
            <div className={styles.bottomText}>
                附言在部分网站会以"备注"，"用途"等名词出现，<br />请务必正确填写此项信息，填写错误或者不填写会影响充值到账。
            </div>
          </div>
          <div className={commonStyles.bottomButton}>
            <div className={commonStyles.clickLoginFormButtom}
                onClick={() => {
                  // window.open(this.props.bankUrl)
                  dispatch(push('/frame?src='+this.props.bankUrl));
                }}
            >
               登录网上银行付款
            </div>
          </div>
       </div>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    bankInfos: state.BaseInfoReducer.get('bankInfos'),
    rechargeInfo: state.BaseInfoReducer.get('rechargeInfo'),
    bankCode: state.BaseInfoReducer.get('bankCode'),
    bankUrl: state.BaseInfoReducer.get('bankUrl'),
  };
};

export default connect(mapStateToProps)(RechargeAlipayConfirm);
