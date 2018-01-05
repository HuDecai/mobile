import React, { PropTypes } from 'react';
import * as BaseInfoAction from '../../actions/BaseInfoAction';
import * as styles from './styles.css';
import * as commonStyles from '../../assets/stylesheets/common.css';
import { replace, goBack, push } from 'react-router-redux';
import { dispatch } from '../../store';
import CommonNavBar from '../CommonNavBar/';
import { connect } from 'react-redux';
const See = require('../../assets/images/login-see.png');
const NoSee = require('../../assets/images/login-no-see.png');
const leftIcon = require('../../assets/images/login-back.png');
import Loading from '../../core/decorators/Loading';
import Cookies from  'js-cookie';

class SetLoginPassword extends React.PureComponent {
  constructor(props: Object) {
    super(props);
    this.state = {
      type: 1,
      password: this.props.oldPassword,
    };
  }
  render() {
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
        </div>
        <div className={commonStyles.bottomButton}>
          <div className={this.state.password ? commonStyles.clickLoginFormButtom :commonStyles.loginFormButtom}
              onClick={() => {
                if(this.state.password) {
                  BaseInfoAction.savePassword({ data: this.state.password });
                  dispatch(push('set-login-password2'))
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
    oldPassword: state.BaseInfoReducer.get('oldPassword'),
  };
};

export default connect(mapStateToProps)(SetLoginPassword);

