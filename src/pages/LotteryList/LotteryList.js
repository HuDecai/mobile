// 彩票大厅 彩票列表

import React from 'react';
import * as LotteryAction from '../../actions/LotteryAction';
import resource from './resource';
import CommonNavBar from '../CommonNavBar';
import { push } from 'react-router-redux';
import { dispatch } from '../../store';
// import LoadingPage from '../../core/decorators/LoadingPage';
import { checkAppVersion } from '../../actions/LoginAction';

const styles = require('./styles.css');
const lotteryHeaderIcon = require('../../assets/images/lottery-header.png');

// @LoadingPage(props => props.isFetching)
class LotteryList extends React.PureComponent {
  componentWillMount() {
    // 获取彩票种类
    checkAppVersion();
    LotteryAction.getLotteryTypeList();
  }
  renderLotteryList(name, lotteries) {
    const views = [];
    lotteries && lotteries.forEach(lottery => {
      const lotteryInfo = resource[lottery.get('lId')];
      lotteryInfo && lottery.get('isOpen') && views.push(
        <div key={lottery.get('lId')} className={styles.lotteryCell} onClick={() => {
          dispatch(push(`/lottery/${lottery.get('lId')}`));
        }}>
          <div><img className={styles.lotteryImg} src={lotteryInfo.img} /></div>
          <div className={styles.lotteryCellRight}>
            <div className={styles.lotteryName}>{lottery.get('name')}</div>
            <div className={styles.lotteryDesc}>{lotteryInfo.desc}</div>
          </div>
        </div>
      );
    });
    return (
      <div>
        <div className={styles.lotteryListHeader}>
          <img src={lotteryHeaderIcon} className={styles.lotteryListHeaderIcon} />
          {name}
        </div>
        <div>{views}</div>
      </div>
    );
  }
  render() {
    return (
      <div>
        <CommonNavBar headerTitle="彩票大厅" leftAction={() => {}}/>
        <div className={styles.content}>
          {this.renderLotteryList('时时彩系列', this.props.lotteryTypesList && this.props.lotteryTypesList.get('1'))}
          {this.renderLotteryList('赛车系列', this.props.lotteryTypesList && this.props.lotteryTypesList.get('2'))}
          {this.renderLotteryList('11选5系列', this.props.lotteryTypesList && this.props.lotteryTypesList.get('3'))}
          {this.renderLotteryList('其他系列', this.props.lotteryTypesList && this.props.lotteryTypesList.get('4'))}
        </div>
      </div>
    );
  }
}

export default LotteryList;
