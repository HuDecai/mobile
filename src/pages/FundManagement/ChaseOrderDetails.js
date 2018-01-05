import React, { PropTypes } from 'react';
import { Modal } from 'antd-mobile';
import * as LotteryAction from '../../actions/LotteryAction';
import * as styles from './styles.css';
import * as commonStyles from '../../assets/stylesheets/common.css';
import { connect } from 'react-redux';
import { push, goBack } from 'react-router-redux';
import { dispatch } from '../../store';
import CommonNavBar from '../CommonNavBar/';
const leftIcon = require('../../assets/images/login-back.png');
const jiantou = require('../../assets/images/jiantou.png');
import moment from 'moment';
import { shishicaiLongHu, PK10LongHu, dingdanshuan} from '../LotteryRecord/common/LotteryLidsData';
import LoadingPage from '../../core/decorators/LoadingPage';
import { checkAppVersion } from '../../actions/LoginAction';

@LoadingPage(props => props.isFetching)
class ChaseOrderDetails extends React.PureComponent {
  constructor(props: Object) {
    super(props);
    this.state = {
      visible: false,
      content: '',
      backBetList: [],
      secondsElapsed: 0,
      lId: 0,
    };
  }
  componentWillMount() {
    // 获取订单详情
    if (this.props.params.id) {
      LotteryAction.getChaseOrderInfo({ id: this.props.params.id });
    }
    const lId = this.getLid(this.props.orderInfo);
    if(lId) {
      LotteryAction.getLotteryExpect({ lId });
    }
    checkAppVersion();
  }
  componentWillReceiveProps(nextProps) {
    if(nextProps.backBetClose) {
      this.setState({
        backBetList: [],
        secondsElapsed: Number(nextProps.currentLotteryExpect.get('time')),
      });
      LotteryAction.updateBackBetClose({ backBetClose: false, });
    }
    if(this.props.orderInfo !== nextProps.orderInfo) {
      const lId = this.getLid(nextProps.orderInfo);
      if(lId) {
        LotteryAction.getLotteryExpect({ lId });
        this.setState({ lId });
      }
    }
    if(this.props.currentLotteryExpect.get('time') !== nextProps.currentLotteryExpect.get('time')) {
      this.setState({
        secondsElapsed: Number(nextProps.currentLotteryExpect.get('time')),
      });
    }
    if (this.props.currentLotteryExpect !== nextProps.currentLotteryExpect) {
      clearInterval(this.interval);
      this.interval = setInterval(() => this.tick(), 1000);
    }
  }

