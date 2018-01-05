// 添加会员
import React, { PropTypes } from 'react';
import { Toast } from 'antd-mobile';
import * as styles from './styles.css';
import { connect } from 'react-redux';
import { push, goBack } from 'react-router-redux';
import { dispatch } from '../../store';
import CommonNavBar from '../CommonNavBar/';
import copy from 'copy-to-clipboard';
import QRCode from 'qrcode.react';
const leftIcon = require('../../assets/images/login-back.png');
const qrcode = require('../../assets/images/agent-link-qrcode.png');

class AgentLinkQrCode extends React.PureComponent {
  render() {
    var u = navigator.userAgent;
    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    const url = isAndroid ? 'https://fir.im/kzcm' : 'https://fir.im/7rh5';
    return (
      <div>
        <CommonNavBar
           headerTitle={'代理链接'}
           leftIcon={leftIcon}
           leftAction={() => { dispatch(goBack())}}
        />
        <div className={styles.passwordContent}>
            <div className={styles.agentLinkQrcode}>
                <div><QRCode value={this.props.qrCode} /></div>
                <div className={styles.agentLinkQrcodeText}>截图保存到本地相册</div>
            </div>
            <div>
              <div className={styles.formtext}>注册地址</div>
              <div className={styles.agentLinkQrcodeContent} >
                <div className={styles.agentLinkQrcodeInput}>
                   <input 
                      value={this.props.fandianTuiguangLink || this.props.wuFandianTuiguangLink}
                      disable={true}
                      style={{ width: '70vw', border: '1px solid #fff'}}
                   />
                </div>
                <div className={styles.agentLinkQrcodeButton}
                     onClick={() => {
                       if(copy(this.props.fandianTuiguangLink || this.props.wuFandianTuiguangLink)) {
                         Toast.info('复制成功', 2);
                       } else {
                         Toast.info('复制失败, 请自行复制文本框内容', 2);
                       }
                     }}
                >复 制</div>
              </div>
              <div className={styles.formtext}>App下载地址</div>
              <div className={styles.agentLinkQrcodeContent} >
                <div className={styles.agentLinkQrcodeInput}>
                  <input 
                     value={url}
                     disable={true}
                     style={{ width: '70vw', border: '1px solid #fff'}}
                  />
                </div>
                <div className={styles.agentLinkQrcodeButton}
                    onClick={() => {
                      if(copy(this.props.fandianTuiguangLink || this.props.wuFandianTuiguangLink)) {
                        Toast.info('复制成功', 2);
                      } else {
                        Toast.info('复制失败, 请自行复制文本框内容', 2);
                      }
                    }}
                >复 制</div>
              </div>
            </div>
        </div>
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    isFetching: state.AgentReducer.get('isFetching'),
    fandianTuiguangLink: state.AgentReducer.get('fandianTuiguangLink'),
    wuFandianTuiguangLink: state.AgentReducer.get('wuFandianTuiguangLink'),
    qrCode: state.AgentReducer.get('qrCode'),
  };
};

export default connect(mapStateToProps)(AgentLinkQrCode);

