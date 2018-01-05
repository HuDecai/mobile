// 快捷支付
import React, { PropTypes } from 'react';
import { Toast } from 'antd-mobile';
import { connect } from 'react-redux';
import * as BaseInfoAction from '../../actions/BaseInfoAction';
import * as Rstyles from './styles.css';
import * as styles from '../../assets/stylesheets/common.css';
import { push, goBack } from 'react-router-redux';
import { dispatch } from '../../store';
import CommonNavBar from '../CommonNavBar/';
const leftIcon = require('../../assets/images/login-back.png');
import Cookies from 'js-cookie';
import Loading from '../../core/decorators/Loading';

// type = 1
@Loading(props => props.isFetching)
class RechargeQuick extends React.PureComponent {
  constructor(props: Object) {
    super(props);
    this.state = {
      errMsg: '',
      type: 0,
      money: '',
      selectMoneyIndex: '',
      bankcode: '',
    };
  }
  componentWillMount() {
    BaseInfoAction.getPayTypes();
  }
  showOption(options) {
    const view = [];
    if(options) {
      options.map((item, key) => {
        view.push(<option value={`${item.get('value')}-${item.get('code')}`} key={key}>{item.get('name')}</option>)
      });
    }
    return view;
  }
  _renderMoneyItems(){
    const {selectMoneyIndex} = this.state;
    var moneys = [100,500,1000,5000,50000];
    return moneys.map((item,index)=>{
      return (
          <div key={item} onClick={()=>this._selectMoneyIndex(index,item)} style={{marginLeft:index===0?0:5}}
               className={selectMoneyIndex === index ? Rstyles.moneyItemSelect : Rstyles.moneyItemNormal}>{item}</div>
      )
    })
  }
  _selectMoneyIndex(index,money){
    const {selectMoneyIndex} = this.state
    if (selectMoneyIndex === index){
      this.setState({ selectMoneyIndex: undefined, money:'' });
    }else{
      this.setState({selectMoneyIndex: index, money });
    }
  }
  submitAction() {
    let rechargeConfigId = 0;
    this.props.payTypes.map(item => {
      if(item.get('type') == '1') {
        rechargeConfigId = item.get('id');
      }
    });
    if(!rechargeConfigId || isNaN(Number(this.state.money))) {
      Toast.info('数据有误');
      return false;
    }
    const params = {
      rechargeConfigId,
      rechargeBank: this.state.type,
      rechargeMoney: this.state.money,
      bankCode: this.state.bankcode,
    }
    BaseInfoAction.recharge(params);
  }
  render() {
    const { type, money, errMsg } = this.state;
    const showErrorMsg = () => {
      const views = [];
      const errMsgs = errMsg;
      if(errMsgs) {
        return (
          <div style={{ fontSize: '3.5vw', color: '#de3c4b', textAlign: 'center', marginTop: '1vh'}}>
             {errMsgs}
          </div>);
      }
      return <div />;
    }
    return (
      <div>
        <CommonNavBar
           headerTitle={'快捷支付'}
           leftIcon={leftIcon}
           leftAction={() => { dispatch(goBack())}}
        />
        <div className={styles.bodyContent}>
          <div className={styles.AgentForm}>
            <div className={Rstyles.titleText}>充值线路</div>
            <select className={styles.selectStyle}
                value={`${this.state.type}-${this.state.bankcode}`}
                onChange={(e) => {
                  const value = e.target.value;
                  if(value) {
                    this.setState({ type: value.split('-')[0], bankcode: value.split('-')[1] });
                  }else {
                    this.setState({ type: '', bankcode: '' });
                  }
                }}
            >
                {this.showOption(this.props.bankList)}
            </select>
             <div className={Rstyles.titleText1}>充值金额</div>
             <div className={styles.loginNameAll} >
               <div>
                 <input className={styles.inputTextAll}
                   type="text"
                   value={money}
                   onChange={(e) => {
                     const value = e.target.value;
                     this.setState({ money: value, selectMoneyIndex: undefined });
                   }}
                 /> 
                 <label className={styles.borderStyleAll} ></label>
               </div>
             </div>
            {showErrorMsg()}
          </div>
          <div className={Rstyles.moneyContent}>
             {this._renderMoneyItems()}
          </div>
          <div className={Rstyles.bottomTishi}>
            温馨提示<br/>
            1.点击去充值后会通过手机浏览器进入充值页面 2.充值完成后，重新进入APP查看余额  3.请在15分钟内完成充值
          </div>
          <div className={money&&type ? styles.clickLoginFormButtom :styles.loginFormButtom}
            onClick={() => {
              if(money&&type) {
                this.submitAction();
              }
            }}
          >
             去 充 值
          </div>
        </div>
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    isFetching: state.BaseInfoReducer.get('isFetching'),
    bankList: state.BaseInfoReducer.get('bankList'),
    payTypes: state.BaseInfoReducer.get('payTypes'),
  };
};

export default connect(mapStateToProps)(RechargeQuick);