  componentDidMount() {
    this.interval = setInterval(() => this.tick(), 1000);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
    LotteryAction.clearOrderInfo();
  }
  tick() {
    const expect = this.props.currentLotteryExpect;
    if(this.state.secondsElapsed > 0) {
      this.setState((prevState) => ({
        secondsElapsed: prevState.secondsElapsed - 1
      }));
    } else if(this.state.secondsElapsed === 0 && expect.get('openExpect')) {
      // 倒计时到0的时候请求下一期
      LotteryAction.getLotteryExpect({ lId: this.state.lId });
    }
  }
  getLid(orderInfo) {
    let lId = 0;
    if(orderInfo.get('lId')) {
      lId = orderInfo.get('lId');
    }else if(orderInfo.get('userbetRecordDetailList') && orderInfo.get('userbetRecordDetailList').toJS().length) {
      lId = orderInfo.get('userbetRecordDetailList').toJS()[0].lId;
    }
    return lId;
  }
  chooseBackList(isChecked, index) {
    const backBetList = this.state.backBetList;
    const list = this.props.orderInfo.get('userbetRecordDetailList');
    const listArr = [];
    if(isChecked) {
      // 选中
      if(list) {
        list.map((item, key) => {
          if(key >= index) {
            if(item.get('status') != '用户撤单') {
              listArr.push(item.get('id'));
            }
          }
        })
      }
    } else {
      // 取消
      if(list) {
        list.map((item, key) => {
          if(key > index) {
            listArr.push(item.get('id'));
          }
        })
      }
    }
    this.setState({
      backBetList: [...listArr]
    });
  }
  checkedBackBetList () {
    const backBetList = this.state.backBetList;
    if(backBetList.length) {
      return true;
    }
    return false;
  }
  getTouZhuInfo() {
    const list = this.props.orderInfo.get('userbetRecordDetailList');
    let num = 0;
    let beishu = 0;
    let fandianjine = 0;
    let profit = 0;
    if(list) {
      list.map((item) => {
        num = num + item.get('num');
        beishu = beishu + item.get('beishu');
        fandianjine = fandianjine + item.get('mode')*item.get('totalMoney')/100;
        profit = profit + item.get('profit');
      })
    }
    return [num, beishu, fandianjine, profit];
  }
  showChaseList(data) {
    const expect = this.props.currentLotteryExpect.get('openExpect');
    const views = [];
    if(data) {
      data.map((item, index) => {
        let status = item.get('status');
        // if(item.get('expect') == expect) {
        //   status = '等待开奖';
        // }
        views.push(
          <div key={index} className={styles.OrderDetailsTr}>
            <div>
              <div className={styles.chaseCheckbox}>
                  <div style={{ width: '5vw', height: '4vw' }}>
                  {status !== '未开奖' || item.get('expect') < expect ? <div /> :
                       <input
                          type="checkbox"
                          style={{ width: '4vw' }}
                          onChange={(e) => {
                           this.chooseBackList(e.target.checked, index)
                          }}
                          checked={this.state.backBetList.indexOf(item.get('id'))===-1?false:true}
                       />
                   }
                   </div>
                   <div>{item.get('expect')}</div>
              </div>
              <div style={{ color: '#0036d1', marginLeft: '4vw' }}>&nbsp;{item.get('totalMoney')}</div>
            </div>
            <div className={styles.chaseRight}>
              {status == '已中奖' ? <div style={{ color: '#de3c46'}}>{`${status} ${item.get('profit')}`}</div> : <div>{status}</div>}
              {item.get('result') ? <div style={{ marginTop: '1vw'}}>开奖号：{item.get('result')}</div> : <div />}
            </div>
          </div>
        );
      });
    }
    return views;
  }
  render() {
    const singleMoney = {'2': '元', '0.2': '角', '0.02': '分'};
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
      return number;
    }
    return (
      <div>
          <CommonNavBar
             headerTitle={'订单详情'}
             leftIcon={leftIcon}
             leftAction={() => { dispatch(goBack())}}
          />
          <div className={styles.orderDetail}>
            <div className={styles.orderDetailLotteryName}>{this.props.orderInfo.get('lotteryName')}</div>
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
                 <div className={styles.orderDetailItemTest}>{this.props.orderInfo.get('userbetRecordDetailList') ? singleMoney[this.props.orderInfo.get('userbetRecordDetailList').toJS()[0].singleMoney] : ''}</div>
              </div>
            </div>

            <div className={styles.orderDetailItem}>
              <div className={styles.orderDetailItem1}>
                 <div>投注期号</div>
                 <div className={styles.orderDetailItemTest}>{this.props.orderInfo.get('expect')}</div>
              </div>
              <div className={styles.orderDetailItem1}>
                 <div>投注时间</div>
                 <div className={styles.orderDetailItemTest}>{moment(this.props.orderInfo.get('time')).format('YYYY-MM-DD HH:mm:ss')}</div>
              </div>
            </div>

            <div className={styles.orderDetailItem}>
              <div className={styles.orderDetailItem1}>
                 <div>合计注数</div>
                 <div className={styles.orderDetailItemTest}>{this.getTouZhuInfo()[0]}</div>
              </div>
              <div className={styles.orderDetailItem1}>
                 <div>投注倍数</div>
                 <div className={styles.orderDetailItemTest}>{this.getTouZhuInfo()[1]}</div>
              </div>
            </div>

            <div className={styles.orderDetailItem}>
              <div className={styles.orderDetailItem1}>
                 <div>投注金额</div>
                 <div className={styles.orderDetailItemTest}>{this.props.orderInfo.get('total') && this.props.orderInfo.get('total').toFixed(3)}</div>
              </div>
              <div className={styles.orderDetailItem1}>
                 <div>返点金额</div>
                 <div className={styles.orderDetailItemTest}>{this.getTouZhuInfo()[2].toFixed(3)}</div>
              </div>
            </div>

            <div className={styles.orderDetailItem}>
              <div className={styles.orderDetailItem1}>
                 <div>中奖金额</div>
                 <div className={styles.orderDetailItemTest}>{this.props.orderInfo.get('awardMoney') && this.props.orderInfo.get('awardMoney').toFixed(3)}</div>
              </div>
              <div className={styles.orderDetailItem1}>
                 <div>实际盈亏</div>
                 <div className={styles.orderDetailItemTest}>{showTodayProfit(this.getTouZhuInfo()[3])}</div>
              </div>
            </div>

            <div className={styles.orderDetailItem}>
              <div className={styles.orderDetailItem1}>
                 <div>追号期数</div>
                 <div className={styles.orderDetailItemTest}>{this.props.orderInfo.get('userbetRecordDetailList') ? this.props.orderInfo.get('userbetRecordDetailList').count() : 0}</div>
              </div>
              <div className={styles.orderDetailItem1}>
                 <div>完成期数</div>
                 <div className={styles.orderDetailItemTest}>{this.props.orderInfo.get('finish')}</div>
              </div>
            </div>

            <div className={styles.orderDetailItem}>
              <div className={styles.orderDetailItem1}>
                 <div>订单状态</div>
                 <div className={styles.orderDetailItemTest}>{this.props.orderInfo.get('status')}</div>
              </div>
              <div className={styles.orderDetailItem1}>
                 <div>中奖停止</div>
                 <div className={styles.orderDetailItemTest}>{this.props.orderInfo.get('winEnd') == '中奖继续' ? '否' : '是'}</div>
              </div>
            </div>

            <div className={styles.chaseOrderDetail}
               onClick={() => {
                 const detail = showOrderDetail(this.props.orderInfo.get('detail'), this.props.orderInfo.get('playKindId'));
                 this.setState({ visible: true, content: detail })
               }}
            >
               <div>查看投注内容</div>
               <div><img src={jiantou} style={{ width: '2vw' }}/></div>
            </div>

            <div>
               {this.showChaseList(this.props.orderInfo.get('userbetRecordDetailList'))}
            </div>

          </div>
        <div style={{ position: 'fixed', bottom: 0, width: '96vw', padding: '2vw' }}>
          <div className={this.checkedBackBetList() ? commonStyles.clickLoginFormButtom : commonStyles.loginFormButtom}
            onClick={() => {
              if(this.checkedBackBetList()) {
                  LotteryAction.addBackBet(
                    this.state.backBetList,
                    {id: this.props.params.id }
                  );
                  this.setState({ backBetList: [] });
                }
            }}
          >
             撤 单
          </div>
        </div>

        <Modal
          visible={this.state.visible}
          transparent
          maskClosable={false}
          onClose={() => this.setState({ visible: false, content: '' })}
          title="投注内容"
          footer={[{
            text: '关闭',
            onPress: () => { this.setState({ visible: false, content: '' }) },
            style: { backgroundColor: '#de3c46', color: '#fff' }
          }]}
          wrapProps={{ onTouchStart: this.onWrapTouchStart }}
          style={{ width: '90vw' }}
        >
          <div className={styles.modalContent}>
              {this.state.content}
          </div>
        </Modal>
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    isFetching: state.LotteryReducer.get('isFetching'),
    orderInfo: state.LotteryReducer.get('orderInfo'),
    currentLotteryExpect: state.LotteryReducer.get('currentLotteryExpect'),
    backBetClose: state.LotteryReducer.get('backBetClose'),
  };
};

export default connect(mapStateToProps)(ChaseOrderDetails);
