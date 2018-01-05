// 组合所有组件  root component

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Toast, List } from 'antd-mobile';
import * as BaseInfoAction from '../../actions/BaseInfoAction';
import CommonNavBar from '../CommonNavBar/';
import * as styles from './styles.css';
import * as commonStyles from '../../assets/stylesheets/common.css';
const leftIcon = require('../../assets/images/login-back.png');
const quick = require('../../assets/images/quick.png');
const alipay = require('../../assets/images/alipay.png');
const wechat = require('../../assets/images/wechat.png');
const QQ = require('../../assets/images/qq.png');
const online = require('../../assets/images/onlie.png');
import { push, goBack } from 'react-router-redux';
import { dispatch } from '../../store';
import Loading from '../../core/decorators/Loading';
import { checkAppVersion } from '../../actions/LoginAction';

@Loading(props => props.isFetching)
class Recharge extends React.PureComponent {
  componentWillMount() {
    BaseInfoAction.getPayTypes();
    checkAppVersion();
  }
  render() {
    return (
      <div>
         {/****navbar****/}
         <CommonNavBar
            headerTitle={'充值'}
            leftIcon={leftIcon}
            leftAction={() => { dispatch(goBack())}}
         />
         {/*******用户操作2*******/}
         <div className={commonStyles.bodyContent}>
           <div className={styles.titleText}>请选择充值方式</div>
           <div>
               {this.props.payTypesList.indexOf(1) !== -1 ?
                 <List className="my-list">
                   <List.Item
                      key={1}
                      style={{ height: '9vh', position: 'relative', marginBottom: '1vh' }}
                      thumb={<img src={quick} style={{ width: '10vw', height: '6.9vh' }}/>}
                      multipleLine
                      onClick={() => {
                        dispatch(push('recharge-quick'));
                      }}
                      arrow="horizontal"
                    >
                      <span className={styles.Text}>快捷支付</span>
                    </List.Item>
                 </List> : <div /> }
              {this.props.payTypesList.indexOf(5) !== -1 ?
               <List className="my-list">
                 <List.Item
                    key={2}
                    style={{ height: '9vh', position: 'relative', marginBottom: '1vh' }}
                    thumb={<img src={alipay} style={{  width: '10vw', height: '10vw'}}/>}
                    multipleLine
                    onClick={() => {
                      dispatch(push('recharge-alipay'));
                    }}
                    arrow="horizontal"
                  >
                    <span className={styles.Text}>支付宝转卡</span>
                  </List.Item>
               </List> : <div /> }
               {this.props.payTypesList.indexOf(3) !== -1 ?
               <List className="my-list">
                 <List.Item
                    key={3}
                    style={{ height: '9vh', position: 'relative', marginBottom: '1vh' }}
                    thumb={<img src={wechat} style={{ width: '10vw', height: '10vw'}}/>}
                    multipleLine
                    onClick={() => {
                      dispatch(push('recharge-wechat'));
                    }}
                    arrow="horizontal"
                  >
                    <span className={styles.Text}>微信扫码</span>
                  </List.Item>
               </List> : <div /> }

               {this.props.payTypesList.indexOf(6) !== -1 ?
               <List className="my-list">
                 <List.Item
                    key={4}
                    style={{ height: '9vh', position: 'relative', marginBottom: '1vh' }}
                    thumb={<img src={QQ} style={{  width: '10vw',  height: '6.7vh'}}/>}
                    multipleLine
                    onClick={() => {
                      dispatch(push('recharge-qq'));
                    }}
                    arrow="horizontal"
                  >
                    <span className={styles.Text}>QQ扫码</span>
                  </List.Item>
               </List> : <div /> }
               {this.props.payTypesList.indexOf(2) !== -1 ?
               <List className="my-list">
                 <List.Item
                    key={5}
                    style={{ height: '9vh', position: 'relative', marginBottom: '1vh' }}
                    thumb={<img src={online} style={{ width: '12vw',  height: '4.7vh'}}/>}
                    multipleLine
                    onClick={() => {
                      dispatch(push('recharge-onlie'));
                    }}
                    arrow="horizontal"
                  >
                    <span className={styles.Text} style={{ marginLeft: '2vw' }}>网银转账</span>
                  </List.Item>
               </List> : <div /> }
               {this.props.payTypesList.indexOf(8) !== -1 ?
                   <List className="my-list">
                     <List.Item
                         key={6}
                         style={{ height: '9vh', position: 'relative', marginBottom: '1vh' }}
                         thumb={<img src={wechat} style={{ width: '10vw', height: '10vw'}}/>}
                         multipleLine
                         onClick={() => {
                             dispatch(push('wechat-h5'));
                         }}
                         arrow="horizontal"
                     >
                       <span className={styles.Text}>微信H5</span>
                     </List.Item>
                   </List> : <div /> }
               {this.props.payTypesList.indexOf(7) !== -1 ?
                   <List className="my-list">
                     <List.Item
                         key={7}
                         style={{ height: '9vh', position: 'relative', marginBottom: '1vh' }}
                         thumb={<img src={alipay} style={{  width: '10vw', height: '10vw'}}/>}
                         multipleLine
                         onClick={() => {
                             dispatch(push('alipay-h5'));
                         }}
                         arrow="horizontal"
                     >
                       <span className={styles.Text}>支付宝H5</span>
                     </List.Item>
                   </List> : <div /> }
           </div>
         </div>
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    isFetching: state.BaseInfoReducer.get('isFetching'),
    payTypesList: state.BaseInfoReducer.get('payTypesList'),
    payTypes: state.BaseInfoReducer.get('payTypes'),
  };
};

export default connect(mapStateToProps)(Recharge);
