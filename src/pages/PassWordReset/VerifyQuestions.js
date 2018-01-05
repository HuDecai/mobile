// 验证保密问题
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
class VerifyQuestion extends React.PureComponent {
  constructor(props: Object) {
    super(props);
    this.state = {
      answerOne: '',
      answerTwo: '',
    };
  }
  _handleSubmit() {
    const params = {
      username: this.props.passWordInfo.get('username'),
      ques1: this.props.passWordInfo.get('ques1'),
      ques2: this.props.passWordInfo.get('ques2'),
      answerOne: this.state.answerOne,
      answerTwo: this.state.answerTwo,
      step: 2,
    };
    FindPassWordAction.setPassword(params);
  }
  render() {
    const { answerOne, answerTwo } = this.state;
      const usernames = Cookies.get('username');
      // const kflink=usernames?coustomServiceURL+'&info=userId%3D1%26name%3D'+usernames+'&s=1&enterurl='+${window.location.origin}+'/?#/index.me':coustomServiceURL+'&info=userId%3D1%26name%3D游客&s=1&enterurl='+${window.location.origin}+'/?#/login';
      const kflink = usernames ? `${coustomServiceURL}&info=userId%3D1%26name%3D${usernames}&s=1&enterurl=${window.location.origin}/mobile.html?verify-questions` : `${coustomServiceURL}&info=userId%3D1%26name%3D游客&s=1&enterurl=${window.location.origin}/mobile.html?verify-questions`

    const showErrorMsg = () => {
      const views = [];
      const errMsgs = this.props.errMsg;
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
             leftAction={() => { dispatch(replace('verify-password'))}}
             rightAction={() => {
                 Cookies.set('cc','');
                 window.location.href = kflink;
             }}
          />
          <div className={vstyles.passwordContent}>
          <Steps step={2} />
          <div className={vstyles.formContent}>
             <div className={vstyles.formtext}>问题一：{this.props.passWordInfo.get('ques1')}</div>
             <div className={styles.loginName} >
               <div>
                 <input type="text" className={styles.inputTextNoTitle}
                   value={answerOne}
                   onChange={(e) => {
                     const value = e.target.value;
                     this.setState({ answerOne: value });
                   }}
                 />
                 <label className={styles.borderStyle} ></label>
               </div>
             </div>
             <div className={vstyles.formtext}>问题二：{this.props.passWordInfo.get('ques2')}</div>
             <div className={styles.loginName} >
               <div>
                 <input type="text" className={styles.inputTextNoTitle}
                   value={answerTwo}
                   onChange={(e) => {
                     const value = e.target.value;
                     this.setState({ answerTwo: value });
                   }}
                 />
                 <label className={styles.borderStyle} ></label>
               </div>
             </div>
          </div>
          {showErrorMsg()}
        </div>
        <div className={styles.bottomButton}>
          <div className={answerOne&&answerTwo ? styles.clickLoginFormButtom :styles.loginFormButtom}
            onClick={() => {
              if(answerOne&&answerTwo) {
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

export default connect(mapStateToProps)(VerifyQuestion);
