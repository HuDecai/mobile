
import React, { PropTypes } from 'react';
import { Toast } from 'antd-mobile';
import * as LotteryAction from '../../actions/LotteryAction';
import CommonNavBar from '../CommonNavBar/';
import TrendCard from './TrendCard';
import * as styles from './styles.css';
const leftIcon = require('../../assets/images/login-back.png');
import { push, goBack } from 'react-router-redux';
import { dispatch } from '../../store';
import Cookies from 'js-cookie';
// import Loading from '../../core/decorators/Loading';
import { checkAppVersion } from '../../actions/LoginAction';


// @Loading(props => props.isFetching)
class LotteryTrend extends React.PureComponent {
  constructor(props: Object) {
    super(props);
    this.state = {
    };
  }
  componentWillMount() {
    LotteryAction.getLastThreeResult();
    checkAppVersion();
  }
  componentWillUnmount() {
    // 清空reducer
    LotteryAction.clearLastThreeResult();
  }
  render() {
    const showTrendList = (allLotteryNums) => {
      const views = [];
      if(allLotteryNums) {
        allLotteryNums.map((item, key) => {
          views.push(
            <TrendCard
                lotteryName={item.get('lotteryName')}
                lId={item.get('lId')}
                trendList={item.get('numberList')}
            />
          )
        })
      }
      return views;
    }
    return (
      <div>
          <CommonNavBar
             headerTitle={'开奖号码'}
             leftAction={() => {}}
          />
          <div className={styles.content}>
              {showTrendList(this.props.allLotteryNums)}
          </div>
      </div>
    );
  }
}

export default LotteryTrend;
