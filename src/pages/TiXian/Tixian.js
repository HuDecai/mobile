import React, { PropTypes } from 'react';
import { List } from 'antd-mobile';
import { connect } from 'react-redux';
import * as Tstyles from './styles.css';
import * as styles from '../../assets/stylesheets/common.css';
import { push, goBack } from 'react-router-redux';
import { dispatch } from '../../store';
import CommonNavBar from '../CommonNavBar/';
import * as HomePageAction from '../../actions/HomePageAction';
import * as BaseInfoAction from '../../actions/BaseInfoAction';
const See = require('../../assets/images/login-see.png');
const NoSee = require('../../assets/images/login-no-see.png');
const leftIcon = require('../../assets/images/login-back.png');
import Jianhang from '../../assets/images/jianhang.svg';
import Loading from '../../core/decorators/Loading';
import { checkAppVersion } from '../../actions/LoginAction';

@Loading(props => props.isFetching)
class Tixian extends React.PureComponent {
  constructor(props: Object) {
    super(props);
    this.state = {
      type: 1,
      selectMoney: '',
      password: '',
    };
  }
  componentWillMount() {
    checkAppVersion();
    HomePageAction.getUserCaptialInfo();
    BaseInfoAction.getBankCard();
    BaseInfoAction.tiXianInit()
  }
  transferAction() {
    const money = parseFloat(this.state.selectMoney);
    console.log(money);
    const password = this.state.password;
    const id = this.props.selectBankCard.get('id') ? this.props.selectBankCard.get('id') : this.props.bankCardList.toJS()[0].id;

    if(!this.props.tixianInit.get('todayWithdraw')) {
      alert('今日提现次数已到上限');
      return false;
    }
    if(!money || money < this.props.tixianInit.get('minMoney') || money > this.props.tixianInit.get('userMoney')) {
      alert('请正确填写提现金额');
      return false;
    }
    if(!id) {
      alert('请选择提现银行卡');
      return false;
    }
    if(!password) {
      alert('请填写密码');
      return false;
    }
    BaseInfoAction.tiXian({ money, password, id });
    this.setState({
      selectMoney: '',
      password: '',
    });
  }


    _imgIco(imgname){
        const imgStr=[];
        switch (imgname){
            case '中国工商银行':
                imgStr.push(<img style={{width:'auto',height:'auto'}} src={require('../../assets/images/cooperative_icbc.png')} className={styles.bankCardImgs} />)
                break;
            case '中国银行':
                imgStr.push(<img style={{width:'auto',height:'auto'}} src={require('../../assets/images/cooperative_04.png')} className={styles.bankCardImgs} />)
                break;
            case '中国建设银行':
                imgStr.push(<img style={{width:'auto',height:'auto'}} src={require('../../assets/images/cooperative_07.png')} className={styles.bankCardImgs} />)
                break;
            case '中国农业银行':
                imgStr.push(<img  style={{width:'auto',height:'auto'}} src={require('../../assets/images/cooperative_02.png')} className={styles.bankCardImgs} />)
                break;
            case '兴业银行':
                imgStr.push(<img style={{width:'auto',height:'auto'}} src={require('../../assets/images/cooperative_08.png')} className={styles.bankCardImgs} />)
                break;
            case '招商银行':
                imgStr.push(<img style={{width:'auto',height:'auto'}} src={require('../../assets/images/cooperative_10.png')} className={styles.bankCardImgs} />)
                break;
            case '中国民生银行':
                imgStr.push(<img  style={{width:'auto',height:'auto'}} src={require('../../assets/images/cooperative_05.png')} className={styles.bankCardImgs} />)
                break;
            case '邮政储蓄银行':
                imgStr.push(<img style={{width:'auto',height:'auto'}} src={require('../../assets/images/cooperative_yz.png')} className={styles.bankCardImgs} />)
                break;
            case '交通银行':
                imgStr.push(<img style={{width:'auto',height:'auto'}} src={require('../../assets/images/cooperative_09.png')} className={styles.bankCardImgs} />)
                break;
            default:

        }
        return imgStr;
    }


  render() {
    const { password, selectMoney } = this.state;
    const selectBankCard = this.props.selectBankCard.get('id') ? this.props.selectBankCard.toJS() : this.props.bankCardList.toJS()[0];
    console.log(JSON.stringify(this.props.tixianInit))
    return (
      <div>
          <CommonNavBar
             headerTitle={'提现'}
             leftIcon={leftIcon}
             leftAction={() => { dispatch(goBack())}}
          />
          <div className={Tstyles.formContent}>
             <div className={Tstyles.formtext}>用户余额：￥{this.props.userCaptial.get('useMoney')}</div>
             <div className={Tstyles.formtext}>提现银行</div>
             <List className="my-list">
               <List.Item
                  key={1}
                  style={{
                     height: '16vw',
                     position: 'relative',
                     marginTop: '2vw',
                     borderTop: '1px solid #c5c5c5',
                     borderBottom: '1px solid #c5c5c5'
                  }}
                  thumb={this._imgIco(selectBankCard && selectBankCard.attrName)}
                  multipleLine
                  onClick={() => {
                    dispatch(push('bank-card-select'));
                  }}
                  arrow="horizontal"
                >
                  <div>
                      <div style={{ color: '#5b5b5b', fontSize: '5.3vw' }}>
                          <span>{selectBankCard && selectBankCard.attrName}</span>

                          </div>
                    <div style={{ color: '#5b5b5b', fontSize: '4vw' }}>尾号{selectBankCard && selectBankCard.card && selectBankCard.card.slice(-4)}</div>
                  </div>
                </List.Item>
             </List>
             <div className={Tstyles.formtext}>提现金额</div>
             <div className={styles.loginNameAll} >
               <div style={{fontSize: '8vw'}}>￥</div>
               <div>
                   <input className={styles.inputTextAll}
                     type="text"
                     style={{ height: '9vw', fontSize: '8vw'}}
                     value={selectMoney}
                     onChange={(e) => this.setState({ selectMoney: e.target.value })}
                   />
                   <label className={styles.borderStyleAll} ></label>
               </div>
             </div>
             <div className={Tstyles.formtext}>请输入资金密码</div>
             <div className={styles.loginNameAll} >
               <div>
                 <input type="password"
                   className={styles.inputTextNoTitle}
                   value={this.state.password}
                   onChange={(e) => {
                     const value = e.target.value;
                     this.setState({ password: value });
                   }}
                 />
                 <label className={styles.borderStyleAll} ></label>
               </div>
               <div>
                 <img src={this.state.type ? NoSee : See}
                    onClick={() => {
                      const type = this.state.type;
                      this.setState({ type: !type });
                    }}
                    className={styles.passwordSee}
                    style={{ marginLeft: '4vw' }}
                 />
               </div>
             </div>
             <div className={password&&selectMoney ? styles.clickLoginFormButtom :styles.loginFormButtom}
               style={{ marginTop: '10vw'}}
               onClick={() => {
                 if(password&&selectMoney) {
                   this.transferAction();
                 }
               }}
             >
                申请提现
             </div>
          </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isFetching: state.HomePageReducer.get('isFetching'),
    userCaptial: state.HomePageReducer.get('userCaptial'),
    tixianInit: state.BaseInfoReducer.get('tixianInit'),
    selectBankCard: state.BaseInfoReducer.get('selectBankCard'),
    bankCardList: state.BaseInfoReducer.get('bankCardList'),
  };
};

export default connect(mapStateToProps)(Tixian);
