// 设置新的密码
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import * as FindPassWordAction from '../../actions/FindPassWordAction';
import * as vstyles from './VerifyPassWord.css';
import * as styles from '../../assets/stylesheets/common.css';
import { push, goBack } from 'react-router-redux';
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
class ResetNewPassWord extends React.PureComponent {
  constructor(props: Object) {
    super(props);
    this.state = {
      type: 1,
      newPassword: '',
      newPassword1: '',
      errMsg: '',
    };
  }
  _handleSubmit() {
    if(this.state.type) {
      // 判断两次输入密码是否一致
      const newPassword = this.state.newPassword;
      const newPassword1 = this.state.newPassword1;
      // 判断两次输入密码是否正确
      if(newPassword !== newPassword1) {
        this.setState({ errMsg: '两次密码不一致' });
        return;
      }
      this.setState({ errMsg: '' });
    }
    const params = {
      ques1: this.props.passWordInfo.get('ques1'),
      ques2: this.props.passWordInfo.get('ques2'),
      answerOne: this.props.passWordInfo.get('answerOne'),
      answerTwo: this.props.passWordInfo.get('answerTwo'),
      username: this.props.passWordInfo.get('username'),
      safePassw: this.props.passWordInfo.get('safePassw'),
      newPassword: this.state.newPassword,
      step: 3,
    };
    FindPassWordAction.setPassword(params);
  }
  render() {
    const { newPassword, newPassword1, errMsg } = this.state;
      const usernames = Cookies.get('username');
      // const kflink=usernames?coustomServiceURL+'&info=userId%3D1%26name%3D'+usernames+'&s=1&enterurl='+${window.location.origin}+'/?#/index.me':coustomServiceURL+'&info=userId%3D1%26name%3D游客&s=1&enterurl='+${window.location.origin}+'/?#/login';
      const kflink = usernames ? `${coustomServiceURL}&info=userId%3D1%26name%3D${usernames}&s=1&enterurl=${window.location.origin}/mobile.html?reset-new-password` : `${coustomServiceURL}&info=userId%3D1%26name%3D游客&s=1&enterurl=${window.location.origin}/mobile.html?reset-new-password`
    const showErrorMsg = () => {
      const views = [];
      const errMsgs = errMsg || this.props.errMsg;
      if(errMsgs) {
        return (<div className={vstyles.loginErr}>{errMsgs}</div>);
      }
      return <div />;
    }
    const isShow = () => {
      if(this.state.type) {
         return newPassword&&newPassword1;
      }else {
        return newPassword;
      }
    }
    return (
      <div>
          <CommonNavBar
             headerTitle={'忘记密码'}
             leftIcon={leftIcon}
             rightIcon={RightIcon}
             leftAction={() => { dispatch(replace('verify-questions'))}}
             rightAction={() => {
                 Cookies.set('cc','');
                 window.location.href = kflink;
             }}
          />
          <div className={vstyles.passwordContent}>
            <Steps step={3} />
            <div className={vstyles.formContent}>
               <div className={vstyles.formtext}>请输入新密码</div>
               <div className={styles.loginName} >
                 <div>
                   <input name="new_password" type={this.state.type ? 'password' : 'text'} className={styles.inputTextNoTitle}
                     value={newPassword}
                     onChange={(e) => {
                       const value = e.target.value;
                       this.setState({ newPassword: value });
                     }}
                   />
                   <label className={styles.borderStyle} ></label>
                 </div>
                 <div>
                   <img src={this.state.type ? NoSee : See}
                      onClick={() => {
                        const type = this.state.type;
                        this.setState({ type: !type, errMsg: '' });
                      }}
                      className={styles.passwordSee}
                   />
                 </div>
               </div>
               { this.state.type ?
               <div>
                 <div className={vstyles.formtext}>请再次输入新密码</div>
                 <div className={styles.loginName} >
                   <div>
                     <input type="password" className={styles.inputTextNoTitle}
                       value={newPassword1}
                       onChange={(e) => {
                         const value = e.target.value;
                         this.setState({ newPassword1: value });
                       }}
                     />
                     <label className={styles.borderStyle} ></label>
                   </div>
                 </div></div> : <div />}
            </div>
            {showErrorMsg()}
          </div>
        <div className={styles.bottomButton}>
          <div className={isShow() ? styles.clickLoginFormButtom :styles.loginFormButtom}
            onClick={() => {
              if(isShow()) {
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

export default connect(mapStateToProps)(ResetNewPassWord);
