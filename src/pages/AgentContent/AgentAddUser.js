// 添加会员
import React, { PropTypes } from 'react';
import { Toast } from 'antd-mobile';
import * as AgentCenterAction from '../../actions/AgentCenterAction';
import { checkAppVersion } from '../../actions/LoginAction';
import { connect } from 'react-redux';
import * as Astyles from './styles.css';
import * as styles from '../../assets/stylesheets/common.css';
import { push, goBack } from 'react-router-redux';
import { dispatch } from '../../store';
import CommonNavBar from '../CommonNavBar/';
const leftIcon = require('../../assets/images/login-back.png');
import Cookies from 'js-cookie';
import Loading from '../../core/decorators/Loading';

@Loading(props => props.isFetching)
class AgentAddUser extends React.PureComponent {
  constructor(props: Object) {
    super(props);
    this.state = {
      errMsg: '',
      username: '',
      password: '',
      rebate: this.props.caiPiaoFandianMax,
      type: 0,
      hkWater: this.props.hongKongCaiPiaoFandianMax,
    };
  }
  componentWillMount() {
    // 根据登录用户获取返点列表范围 和 香港彩返点列表
    AgentCenterAction.updateCaipiaoFandian({ rebate: Cookies.get('rebate') });
    AgentCenterAction.updateHongKongFandian({ hkRebate: Cookies.get('hk6Rebate')});
    checkAppVersion();
  }
  componentWillReceiveProps(nextProps) {
    if(nextProps.caiPiaoFandianMax !== this.props.caiPiaoFandianMax) {
      this.setState({
        rebate: nextProps.caiPiaoFandianMax,
        type: 0,
        hkWater: nextProps.hongKongCaiPiaoFandianMax,
      });
    }
  }
  showOption(options) {
    const view = [];
    if(options) {
      options.map((item, key) => {
        view.push(<option value={item.get('value')} key={key}>{item.get('name')}</option>)
      });
    }
    return view;
  }
  addUserAction() {
    this.checkInfo(1);
    this.checkInfo(2);
    const params = {
      password: this.state.password,
      username: this.state.username,
      type: this.state.type,
      rebate: this.state.rebate,
      hkWater: this.state.hkWater,
    }
    console.log(params);
    AgentCenterAction.addUser(params, (result)=>{
      Toast.info(result.msg, 2);
      this.setState({
        username: '',
        password: '',
        rebate: this.props.caiPiaoFandianMax,
        type: 0,
        hkWater: this.props.hongKongCaiPiaoFandianMax,
      })
    });
  }
  checkInfo(type) {
    if(type == 1) {
      // 验证用户名
      const username = this.state.username;
      const regex = "^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,12}$";
      if(username.match(regex)==null){
          this.setState({ errMsg: '用户名必须是字母、数字，且长度在6-12位之间' });
          return;
      };
    }
    if(type == 2) {
      // 验证密码
      const password = this.state.password;
      const regex = "^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,14}$";
      if(password.match(regex)==null){
          this.setState({ errMsg: '密码必须是6~14位字母、数字、特殊符号组成' });
          return;
      };
    }
    this.setState({ errMsg:'' });
  }
  render() {
    const { username, password, rebate, type, hkWater, errMsg } = this.state;
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
           headerTitle={'增加会员'}
           leftIcon={leftIcon}
           leftAction={() => { dispatch(goBack())}}
        />
        <div className={Astyles.passwordContent}>
            <div className={styles.AgentForm}>
               <div className={Astyles.formtext}>请输入用户名</div>
               <div className={styles.loginNameAll} >
                 <div>
                   <input className={styles.inputTextAll}
                     type="text"
                     value={username}
                     onChange={(e) => {
                       const value = e.target.value;
                       this.setState({ username: value });
                     }}
                     onBlur={() => this.checkInfo(1) }
                   />
                   <label className={styles.borderStyleAll} ></label>
                 </div>
               </div>
               <div className={Astyles.formtext}>请输入密码</div>
               <div className={styles.loginNameAll} >
                 <div>
                   <input className={styles.inputTextAll}
                     type="text"
                     value={password}
                     onChange={(e) => {
                       const value = e.target.value;
                       this.setState({ password: value });
                     }}
                     onBlur={() => this.checkInfo(2) }
                   />
                   <label className={styles.borderStyleAll} ></label>
                 </div>
               </div>
               <div className={Astyles.formtext}>彩票返点选择</div>
               <select className={styles.selectStyle}
                   value={this.state.rebate}
                   onChange={(e) => this.setState({ rebate: e.target.value })}
               >
                   {this.showOption(this.props.caiPiaoFandian)}
               </select>
               <div className={Astyles.formtext}>香港彩返点选择</div>
               <select className={styles.selectStyle}
                   value={this.state.hkWater}
                   onChange={(e) => this.setState({ hkWater: e.target.value })}
               >
                   {this.showOption(this.props.hongKongCaiPiaoFandian)}
               </select>
               <div className={Astyles.formtext}>类型选择</div>
               <select className={styles.selectStyle}
                   value={this.state.type}
                   onChange={(e) => this.setState({ type: e.target.value })}
               >
                   <option value={'0'}>会员</option>
                   <option value={'1'}>代理</option>
               </select>
            </div>
            {showErrorMsg()}
        </div>
        <div className={styles.bottomButton}>
          <div className={username&&password&&errMsg=='' ? styles.clickLoginFormButtom :styles.loginFormButtom}
            onClick={() => {
              if(username&&password&&errMsg=='') {
                this.addUserAction();
              }
            }}
          >
             确 定
          </div>
        </div>
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    isFetching: state.AgentReducer.get('isFetching'),
    caiPiaoFandian: state.AgentReducer.get('caiPiaoFandian'),
    hongKongCaiPiaoFandian: state.AgentReducer.get('hongKongCaiPiaoFandian'),
    caiPiaoFandianMax: state.AgentReducer.get('caiPiaoFandianMax'),
    hongKongCaiPiaoFandianMax: state.AgentReducer.get('hongKongCaiPiaoFandianMax'),
  };
};

export default connect(mapStateToProps)(AgentAddUser);
