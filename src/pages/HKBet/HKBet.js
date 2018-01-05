import React, { PropTypes } from 'react';
import * as LotteryAction from '../../actions/LotteryAction';
import * as HKBetAction from '../../actions/HKBetAction';
import TeMa from './TeMa';
import TwoSides from './TwoSides';
import Weishu from './Weishu';
import Immutable from 'immutable';
import styles from './styles.css';
import { checkAppVersion } from '../../actions/LoginAction';

export default class HKBet extends React.PureComponent {
  componentWillMount() {
    checkAppVersion();
    const lId = this.props.lId;
    if(lId) {
      // 获取当前彩票
      LotteryAction.getCurrentLottery({ lId });
      // 获取当前开奖结果
      HKBetAction.getNewLotteryResult({ lId });
      // 获取期数和倒计时
      LotteryAction.getLotteryExpect({ lId });
    }
    // 香港彩赔率
    HKBetAction.hongKongPeiLv();
    HKBetAction.getZodiac();
  }
  componentDidMount() {
    // header 的倒计时
    this.interval = setInterval(() => this.tick(), 5000);
  }
  tick() {
      HKBetAction.hongKongPeiLv();
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  render() {
    const showPlayContent = (id) => {
      console.log(id);
      const views = [];
      if(id == 600) {
        views.push(<TeMa hongKongTeMa={this.props.hongKongTeMa} touzhuDetail={this.props.touzhuDetail} />);
      }else if(id == 601) {
        views.push(<TwoSides hongKongTwoSide={this.props.hongKongTwoSide} touzhuDetail={this.props.touzhuDetail} />);
      }else if(id == 602) {
        views.push(
          <Weishu
             hongKongWeishu={this.props.hongKongWeishu}
             touzhuDetail={this.props.touzhuDetail}
             zodiac={this.props.zodiac}
             weiZodiac={this.props.weiZodiac}
          />
        );
      }
      return views;
    }
    return (
      <div>
         {showPlayContent(this.props.id)}
      </div>
    );
  }
}
