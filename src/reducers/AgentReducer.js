
import Immutable from 'immutable';
import * as AgentCenterAction from '../actions/AgentCenterAction';
import axe from '../lib/axe/src/index';
const ActionHandler = axe.ActionHandler;

const defaultState = Immutable.fromJS({
  isFetching: false,
  errMsg: '',
  isAddUserSuccess: false,
  addUserName: '',
  userList: Immutable.Map({}),
  teamList: Immutable.Map({}),
  teamTotal: Immutable.Map({}),
  genRenList: Immutable.Map({}),
  genRenTotal: Immutable.Map({}),
  zhangbianList: Immutable.Map({}),
  fandianTuiguangLink: '', // 返点推广链接
  wuFandianTuiguangLink: '', // 无返点推广链接
  qrCode: '',// 二维码
  // 彩票返点下拉
  caiPiaoFandian: Immutable.List([]),
  caiPiaoFandian1: Immutable.List([
    Immutable.Map({
      value: 100,
      name: '1960/8.0',
    }),
    Immutable.Map({
      value: 99.8,
      name: '1958/7.9',
    }),
    Immutable.Map({
      value: 99.6,
      name: '1956/7.8',
    }),
    Immutable.Map({
      value: 99.4,
      name: '1954/7.7',
    }),
    Immutable.Map({
      value: 99.2,
      name: '1952/7.6',
    }),
    Immutable.Map({
      value: 99,
      name: '1950/7.5',
    }),
    Immutable.Map({
      value: 98.8,
      name: '1948/7.4',
    }),
    Immutable.Map({
      value: 98.6,
      name: '1946/7.3',
    }),
    Immutable.Map({
      value: 98.4,
      name: '1944/7.2',
    }),
    Immutable.Map({
      value: 98.2,
      name: '1942/7.1',
    }),
    Immutable.Map({
      value: 98,
      name: '1940/7.0',
    }),
    Immutable.Map({
      value: 97,
      name: '1930/6.5',
    }),
    Immutable.Map({
      value: 96,
      name: '1920/6.0',
    }),
    Immutable.Map({
      value: 95,
      name: '1910/5.5',
    }),
    Immutable.Map({
      value: 94,
      name: '1900/5.0',
    }),
    Immutable.Map({
      value: 93,
      name: '1890/4.5',
    }),
    Immutable.Map({
      value: 92,
      name: '1880/4.0',
    }),
    Immutable.Map({
      value: 91,
      name: '1870/3.5',
    }),
    Immutable.Map({
      value: 90,
      name: '1860/3.0',
    }),
    Immutable.Map({
      value: 89,
      name: '1850/2.5',
    }),
    Immutable.Map({
      value: 88,
      name: '1840/2.0',
    }),
    Immutable.Map({
      value: 87,
      name: '1830/1.5',
    }),
    Immutable.Map({
      value: 86,
      name: '1820/1.0',
    }),
    Immutable.Map({
      value: 85,
      name: '1810/0.5',
    }),
    Immutable.Map({
      value: 84,
      name: '1800/0.0',
    })
  ]), 
  caiPiaoFandianMax: '',
  // 香港彩返点下拉
  hongKongCaiPiaoFandian: Immutable.List([]),
  hongKongCaiPiaoFandian1: Immutable.List([
    Immutable.Map({
      value: 3.0,
      name: '3.0',
    }),
    Immutable.Map({
      value: 2.9,
      name: '2.9',
    }),
    Immutable.Map({
      value: 2.8,
      name: '2.8',
    }),
    Immutable.Map({
      value: 2.7,
      name: '2.7',
    }),
    Immutable.Map({
      value: 2.6,
      name: '2.6',
    }),
    Immutable.Map({
      value: 2.5,
      name: '2.5',
    }),
    Immutable.Map({
      value: 2.4,
      name: '2.4',
    }),
    Immutable.Map({
      value: 2.3,
      name: '2.3',
    }),
    Immutable.Map({
      value: 2.2,
      name: '2.2',
    }),
    Immutable.Map({
      value: 2.1,
      name: '2.1',
    }),
    Immutable.Map({
      value: 2.0,
      name: '2.0',
    }),
    Immutable.Map({
      value: 1.9,
      name: '1.9',
    }),
    Immutable.Map({
      value: 1.8,
      name: '1.8',
    }),
    Immutable.Map({
      value: 1.7,
      name: '1.7',
    }),
    Immutable.Map({
      value: 1.6,
      name: '1.6',
    }),
    Immutable.Map({
      value: 1.5,
      name: '1.5',
    }),
    Immutable.Map({
      value: 1.4,
      name: '1.4',
    }),
    Immutable.Map({
      value: 1.3,
      name: '1.3',
    }),
    Immutable.Map({
      value: 1.2,
      name: '1.2',
    }),
    Immutable.Map({
      value: 1.1,
      name: '1.1',
    }),
    Immutable.Map({
      value: 1.0,
      name: '1.0',
    }),
    Immutable.Map({
      value: 0.9,
      name: '0.9',
    }),
    Immutable.Map({
      value: 0.8,
      name: '0.8',
    }),
    Immutable.Map({
      value: 0.7,
      name: '0.7',
    }),
    Immutable.Map({
      value: 0.6,
      name: '0.6',
    }),
    Immutable.Map({
      value: 0.5,
      name: '0.5',
    }),
    Immutable.Map({
      value: 0.4,
      name: '0.4',
    }),
    Immutable.Map({
      value: 0.3,
      name: '0.3',
    }),
    Immutable.Map({
      value: 0.2,
      name: '0.2',
    }),
    Immutable.Map({
      value: 0.1,
      name: '0.1',
    }),
    Immutable.Map({
      value: 0.0,
      name: '0.0',
    }),
  ]),
  hongKongCaiPiaoFandianMax: '',
  // 交易类型
  jiaoyiType: Immutable.List([
    Immutable.Map({
      value: 1,
      name: '实际投注',
    }),
    Immutable.Map({
      value: 2,
      name: '下级返点',
    }),
    Immutable.Map({
      value: 3,
      name: '用户充值',
    }),
    Immutable.Map({
      value: 4,
      name: '奖金派送',
    }),
    Immutable.Map({
      value: 5,
      name: '追号扣款',
    }),
    Immutable.Map({
      value: 6,
      name: '追号返款',
    }),
    Immutable.Map({
      value: 7,
      name: '撤单返款',
    }),
    Immutable.Map({
      value: 8,
      name: '用户提现',
    }),
    Immutable.Map({
      value: 9,
      name: '积分兑换',
    }),
    Immutable.Map({
      value: 10,
      name: '投注返点',
    }),
    Immutable.Map({
      value: 11,
      name: '上级转入',
    }),
    Immutable.Map({
      value: 12,
      name: '消费佣金',
    }),
    Immutable.Map({
      value: 13,
      name: '亏损佣金',
    }),
    Immutable.Map({
      value: 14,
      name: '投注扣款',
    }),
    Immutable.Map({
      value: 15,
      name: '投注返款',
    }),
    Immutable.Map({
      value: 16,
      name: '签到奖金',
    }),
    Immutable.Map({
      value: 17,
      name: '每日达量',
    }),
    Immutable.Map({
      value: 18,
      name: '存款利息',
    }),
    Immutable.Map({
      value: 19,
      name: '电子存款',
    }),
    Immutable.Map({
      value: 20,
      name: '充值加倍送',
    }),
    Immutable.Map({
      value: 21,
      name: '转账返换',
    }),
    Immutable.Map({
      value: 22,
      name: '手动分红',
    }),
    Immutable.Map({
      value: 24,
      name: '后台充值',
    }),
    Immutable.Map({
      value: 25,
      name: '其他',
    }),
    Immutable.Map({
      value: 26,
      name: '转账下级',
    }),
    Immutable.Map({
      value: 27,
      name: '系统扣除',
    }),
    Immutable.Map({
      value: 28,
      name: '撤销分红',
    }),
    Immutable.Map({
      value: 29,
      name: '礼金派送',
    }),
    Immutable.Map({
      value: 30,
      name: '充值送钱',
    }),
    Immutable.Map({
      value: 31,
      name: '总代消费佣金',
    }),
    Immutable.Map({
      value: 32,
      name: '总代亏损佣金',
    }),
    Immutable.Map({
      value: 33,
      name: '私返佣金',
    }),
    Immutable.Map({
      value: 34,
      name: '用户注册',
    }),
    Immutable.Map({
      value: 35,
      name: '系统撤单返款',
    }),
    Immutable.Map({
      value: 36,
      name: '提现返款',
    }),
    Immutable.Map({
      value: 37,
      name: '积分赠送',
    }),
  ]),
  xiajiList: Immutable.List([]),
  teamTotalMoney: Immutable.Map({}),
});

