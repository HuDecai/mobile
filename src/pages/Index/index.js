import { TabBar } from 'antd-mobile';
import { replace } from 'react-router-redux';
import { connect } from 'react-redux';
import React from 'react';
import HomePage from '../HomePage';
import MyInfo from '../MyInfo';
import LotteryTrend from '../LotteryTrend';
import LotteryCircleNumber from '../../components/LotteryCircleNumber';
import LotteryList from '../../pages/LotteryList';
import { dispatch } from '../../store';
import styles from './index.css';

// tabbar icon
const homeIcon = require('../../assets/images/home.png');
const homeActiveIcon = require('../../assets/images/home-active.png');
const meIcon = require('../../assets/images/me.png');
const meActiveIcon = require('../../assets/images/me-active.png');
const trendIcon = require('../../assets/images/trend.png');
const trendActiveIcon = require('../../assets/images/trend-active.png');
const lotteryIcon = require('../../assets/images/lottery.png');
const lotteryActiveIcon = require('../../assets/images/lottery-active.png');
import Loading from '../../core/decorators/Loading';

@Loading(props => props.isFetching)
class CommonTabBar extends React.PureComponent {
  state = {
    selectedTab: '', // tab选择态控制
  };
  componentWillMount() {
    try {
      if (this.props.params.tab) {
        this.setState({
          selectedTab: this.props.params.tab,
        });
      }
    } catch(e) {
      this.setState({
        selectedTab: 'home',
      });
    }
  }
  componentWillReceiveProsp(nextProps) {
    try {
      if (this.props.params.tab !== nextProps.params.tab) {
        this.setState({
          selectedTab: nextProps.params.tab,
        });
      }
    } catch(e) {
      this.setState({
        selectedTab: 'home',
      });
    }
  }
  render() {
    return (
      <TabBar
            unselectedTintColor="#949494"
            tintColor="#459ad6"
            barTintColor="#f7f7f7"
            // hidden={this.state.hidden}
          >
            <TabBar.Item
              title="首页"
              key="home"
              icon={{ uri: homeIcon }}
              selectedIcon={{ uri: homeActiveIcon }}
              selected={this.state.selectedTab === 'home'}
              onPress={() => {
                this.setState({
                  selectedTab: 'home',
                });
                dispatch(replace('/index/home'));
              }}
              data-seed="logId"
            >
              <HomePage />
            </TabBar.Item>
            <TabBar.Item
              icon={{ uri: lotteryIcon }}
              selectedIcon={{ uri: lotteryActiveIcon }}
              title="彩票大厅"
              key="lottery"
              selected={this.state.selectedTab === 'lottery'}
              onPress={() => {
                this.setState({
                  selectedTab: 'lottery',
                });
                dispatch(replace('/index/lottery'));
              }}
              data-seed="logId1"
            >
              <LotteryList />
            </TabBar.Item>
            <TabBar.Item
              icon={{ uri: trendIcon }}
              selectedIcon={{ uri: trendActiveIcon }}
              title="开奖走势"
              key="trend"
              selected={this.state.selectedTab === 'trend'}
              onPress={() => {
                this.setState({
                  selectedTab: 'trend',
                });
                dispatch(replace('/index/trend'));
              }}
            >
              <LotteryTrend />
            </TabBar.Item>
            <TabBar.Item
              icon={{ uri: meIcon }}
              selectedIcon={{ uri: meActiveIcon }}
              title="我的"
              key="me"
              selected={this.state.selectedTab === 'me'}
              onPress={() => {
                this.setState({
                  selectedTab: 'me',
                });
                dispatch(replace('/index/me'));
              }}
            >
              <MyInfo />
            </TabBar.Item>
          </TabBar>
    );
  }
}



const mapStateToProps = (state) => {
  return {
    isFetching: state.LotteryReducer.get('isFetching'),
  };
};

export default connect(mapStateToProps)(CommonTabBar);
// export default CommonTabBar;
