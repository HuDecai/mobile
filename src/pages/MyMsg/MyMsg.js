// 组合所有组件  root component
import React, { PropTypes } from 'react';
import * as styles from './styles.css';
import * as commonStyles from '../../assets/stylesheets/common.css';
import { connect } from 'react-redux';
import CommonNavBar from '../CommonNavBar/';
const leftIcon = require('../../assets/images/login-back.png');
import { push, goBack} from 'react-router-redux';
import { dispatch } from '../../store';
import Loading from '../../core/decorators/Loading';


@Loading(props => props.isFetching)
class MyMsg extends React.PureComponent {
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
        <div className={styles.myMsgInfoContent}>
          <div className={styles.systemMsgTitle}>
              <div className={styles.systemMsgTitle1}>{this.props.currentUserMsg.get('title')}</div>
              <div style={{ fontSize: '2.4vw', marginTop: '1vw'}}>{`${this.props.currentUserMsg.get('time')} 来自${this.props.currentUserMsg.get('username')}`}</div>
          </div>
          <div className={styles.systemMsgContent}>{this.props.currentUserMsg.get('content')}</div>
        </div>
        <div className={commonStyles.bottomButton}>
          <div className={commonStyles.clickLoginFormButtom}
            onClick={() => {
              dispatch(push('send-msg'));
            }}
          >
             回 复 消 息
          </div>
        </div>
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    isFetching: state.MsgReducer.get('isFetching'),
    currentUserMsg: state.MsgReducer.get('currentUserMsg'),
  };
};

export default connect(mapStateToProps)(MyMsg);
