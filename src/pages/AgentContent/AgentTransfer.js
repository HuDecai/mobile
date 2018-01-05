import React, { PropTypes } from 'react';
import * as AgentCenterAction from '../../actions/AgentCenterAction';
import { connect } from 'react-redux';
import * as Astyles from './styles.css';
import * as styles from '../../assets/stylesheets/common.css';
import { push, goBack } from 'react-router-redux';
import { dispatch } from '../../store';
import CommonNavBar from '../CommonNavBar/';
const leftIcon = require('../../assets/images/login-back.png');
import Cookies from 'js-cookie';
import Loading from '../../core/decorators/Loading';
import { checkAppVersion } from '../../actions/LoginAction';

@Loading(props => props.isFetching)
class AgentAddUser extends React.PureComponent {
  constructor(props: Object) {
    super(props);
    this.state = {
      selectMoney: '',
      password: '',
      userName: '',
      errMsg: '',
    };
  }
  componentWillMount() {
    AgentCenterAction.getXiajiList();
    checkAppVersion();
  }
  showOption(options) {
    const view = [];
    if(options) {
      options.map((item, key) => {
        view.push(<option value={item} key={key}>{item}</option>)
      });
    }
    return view;
  }
  transferAction() {
    const money = parseFloat(this.state.selectMoney);
    if(!money) {
      this.setState({ errMsg: '请填写转账金额' });
      return false;
    }
    const password = this.state.password;
    const userName = this.state.userName;
    AgentCenterAction.zhuanZhang({ money, password, userName });
    this.setState({
      selectMoney: '',
      password: '',
      userName: '',
      errMsg: ''
    })
  }
  render() {
    const { selectMoney, password, userName, errMsg } = this.state;
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
           headerTitle={'下级转账'}
           leftIcon={leftIcon}
           leftAction={() => { dispatch(goBack())}}
        />
        <div className={Astyles.passwordContent}>
            <div className={styles.AgentForm}>
               <div className={Astyles.formtext}>转账金额</div>
               <div className={styles.loginNameAll} >
                 <div>
                   <span style={{ fontSize: '8vw' }}>￥</span>
                   <input className={styles.inputTextAll}
                     type="text"
                     value={selectMoney}
                     onChange={(e) => {
                       const value = e.target.value;
                       this.setState({ selectMoney: value });
                     }}
                     style={{ fontSize: '8vw', width: '75vw' }}
                   />
                   <label className={styles.borderStyleAll} ></label>
                 </div>
               </div>
               <div className={Astyles.formtext}>用户选择</div>
               <select className={styles.selectStyle}
                   value={this.state.userName}
                   onChange={(e) => this.setState({ userName: e.target.value })}
               >
                   <option value={''}>{''}</option>
                   {this.showOption(this.props.xiajiList)}
               </select>
               <div className={Astyles.formtext}>资金密码</div>
               <div className={styles.loginNameAll} >
                 <div>
                   <input className={styles.inputTextAll}
                     value={password}
                     type="password"
                     onChange={(e) => {
                       const value = e.target.value;
                       this.setState({ password: value });
                     }}
                   />
                   <label className={styles.borderStyleAll} ></label>
                 </div>
               </div>
            </div>
            {showErrorMsg()}
            <div className={selectMoney&&userName&&password ? styles.clickLoginFormButtom :styles.loginFormButtom}
              onClick={() => {
                if(selectMoney&&userName&&password) {
                  this.transferAction();
                }
              }}
            >
               转 账
            </div>
        </div>
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    isFetching: state.AgentReducer.get('isFetching'),
    xiajiList: state.AgentReducer.get('xiajiList'),
  };
};

export default connect(mapStateToProps)(AgentAddUser);
