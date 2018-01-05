
import React, { PropTypes } from 'react';
import { ListView } from 'antd-mobile';
import * as FundManagementAction from '../../actions/FundManagementAction';
import ListComponents from '../../components/ListComponents';
import CommonDataPicker from '../AgentContent/common/CommonDataPicker';
import * as styles from './styles.css';
import { connect } from 'react-redux';
import { push, goBack } from 'react-router-redux';
import { dispatch } from '../../store';
import CommonNavBar from '../CommonNavBar/';
import CommonPages from './common/CommonPages';
const leftIcon = require('../../assets/images/login-back.png');
const rightIcon = require('../../assets/images/header-data.png');
import Cookies from 'js-cookie';
import moment from 'moment';
import Loading from '../../core/decorators/Loading';

const PageSize = 15;
const UserData = (props) => {
  const statusArr = ['未处理', '已处理', '用户撤单', '追号停止', '异常状态', '系统撤单', '未中奖', '已中奖'];
  return (
    <div className={styles.userListTr}
       onClick={() => {
         dispatch(push(`chase-order-details/${props.dashItem.get('id')}`));
       }}
    >
        <div className={styles.touzhuHeader1}>
           <div style={{ fontSize: '4.5vw', fontWeight: 'bold' }}>{props.dashItem.get('lotteryName')}</div>
           <div style={{ fontSize: '3vw', marginTop: '1vw' }}>{props.dashItem.get('expect')}</div>
        </div>
        <div className={styles.touzhuHeader2}>
           <div style={{ fontSize: '3.2vw' }}>{props.dashItem.get('playKindName')||'空'}</div>
           <div style={{ fontSize: '3.2vw', color: '#0036d1', marginTop: '1vw' }}>{props.dashItem.get('total')}元</div>
        </div>
        <div className={styles.touzhuHeader3}>
            <div style={{ fontSize: '3.2vw' }}>{statusArr[Number(props.dashItem.get('status'))]}</div>
            <div style={{ fontSize: '3.2vw',  marginTop: '1vw', color: '#64b45a'  }}>{`${props.dashItem.get('finish')}/${props.dashItem.get('num')}`}</div>
        </div>
    </div>
  );
}

@Loading(props => props.isFetching)
class ChaseRecord extends React.PureComponent {
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
        dateTimeStart: betTimeStart ? betTimeStart : this.props.chaseRecodeSearch.get('dateTimeStart'),
        dateTimeEnd: betTimeEnd ? betTimeEnd : this.props.chaseRecodeSearch.get('dateTimeEnd'),
        pageSize: PageSize,
        status: status !== null ? status : this.props.chaseRecodeSearch.get('status'),
        pageNo: pageNo ? pageNo : this.props.chaseRecodeSearch.get('pageNo'),
    };
    this.setSearch(searchData);
    FundManagementAction.getZhuihaoCaiPiaoList(searchData);
  }
  setSearch(params){
    FundManagementAction.getZhuiHaoSearch(params)
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
    const zhihaoCaiPiaoList = this.props.zhihaoCaiPiaoList;
    let pageNum = zhihaoCaiPiaoList.get('pageNum');
    const chaseRecodeSearch = this.props.chaseRecodeSearch;
    const status = chaseRecodeSearch.get('status');
    const dateTimeStart = chaseRecodeSearch.get('dateTimeStart');
    const dateTimeEnd = chaseRecodeSearch.get('dateTimeEnd');
    return (
      <div>
        <CommonNavBar
           headerTitle={'追号记录'}
           leftIcon={leftIcon}
           rightIcon={rightIcon}
           leftAction={() => { 
             this.setSearch({
               dateTimeStart: moment().format('YYYY-MM-DD'),
               dateTimeEnd: moment().format('YYYY-MM-DD'),
               pageNo: 1,
               status: '',
             })
             dispatch(goBack())
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
                  onClick={() => this.onclickHandler(1)}
                  className={status === 1 ? styles.selectedTab : styles.defaultTab3}
                >进行中</div>
                <div
                  onClick={() => this.onclickHandler(3)}
                  className={status === 3 ? styles.selectedTab : styles.defaultTab1}
                >已结束</div>
                <div
                  onClick={() => this.onclickHandler(2)}
                  className={status === 2 ? styles.selectedTab : styles.defaultTab}
                >已中止</div>
            </div>
          </div>
          <div className={styles.userListContent}>
              {this.showData(zhihaoCaiPiaoList.get('list'))}
          </div>
        </div>
        <div style={{ position: 'fixed', bottom: 0, border: '1px solid #f4f4f4', width: '96vw', padding: '2vw', backgroundColor: '#fff' }}>
          <CommonPages 
             total={zhihaoCaiPiaoList.get('pages')}
             current={zhihaoCaiPiaoList.get('pageNum')}
             prevAction={() => {
               this.getData(null, null, null,zhihaoCaiPiaoList.get('pageNum')-1 );
             }}
             nextAction={() => {
               this.getData(null, null, null, Number(zhihaoCaiPiaoList.get('pageNum'))+1 );
             }}
          />
        </div>
        <CommonDataPicker 
           visible={this.state.visible}
           dateTimeStart={dateTimeStart}
           dateTimeEnd={dateTimeEnd}
           submitAction={(dateTimeStart, dateTimeEnd) => {
             this.setState({ visible: false });
             this.getData(dateTimeStart, dateTimeEnd, null, zhihaoCaiPiaoList.get('pageNum'));
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
      zhihaoCaiPiaoList: state.FundManagementReducer.get('zhihaoCaiPiaoList'),
      chaseRecodeSearch: state.FundManagementReducer.get('chaseRecodeSearch'),
  };
};

export default connect(mapStateToProps)(ChaseRecord);
