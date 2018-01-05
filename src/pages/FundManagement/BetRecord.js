
import React, { PropTypes } from 'react';
import { ListView } from 'antd-mobile';
import * as FundManagementAction from '../../actions/FundManagementAction';
import ListComponents from '../../components/ListComponents';
import CommonDataPicker from '../AgentContent/common/CommonDataPicker';
import CommonPages from './common/CommonPages';
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
const UserData = (props) => {
  const showBet = (profit, status) => {
    const views = [];
    if(profit > 0) {
      views.push(<span style={{ color: '#de3c4b'}}>+{profit.toFixed(3)}</span>)
    }else {
      views.push(<span>{status}</span>)
    }
    return views;
  }
  return (
    <div className={styles.userListTr}
       onClick={() => {
         if(!props.dashItem.get('userChaseId')) {
           dispatch(push(`order-details/${props.dashItem.get('id')}`));
         }else {
           dispatch(push(`chase-order-details/${props.dashItem.get('userChaseId')}`));
         }
       }}
    >
        <div className={styles.touzhuHeader1}>
           <div style={{ fontSize: '4.5vw', fontWeight: 'bold' }}>{props.dashItem.get('lotteryName')}</div>
           <div style={{ fontSize: '3vw', marginTop: '1vw' }}>{props.dashItem.get('expect')}</div>
        </div>
        <div className={styles.touzhuHeader2}>
           <div style={{ fontSize: '3.2vw' }}>{props.dashItem.get('playKindName')}</div>
           <div style={{ fontSize: '3.2vw', color: '#0036d1', marginTop: '1vw' }}>{props.dashItem.get('totalMoney')}元</div>
        </div>
        <div className={styles.touzhuHeader3}>
            <div style={{ fontSize: '3.2vw' }}>{moment(props.dashItem.get('betTime')).format('HH:mm')}</div>
            <div style={{ fontSize: '3.2vw',  marginTop: '1vw'  }}>{showBet(props.dashItem.get('profit'), props.dashItem.get('status'))}</div>
        </div>
    </div>
  );
}

@Loading(props => props.isFetching)
class BetRecord extends React.PureComponent {
  constructor(props: Object) {
    super(props);
    this.state = {
      visible: false,
    };
  }
  componentWillMount() {
    // 获取今日投注记录
    this.getData(null, null, null, null);
  }
  getData(betTimeStart, betTimeEnd, status, pageNo) {
    const searchData = {
        betTimeStart: betTimeStart ? betTimeStart : this.props.betRecodeSearch.get('betTimeStart'),
        betTimeEnd: betTimeEnd ? betTimeEnd : this.props.betRecodeSearch.get('betTimeEnd'),
        pageSize: PageSize,
        status: status !== null ? status : this.props.betRecodeSearch.get('status'),
        pageNo: pageNo ? pageNo : this.props.betRecodeSearch.get('pageNo'),
    };
    this.setSearch(searchData);
    FundManagementAction.getCaiPiaoList(searchData);
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
    const caiPiaoList = this.props.caiPiaoList;
    let pageNum = caiPiaoList.get('pageNum');
    const betRecodeSearch = this.props.betRecodeSearch;
    const status = betRecodeSearch.get('status');
    const betTimeStart = betRecodeSearch.get('betTimeStart');
    const betTimeEnd = betRecodeSearch.get('betTimeEnd');
    return (
      <div>
        <CommonNavBar
           headerTitle={'投注记录'}
           leftIcon={leftIcon}
           rightIcon={rightIcon}
           leftAction={() => {
             this.setSearch({
               betTimeStart: moment().format('YYYY-MM-DD'),
               betTimeEnd: moment().format('YYYY-MM-DD'),
               pageNo: 1,
               status: '',
             })
             dispatch(goBack());
           }}
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
                  onClick={() => this.onclickHandler(0)}
                  className={status === 0 ? styles.selectedTab : styles.defaultTab3}
                >未开奖</div>
                <div
                  onClick={() => this.onclickHandler(7)}
                  className={status === 7 ? styles.selectedTab : styles.defaultTab1}
                >已中奖</div>
                <div
                  onClick={() => this.onclickHandler(6)}
                  className={status === 6 ? styles.selectedTab : styles.defaultTab}
                >未中奖</div>
            </div>
          </div>
          <div className={styles.userListContent}>
              {this.showData(caiPiaoList.get('list'))}
          </div>
        </div>
        <div style={{ position: 'fixed', bottom: 0, border: '1px solid #f4f4f4', width: '96vw', padding: '2vw', backgroundColor: '#fff' }}>
          <CommonPages 
             total={caiPiaoList.get('pages')}
             current={caiPiaoList.get('pageNum')}
             prevAction={() => {
              this.getData(null, null, null,caiPiaoList.get('pageNum')-1 );
             }}
             nextAction={() => {
              this.getData(null, null, null, Number(caiPiaoList.get('pageNum'))+1 );
             }}
          />
        </div>
        
        <CommonDataPicker 
           visible={this.state.visible}
           dateTimeStart={betTimeStart}
           dateTimeEnd={betTimeEnd}
           submitAction={(dateTimeStart, dateTimeEnd) => {
             this.setState({ visible: false });
             this.getData(dateTimeStart, dateTimeEnd, null, caiPiaoList.get('pageNum'));
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
    caiPiaoList: state.FundManagementReducer.get('caiPiaoList'),
    betRecodeSearch: state.FundManagementReducer.get('betRecodeSearch'),
  };
};

export default connect(mapStateToProps)(BetRecord);