// 获取用户列表
const getUserListActionHandler = new ActionHandler.handleAction(AgentCenterAction.GET_USER_ANGET_LIST)
  .success((state, action) => {
    return state.set('userList', Immutable.fromJS(action.payload.data))
    .set('isFetching', false).set('errMsg', '');
  });
  
// 获取团队列表
const getTeamListActionHandler = new ActionHandler.handleAction(AgentCenterAction.GET_TEAM_ANGET_LIST)
    .success((state, action) => {
      return state.set('teamList', Immutable.fromJS(action.payload.data.dataList))
      .set('teamTotal', Immutable.fromJS(action.payload.data.total))
      .set('genRenList', Immutable.fromJS({}))
      .set('genRenTotal', Immutable.fromJS({}))
      .set('isFetching', false).set('errMsg', '');
    });
    
// 获取个人列表
const getGenRenListActionHandler = new ActionHandler.handleAction(AgentCenterAction.GET_GENREN_ANGET_LIST)
        .success((state, action) => {
          return state.set('genRenList', Immutable.fromJS(action.payload.data.dataList))
          .set('genRenTotal', Immutable.fromJS(action.payload.data.total))
          .set('isFetching', false).set('errMsg', '');
        });
        
// 获取团队帐变列表
const getTeamZhangbianListActionHandler = new ActionHandler.handleAction(AgentCenterAction.GET_TEAM_ZHANGBIAN_LIST)
                .success((state, action) => {
                  return state.set('zhangbianList', Immutable.fromJS(action.payload.data))
                  .set('isFetching', false).set('errMsg', '');
        });
        
