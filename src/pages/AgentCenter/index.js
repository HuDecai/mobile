import React, { PropTypes } from 'react';
import * as styles from './styles.css';
import { push, goBack } from 'react-router-redux';
import { dispatch } from '../../store';
import CommonNavBar from '../CommonNavBar/';
const leftIcon = require('../../assets/images/login-back.png');
const agentIcon1 = require('../../assets/images/agent-icon1.png');
const agentIcon2 = require('../../assets/images/agent-icon2.png');
const agentIcon3 = require('../../assets/images/agent-icon3.png');
const agentIcon4 = require('../../assets/images/agent-icon4.png');
const agentIcon5 = require('../../assets/images/agent-icon5.png');
const agentIcon6 = require('../../assets/images/agent-icon6.png');


class AgentCenter extends React.PureComponent {
  render() {
    return (
      <div>
        <CommonNavBar 
           headerTitle={'代理管理'}
           leftIcon={leftIcon}
           leftAction={() => { dispatch(goBack())}}
        />
        <div className={styles.contentBody}>
            <div className={styles.contentCard} 
               onClick={() => {
                 dispatch(push('agent-center-userlist'));
               }}
            >
               <div><img src={agentIcon1} className={styles.agentImg}/></div>
               <div className={styles.cardRight}>
                  <div className={styles.cardRight1}>用户列表</div>
                  <div className={styles.cardRight2}>查看下级用户</div>
               </div>
            </div>
            <div className={styles.contentRigthCard}
                onClick={() => {
                  dispatch(push('agent-center-teamlist'));
                }}
            >
               <div><img src={agentIcon2} className={styles.agentImg}/></div>
               <div className={styles.cardRight}>
                  <div className={styles.cardRight1}>团队报表</div>
                  <div className={styles.cardRight2}>查看下级盈亏</div>
               </div>
            </div>
            <div className={styles.contentCard}
                onClick={() => {
                  dispatch(push('agent-center-transfer'));
                }}
            >
               <div><img src={agentIcon3} className={styles.agentImg}/></div>
               <div className={styles.cardRight}>
                  <div className={styles.cardRight1}>下级转账</div>
                  <div className={styles.cardRight2}>转账直属下级</div>
               </div>
            </div>
            <div className={styles.contentRigthCard}>
               <div><img src={agentIcon4} className={styles.agentImg}/></div>
               <div className={styles.cardRight}
                   onClick={() => {
                     dispatch(push('agent-center-balance'));
                   }}
               >
                  <div className={styles.cardRight1}>团队余额</div>
                  <div className={styles.cardRight2}>查看团队总额</div>
               </div>
            </div>
            <div className={styles.contentCard}
                onClick={() => {
                  dispatch(push('agent-center-adduser'));
                }}
            >
               <div><img src={agentIcon5} className={styles.agentImg}/></div>
               <div className={styles.cardRight}>
                  <div className={styles.cardRight1}>增加会员</div>
                  <div className={styles.cardRight2}>开设会员账号</div>
               </div>
            </div>
            <div className={styles.contentRigthCard}
                onClick={() => {
                  dispatch(push('agent-center-link'));
                }}
            >
              <div><img src={agentIcon6} className={styles.agentImg}/></div>
              <div className={styles.cardRight}>
                 <div className={styles.cardRight1}>代理链接</div>
                 <div className={styles.cardRight2}>发送会员链接</div>
              </div>
            </div>
        </div>
      </div>
    );
  }
}

export default AgentCenter;
