import React, { PropTypes } from 'react';
import { Toast } from 'antd-mobile';
import * as LoginAction from '../../actions/LoginAction';
import CommonNavBar from '../CommonNavBar/';
import * as commonStyles from '../../assets/stylesheets/common.css';
import * as styles from './styles.css';
import CommonStyles from '../../assets/stylesheets/common.css';
const leftIcon = require('../../assets/images/register-left.png');
const RightIcon = require('../../assets/images/register-rigth.png');
const See = require('../../assets/images/login-see.png');
const NoSee = require('../../assets/images/login-no-see.png');
import { push, goBack } from 'react-router-redux';
import { dispatch } from '../../store';
import Cookies from 'js-cookie';
import Loading from '../../core/decorators/Loading';
import { checkAppVersion } from '../../actions/LoginAction';

@Loading(props => props.isFetching)
class Register extends React.PureComponent {
  constructor(props: Object) {
    super(props);
    this.state = {
      type: 1,
      codeImg: '',
      yanzhengma1: '',
      code: '',
      newPassword: '',
      newPassword1: '',
      username: '',
    };
  }
  componentWillMount() {
    checkAppVersion();
    const code = this.props.location.search.split('&')[0].split('=')[1];
    // var u = navigator.userAgent;
    // var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
    // var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    // if(!isAndroid && !isiOS) {
    //   window.location.replace(`http://front.covazsport.com/?#/register?code=${code}`);
    // }
    this.getCode();
    this.setState({ code });
  }
  // 获取验证码
  getCode() {
    var that = this;
    fetch('./code.do',{
      headers: {
       'Content-Type': 'application/json; charset=UTF-8',
       "Accept": "application/json",
     },
     credentials: 'include',
    }).then(function(response) {
      return response.blob();
    }).then(function(myBlob) {
      var objectURL = URL.createObjectURL(myBlob);
      that.setState({ codeImg: objectURL });
    })
  }
  _handleSubmit() {
    const { username, newPassword, newPassword1, yanzhengma1 } = this.state;
    if(!username) {
      Toast.info('请填写用户名', 2);
    }
    if(!newPassword) {
      Toast.info('请填写密码', 2);
    }
    if(!newPassword1) {
      Toast.info('请再次填写密码', 2);
    }
    if(newPassword !== newPassword1) {
      Toast.info('两次密码不一致', 2);
    }
    if(!yanzhengma1) {
      Toast.info('请填写验证码', 2);
    }
    const params = {
      username: this.state.username,
      password: this.state.newPassword,
      code: this.state.code,
      vCode: this.state.yanzhengma1,
    };
    LoginAction.register(params);
}
  render() {
    const { username, newPassword, newPassword1, yanzhengma1 } = this.state;
    return (
      <div style={{ height: '100vh'}}>
          <div className={styles.navBar}>
            <div className={styles.leftAction}><img src={leftIcon} className={styles.leftImg} /></div>
            <div className={styles.headerTitle}>新用户注册</div>
            <div className={styles.rightAction} />
          </div>
          <div className={styles.bankContent}>
            <div className={styles.titleText}>用户名</div>
            <div className={commonStyles.loginNameAll}>
              <div>
                <input className={commonStyles.inputTextAll}
                  type="text"
                  value={this.state.username}
                  onChange={(e) => {
                    const value = e.target.value;
                    this.setState({ username: value });
                  }}
                />
                <label className={commonStyles.borderStyleAll} ></label>
              </div>
            </div>

             <div className={styles.titleText}>密码</div>
             <div className={commonStyles.loginNameAll} >
               <div>
                 <input type='password' className={commonStyles.inputTextNoTitle}
                   value={this.state.newPassword}
                   onChange={(e) => {
                     const value = e.target.value;
                     this.setState({ newPassword: value });
                   }}
                 />
                 <label className={commonStyles.borderStyleAll} ></label>
               </div>
             </div>

             <div className={styles.titleText}>确认密码</div>
             <div className={commonStyles.loginNameAll} >
               <div>
                 <input type='password' className={commonStyles.inputTextAll}
                   value={this.state.newPassword1}
                   onChange={(e) => {
                     const value = e.target.value;
                     this.setState({ newPassword1: value });
                   }}
                 />
                 <label className={commonStyles.borderStyleAll} ></label>
               </div>
             </div>

             <div className={styles.titleText}>验证码</div>
             <div className={styles.codeBody}>
               <div>
                 <input type='text'
                   className={styles.codeStyle}
                   value={this.state.yanzhengma1}
                   onChange={(e) => {
                     const value = e.target.value;
                     this.setState({ yanzhengma1: value });
                   }}
                 />
               </div>
               <div><img src={this.state.codeImg} className={styles.codeImg}/></div>
               <div  onClick={() => this.getCode()} ><span style={{ color: '#459ad6', fontSize: '4vw' }}>换一张</span></div>
             </div>
          </div>
          <div>
             <div className={commonStyles.clickLoginFormButtom}
               onClick={() => {
                 this._handleSubmit();
               }}
             >
                立 即 注 册
             </div>
           </div>
      </div>
    );
  }
}

export default Register;
