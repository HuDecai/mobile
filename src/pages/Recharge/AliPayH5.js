
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
class RechargeWechat extends React.PureComponent {
  constructor(props: Object) {
    super(props);
    this.state = {
      money: '',
      selectMoneyIndex: '',
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
    let rechargeConfigId = 0;
    this.props.payTypes.map(item => {
      if(item.get('type') == '7') {
        rechargeConfigId = item.get('id');
      }
    });
    if(!rechargeConfigId || isNaN(Number(this.state.money))) {
      Toast.info('数据有误');
      return false;
    }
    const params = {
      rechargeConfigId,
      rechargeMoney: this.state.money,
    }
    BaseInfoAction.recharge(params);
  }
  render() {
    return (
      <div>
        <CommonNavBar
           headerTitle={'支付宝H5'}
           leftIcon={leftIcon}
           leftAction={() => { dispatch(goBack())}}
        />    
        <div className={styles.bodyContent}>
            <div className={styles.AgentForm}>
               <div className={Rstyles.titleText1}>充值金额</div>
               <div className={styles.loginNameAll} >
                 <div style={{ fontSize: '8vw' }}>￥</div>
                 <div>
                   <input className={styles.inputTextAll}
                     type="text"
                     value={this.state.money}
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
            <div className={this.state.money ? styles.clickLoginFormButtom :styles.loginFormButtom}
              onClick={() => {
                if(this.state.money) {
                  this.submitAction();
                }
              }}
            >
               充 值
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

export default connect(mapStateToProps)(RechargeWechat);
