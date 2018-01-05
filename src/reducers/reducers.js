import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';

// 引入各reducers
import LoginReducer from './LoginReducer';
import HomePageReducer from './HomePageReducer';
import FindPassWordReducer from './FindPassWordReducer';
import AgentReducer from './AgentReducer';
import MsgReducer from './MsgReducer';
import LotteryReducer from './LotteryReducer';
import FundManagementReducer from './FundManagementReducer';
import BaseInfoReducer from './BaseInfoReducer';
import HKBetReducer from './HKBetReducer';

// 状态入口
const appReducers = combineReducers({
  routing: routerReducer,
  LoginReducer,
  HomePageReducer,
  FindPassWordReducer,
  AgentReducer,
  MsgReducer,
  LotteryReducer,
  FundManagementReducer,
  BaseInfoReducer,
  HKBetReducer,
});

export default appReducers;
