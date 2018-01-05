// 组合所有组件  root component

import React, { PropTypes } from 'react';
import { Toast, List } from 'antd-mobile';
import CommonNavBar from '../CommonNavBar/';
import * as styles from './styles.css';
const leftIcon = require('../../assets/images/login-back.png');
import { push, goBack } from 'react-router-redux';
import { dispatch } from '../../store';
import Cookies from 'js-cookie';

class Play extends React.PureComponent {
  render() {
    return (
      <div>
          <CommonNavBar 
             headerTitle={'玩法介绍'}
             leftIcon={leftIcon}
             leftAction={() => { dispatch(goBack())}}
          />
          <div className={styles.content}>
              <List className="my-list">
                <List.Item
                   style={{ height: '14vw', position: 'relative', borderBottom: '1px solid #f4f4f4'}}
                   multipleLine
                   onClick={() => {
                     dispatch(push('help-center-shishicai'));
                   }}
                   arrow="horizontal"
                 >
                   <span className={styles.helpCenterText}>时时彩</span>
                 </List.Item>
              </List>
              <List className="my-list">
                <List.Item
                   style={{ height: '14vw', position: 'relative', borderBottom: '1px solid #f4f4f4'}}
                   multipleLine
                   onClick={() => {
                     dispatch(push('help-center-pk10'));
                   }}
                   arrow="horizontal"
                 >
                   <span className={styles.helpCenterText}>PK10系列</span>
                 </List.Item>
              </List>
              <List className="my-list">
                <List.Item
                   style={{ height: '14vw', position: 'relative', borderBottom: '1px solid #f4f4f4'}}
                   multipleLine
                   onClick={() => {
                     dispatch(push('help-center-choose'));
                   }}
                   arrow="horizontal"
                 >
                   <span className={styles.helpCenterText}>11选5系列</span>
                 </List.Item>
              </List>
              <List className="my-list">
                <List.Item
                   style={{ height: '14vw', position: 'relative', borderBottom: '1px solid #f4f4f4'}}
                   multipleLine
                   onClick={() => {
                     dispatch(push('help-center-other'));
                   }}
                   arrow="horizontal"
                 >
                   <span className={styles.helpCenterText}>其他系列</span>
                 </List.Item>
              </List>
              <List className="my-list">
                <List.Item
                   style={{ height: '14vw', position: 'relative', borderBottom: '1px solid #f4f4f4'}}
                   multipleLine
                   onClick={() => {
                     dispatch(push('help-center-hongkong'));
                   }}
                   arrow="horizontal"
                 >
                   <span className={styles.helpCenterText}>香港彩</span>
                 </List.Item>
              </List>
              <List className="my-list">
                <List.Item
                   style={{ height: '14vw', position: 'relative', borderBottom: '1px solid #f4f4f4'}}
                   multipleLine
                   onClick={() => {
                     dispatch(push('help-center-time'));
                   }}
                   arrow="horizontal"
                 >
                   <span className={styles.helpCenterText}>开奖时间</span>
                 </List.Item>
              </List>
          </div>
      </div>
    );
  }
}

export default Play;
