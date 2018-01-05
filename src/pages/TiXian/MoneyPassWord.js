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
class MoneyPassWord extends React.PureComponent {
  constructor(props: Object) {
    super(props);
    this.state = {
      type: 1,
      newPassword: '',
      newPassword1: '',
      oldPassword: '',
    };
  }
  _handleSubmit(saf) {
    // 判断两次输入密码是否一致
    const newPassword = this.state.newPassword;
    const newPassword1 = this.state.newPassword1;
    // 判断两次输入密码是否正确
    if(this.state.type && newPassword !== newPassword1) {
      alert('两次密码不一致');
      return;
    }
    const params = {
        newPassword: newPassword,
        checkNewPassword: this.state.type ? newPassword1 : newPassword
    };

      if(saf){
          console.log(params,0)
         BaseInfoAction.updateMoneyPassword({...params,oldPassword: this.state.oldPassword},'修改资金密码成功');
      }else{
          console.log(params,1)
          BaseInfoAction.updateMoneyPassword(params,'设置资金密码成功');
      }
    //BaseInfoAction.updateMoneyPassword(params);
  }
  render() {
    const { newPassword, newPassword1, oldPassword, type } = this.state;
    const hasSaf=Cookies.get('hasSafePassword')==1?false:true;
    console.log(hasSaf)
    const isShow = () => {
        let ty='';
        if(hasSaf){
             type ? newPassword&&newPassword1&&oldPassword : newPassword&&oldPassword;
        }else{
            type ? newPassword&&newPassword1 : oldPassword;
        }
      return type;
    }
    return (
      <div>
          <CommonNavBar 
             headerTitle={'设置资金密码'}
             leftIcon={leftIcon}
             leftAction={() => { dispatch(goBack())}}
          />
          <div className={Tstyles.formContent1}>
              {hasSaf && <div>
              <div className={Tstyles.formtext}>请输入原资金密码</div>
            <div className={styles.loginName} >
              <div>
                <input type="password" className={styles.inputTextNoTitle} 
                  value={oldPassword}
                  onChange={(e) => {
                    const value = e.target.value;
                    this.setState({ oldPassword: value });
                  }}
                /> 
                <label className={styles.borderStyle} ></label>
              </div>
            </div></div>}
          
             <div className={Tstyles.formtext}>请输入资金密码</div>
             <div className={styles.loginName} >
               <div>
                 <input type={this.state.type ? 'password' : 'text'} className={styles.inputTextNoTitle}
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
                      this.setState({ type: !type });
                    }}
                    className={styles.passwordSee}
                 />
               </div>
             </div>
             {this.state.type && <div>
                   <div className={Tstyles.formtext}>请再次输入资金密码</div>
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
                   </div>
               </div> 
             } 
             <div className={styles.bottomButton}>
               <div className={isShow() ? styles.clickLoginFormButtom :styles.loginFormButtom}
                 style={{ marginTop: '5vh'}}
                 onClick={() => {
                   if(isShow()) {
                     this._handleSubmit(hasSaf);
                   }
                 }}
               >
                   {hasSaf?'修改资金密码':'设置资金密码'}
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

export default connect(mapStateToProps)(MoneyPassWord);

