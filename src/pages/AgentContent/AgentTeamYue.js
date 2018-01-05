import React, { PropTypes } from 'react';
import * as AgentCenterAction from '../../actions/AgentCenterAction';
import * as styles from './styles.css';
import { connect } from 'react-redux';
import { goBack } from 'react-router-redux';
import { dispatch } from '../../store';
import CommonNavBar from '../CommonNavBar/';
const leftIcon = require('../../assets/images/login-back.png');
import Loading from '../../core/decorators/Loading';
import { checkAppVersion } from '../../actions/LoginAction';

@Loading(props => props.isFetching)
class AgentTeamYue extends React.PureComponent {
  componentWillMount() {
    // 团队余额
    AgentCenterAction.getTeamMoney();
    checkAppVersion();
  }
  render() {
    return (
      <div>
          <CommonNavBar
             headerTitle={'团队余额'}
             leftIcon={leftIcon}
             leftAction={() => { dispatch(goBack())}}
          />
          <div className={styles.passwordContent}>
              <div className={styles.teamCard}>
                  <div>用户名</div>
                  <div>{this.props.teamTotalMoney.get('username')}</div>
              </div>
              <div className={styles.teamCard}>
                  <div>昵称</div>
                  <div>{this.props.teamTotalMoney.get('nickName')}</div>
              </div>
              <div className={styles.teamCard}>
                  <div>当前团队余额</div>
                  <div>{this.props.teamTotalMoney.get('totalMoney') && this.props.teamTotalMoney.get('totalMoney').toFixed(3)}</div>
              </div>
          </div>
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return {
     isFetching: state.AgentReducer.get('isFetching'),
     teamTotalMoney: state.AgentReducer.get('teamTotalMoney'),
  };
};

export default connect(mapStateToProps)(AgentTeamYue);
