
import Immutable from 'immutable';
import * as FundManagementAction from '../actions/FundManagementAction';
import axe from '../lib/axe/src/index';
import moment from 'moment';
const ActionHandler = axe.ActionHandler;

const defaultState = Immutable.fromJS({
  isFetching: false,
  errMsg: '',
  caiPiaoList: Immutable.Map({}),
  hongKongList: Immutable.Map({}),
  zhihaoCaiPiaoList: Immutable.Map({}),
  moneyDetailList: Immutable.Map({}),
  caiZhongList: Immutable.List([
    Immutable.Map({
      value: '',
      name: '所有彩种',
    }),
    Immutable.Map({
      value: '2',
      name: '重庆时时彩',
    }),
    Immutable.Map({
      value: '19',
      name: '澳门5分彩',
    }),
    Immutable.Map({
      value: '20',
      name: '加拿大3分彩',
    }),
    Immutable.Map({
      value: '14',
      name: '新加坡分分彩',
    }),
    Immutable.Map({
      value: '13',
      name: '天津时时彩',
    }),
    Immutable.Map({
      value: '5',
      name: '澳门时时彩',
    }),
    Immutable.Map({
      value: '24',
      name: '黑龙江时时彩',
    }),
    Immutable.Map({
      value: '4',
      name: '北京赛车',
    }),
    Immutable.Map({
      value: '25',
      name: '德国赛车',
    }),
    Immutable.Map({
      value: '26',
      name: '香港11选5',
    }),
    Immutable.Map({
      value: '7',
      name: '广东11选5',
    }),
    Immutable.Map({
      value: '10',
      name: '山东11选5',
    }),
    Immutable.Map({
      value: '9',
      name: '江西11选5',
    }),
    Immutable.Map({
      value: '11',
      name: '福彩3D',
    }),
    Immutable.Map({
      value: '12',
      name: '排列3',
    }),
  ]),
  orderStatus: Immutable.List([
    Immutable.Map({
      value: '',
      name: '全部',
    }),
    Immutable.Map({
      value: '0',
      name: '未处理',
    }),
    Immutable.Map({
      value: '1',
      name: '已处理',
    }),
    Immutable.Map({
      value: '2',
      name: '用户撤单',
    }),
    Immutable.Map({
      value: '3',
      name: '追号停止',
    }),
    Immutable.Map({
      value: '4',
      name: '异常状态',
    }),
    Immutable.Map({
      value: '5',
      name: '系统撤单',
    }),
  ]),
  betRecodeSearch: Immutable.Map({
    betTimeStart: moment().format('YYYY-MM-DD'),
    betTimeEnd: moment().format('YYYY-MM-DD'),
    pageNo: 1,
    status: '',
  }),
  chaseRecodeSearch: {
    dateTimeStart: moment().format('YYYY-MM-DD'),
    dateTimeEnd: moment().format('YYYY-MM-DD'),
    pageNo: 1,
    status: '',
  },
  hongKongSearch: {
    betTimeStart: moment().format('YYYY-MM-DD'),
    betTimeEnd: moment().format('YYYY-MM-DD'),
    pageNo: 1,
    status: '',
  }
});

// 获取彩票订单列表
const getCaiPiaoListActionHandler = new ActionHandler.handleAction(FundManagementAction.GET_CAIPIAO_LIST)
  .success((state, action) => {
    return state.set('caiPiaoList', Immutable.fromJS(action.payload.data))
    .set('isFetching', false).set('errMsg', '');
  });
  
// 获取彩票订单搜索项
const getCaiPiaoSearchActionHandler = new ActionHandler.handleAction(FundManagementAction.GET_CAIPIAO_SEARCH)
  .success((state, action) => {
      return state.set('betRecodeSearch', Immutable.fromJS(action.payload))
      .set('isFetching', false).set('errMsg', '');
});

// 获取香港彩票订单搜索项
const getHongKongSearchActionHandler = new ActionHandler.handleAction(FundManagementAction.GET_HONG_KONG_SEARCH)
  .success((state, action) => {
      return state.set('hongKongSearch', Immutable.fromJS(action.payload))
      .set('isFetching', false).set('errMsg', '');
});

// 获取追号彩票订单搜索项
const getZhuiHaoSearchActionHandler = new ActionHandler.handleAction(FundManagementAction.GET_ZHUIHAO_CAIPIAO_SEARCH)
  .success((state, action) => {
      return state.set('chaseRecodeSearch', Immutable.fromJS(action.payload))
      .set('isFetching', false).set('errMsg', '');
});
  
// 获取香港彩订单列表
const getHongKongListActionHandler = new ActionHandler.handleAction(FundManagementAction.GET_HONG_KONG_LIST)
    .success((state, action) => {
      return state.set('hongKongList', Immutable.fromJS(action.payload.data))
      .set('isFetching', false).set('errMsg', '');
    });

// 获取彩票订单列表
const getZhuiHaoCaiPiaoListActionHandler = new ActionHandler.handleAction(FundManagementAction.GET_ZHUIHAO_CAIPIAO_LIST)
    .success((state, action) => {
        return state.set('zhihaoCaiPiaoList', Immutable.fromJS(action.payload.data))
        .set('isFetching', false).set('errMsg', '');
  });
    
// 获取资金明细列表
const getMoneyDetailListActionHandler = new ActionHandler.handleAction(FundManagementAction.GET_MONEY_DETAIL_LIST)
    .success((state, action) => {
          return state.set('moneyDetailList', Immutable.fromJS(action.payload.data))
          .set('isFetching', false).set('errMsg', '');
});
    
export default ActionHandler.handleActions(
  [
    getCaiPiaoListActionHandler,
    getHongKongListActionHandler,
    getMoneyDetailListActionHandler,
    getZhuiHaoCaiPiaoListActionHandler,
    getCaiPiaoSearchActionHandler,
    getHongKongSearchActionHandler,
    getZhuiHaoSearchActionHandler
  ],
  defaultState,
  /^FundManagementReducer\//,
);
