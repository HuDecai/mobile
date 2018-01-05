// 组合所有组件  root component

import React, { PropTypes } from 'react';
import { Toast, List } from 'antd-mobile';
import CommonNavBar from '../CommonNavBar/';
import * as styles from './styles.css';
const leftIcon = require('../../assets/images/login-back.png');
import { push, goBack } from 'react-router-redux';
import { dispatch } from '../../store';
import Cookies from 'js-cookie';

class HelpCenter extends React.PureComponent {
  render() {
    return (
      <div>
          <CommonNavBar 
             headerTitle={'帮助中心'}
             leftIcon={leftIcon}
             leftAction={() => { dispatch(goBack())}}
          />
          <div className={styles.content}>
              <List className="my-list">
                <List.Item
                   style={{ height: '14vw', position: 'relative', borderBottom: '1px solid #f4f4f4'}}
                   multipleLine
                   onClick={() => {
                     dispatch(push('help-center-tixian'));
                   }}
                   arrow="horizontal"
                 >
                   <span className={styles.helpCenterText}>提现须知</span>
                 </List.Item>
              </List>
              <List className="my-list">
                <List.Item
                   style={{ height: '14vw', position: 'relative', borderBottom: '1px solid #f4f4f4'}}
                   multipleLine
                   onClick={() => {
                     dispatch(push('help-center-play'));
                   }}
                   arrow="horizontal"
                 >
                   <span className={styles.helpCenterText}>玩法介绍</span>
                 </List.Item>
              </List>
              <List className="my-list">
                <List.Item
                   style={{ height: '14vw', position: 'relative', borderBottom: '1px solid #f4f4f4'}}
                   multipleLine
                   onClick={() => {
                     dispatch(push('help-center-rule'));
                   }}
                   arrow="horizontal"
                 >
                   <span className={styles.helpCenterText}>规则条款</span>
                 </List.Item>
              </List>
              <List className="my-list">
                <List.Item
                   style={{ height: '14vw', position: 'relative', borderBottom: '1px solid #f4f4f4'}}
                   multipleLine
                   onClick={() => {
                     dispatch(push('help-center-safe'));
                   }}
                   arrow="horizontal"
                 >
                   <span className={styles.helpCenterText}>安全须知</span>
                 </List.Item>
              </List>
              <List className="my-list">
                <List.Item
                   style={{ height: '14vw', position: 'relative', borderBottom: '1px solid #f4f4f4'}}
                   multipleLine
                   onClick={() => {
                     dispatch(push('help-center-about-us'));
                   }}
                   arrow="horizontal"
                 >
                   <span className={styles.helpCenterText}>关于我们</span>
                 </List.Item>
              </List>
          </div>
      </div>
    );
  }
}

export default HelpCenter;
