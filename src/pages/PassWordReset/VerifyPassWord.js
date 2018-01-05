// 验证资金密码
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import * as FindPassWordAction from '../../actions/FindPassWordAction';
import * as vstyles from './VerifyPassWord.css';
import * as styles from '../../assets/stylesheets/common.css';
import { push, goBack, replace } from 'react-router-redux';
import { dispatch } from '../../store';
import CommonNavBar from '../CommonNavBar/';
import Steps from './components/Steps';
const See = require('../../assets/images/login-see.png');
const NoSee = require('../../assets/images/login-no-see.png');
const leftIcon = require('../../assets/images/login-back.png');
const RightIcon = require('../../assets/images/login-kefu.png');
import Loading from '../../core/decorators/Loading';
import Cookies from 'js-cookie';

@Loading(props => props.isFetching)
class VerifyPassWord extends React.PureComponent {
  constructor(props: Object) {
    super(props);
    this.state = {
      type: 1,
      username: '',
      safePassw: '',
      errMsg: '',
    };
  }
  componentWillMount() {
    this.state = {
      type: 1,
      username: this.props.passWordInfo.get('username'),
      safePassw: this.props.passWordInfo.get('safePassw'),
      errMsg: '',
    };
  }
  _handleSubmit() {
    const params = {
      username: this.state.username,
      safePassw: this.state.safePassw,
      step: 1,
    };
    FindPassWordAction.setPassword(params);
  }
  render() {
    const { username, safePassw, errMsg } = this.state;
      const usernames = Cookies.get('username');
      // const kflink=usernames?coustomServiceURL+'&info=userId%3D1%26name%3D'+usernames+'&s=1&enterurl='+${window.location.origin}+'/?#/index.me':coustomServiceURL+'&info=userId%3D1%26name%3D游客&s=1&enterurl='+${window.location.origin}+'/?#/login';
      const kflink = usernames ? `${coustomServiceURL}&info=userId%3D1%26name%3D${usernames}&s=1&enterurl=${window.location.origin}/mobile.html?verify-password` : `${coustomServiceURL}&info=userId%3D1%26name%3D游客&s=1&enterurl=${window.location.origin}/mobile.html?verify-password`

    const showErrorMsg = () => {
      const views = [];
      const errMsgs = errMsg || this.props.errMsg;
      if(errMsgs) {
        return (<div className={vstyles.loginErr}>{errMsgs}</div>);
      }
      return <div />;
    }
    return (
      <div>
          <CommonNavBar
             headerTitle={'忘记密码'}
             leftIcon={leftIcon}
             rightIcon={RightIcon}
             leftAction={() => { dispatch(replace('login')) }}
             rightAction={() => {
                 Cookies.set('cc','');
                 window.location.href = kflink;
             }}
          />
        <div className={vstyles.passwordContent}>
          <Steps step={1} />
          <div className={vstyles.formContent}>
             <div className={vstyles.formtext}>请输入登录账号</div>
             <div className={styles.loginName} >
               <div>
                 <input className={styles.inputTextNoTitle}
                  type="text"
                   value={username}
                   onChange={(e) => {
                     const value = e.target.value;
                     this.setState({ username: value });
                   }}
                   onBlur={(e) => {
                     const value = e.target.value;
                     const reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,12}$/;
                     if (!reg.test(value)) {
                       this.setState({errMsg: '账号只能使用字母和数字，长度在6-12个字符之间'});
                     }else {
                       this.setState({errMsg: ''});
                     }
                   }}
                 />
                 <label className={styles.borderStyle} ></label>
               </div>
             </div>
             <div className={vstyles.formtext}>请输入资金密码</div>
             <div className={styles.loginName} >
               <div>
                 <input type={this.state.type ? 'password' : 'text'} className={styles.inputTextNoTitle}
                   value={safePassw}
                   onChange={(e) => {
                     const value = e.target.value;
                     this.setState({ safePassw: value });
                   }}
                 />
                 <label className={styles.borderStyle} ></label>
               </div>
               <div>
                 <img src={this.state.type ? NoSee : See}
                    onClick={() => {
                      const type = this.state.type;
                      this.setState({ type: !type });
                    }}
                    className={styles.passwordSee}
                 />
               </div>
             </div>
          </div>
          {showErrorMsg()}
        </div>
        <div className={styles.bottomButton}>
          <div className={username&&safePassw ? styles.clickLoginFormButtom :styles.loginFormButtom}
            onClick={() => {
              if(username&&safePassw) {
                this._handleSubmit();
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
    errMsg: state.FindPassWordReducer.get('errMsg'),
    isFetching: state.FindPassWordReducer.get('isFetching'),
    passWordInfo: state.FindPassWordReducer.get('passWordInfo'),
  };
};

export default connect(mapStateToProps)(VerifyPassWord);
