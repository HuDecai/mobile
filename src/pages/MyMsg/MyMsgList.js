import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Toast, List } from 'antd-mobile';
import * as MsgAction from '../../actions/MsgAction';
import MsgHeader from './components/MsgHeader';
import * as styles from './styles.css';
const leftIcon = require('../../assets/images/login-back.png');
import { push, goBack, replace } from 'react-router-redux';
import { dispatch } from '../../store';
import Loading from '../../core/decorators/Loading';


@Loading(props => props.isFetching)
class MyMsgLisst extends React.PureComponent {
  constructor(props: Object) {
    super(props);
    this.state = {
      selectedTab: 0,
    };
  }
  componentWillMount() {
    this.getMsgAction();
  }
  getMsgAction() {
    const url = window.location.href;
    if(url.indexOf('system-msg-list') !== -1) {
      this.setState({ selectedTab: 1 });
      MsgAction.getNotice({ signMessage: 3, pageNo: 1, pageSize: 15 });
    }else if(url.indexOf('my-msg-list') !== -1) {
      this.setState({ selectedTab: 2 });
      MsgAction.getNotice({ signMessage: 1, pageNo: 1, pageSize: 15 });
    }
  }
  onclickHandler() {
    const selectedTab = this.state.selectedTab;
    if(selectedTab === 1) {
      dispatch(replace('my-msg-list'));
      this.setState({selectedTab: 2});
      MsgAction.getNotice({ signMessage: 1, pageNo: 1, pageSize: 15 });
    }
    if(selectedTab === 2) {
      dispatch(replace('system-msg-list'));
      this.setState({selectedTab: 1});
      MsgAction.getNotice({ signMessage: 3, pageNo: 1, pageSize: 15 });
    }
  }
  showMyMsgList(value) {
    const views = [];
    if(value) {
      value.map((item, key) => {
        views.push(
          <List.Item
             key={item.get('id')}
             style={{ height: '15vw', position: 'relative', borderBottom: '1px solid #f4f4f4' }}
             multipleLine
             onClick={() => {
               MsgAction.currentUserMsg({ currentUserMsg: item.toJS() });
               dispatch(push('my-msg-info'));
             }}
             arrow="horizontal"
           >
             <div style={{ color: '#5b5b5b' }}>
                 <div className={styles.msgTitle}>{item.get('title')}</div>
                 <div style={{ fontSize: '2.4vw' }}>{`${item.get('time')} 来自${item.get('username')}`}</div>
             </div>
           </List.Item>
        )
      })
    }
    return views;
  }
  showSystemMsgList(value) {
    const views = [];
    if(value) {
      value.map((item, key) => {
        views.push(
            <List.Item
               key={item.get('id')}
               style={{ height: '15vw', position: 'relative', borderBottom: '1px solid #f4f4f4', borderTop: key == 0 ? '1px solid #f4f4f4':'' }}
               multipleLine
               onClick={() => {
                 MsgAction.currentMsg({ currentMsg: item.toJS() });
                 dispatch(push('system-msg'));
               }}
               arrow="horizontal"
             >
               <div style={{ color: '#5b5b5b' }}>
                   <div className={styles.msgTitle}>{item.get('title')}</div>
                   <div style={{ fontSize: '2.4vw' }}>{item.get('time')}</div>
               </div>
           </List.Item>
        )
      })
    }
    return views;
  }
  getRigthContent() {
    if(this.state.selectedTab == 1) {
      return ' ';
    } else if(this.state.selectedTab == 2) {
      return '+新建消息';
    }
  }
  render() {
    const { selectedTab } = this.state;
    const showMsgList = () => {
      const views = [];
      if(selectedTab == 1) {
        views.push(
          <List>
              {this.showSystemMsgList(this.props.noticeList)}
          </List>
        );
      }else if(selectedTab == 2) {
        views.push(
          <List>
              {this.showMyMsgList(this.props.noticeList)}
          </List>
        );
      }
      return views;
    }
    return (
      <div>
        <MsgHeader
           headerTitle={'我的消息'}
           leftIcon={leftIcon}
           leftAction={() => { dispatch(goBack())}}
           RigthText={this.getRigthContent()}
           rightAction={() => { dispatch(push('send-msg'))}}
        />
        <div className={styles.myMsg}>
          <div className={styles.tabBarBg}>
            <div className={styles.tabBar}>
              <div
                value={1}
                onClick={() => this.onclickHandler()}
                className={selectedTab === 1 ? styles.selectedTab : styles.defaultTab}
              >系统消息</div>
              <div
                onClick={() => this.onclickHandler()}
                className={selectedTab === 2 ? styles.selectedTab : styles.defaultTab}
              >个人消息</div>
            </div>
          </div>
          <div className={styles.myMsgList}>
            {showMsgList()}
          </div>
        </div>
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    isFetching: state.MsgReducer.get('isFetching'),
    noticeList: state.MsgReducer.get('noticeList'),
  };
};

export default connect(mapStateToProps)(MyMsgLisst);