// 获取团队余额
const getTeamMoneyActionHandler = new ActionHandler.handleAction(AgentCenterAction.GET_TEAM_MONEY)
      .success((state, action) => {
            return state.set('teamTotalMoney', Immutable.fromJS(action.payload.data))
                  .set('isFetching', false).set('errMsg', '');
});
    
// 生成返点推广链接
const getTuiguangLinkActionHandler = new ActionHandler.handleAction(AgentCenterAction.CREATE_TUIGUANG_LINK)
    .success((state, action) => {
      const fandianTuiguangLink = `${window.location.origin}${window.location.pathname}#/register-page?code=${action.payload.data.code}`;
      return state.set('fandianTuiguangLink', fandianTuiguangLink)
      .set('wuFandianTuiguangLink', '')
      .set('qrCode', fandianTuiguangLink)
      .set('isFetching', false).set('errMsg', '');
});

// 生成无返点推广链接
const getNoTuiguangLinkActionHandler = new ActionHandler.handleAction(AgentCenterAction.CREATE_NO_TUIGUANG_LINK)
    .success((state, action) => {
      const wuFandianTuiguangLink = `${window.location.origin}${window.location.pathname}#/register-page?code=${action.payload.data.code}`;
      return state.set('wuFandianTuiguangLink', wuFandianTuiguangLink)
      .set('fandianTuiguangLink', '')
      .set('qrCode', wuFandianTuiguangLink)
      .set('isFetching', false).set('errMsg', '');
});

// 新增用户
const addUserActionHandler = new ActionHandler.handleAction(AgentCenterAction.ADD_USER)
    .success((state, action) => {
      return state.set('isAddUserSuccess', true)
             .set('addUserName', action.payload.data)
             .set('isFetching', false).set('errMsg', '');
});

// 清除用户数据
const clearUserActionHandler = new ActionHandler.handleAction(AgentCenterAction.CLEAR_USRE_DATA)
    .success((state, action) => {
      return state.set('isAddUserSuccess', false)
             .set('addUserName', '')
             .set('isFetching', false).set('errMsg', '');
});

//  彩票返点
const updateCaipiaoFandianActionHandler = new ActionHandler.handleAction(AgentCenterAction.UPDATE_CAIPIAO_FANDIAN)
    .success((state, action) => {
      const rebate = action.payload.rebate;
      const lowerRebate = action.payload.lowerRebate ?  action.payload.lowerRebate : 0;
      const caiPiaoFandian = [];
      const caiPiaoFandian1 =  state.get('caiPiaoFandian1');
      caiPiaoFandian1.map((item) => {
        if(item.get('value') <= rebate && item.get('value') >= lowerRebate) {
          caiPiaoFandian.push(item);
        }
      });
      return state.set('caiPiaoFandian', caiPiaoFandian)
            .set('caiPiaoFandianMax', caiPiaoFandian[0].toJS().value)
            .set('isFetching', false).set('errMsg', '');
});

//  香港彩返点
const updateHongKongFandianActionHandler = new ActionHandler.handleAction(AgentCenterAction.UPDATE_HONGKONG_FANDIAN)
    .success((state, action) => {
      const hkRebate = action.payload.hkRebate;
      const lowerHkRebate = action.payload.lowerHkRebate ?  action.payload.lowerHkRebate : 0;
      const hongKongCaiPiaoFandian = [];
      const hongKongCaiPiaoFandian1 =  state.get('hongKongCaiPiaoFandian1');
      hongKongCaiPiaoFandian1.map((item) => {
        if(item.get('value') <= hkRebate && item.get('value') >= lowerHkRebate) {
          hongKongCaiPiaoFandian.push(item);
        }
      });
      return state.set('hongKongCaiPiaoFandian', hongKongCaiPiaoFandian)
             .set('hongKongCaiPiaoFandianMax', hongKongCaiPiaoFandian[0].toJS().value)
            .set('isFetching', false).set('errMsg', '');
});

const xiajiListActionHandler = new ActionHandler.handleAction(AgentCenterAction.GET_XIAJI_LIST)
          .success((state, action) => {
            return state.set('xiajiList', action.payload.data)
            .set('isFetching', false);
})

export default ActionHandler.handleActions(
  [
    getUserListActionHandler,
    getTeamListActionHandler,
    getTuiguangLinkActionHandler,
    getNoTuiguangLinkActionHandler,
    addUserActionHandler,
    getGenRenListActionHandler,
    getTeamZhangbianListActionHandler,
    updateCaipiaoFandianActionHandler,
    updateHongKongFandianActionHandler,
    clearUserActionHandler,
    xiajiListActionHandler,
    getTeamMoneyActionHandler
  ],
  defaultState,
  /^AgentReducer\//,
);
