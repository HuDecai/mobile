// 组合所有组件  root component

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { TextareaItem } from 'antd-mobile';
import * as MsgAction from '../../actions/MsgAction';
import MsgHeader from './components/MsgHeader';
import * as styles from './styles.css';
const leftIcon = require('../../assets/images/login-back.png');
import { push, goBack, replace } from 'react-router-redux';
import { dispatch } from '../../store';
import Loading from '../../core/decorators/Loading';


@Loading(props => props.isFetching)
class SendMsg extends React.PureComponent {
  constructor(props: Object) {
    super(props);
    this.state = {
      num: 1000,
      rePersonSign: '客服',
      sendTitle: '',
      sendContent: '',
    };
  }
  sendMsg() {
    if(!this.state.rePersonSign || !this.state.sendTitle || !this.state.sendContent) {
      alert('请填写完整信息');
      return false;
    }
    MsgAction.sendMessage({
        rePersonSign:this.state.rePersonSign,
        sendTitle:this.state.sendTitle,
        sendContent:this.state.sendContent,
    })
  }
  render() {
    return (
      <div>
        <MsgHeader
           headerTitle={'发送消息'}
           leftIcon={leftIcon}
           leftAction={() => { dispatch(goBack())}}
           RigthText={'发送'}
           rightAction={() => { 
              this.sendMsg()
           }}
        />
        <div  className={styles.sendMsg}>
          <div className={styles.sendMsgRadio}>
              <div>收件人：</div>
              <div className={styles.sendMsgRadio}>
                <input 
                   type="radio" 
                   checked={this.state.rePersonSign === '客服'}
                   className={styles.radioStyle}
                   onClick={() => {
                     this.setState({ rePersonSign: '客服' });
                   }}
                />
                <div>&nbsp;客服</div>
              </div>
              <div className={styles.sendMsgRadio}>
                <input 
                   type="radio" 
                   checked={this.state.rePersonSign === '上级'}
                   className={styles.radioStyle}
                   onClick={() => {
                     this.setState({ rePersonSign: '上级' });
                   }}
                />
                <div>&nbsp;上级</div>
              </div>
              <div className={styles.sendMsgRadio}>
                <input 
                   type="radio" 
                   checked={this.state.rePersonSign === '下级'}
                   className={styles.radioStyle}
                   onClick={() => {
                     this.setState({ rePersonSign: '下级' });
                   }}
                />
                <div>&nbsp;下级</div>
              </div>
          </div>
          <div style={{ marginTop: '2vw' }}>
            <TextareaItem
               placeholder="消息标题"
               style={{ fontSize: '4vw', color: '#5b5b5b'}}
               onChange={(e) => {
                 this.setState({ sendTitle: e });
               }}
             />
          </div>
          <div style={{ marginTop: '3vw' }}>
              <TextareaItem
                 style={{ fontSize: '4vw', color: '#5b5b5b'}}
                 placeholder="请输入内容..."
                 rows={10}
                 onChange={(e) => {
                   if(1000 - e.length) {
                     this.setState({ sendContent: e, num: 1000 - e.length });
                   }
                 }}
               />
          </div>
          <div className={styles.sendMsgText}>剩余{this.state.num}/1000字</div>
        </div>
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    isFetching: state.MsgReducer.get('isFetching'),
  };
};

export default connect(mapStateToProps)(SendMsg);
