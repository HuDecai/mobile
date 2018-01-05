// 添加会员
import React, { PropTypes } from 'react';
import { ListView } from 'antd-mobile';
import * as AgentCenterAction from '../../actions/AgentCenterAction';
import ListComponents from '../../components/ListComponents';
import * as styles from './styles.css';
import { connect } from 'react-redux';
import { push, goBack } from 'react-router-redux';
import { dispatch } from '../../store';
import CommonNavBar from '../CommonNavBar/';
import CommonPages from '../FundManagement/common/CommonPages';
const leftIcon = require('../../assets/images/login-back.png');
import Cookies from 'js-cookie';
import { changeFandian } from './common/changeFandian';
import Loading from '../../core/decorators/Loading';
import { checkAppVersion } from '../../actions/LoginAction';

const PageSize = 15;
const UserData = (props) => {
  return (
    <div className={styles.userListTr}>
        <div className={styles.userListHeader1}>{props.dashItem.get('username')}</div>
        <div className={styles.userListHeader2}>{props.dashItem.get('type') == 1 ? '代理':'会员'}</div>
        <div className={styles.userListHeader2}>{changeFandian(props.dashItem.get('rebate'))}</div>
        <div className={styles.userListHeader1}>{props.dashItem.get('leftMoney').toFixed(3)}</div>
    </div>
  );
}

@Loading(props => props.isFetching)
class AgentUserList extends React.PureComponent {
  constructor(props: Object) {
    super(props);
    this.state = {
      type: '',
    };
  }
  componentWillMount() {
    AgentCenterAction.getUserList({ pageSize: PageSize, pageNo: 1 });
    checkAppVersion();
  }
  onclickHandler(value) {
    this.setState({ type: value });
    AgentCenterAction.getUserList({ pageSize: PageSize, pageNo: 1, type: value });
  }
  showData(data) {
    const view = [];
    if(data) {
      data.map(item => {
        view.push(<UserData dashItem={item} />);
      })
    }
    return view;
  }
  render() {
    const userList = this.props.userList;
    let pageNum = userList.get('pageNum');
    return (
      <div>
        <CommonNavBar
           headerTitle={'用户列表'}
           leftIcon={leftIcon}
           leftAction={() => { dispatch(goBack())}}
        />
        <div className={styles.content}>
          <div className={styles.tabBarBg}>
            <div className={styles.tabBar}>
                <div
                  onClick={() => this.onclickHandler('')}
                  className={this.state.type === '' ? styles.selectedTab : styles.defaultTab}
                >全部</div>
                <div
                  onClick={() => this.onclickHandler('1')}
                  className={this.state.type === '1' ? styles.selectedTab : styles.defaultTab1}
                >代理</div>
                <div
                  onClick={() => this.onclickHandler('0')}
                  className={this.state.type === '0' ? styles.selectedTab : styles.defaultTab}
                >会员</div>
            </div>
          </div>
          <div className={styles.userListContent}>
              <div className={styles.userListHeader}>
                  <div className={styles.userListHeader1}>用户名</div>
                  <div className={styles.userListHeader2}>类型</div>
                  <div className={styles.userListHeader2}>奖金</div>
                  <div className={styles.userListHeader1}>余额</div>
              </div>
              <div className={styles.dataContent}>
                {this.showData(userList.get('list'))}
              </div>
          </div>
        </div>
        <div style={{ position: 'fixed', bottom: 0, border: '1px solid #f4f4f4', width: '96vw', padding: '2vw', backgroundColor: '#fff' }}>
          <CommonPages
             total={userList.get('pages')}
             current={userList.get('pageNum')}
             prevAction={() => {
               this.getData({ pageNo: userList.get('pageNum')-1  });
             }}
             nextAction={() => {
               this.getData({ pageNo: Number(userList.get('pageNum'))+1  });
             }}
          />
        </div>
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    isFetching: state.AgentReducer.get('isFetching'),
    userList: state.AgentReducer.get('userList'),
  };
};

export default connect(mapStateToProps)(AgentUserList);
