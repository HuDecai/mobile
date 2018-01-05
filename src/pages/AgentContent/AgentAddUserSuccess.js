// 密码重置成功
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import * as Astyles from './styles.css';
import * as styles from '../../assets/stylesheets/common.css';
import { push, replace, goBack } from 'react-router-redux';
import { dispatch } from '../../store';
import CommonNavBar from '../CommonNavBar/';
const leftIcon = require('../../assets/images/login-back.png');
const successImg = require('../../assets/images/password_success.png');

class AgentAddUserSuccess extends React.PureComponent {
  render() {
    return (
      <div>
        <CommonNavBar 
           headerTitle={'增加会员成功'}
           leftIcon={leftIcon}
           leftAction={() => { dispatch(goBack())}}
        />
        <div className={Astyles.passwordContent}>   
          <div className={Astyles.successContent}>
              <div><img src={ successImg }  className={Astyles.successImg}/></div>
              <div className={Astyles.successText}>新增会员：<span>{this.props.addUserName}</span>成功</div>
          </div>
        </div>
        <div className={styles.bottomButton}>
          <div className={styles.clickLoginFormButtom}
            onClick={() => {
              dispatch(replace('agent-center-adduser'))
            }}
          >
             继续增加
          </div>
        </div>
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    addUserName: state.AgentReducer.get('addUserName'),
  };
};

export default connect(mapStateToProps)(AgentAddUserSuccess);

