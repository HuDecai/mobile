// 密码重置成功
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import * as BaseInfoAction from '../../actions/BaseInfoAction';
import * as styles from './styles.css';
import * as commonStyles from '../../assets/stylesheets/common.css';
import { replace, goBack } from 'react-router-redux';
import { dispatch } from '../../store';
import CommonNavBar from '../CommonNavBar/';
const See = require('../../assets/images/login-see.png');
const NoSee = require('../../assets/images/login-no-see.png');
const leftIcon = require('../../assets/images/login-back.png');
import Loading from '../../core/decorators/Loading';
import Cookies from  'js-cookie';

class SetLoginPassword2 extends React.PureComponent {
  constructor(props: Object) {
    super(props);
    this.state = {
      type: 1,
      type2: 1,
      oldPassword: '',
      password: '',
      newpassword: '',
    };
  }
  render() {
    const isShow = ()  => {
      if(this.state.type && this.state.password && this.state.newpassword && this.state.oldPassword) {
        return true;
      }
      if(!this.state.type && this.state.password && this.state.oldPassword) {
        return true;
      }
      return false;
    }
    return (
      <div>
        <CommonNavBar 
           headerTitle={'修改密码'}
           leftIcon={leftIcon}
           leftAction={() => { dispatch(goBack())}}
        />
        <div className={styles.formContent1}>
        <div className={styles.formtext}>请输入原密码</div>
            <div className={commonStyles.loginName} >
              <div>
                <input type={this.state.type2 ? 'password' : 'text'} className={commonStyles.inputTextNoTitle}
                  value={this.state.oldPassword}
                  onChange={(e) => {
                    const value = e.target.value;
                    this.setState({ oldPassword: value });
                  }}
                /> 
                <label className={commonStyles.borderStyle} ></label>
              </div>
              <div>
                <img src={this.state.type2 ? NoSee : See}
                   onClick={() => {
                     const type = this.state.type2;
                     this.setState({ type2: !type });
                   }}
                   className={commonStyles.passwordSee}
                />
              </div>
            </div>
            
           <div className={styles.formtext}>请输入新密码</div>
           <div className={commonStyles.loginName} >
             <div>
               <input type={this.state.type ? 'password' : 'text'} className={commonStyles.inputTextNoTitle}
                 value={this.state.password}
                 onChange={(e) => {
                   const value = e.target.value;
                   this.setState({ password: value });
                 }}
               /> 
               <label className={commonStyles.borderStyle} ></label>
             </div>
             <div>
               <img src={this.state.type ? NoSee : See}
                  onClick={() => {
                    const type = this.state.type;
                    this.setState({ type: !type });
                  }}
                  className={commonStyles.passwordSee}
               />
             </div>
           </div>
           { this.state.type ? 
           <div><div className={styles.formtext}>请再次输入新密码</div>
           <div className={commonStyles.loginName} >
             <div>
               <input type={this.state.type ? 'password' : 'text'} className={commonStyles.inputTextNoTitle}
                 value={this.state.newpassword}
                 onChange={(e) => {
                   const value = e.target.value;
                   this.setState({ newpassword: value });
                 }}
               /> 
               <label className={commonStyles.borderStyle} ></label>
             </div>
           </div></div> : <div /> }
        </div>
        <div className={commonStyles.bottomButton}>
          <div className={isShow() ? commonStyles.clickLoginFormButtom :commonStyles.loginFormButtom}
            onClick={() => {
              if(isShow()) {
                const param = {
                  oldPassword:this.state.oldPassword,
                  newPassword:this.state.password,
                  checkNewPassword:this.state.type ? this.state.newpassword : this.state.password,
                }
                console.log('params', param);
                BaseInfoAction.updateLoginPassword(param);
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
    // oldPassword: state.BaseInfoReducer.get('oldPassword'),
  };
};
export default connect(mapStateToProps)(SetLoginPassword2);
