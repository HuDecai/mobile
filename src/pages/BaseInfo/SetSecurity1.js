// 设置新的密码
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import * as BaseInfoAction from '../../actions/BaseInfoAction';
import * as Tstyles from './styles.css';
import * as styles from '../../assets/stylesheets/common.css';
import { push, goBack } from 'react-router-redux';
import { dispatch } from '../../store';
import CommonNavBar from '../CommonNavBar/';
const See = require('../../assets/images/login-see.png');
const NoSee = require('../../assets/images/login-no-see.png');
const leftIcon = require('../../assets/images/login-back.png');
import Loading from '../../core/decorators/Loading';
import Cookies from  'js-cookie';

@Loading(props => props.isFetching)
class SetSecurity1 extends React.PureComponent {
  constructor(props: Object) {
    super(props);
    this.state = {
      type: 1,
      password: '',
    };
  }
  render() {
    return (
      <div>
          <CommonNavBar
             headerTitle={'修改密保问题'}
             leftIcon={leftIcon}
             leftAction={() => { dispatch(goBack())}}
          />
          <div className={Tstyles.formContent1}>
             <div className={Tstyles.formtext}>请验证登录密码</div>
             <div className={styles.loginName} >
               <div>
                 <input type={this.state.type ? 'password' : 'text'} className={styles.inputTextNoTitle}
                   value={this.state.password}
                   onChange={(e) => {
                     const value = e.target.value;
                     this.setState({ password: value });
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
             <div className={styles.bottomButton}>
               <div className={this.state.password ? styles.clickLoginFormButtom :styles.loginFormButtom}
                 onClick={() => {
                   if(this.state.password) {
                     BaseInfoAction.savePassword({ data: this.state.password });
                     dispatch(push('set-security2'))
                   }
                 }}
               >
                   下 一 步
               </div>
             </div>
          </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isFetching: state.BaseInfoReducer.get('isFetching'),
  };
};

export default connect(mapStateToProps)(SetSecurity1);
