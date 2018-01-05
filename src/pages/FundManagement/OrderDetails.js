import React, { PropTypes } from 'react';
import * as LotteryAction from '../../actions/LotteryAction';
import * as HKBetAction from '../../actions/HKBetAction';
import * as styles from './styles.css';
import * as commonStyles from '../../assets/stylesheets/common.css';
import { connect } from 'react-redux';
import { push, goBack } from 'react-router-redux';
import { dispatch } from '../../store';
import CommonNavBar from '../CommonNavBar/';
const leftIcon = require('../../assets/images/login-back.png');
import moment from 'moment';
import { shishicaiLongHu, PK10LongHu, dingdanshuan} from '../LotteryRecord/common/LotteryLidsData';
import LoadingPage from '../../core/decorators/LoadingPage';
import { checkAppVersion } from '../../actions/LoginAction';

@LoadingPage(props => props.isFetching)
class OrderDetails extends React.PureComponent {
  constructor(props: Object) {
    super(props);
    this.state = {
      secondsElapsed: 0,
    };
  }
  componentWillMount() {
    // 获取订单详情
    if (this.props.params.id) {
      LotteryAction.getUserOrderInfo({ id: this.props.params.id });
    }
    const lId = this.props.orderInfo.get('lId') ? this.props.orderInfo.get('lId') : 0;
    if(lId) {
      LotteryAction.getLotteryExpect({ lId });
    }
    checkAppVersion();
  }
  componentWillReceiveProps(nextProps){
    if(this.props.orderInfo.get('lId') !== nextProps.orderInfo.get('lId') && nextProps.orderInfo.get('lId') == 15){
      HKBetAction.hongKongPeiLv();
      this.setState({
          secondsElapsed: Number(nextProps.currentLotteryExpect.get('time')),
      });
    }
    if(this.props.currentLotteryExpect.get('time') !== nextProps.currentLotteryExpect.get('time')) {
      this.setState({
        secondsElapsed: Number(nextProps.currentLotteryExpect.get('time')),
      });
    }
    if (this.props.currentLotteryExpect !== nextProps.currentLotteryExpect && nextProps.currentLotteryExpect.get('openExpect') == nextProps.orderInfo.get('expect')) {
      clearInterval(this.interval);
      this.interval = setInterval(() => this.tick(), 1000);
    }
  }
  componentDidMount() {
    this.interval = setInterval(() => this.tick(), 1000);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
    // 清除reducer
    LotteryAction.clearOrderInfo();
  }
  tick() {
    const expect = this.props.currentLotteryExpect;
    if(this.state.secondsElapsed > 0) {
      this.setState((prevState) => ({
        secondsElapsed: prevState.secondsElapsed - 1
      }));
    } else if(this.state.secondsElapsed === 0 && expect.get('openExpect')) {
      clearInterval(this.interval);
      LotteryAction.getLotteryExpect({ lId: this.props.orderInfo.get('lId') });
    }
  }
  render() {
    const singleMoney = {'2': '元', '0.2': '角', '0.02': '分', '1': '元'};
    const showOrderDetail = (detail, playKindId) => {
      let number = detail;
      // 龙虎
      if(shishicaiLongHu.indexOf(Number(playKindId)) !== -1 || PK10LongHu.indexOf(Number(playKindId)) !== -1) {
        let numbers = number && number.split('-');
        numbers = numbers && numbers.map(number => {
          if (number == '1') {
            return '龙';
          } else if (number == '2') {
            return '虎';
          } else if (number == '3') {
            return '和';
          }
        });
        number = numbers && numbers.join('-');
      }
      // 订单双
      if(playKindId == dingdanshuan) {
        let numbers = detail && detail.split('-');
        numbers = numbers && numbers.map(number => {
          if (number == '1') {
            return '0单5双';
          } else if (number == '2') {
            return '1单4双';
          } else if (number == '3') {
            return '2单3双';
          } else if (number == '4') {
            return '3单2双';
          } else if (number == '5') {
            return '4单1双';
          } else if (number == '6') {
            return '5单0双';
          }
        });
        number = numbers && numbers.join('-');
      }

      if(playKindId == 601 || playKindId == 600 || playKindId == 602) {
        number = this.props.hongKongPeiLv && this.props.hongKongPeiLv.map(item => {
            if(item.get('id') == number) {
              if(playKindId == 601 || playKindId == 602) {
                  return item.get('name');
              } else {
                return `特码${number}`;
              }
            }
        })
      }
      return number;
    }
    const showTodayProfit = (todayProfit) => {
      const views = [];
      if(todayProfit >= 0) {
        views.push(<span style={{ color: '#de3c4b'}}>{todayProfit.toFixed(3)}</span>)
      }
      if(todayProfit && todayProfit < 0) {
        views.push(<span style={{ color: '#28a128'}}>{todayProfit.toFixed(3)}</span>)
      }
      return views;
    }
    return (
      <div>
          <CommonNavBar
             headerTitle={'订单详情'}
             leftIcon={leftIcon}
             leftAction={() => { dispatch(goBack())}}
          />
        <div className={styles.orderDetail}>
            <div className={styles.orderDetailLotteryName}>
              {this.props.orderInfo.get('lotteryName')}
            </div>
            <div className={styles.orderDetailItem}>
              <div className={styles.orderDetailItem1}>
                 <div>订单编号</div>
                 <div className={styles.orderDetailItemTest}>{this.props.orderInfo.get('id')}</div>
              </div>
              <div className={styles.orderDetailItem1}>
                 <div>奖金模式</div>
                 <div className={styles.orderDetailItemTest}>{this.props.orderInfo.get('bonusType')}</div>
              </div>
            </div>

            <div className={styles.orderDetailItem}>
              <div className={styles.orderDetailItem1}>
                 <div>玩法名称</div>
                 <div className={styles.orderDetailItemTest}>{this.props.orderInfo.get('playKindName')}</div>
              </div>
              <div className={styles.orderDetailItem1}>
                 <div>投注模式</div>
                 <div className={styles.orderDetailItemTest}>{singleMoney[this.props.orderInfo.get('singleMoney')]}</div>
              </div>
            </div>

            <div className={styles.orderDetailItem}>
              <div className={styles.orderDetailItem1}>
                 <div>投注期号</div>
                 <div className={styles.orderDetailItemTest}>{this.props.orderInfo.get('expect')}</div>
              </div>
              <div className={styles.orderDetailItem1}>
                 <div>投注时间</div>
                 <div className={styles.orderDetailItemTest}>{moment(this.props.orderInfo.get('betTime')).format('YYYY-MM-DD HH:mm:ss')}</div>
              </div>
            </div>

            <div className={styles.orderDetailItem}>
              <div className={styles.orderDetailItem1}>
                 <div>合计注数</div>
                 <div className={styles.orderDetailItemTest}>{this.props.orderInfo.get('num')}</div>
              </div>
              <div className={styles.orderDetailItem1}>
                 <div>投注倍数</div>
                 <div className={styles.orderDetailItemTest}>{this.props.orderInfo.get('beishu')}</div>
              </div>
            </div>

            <div className={styles.orderDetailItem}>
              <div className={styles.orderDetailItem1}>
                 <div>投注金额</div>
                 <div className={styles.orderDetailItemTest}>{this.props.orderInfo.get('totalMoney') && this.props.orderInfo.get('totalMoney').toFixed(3)}</div>
              </div>
              <div className={styles.orderDetailItem1}>
                 <div>返点金额</div>
                 <div className={styles.orderDetailItemTest}>{(this.props.orderInfo.get('mode')*this.props.orderInfo.get('totalMoney')/100).toFixed(3)}</div>
              </div>
            </div>

            <div className={styles.orderDetailItem}>
              <div className={styles.orderDetailItem1}>
                 <div>订单状态</div>
                 <div className={styles.orderDetailItemTest}>{this.props.orderInfo.get('status')}</div>
              </div>
              <div className={styles.orderDetailItem1}>
                 <div>开奖号码</div>
                 <div className={styles.orderDetailItemTest}>{this.props.orderInfo.get('result') || '暂无'}</div>
              </div>
            </div>

            <div className={styles.orderDetailItem}>
              <div className={styles.orderDetailItem1}>
                 <div>中奖金额</div>
                 <div className={styles.orderDetailItemTest}>{this.props.orderInfo.get('totalBonus') && this.props.orderInfo.get('totalBonus').toFixed(3)}</div>
              </div>
              <div className={styles.orderDetailItem1}>
                 <div>实际盈亏</div>
                 <div className={styles.orderDetailItemTest}>{showTodayProfit(this.props.orderInfo.get('profit') || 0)}</div>
              </div>
            </div>

            <div className={styles.orderDetailContent}>
               <div>投注内容：</div>
               <div className={styles.orderDetailItemTest}>
                  {showOrderDetail(this.props.orderInfo.get('detail'), this.props.orderInfo.get('playKindId'))}
               </div>
            </div>
        </div>
        {(this.props.orderInfo.get('status') == '未处理' || this.props.orderInfo.get('status') == '未开奖') && (this.props.currentLotteryExpect.get('openExpect') == this.props.orderInfo.get('expect'))?
          <div className={commonStyles.bottomButton}>
            <div className={commonStyles.clickLoginFormButtom}
              onClick={() => {
                  LotteryAction.addBackBet1( {id: this.props.orderInfo.get('id')} );
              }}
            >
               撤 单
            </div>
          </div> : <div /> }
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    isFetching: state.LotteryReducer.get('isFetching'),
    orderInfo: state.LotteryReducer.get('orderInfo'),
    hongKongPeiLv: state.HKBetReducer.get('hongKongPeiLv'),
    currentLotteryExpect: state.LotteryReducer.get('currentLotteryExpect'),
  };
};

export default connect(mapStateToProps)(OrderDetails);
