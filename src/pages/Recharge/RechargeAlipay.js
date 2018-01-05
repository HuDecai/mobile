// 支付宝转账
import React, { PropTypes } from 'react';
import { Toast } from 'antd-mobile';
import { connect } from 'react-redux';
import * as Rstyles from './styles.css';
import * as styles from '../../assets/stylesheets/common.css';
import { push, goBack } from 'react-router-redux';
import { dispatch } from '../../store';
import CommonNavBar from '../CommonNavBar/';
import * as BaseInfoAction from '../../actions/BaseInfoAction';
const leftIcon = require('../../assets/images/login-back.png');
import Cookies from 'js-cookie';
import Loading from '../../core/decorators/Loading';

@Loading(props => props.isFetching)
class RechargeAlipay extends React.PureComponent {
  constructor(props: Object) {
    super(props);
    this.state = {
      money: '',
      selectMoneyIndex: '',
      alipayName: '',
    };
  }
  componentWillMount() {
    BaseInfoAction.getPayTypes();
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
    if(isNaN(Number(this.state.money))) {
      Toast.info('数据有误');
      return false;
    }
    const params = {
      money: this.state.money,
      type: '5',
      alipayName: this.state.alipayName,
    };
    BaseInfoAction.getBankInfo(params,(result)=>{
      dispatch(push('recharge-alipay-confirm'));
      params.receiveBankId = result.data[0].id
      console.log(params);
      BaseInfoAction.rechargeBank(params)
    })
  }
  render() {
    return (
      <div>
        <CommonNavBar
           headerTitle={'支付宝转账'}
           leftIcon={leftIcon}
           leftAction={() => { dispatch(goBack())}}
        />
        <div className={styles.bodyContent}>
            <div className={styles.AgentForm}>
              <div className={Rstyles.titleText}>请输入支付宝真实名字</div>
              <div className={styles.loginNameAll} >
                <div>
                  <input className={styles.inputTextAll}
                    type="text"
                    value={this.state.alipayName}
                    onChange={(e) => {
                      const value = e.target.value;
                      this.setState({ alipayName: value });
                    }}
                  /> 
                  <label className={styles.borderStyleAll} ></label>
                </div>
              </div>
               <div className={Rstyles.titleText1}>转账金额</div>
               <div className={styles.loginNameAll} >
                 <div style={{ fontSize: '8vw' }}>￥</div>
                 <div>
                   <input className={styles.inputTextAll}
                     value={this.state.money}
                     type="text"
                     style={{ fontSize: '8vw' }}
                     onChange={(e) => {
                       const value = e.target.value;
                       this.setState({ money: value, selectMoneyIndex: undefined });
                     }}
                   /> 
                   <label className={styles.borderStyleAll} ></label>
                 </div>
               </div>
            </div>
            <div className={Rstyles.moneyContent}>
               {this._renderMoneyItems()}
            </div>
            <div className={Rstyles.bottomTishi}>
              温馨提示<br/>
              1.点击去充值后会通过手机浏览器进入充值页面 2.充值完成后，重新进入APP查看余额  3.请在15分钟内完成充值
            </div>
            <div className={this.state.money&&this.state.alipayName ? styles.clickLoginFormButtom :styles.loginFormButtom}
              onClick={() => {
                if(this.state.money&&this.state.alipayName) {
                  this.submitAction();
                }
              }}
            >
               下 一 步
            </div>
        </div>
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    isFetching: state.BaseInfoReducer.get('isFetching'),
    payTypes: state.BaseInfoReducer.get('payTypes'),
  };
};

export default connect(mapStateToProps)(RechargeAlipay);
