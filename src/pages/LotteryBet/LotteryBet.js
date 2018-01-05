// 投注页面

import React from 'react';
import Immutable from 'immutable';
import * as LotteryAction from '../../actions/LotteryAction';
import LotteryNavBar from './LotteryNavBar';
import LotteryBottomBar from './LotteryBottomBar';
import PlayKindComponents from './PlayKindComponent';
import LotteryResult from '../BetConfirm/LotteryResult';
import LotteryTime from '../BetConfirm/LotteryTime';
import Loading from '../../core/decorators/Loading';
import LoadingPage from '../../core/decorators/LoadingPage';
import * as HKBetAction from '../../actions/HKBetAction';
import Cookies from 'js-cookie';
import { checkAppVersion } from '../../actions/LoginAction';

const styles = require('./styles.css');

@LoadingPage(props => props.lotteryFetching || props.isFetching)
class LotteryBet extends React.PureComponent {
  componentWillMount() {
    checkAppVersion();
    try {
      const lId = this.props.params.lId;
      const currentLotteryType = this.props.currentLotteryType;
      const listPlayCate = currentLotteryType.get('listPlayCate');
      const listPlayKind = currentLotteryType.get('listPlayKind');
      // console.log(currentLotteryType && currentLotteryType.toJS(), listPlayCate, listPlayKind);
      // 请求当前彩种的玩法信息
      // LotteryAction.getCurrentLottery({ lId });
      LotteryAction.getLotteryResultList({ lId, rowNumber: 10 });
      LotteryAction.getLotteryExpect({ lId });
      const playKindId = this.props.location.query.playKindId;
      const playCateId = this.props.location.query.playCateId;
      if (playKindId && playCateId) {
        // TODO: 这里最好主动设置，可能有问题
      } else { // 没有指定玩法，默认显示第一个
        // 请求当前彩种的玩法信息
        LotteryAction.getCurrentLottery({ lId });
      }
    } catch(e) {
    }
  }
  componentWillReceiveProps(nextProps) {
  }
  componentWillUnmount() {
    HKBetAction.changeIsShow({ isShowLotteryRecord: false });
  }
  render() {
    const { selectPlayInfo, selectLotteryNumbers, touzhuDetail } = this.props;
    return (
      <div className={styles.lotteryBetContainer}>
        <LotteryNavBar
          selectPlayInfo={this.props.selectPlayInfo}
          currentLottery={this.props.currentLottery}
          selectLotteryNumbers={selectLotteryNumbers}
          touzhuDetail={touzhuDetail}
          lId={this.props.params.lId}
          lotteryFetching={this.props.lotteryFetching}
        />
        <div className={styles.lotteryBetHeader}>
          <LotteryResult
             lotteryResultList={this.props.lotteryResultList}
             lId={this.props.params.lId}
             selectLotteryNumbers={selectLotteryNumbers}
             touzhuDetail={touzhuDetail}
             isShowLotteryRecord={this.props.isShowLotteryRecord}
          />
          <LotteryTime
             currentLotteryExpect={this.props.currentLotteryExpect}
             lotteryName={this.props.currentLotteryType.get('name')}
             lId={this.props.params.lId}
             isShow={0}
          />
        </div>
        <div className={styles.betContent}
           onClick={() => {
             if(this.props.isShowLotteryRecord) {
               HKBetAction.changeIsShow({ isShowLotteryRecord: false });
             }
           }}
        >
          <PlayKindComponents
            selectPlayInfo={selectPlayInfo}
            selectLotteryNumbers={selectLotteryNumbers}
            lId={this.props.params.lId}
            mode={this.props.mode}
            rebate={Cookies.get('rebate')}
            singleMoney={this.props.singleMoney}
          />
        </div>
        <LotteryBottomBar
          selectPlayInfo={selectPlayInfo}
          selectLotteryNumbers={selectLotteryNumbers}
          lId={this.props.params.lId}
          touzhuDetail={touzhuDetail}
        />
      </div>
    );
  }
}

export default LotteryBet;
