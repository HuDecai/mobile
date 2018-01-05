import React, { PropTypes } from 'react';
import { ListView } from 'antd-mobile';
import * as FundManagementAction from '../../actions/FundManagementAction';
import ListComponents from '../../components/ListComponents';
import CommonPages from './common/CommonPages';
import CommonDataPicker from '../AgentContent/common/CommonDataPicker';
import { getJiaoyiType } from './JiaoyiData';
import * as styles from './styles.css';
import { connect } from 'react-redux';
import { push, goBack } from 'react-router-redux';
import { dispatch } from '../../store';
import CommonNavBar from '../CommonNavBar/';
const leftIcon = require('../../assets/images/login-back.png');
const rightIcon = require('../../assets/images/header-data.png');
import Cookies from 'js-cookie';
import moment from 'moment';
import Loading from '../../core/decorators/Loading';

const PageSize = 15;
class UserData extends React.PureComponent {
  render() {
    const getMoney = (shouMoney, zhiMoney) => {
      const views = [];
      if(shouMoney > 0 || zhiMoney > 0) {
        views.push(<span style={{ color: '#de3c4b'}}>+{(shouMoney || zhiMoney).toFixed(3) }</span>)
      }
      if(shouMoney < 0 || zhiMoney < 0) {
        views.push(<span style={{ color: '#28a128'}}>{(shouMoney || zhiMoney).toFixed(3) }</span>)
      }
      return views;
    }
    return (
      <div className={styles.userListTr}>
          <div className={styles.touzhuHeader1} style={{ width: '32vw' }}>
             <div style={{ fontSize: '4.5vw', fontWeight: 'bold' }}>{this.props.dashItem.get('typeStr')}</div>
             <div style={{ fontSize: '3vw', marginTop: '1vw' }}>{this.props.dashItem.get('datetime')}</div>
          </div>
          <div className={styles.touzhuHeader2}>
             <div style={{ fontSize: '3.2vw' }}>{this.props.dashItem.get('zhiMoney') != 0 ? '支出' : '收入'}</div>
             <div style={{ fontSize: '3.2vw', color: '#0036d1', marginTop: '1vw' }}>{getMoney(this.props.dashItem.get('shouMoney'), this.props.dashItem.get('zhiMoney'))}</div>
          </div>
          <div className={styles.touzhuHeader3}>
              <div style={{ fontSize: '3.2vw' }}>余额</div>
              <div style={{ fontSize: '3.2vw',  marginTop: '1vw' }}>{this.props.dashItem.get('debtAfter').toFixed(3)}</div>
          </div>
      </div>
    );
  }
}

@Loading(props => props.isFetching)
class FundDetails extends React.PureComponent {
  constructor(props: Object) {
    super(props);
    this.state = {
      visible: false,
    };
  }
  componentWillMount() {
    this.getData(null, null, null, null);
  }
  getData(betTimeStart, betTimeEnd, status, pageNo) {
    const searchData = {
        betTimeStart: betTimeStart ? betTimeStart : this.props.betRecodeSearch.get('betTimeStart'),
        betTimeEnd: betTimeEnd ? betTimeEnd : this.props.betRecodeSearch.get('betTimeEnd'),
        pageSize: PageSize,
        range:2,
        type: status !== null ? status : this.props.betRecodeSearch.get('status'),
        pageNo: pageNo ? pageNo : this.props.betRecodeSearch.get('pageNo'),
    };
    const params = {
      betTimeStart: betTimeStart ? betTimeStart : this.props.betRecodeSearch.get('betTimeStart'),
      betTimeEnd: betTimeEnd ? betTimeEnd : this.props.betRecodeSearch.get('betTimeEnd'),
      status: status !== null ? status : this.props.betRecodeSearch.get('status'),
      pageNo: pageNo ? pageNo : this.props.betRecodeSearch.get('pageNo'),
    }
    this.setSearch(params);
    FundManagementAction.getMoneyDetailList(searchData);
  }
  setSearch(params){
    FundManagementAction.getCaiPiaoSearch(params)
  }
  onclickHandler(value) {
    this.getData(moment().format('YYYY-MM-DD'), moment().format('YYYY-MM-DD'), value, 1);
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
    const moneyDetailList = this.props.moneyDetailList;
    let pageNum = moneyDetailList.get('page');
    const betRecodeSearch = this.props.betRecodeSearch;
    const status = betRecodeSearch.get('status');
    const betTimeStart = betRecodeSearch.get('betTimeStart');
    const betTimeEnd = betRecodeSearch.get('betTimeEnd');
    return (
      <div>
        <CommonNavBar
           headerTitle={'资金明细'}
           leftIcon={leftIcon}
           rightIcon={rightIcon}
           leftAction={() => { dispatch(goBack())}}
           rigthStyle={{ width: '5.6vw' }}
           rightAction={() => { this.setState({ visible: true }) }}
        />
        <div className={styles.content}>
          <div className={styles.tabBarBg}>
            <div className={styles.tabBar}>
                <div
                  onClick={() => this.onclickHandler('')}
                  className={status === '' ? styles.selectedTab : styles.defaultTab}
                >全部</div>
                <div
                  onClick={() => this.onclickHandler(4)}
                  className={status === 4 ? styles.selectedTab : styles.defaultTab3}
                >奖金派送</div>
                <div
                  onClick={() => this.onclickHandler(3)}
                  className={status === 3 ? styles.selectedTab : styles.defaultTab1}
                >充值</div>
                <div
                  onClick={() => this.onclickHandler(8)}
                  className={status === 8 ? styles.selectedTab : styles.defaultTab}
                >提现</div>
            </div>
          </div>
          <div className={styles.userListContent}>
              {this.showData(moneyDetailList.get('results'))}
          </div>
        </div>
        <div style={{ position: 'fixed', bottom: 0, border: '1px solid #f4f4f4', width: '96vw', padding: '2vw', backgroundColor: '#fff' }}>
          <CommonPages 
             total={moneyDetailList.get('pages')}
             current={moneyDetailList.get('page')}
             prevAction={() => {
               this.getData(null, null, null, Number(moneyDetailList.get('page'))-1 );
             }}
             nextAction={() => {
               this.getData(null, null, null, Number(moneyDetailList.get('page'))+1 );
             }}
          />
        </div>
        <CommonDataPicker 
           visible={this.state.visible}
           dateTimeStart={betTimeStart}
           dateTimeEnd={betTimeEnd}
           submitAction={(dateTimeStart, dateTimeEnd) => {
             this.setState({ visible: false });
             this.getData(dateTimeStart, dateTimeEnd, null, moneyDetailList.get('page'));
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
    isFetching: state.FundManagementReducer.get('isFetching'),
    moneyDetailList: state.FundManagementReducer.get('moneyDetailList'),
    betRecodeSearch: state.FundManagementReducer.get('betRecodeSearch'),
  };
};

export default connect(mapStateToProps)(FundDetails);
