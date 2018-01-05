import React, { PropTypes } from 'react';
import * as AgentCenterAction from '../../actions/AgentCenterAction';
import * as FundManagementAction from '../../actions/FundManagementAction';
import * as styles from './styles.css';
import { connect } from 'react-redux';
import { goBack } from 'react-router-redux';
import { dispatch } from '../../store';
import CommonNavBar from '../CommonNavBar/';
const leftIcon = require('../../assets/images/login-back.png');
const rightIcon = require('../../assets/images/header-data.png');
import CommonDataPicker from './common/CommonDataPicker';
import Cookies from 'js-cookie';
import moment from 'moment';
import Loading from '../../core/decorators/Loading';
import { checkAppVersion } from '../../actions/LoginAction';

@Loading(props => props.isFetching)
class AgentTeamList extends React.PureComponent {
  constructor(props: Object) {
    super(props);
    this.state = {
      type: 1,
      visible: false,
    };
  }
  componentWillMount() {
    this.getData(null, null, null);
    checkAppVersion();
  }
  getData(betTimeStart, betTimeEnd, type) {
    const searchData = {
        dateTimeStart: betTimeStart ? betTimeStart : this.props.betRecodeSearch.get('betTimeStart'),
        dateTimeEnd: betTimeEnd ? betTimeEnd : this.props.betRecodeSearch.get('betTimeEnd'),
        pageNo: 1,
        pageSize: 15,
        type: type !== null ? type : this.state.type,
    };
    const params = {
      betTimeStart: betTimeStart ? betTimeStart : this.props.betRecodeSearch.get('betTimeStart'),
      betTimeEnd: betTimeEnd ? betTimeEnd : this.props.betRecodeSearch.get('betTimeEnd'),
      status: '',
      pageNo: 1,
    }
    this.setSearch(params);
    AgentCenterAction.getTeamList(searchData);
  }
  setSearch(params){
    FundManagementAction.getCaiPiaoSearch(params)
  }
  onclickHandler(value) {
    this.getData(moment().format('YYYY-MM-DD'), moment().format('YYYY-MM-DD'), value);
    this.setState({ type: value });
  }
  render() {
    const betRecodeSearch = this.props.betRecodeSearch;
    const dateTimeStart = betRecodeSearch.get('betTimeStart');
    const dateTimeEnd = betRecodeSearch.get('betTimeEnd');

    const showProfit = (realProfit) => {
      const views = [];
      if(realProfit >= 0) {
        views.push(<span style={{ color: '#de3c4b'}}>{realProfit}</span>)
      }
      if(realProfit && realProfit < 0) {
        views.push(<span style={{ color: '#28a128'}}>{realProfit}</span>)
      }
      return views;
    }
    const showContent = (type) => {
      const views = [];
      const total = this.props.teamTotal;
      let userRecharge = 0;
      let encashment = 0;
      let bet = 0;
      let rebate = 0;
      let bonus = 0;
      let giftMoney = 0;
      let realProfit = 0;
      let hkBet = 0;
      let dividend = 0;
      let hkBonus = 0;
      if(type === 1) {
        if(total && total.get('userRecharge') !== undefined) {
          userRecharge = total.get('userRecharge').toFixed(3);
          encashment = total.get('encashment').toFixed(3);
          bet = total.get('bet').toFixed(3);
          rebate = total.get('rebate').toFixed(3);
          bonus = total.get('bonus').toFixed(3);
          giftMoney = total.get('giftMoney').toFixed(3);
          realProfit = total.get('realProfit').toFixed(3);
          hkBet = total.get('hkBet').toFixed(3);
          dividend = total.get('dividend').toFixed(3);
          hkBonus = total.get('hkBonus').toFixed(3);
        }
        views.push(
          <div>
              <div className={styles.teamCard}>
                  <div>充值总额</div>
                  <div>{userRecharge}</div>
              </div>
              <div className={styles.teamCard}>
                  <div>提现总额</div>
                  <div>{encashment}</div>
              </div>
              <div className={styles.teamCard}>
                  <div>投注总额</div>
                  <div>{bet}</div>
              </div>
              <div className={styles.teamCard}>
                  <div>返点总额</div>
                  <div>{rebate}</div>
              </div>
              <div className={styles.teamCard}>
                  <div>中奖总额</div>
                  <div>{bonus}</div>
              </div>
              <div className={styles.teamCard}>
                  <div>活动总额</div>
                  <div>{giftMoney}</div>
              </div>
              <div className={styles.teamCard}>
                  <div>实际盈利</div>
                  <div>{showProfit(realProfit)}</div>
              </div>
          </div>
        )
      }
      if(type === 2) {
        views.push(
          <div>
              <div className={styles.teamCard}>
                  <div>投注总额</div>
                  <div>{hkBet}</div>
              </div>
              <div className={styles.teamCard}>
                  <div>退水总额</div>
                  <div>{dividend}</div>
              </div>
              <div className={styles.teamCard}>
                  <div>中奖总额</div>
                  <div>{hkBonus}</div>
              </div>
              <div className={styles.teamCard}>
                  <div>实际盈亏</div>
                  <div>{showProfit(realProfit)}</div>
              </div>
          </div>
        )
      }
      return views;
    }
    return (
      <div>
          <CommonNavBar
             headerTitle={'团队报表'}
             leftIcon={leftIcon}
             rightIcon={rightIcon}
             leftAction={() => { dispatch(goBack())}}
             rigthStyle={{ width: '5.6vw' }}
             rightAction={() => { this.setState({ visible: true })}}
          />
          <div className={styles.content}>
            <div className={styles.tabBarBg}>
              <div className={styles.tabBar}>
                  <div
                    onClick={() => this.onclickHandler(1)}
                    className={this.state.type === 1 ? styles.selectedTab1 : styles.defaultTab2}
                  >彩票报表</div>
                  <div
                    onClick={() => this.onclickHandler(2)}
                    className={this.state.type === 2 ? styles.selectedTab1 : styles.defaultTab2}
                  >香港彩报表</div>
              </div>
            </div>
            <div className={styles.teamContent}>
            {showContent(this.state.type)}
            </div>
          </div>
          <CommonDataPicker
             visible={this.state.visible}
             dateTimeStart={dateTimeStart}
             dateTimeEnd={dateTimeEnd}
             submitAction={(dateTimeStart, dateTimeEnd) => {
               this.setState({ visible: false });
               this.getData(dateTimeStart, dateTimeEnd, null);
             }}
             cancelAction={() => {
               this.setState({ visible: false });
             }}
          />
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    isFetching: state.AgentReducer.get('isFetching'),
    teamTotal: state.AgentReducer.get('teamTotal'),
    betRecodeSearch: state.FundManagementReducer.get('betRecodeSearch'),
  };
};

export default connect(mapStateToProps)(AgentTeamList);
