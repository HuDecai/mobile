import React, { PropTypes } from 'react';
import { Toast } from 'antd-mobile';
import { connect } from 'react-redux';
import * as BaseInfoAction from '../../actions/BaseInfoAction';
import CommonNavBar from '../CommonNavBar/';
import * as styles from './styles.css';
const leftIcon = require('../../assets/images/login-back.png');
const jianhang = require('../../assets/images/jianhang.png');
import { push, goBack } from 'react-router-redux';
import { dispatch } from '../../store';
import Cookies from 'js-cookie';
import Loading from '../../core/decorators/Loading';
import { checkAppVersion } from '../../actions/LoginAction';

@Loading(props => props.isFetching)
class BankCardManage extends React.PureComponent {
  componentWillMount() {
    BaseInfoAction.getBankCard();
    checkAppVersion();
  }
    _imgIco(imgname){
      const imgStr=[];
switch (imgname){
    case '中国工商银行':
        imgStr.push(<div><img src={require('../../assets/images/cooperative_icbc.png')} className={styles.bankCardImg} /></div>)
        break;
    case '中国银行':
        imgStr.push(<div><img src={require('../../assets/images/cooperative_04.png')} className={styles.bankCardImg} /></div>)
        break;
    case '中国建设银行':
        imgStr.push(<div><img src={require('../../assets/images/cooperative_07.png')} className={styles.bankCardImg} /></div>)
        break;
    case '中国农业银行':
        imgStr.push(<div><img src={require('../../assets/images/cooperative_02.png')} className={styles.bankCardImg} /></div>)
        break;
    case '兴业银行':
        imgStr.push(<div><img src={require('../../assets/images/cooperative_08.png')} className={styles.bankCardImg} /></div>)
        break;
    case '招商银行':
        imgStr.push(<div><img src={require('../../assets/images/cooperative_10.png')} className={styles.bankCardImg} /></div>)
        break;
    case '中国民生银行':
        imgStr.push(<div><img src={require('../../assets/images/cooperative_05.png')} className={styles.bankCardImg} /></div>)
        break;
    case '邮政储蓄银行':
        imgStr.push(<div><img src={require('../../assets/images/cooperative_yz.png')} className={styles.bankCardImg} /></div>)
        break;
    case '交通银行':
        imgStr.push(<div><img src={require('../../assets/images/cooperative_09.png')} className={styles.bankCardImg} /></div>)
        break;
}
return imgStr;
}
  showBankCardList(data) {
    const views = [];
    if(data) {
      data.map((item) => {
        views.push(
          <div className={styles.bankCard}
             onClick={() => {
               dispatch(push('delete-bank-card'));
               BaseInfoAction.setBankCard(item.toJS());
             }}
          >
              {this._imgIco(item.get('attrName'))}
              <div className={styles.bankCardContent}>
                  <div className={styles.bankCardTop}>
                      <div className={styles.bankCardTopText1}>{item.get('attrName')}</div>
                      <div className={styles.bankCardTopText2}>储蓄卡</div>
                  </div>
                  <div className={styles.bankCardTopText3}>{item.get('shotCard')}</div>
              </div>
          </div>
        )
      })
    }
    return views;
  }
  render() {
    return (
      <div>
          <CommonNavBar
             headerTitle={'我的银行卡'}
             leftIcon={leftIcon}
             leftAction={() => { dispatch(goBack())}}
          />
          <div className={styles.bankContent}>
              {this.showBankCardList(this.props.bankCardList)}
              <div className={styles.addBankContent}
                onClick={() => {
                  const hasSafePassword = Cookies.get('hasSafePassword');
                  if(hasSafePassword == 1) {
                     dispatch(push('add-bank-card-message'));
                  }else {
                    dispatch(push('add-bank-card'));
                  }
                }}
              >
                  <div className={styles.addBankText}>+</div>
                  <div className={styles.addBankText1}>新增银行卡</div>
              </div>
          </div>
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return {
     isFetching: state.BaseInfoReducer.get('isFetching'),
     bankCardList: state.BaseInfoReducer.get('bankCardList'),
  };
};

export default connect(mapStateToProps)(BankCardManage);
