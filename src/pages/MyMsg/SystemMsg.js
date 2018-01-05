// 组合所有组件  root component
import React, { PropTypes } from 'react';
import * as styles from './styles.css';
import { connect } from 'react-redux';
import CommonNavBar from '../CommonNavBar/';
const leftIcon = require('../../assets/images/login-back.png');
import { push, goBack} from 'react-router-redux';
import { dispatch } from '../../store';
import Loading from '../../core/decorators/Loading';


@Loading(props => props.isFetching)
class SystemMsg extends React.PureComponent {
  render() {
    return (
      <div>
        <CommonNavBar 
           headerTitle={'我的消息'}
           leftIcon={leftIcon}
           leftAction={() => { 
             dispatch(goBack());
           }}
        />
        <div className={styles.systemMsgInfo}>
            <div className={styles.systemMsgTitle}>
                <div className={styles.systemMsgTitle1}>{this.props.currentMsg.get('title')}</div>
                <div style={{ fontSize: '2.4vw', marginTop: '1vw'}}>{this.props.currentMsg.get('time')}</div>
            </div>
            <div className={styles.systemMsgContent}>{this.props.currentMsg.get('content')}</div>
        </div>
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    isFetching: state.MsgReducer.get('isFetching'),
    currentMsg: state.MsgReducer.get('currentMsg'),
  };
};

export default connect(mapStateToProps)(SystemMsg);

