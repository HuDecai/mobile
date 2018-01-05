// 组合所有组件  root component

import React, { PropTypes } from 'react';
import { Toast, List } from 'antd-mobile';
import { connect } from 'react-redux';
import CommonNavBar from '../CommonNavBar/';
import * as LoginAction from '../../actions/LoginAction';
import * as HomePageAction from '../../actions/HomePageAction';
import * as styles from './styles.css';
const leftIcon = require('../../assets/images/login-back.png');
const shezhi1 = require('../../assets/images/shezhi-icon1.png');
const shezhi2 = require('../../assets/images/shezhi-icon2.png');
const shezhi3 = require('../../assets/images/shezhi-icon3.png');
const shezhi4 = require('../../assets/images/shezhi-icon4.png');
const shezhi5 = require('../../assets/images/shezhi-icon5.png');
import { push, goBack } from 'react-router-redux';
import { dispatch } from '../../store';
import Cookies from 'js-cookie';
import Loading from '../../core/decorators/Loading';
import { checkAppVersion } from '../../actions/LoginAction';

@Loading(props => props.isFetching)
class PersonalSet extends React.PureComponent {
    componentDidMount() {
        HomePageAction.getBaseInfo({});
        checkAppVersion();
    }

  render() {
    const hsaF=Cookies.get('hasSafePassword');
    const user = this.props.baseInfo.user;
    return (
      <div>
         {/****navbar****/}
         <CommonNavBar
            headerTitle={'设置'}
            leftIcon={leftIcon}
            leftAction={() => { dispatch(goBack())}}
         />

         {/*******用户操作2*******/}
         <div className={styles.userInfoContent2}>
             <List className="my-list">
               <List.Item
                  key={1}
                  className={styles.ListCard}
                  thumb={<img src={shezhi1} style={{ width: '6.7vw', height: '6.7vw'}}/>}
                  multipleLine
                  onClick={() => {
                    dispatch(push('set-login-password2'));
                  }}
                  arrow="horizontal"
                >
                  <span className={styles.userInfoText}>修改登录密码</span>
                </List.Item>
             </List>
             <List className="my-list">
               <List.Item
                  key={2}
                  className={styles.ListCard}
                  thumb={<img src={shezhi2} style={{ width: '6.7vw', height: '6.7vw'}}/>}
                  multipleLine
                  onClick={() => {
                    dispatch(push('set-money-password'));
                  }}
                  arrow="horizontal"
                >
                  <span className={styles.userInfoText}>{hsaF==0?'修改资金密码':'设置资金密码'}</span>
                </List.Item>
             </List>
             {user && !user.secQuestions ?
               <List className="my-list">
                 <List.Item
                    key={3}
                    className={styles.ListCard}
                    thumb={<img src={shezhi3} style={{ width: '6.7vw', height: '6.7vw'}}/>}
                    multipleLine
                    onClick={() => {
                      dispatch(push('set-security2'));
                    }}
                    arrow="horizontal"
                  >
                    <span className={styles.userInfoText}>设置密保问题</span>
                  </List.Item>
               </List> : <div /> }
             <List className="my-list">
               <List.Item
                  key={4}
                  className={styles.ListCard}
                  thumb={<img src={shezhi4} style={{ width: '6.7vw', height: '6.7vw'}}/>}
                  multipleLine
                  onClick={() => {
                    dispatch(push('bank-card-manage'));
                  }}
                  arrow="horizontal"
                >
                  <span className={styles.userInfoText}>我的银行卡</span>
                </List.Item>
             </List>
             <List className="my-list">
               <List.Item
                  key={5}
                  className={styles.ListCard}
                  thumb={<img src={shezhi5} style={{ width: '6.7vw', height: '6.7vw'}}/>}
                  multipleLine
                  onClick={() => {
                    dispatch(push('help-center'));
                  }}
                  arrow="horizontal"
                >
                  <span className={styles.userInfoText}>帮助中心</span>
                </List.Item>
             </List>
         </div>
         <div className={styles.bottomButton}>
           <div className={styles.bottom}
                onClick={() => {
                  LoginAction.loginOut();
                }}
           >
               退 出
           </div>
         </div>
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    errMsg: state.HomePageReducer.get('errMsg'),
    isFetching: state.HomePageReducer.get('isFetching'),
    baseInfo: state.HomePageReducer.get('baseInfo'),
  };
};

export default connect(mapStateToProps)(PersonalSet);
