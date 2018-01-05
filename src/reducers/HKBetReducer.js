
import Immutable from 'immutable';
import * as HKBetAction from '../actions/HKBetAction';
import axe from '../lib/axe/src/index';
const ActionHandler = axe.ActionHandler;

const defaultState = Immutable.fromJS({
  isFetching: false,
  errMsg: '',
  hongKongPeiLv: Immutable.List([]),
  hongKongTeMa: Immutable.List([]), // 特码
  hongKongTwoSide: Immutable.List([]), // 两面
  hongKongWeishu: Immutable.List([]),
  touzhuDetail: [], //下注详情
  maxPeiLv: '',
  lotteryResult: Immutable.Map({}),
  twoSidesDetail: [],
  betInfo: Immutable.Map({}),
  isShowLotteryRecord: false,
  zodiac: [],
  weiZodiac: Immutable.fromJS({
    '0尾': [10,20,30,40],
    '1尾': ['01',11,21,31,41],
    '2尾': ['02',12,22,32,42],
    '3尾': ['03',13,23,33,43],
    '4尾': ['04',14,24,34,44],
    '5尾': ['05',15,25,35,45],
    '6尾': ['06',16,26,36,46],
    '7尾': ['07',17,27,37,47],
    '8尾': ['08',18,28,38,48],
    '9尾': ['09',19,29,39,49],
  })
});


//  香港彩赔率
const hongKongPeiLvActionHandler = new ActionHandler.handleAction(HKBetAction.HONG_KONG_PEILV)
    .request((state, action) => {
      return state.set('isFetching', false).set('errMsg', '');
    }).success((state, action) => {
     // 1-49 特码   50-最后  两面
     const hongKongTeMa = action.payload.data.filter(item => item.playKindId == 600);
     const hongKongTwoSide = action.payload.data.filter(item => item.playKindId == 601);
     const hongKongWeishu = action.payload.data.filter(item => item.playKindId == 602);
     return state.set('hongKongTeMa', Immutable.fromJS(hongKongTeMa))
           .set('hongKongTwoSide', Immutable.fromJS(hongKongTwoSide))
           .set('hongKongWeishu', Immutable.fromJS(hongKongWeishu))
           .set('hongKongPeiLv', Immutable.fromJS(action.payload.data))
           .set('isFetching', false).set('errMsg', '');
});

//  下注号码
const xiaZhuNumberActionHandler = new ActionHandler.handleAction(HKBetAction.XIAZHU_NUMBER)
    .success((state, action) => {
      const numbers = action.payload.numbers;
      const hongKongPeiLv = state.get('hongKongPeiLv').toJS();
      const twoSidesDetail = [];
      if(numbers) {
        hongKongPeiLv.map((item) => {
          if(item.number > 49 && numbers.indexOf(item.number) !== -1) {
            twoSidesDetail.push(`{${item.name}}`);
          }
        });
      }
      return state.set('touzhuDetail', numbers)
              .set('twoSidesDetail', twoSidesDetail)
              .set('isFetching', false).set('errMsg', '');
});

// 开奖结果
const hongKongResultActionHandler = new ActionHandler.handleAction(HKBetAction.HONG_KONG_RESULT)
    .success((state, action) => {
      return state.set('lotteryResult', Immutable.fromJS(action.payload.data))
            .set('isFetching', false).set('errMsg', '');
});

// 开奖结果
const changeStateActionHandler = new ActionHandler.handleAction(HKBetAction.CHANGE_STATUS)
    .success((state, action) => {
      return state.set('isShowLotteryRecord', action.payload.isShowLotteryRecord)
            .set('isFetching', false).set('errMsg', '');
});

// 投注结果
const betResultActionHandler = new ActionHandler.handleAction(HKBetAction.BET_RESULT)
    .success((state, action) => {
      return state.set('betInfo', Immutable.fromJS(action.payload))
            .set('isFetching', false).set('errMsg', '');
});

// 开奖结果
const getZodiacActionHandler = new ActionHandler.handleAction(HKBetAction.GET_ZODIAC)
    .success((state, action) => {
      return state.set('zodiac', Immutable.fromJS(action.payload.data))
            .set('isFetching', false).set('errMsg', '');
});
export default ActionHandler.handleActions(
  [
    hongKongPeiLvActionHandler,
    xiaZhuNumberActionHandler,
    hongKongResultActionHandler,
    betResultActionHandler,
    changeStateActionHandler,
    getZodiacActionHandler
  ],
  defaultState,
  /^HKBetReducer\//,
);
