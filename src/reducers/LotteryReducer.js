
import Immutable from 'immutable';
import * as LotteryAction from '../actions/LotteryAction';
import axe from '../lib/axe/src/index';
const ActionHandler = axe.ActionHandler;

const defaultState = Immutable.fromJS({
  isFetching: false,
  lotteryFetching: true,
  errMsg: '',
  backBetClose: false,
  isclearStatus: false, // 是否清空号码选择
  isChaseNumber: false, // 是否追号
  beishu: 1,//倍数
  mode: 0,//最大返水
  todayProfit: 0, //今日盈亏
  singleMoney: 2, // 元 2  角 0.2  分 0.02
  lotteryTypesList: Immutable.fromJS({
    // Type:彩票类型1:时时彩,2:北京赛车Pk10,3:11选5,4:3D
    1: [],
    2: [],
    3: [],
    4: [],
    5: [],
  }),
  // 选中的彩票类型
  currentLotteryType: Immutable.fromJS({
  }),
  // 选中的彩票类型的具体信息
  currentLottery: Immutable.fromJS({
  }),
  // hover的一级菜单
  currentLotteryFirstMenu: Immutable.fromJS({
  }),
  // 选中的玩法
  selectPlayInfo: Immutable.fromJS({
    playKind: {},
    playCate: {},
  }),
  // 选择的选号
  selectLotteryNumbers: "5-6-7-8-9,9,9,9,9",
  currentLotteryExpect: Immutable.fromJS({
    closeExpect: '', //上期
    openExpect: '', //本期期数
    time: '', // 停盘时间
    adminTime: '', //距离开奖时间，单位秒
  }),
  lotteryResult: Immutable.Map({
    result: '',
    expect: '',
  }),
  lotteryResultList: Immutable.List([]),
  winningRanking: Immutable.List([]),
  // 本周盈亏
  thisWeekStatistic: Immutable.List([]),
  // 上周盈亏
  lastWeekStatistic: Immutable.List([]),
  // 今日投注
  userBetList: Immutable.List([]),
  // 选择的号码
  pickData: Immutable.Map({
    way: '',
    playId: '',
    number: '',
    bet: '', // 注数
    beishu: '', //倍数
  }),
  // 选号列表
  pickDataList: Immutable.List([]),
  // 模式百分比
  percentage: Immutable.List([]),
  // 金额模式
  singleMoneyList: Immutable.List([
    Immutable.Map({
      name: '元',
      value: 2,
    }),
    Immutable.Map({
      name: '角',
      value: 0.2,
    }),
    Immutable.Map({
      name: '分',
      value: 0.02,
    }),
  ]),
  orderInfo: Immutable.Map({
    id: '',
    expect: '',
    totalMoney: '',
    totalBonus: '',
    betTime: '',
    isChase: '',
    lotteryName: '',
    playKindName: '',
    profit: '',
    status: '',
    water: '',
    singleMoney: '', // 2：元0.2角0.02分
    num: '',
    detail: '',
    beishu: '',
    mode: '',
    result: '',
    rebate: '',
    bonusType: '',
    // userbetRecordDetailList: Immutable.List([
    //
    // ]),
  }),
  zhuihaoQishuList: [],
  // 开奖号码
  allLotteryNums: Immutable.List([
  ])
});
// 获取开奖结果
const getLotteryResultActionHandler = new ActionHandler.handleAction(LotteryAction.GET_LOTTERY_RESULT)
    .request((state, action) => {
      return state.set('isFetching', false).set('errMsg', '');
    }).success((state, action) => {
      return state.set('lotteryResult', Immutable.fromJS(action.payload.data))
        .set('isFetching', false).set('errMsg', '');
  });

const getLotteryTypeListActionHandler = new ActionHandler.handleAction(LotteryAction.GET_LOTTERY_TYPE_LIST)
  .success((state, action) => {
    // Type:彩票类型1:时时彩,2:北京赛车Pk10,3:11选5,4:3D
    const lotteryTypesList = Immutable.fromJS({
      1: action.payload.data.filter(item => item.type === '1'),
      2: action.payload.data.filter(item => item.type === '2'),
      3: action.payload.data.filter(item => item.type === '3'),
      4: action.payload.data.filter(item => item.type === '4' || item.type === '5'),
    })
    return state.set('lotteryTypesList', lotteryTypesList)
      .set('isFetching', false)
      .set('errMsg', '');
  });

/**
 * 更换当前彩票类型
 * @type {ActionHandler}
 */
const changeLotteryTypeActionHandler = new ActionHandler.handleAction(LotteryAction.CHANGE_LOTTERY_TYPE)
  .success((state, action) => {
    let lotteryResult = state.get('lotteryResult');
    if(state.get('currentLotteryType').get('lId') != action.payload.lId) {
      lotteryResult = Immutable.Map({});
    }
    return state.set('currentLotteryType', Immutable.fromJS(action.payload))
      .set('lotteryResult', lotteryResult)
      .set('pickDataList', Immutable.List([]))
      .set('isFetching', false)
      .set('errMsg', '');
  });
/**
 * hover 更换二级目录
 * @type {ActionHandler}
 */
const setCurrentLotteryFirstMenuActionHandler = new ActionHandler.handleAction(LotteryAction.SET_CURRENTLOTTERY_FIRSTMENU)
  .success((state, action) => {
    const playCate = action.payload;
    const playKinds = state.getIn(['currentLottery', 'listPlayKind']);
    const playKind = playKinds && playKinds.filter(item => item.get('playCateId') == playCate.get('id'));
    return state.set('currentLotteryFirstMenu', action.payload)
                .set('selectLotteryNumbers', '')
                .set('selectPlayInfo', Immutable.fromJS({
                  playCate,
                  playKind: playKind && playKind.get(0),
                }));
  });
// 香港彩玩法选择
  const setHongKongMenuActionHandler = new ActionHandler.handleAction(LotteryAction.SET_HONK_KONG_MENU)
    .success((state, action) => {
      const playCate = action.payload;
      return state.setIn(['selectPlayInfo', 'playKind'], Immutable.fromJS(playCate));
    });
// 选择的玩法信息
const changePlayKindActionHandler = new ActionHandler.handleAction(LotteryAction.CHANGE_PLAY_KIND)
  .success((state, action) => {
    return state
      .set('selectPlayInfo', action.payload)
      .set('selectLotteryNumbers', '');
  });
// 改变当前的选号
const changeSelectLotteryNumbers = new ActionHandler.handleAction(LotteryAction.CHANGE_SELECT_LOTTERY_NUMBERS)
  .success((state, action) => {
    return state.set('selectLotteryNumbers', action.payload);
  });

/**
 * 获取当前彩票类型信息
 * @type {ActionHandler}
 */
const getCurrentLotteryActionHandler = new ActionHandler.handleAction(LotteryAction.GET_CURRENT_LOTTERY)
  .request((state, action) => {
    return state.set('isFetching', true).set('lotteryFetching', true);
  })
  .success((state, action) => {
    const result = action.payload.data;
    const listPlayCate = result.listPlayCate;
    const listPlayKind = result.listPlayKind;
    const lId = result.lId;
    // console.warn(action.payload);
    if (lId == 2 || lId == 5 || lId == 13 || lId == 14 || lId == 20 || lId == 24) {
      return state.set('currentLottery', Immutable.fromJS(result))
        .set('lotteryFetching', false)
        .set('currentLotteryType', Immutable.fromJS(result))
        .set('currentLotteryFirstMenu', Immutable.fromJS(listPlayCate[0]))
        .set('selectPlayInfo', Immutable.fromJS({
          playCate: listPlayCate[33],
          playKind: listPlayKind.filter(item => item.playCateId === listPlayCate[33].id)[0],
        }))
        .set('selectLotteryNumbers', '')
        .set('isFetching', false)
        .set('errMsg', '');
    } else {
      return state.set('currentLottery', Immutable.fromJS(result))
        .set('lotteryFetching', false)
        .set('currentLotteryType', Immutable.fromJS(result))
        .set('currentLotteryFirstMenu', Immutable.fromJS(listPlayCate[0]))
        .set('selectPlayInfo', Immutable.fromJS({
          playCate: listPlayCate[0],
          playKind: listPlayKind.filter(item => item.playCateId === listPlayCate[0].id)[0],
        }))
        .set('selectLotteryNumbers', '')
        .set('isFetching', false)
        .set('errMsg', '');
    }
  });

// 获取开奖列表
const getLotteryResultListActionHandler = new ActionHandler.handleAction(LotteryAction.GET_LOTTERY_RESULT_LIST)
    .request((state, action) => {
      return state.set('isFetching', false).set('errMsg', '');
    })
    .success((state, action) => {
      return state.set('lotteryResultList', Immutable.fromJS(action.payload.data))
        .set('isFetching', false).set('errMsg', '');
    });

// 获取开奖列表
const getMoreLotteryResultListActionHandler = new ActionHandler.handleAction(LotteryAction.GET_MORE_LOTTERY_RESULT_LIST)
        .success((state, action) => {
          return state.set('lotteryResultList', Immutable.fromJS(action.payload.data))
            .set('isFetching', false).set('errMsg', '');
        });

// 获取获奖结果
const getLotteryWinListActionHandler = new ActionHandler.handleAction(LotteryAction.GET_LOTTERY_WIN_LIST)
      .request((state, action) => {
        return state.set('isFetching', false).set('errMsg', '');
      }).success((state, action) => {
        const data = action.payload.data;
        const listData = [];
        if(data){
          data.map((item) => {
            listData.push({
              totalBonus: item.total_bonus,
              name: item.name,
              username: item.username,
            })
          })
        };
      return state.set('winningRanking', Immutable.fromJS(listData))
        .set('isFetching', false).set('errMsg', '');
});
const getLotteryExpectActionHandler = new ActionHandler.handleAction(LotteryAction.GET_LOTTERY_EXPECT)
    .request((state, action) => {
      return state.set('isFetching', false).set('errMsg', '');
    }).success((state, action) => {
      const currentExpect = action.payload.data.openExpect;
      let currentExpectArr = [];
      if(currentExpect) {
        for(let i = 0; i< 120; i++) {
          const expArr = currentExpect.split('-');
          if(expArr.length === 2) {
            const leg = -expArr[1].length;
            const exp1 = Number(expArr[1]) + Number(i);
            currentExpectArr.push({label: `${expArr[0]}-${('0000' + String(exp1)).slice(leg)}`, value: `${expArr[0]}-${('0000' + String(exp1)).slice(leg)}`});
          }else {
            const exp1 = Number(expArr[0]) + Number(i);
            currentExpectArr.push({label: exp1, value: exp1});
          }
        }
      }
      return state.set('currentLotteryExpect', Immutable.fromJS(action.payload.data))
        .set('zhuihaoQishuList', currentExpectArr)
        .set('isFetching', false).set('errMsg', '');
});


// 获取本周盈亏
const getThisWeekStatisticActionHandler = new ActionHandler.handleAction(LotteryAction.GET_THIS_WEEK_STATISTIC)
    .success((state, action) => {
      return state.set('thisWeekStatistic', Immutable.fromJS(action.payload.data))
        .set('isFetching', false).set('errMsg', '');
  });

// 获取上周盈亏
const getLastWeekStatisticActionHandler = new ActionHandler.handleAction(LotteryAction.GET_LAST_WEEK_STATISTIC)
      .success((state, action) => {
        return state.set('lastWeekStatistic', Immutable.fromJS(action.payload.data))
          .set('isFetching', false).set('errMsg', '');
    });

// 获取今日投注
    const findUserBetListActionHandler = new ActionHandler.handleAction(LotteryAction.FIND_USER_BET_LIST)
            .request((state, action) => {
              return state.set('isFetching', false).set('errMsg', '');
            }).success((state, action) => {
            // 计算今日盈亏
            const data = action.payload.data;
            let todayProfit = 0;
            if(data.list) {
              data.list.map((item) => {
                todayProfit = todayProfit + item.profit;
              });
            }
            return state
            .set('userBetList', Immutable.fromJS(data.list))
            .set('todayProfit', todayProfit)
            .set('isFetching', false).set('errMsg', '');
        });

// 获取订单详情
const getUserOrderInfoActionHandler = new ActionHandler.handleAction(LotteryAction.GET_USER_ORDER_INFO)
          .success((state, action) => {
            return state.set('orderInfo', Immutable.fromJS(action.payload.data))
                .set('isFetching', false).set('errMsg', '');
});
// 获取追号列表
const getUserAddListActionHandler = new ActionHandler.handleAction(LotteryAction.GET_CHASE_ORDER_INFO)
        .success((state, action) => {
            return state.set('orderInfo', Immutable.fromJS(action.payload.data))
                .set('isFetching', false).set('errMsg', '');
  });

// 修改投注倍数
const updateBeiShuActionHandler = new ActionHandler.handleAction(LotteryAction.UPDATE_BEISHU)
  .success((state, action) => {
      return state.set('beishu', Immutable.fromJS(action.payload.beishu));
   });

// 修改投注倍数
const updateMoshiActionHandler = new ActionHandler.handleAction(LotteryAction.UPDATE_MOSHI)
  .success((state, action) => {
         return state.set('singleMoney', Immutable.fromJS(action.payload.singleMoney));
});

// 添加号码
const addPickDataActionHandelr = new ActionHandler.handleAction(LotteryAction.ADD_PICK_DATA)
  .success((state, action) => {
    const pickData = action.payload;
    return state.set('pickDataList', Immutable.fromJS([pickData])).set('selectLotteryNumbers', '');
  });
const deleteNthPickDataActionHandler = new ActionHandler.handleAction(LotteryAction.DELETE_NTH_PICK_DATA)
    .success((state, action) => {
      const index = action.payload;
      if (index == -1) {
        return state.set('pickDataList', Immutable.fromJS([]));
      }
      let pickDataList = state.get('pickDataList');
      pickDataList = pickDataList.delete(index);
      return state.set('pickDataList', pickDataList);
    });

// 奖金计算
const updateFanshuiActionHandler = new ActionHandler.handleAction(LotteryAction.UPDATE_FANSHUI)
    .success((state, action) => {
          return state.set('percentage', Immutable.fromJS(action.payload.fanshui))
          .set('mode', action.payload.mode);
});

// 修改mode
const updateModeActionHandler = new ActionHandler.handleAction(LotteryAction.UPDATE_MODE)
    .success((state, action) => {
          return state.set('mode', action.payload.mode);
});

// 撤单
const addBackBetActionHandler = new ActionHandler.handleAction(LotteryAction.ADD_BACK_BET)
      .success((state, action) => {
      return state.set('backBetClose', Immutable.fromJS(action.payload.backBetClose))
        .set('isFetching', false).set('errMsg', '');
});

const updateBackBetCloseActionHandler = new ActionHandler.handleAction(LotteryAction.UPDATE_CLOSE)
      .success((state, action) => {
      return state.set('backBetClose', Immutable.fromJS(action.payload.backBetClose))
        .set('orderInfo', Immutable.fromJS({}))
        .set('isFetching', false).set('errMsg', '');
});


// 获取前三期开奖号码
const getLastThreeResultActionHandler = new ActionHandler.handleAction(LotteryAction.GET_LAST_THREE_RESULT)
    .success((state, action) => {
        const allLotteryNums = [];
        const lIds = [];
        const data = action.payload.data;
        const lId = action.payload.data[0].lId;
        data && data.map((item) => {
           if(lIds.indexOf(item.lId) === -1) {
             allLotteryNums.push({
               lotteryName: item.lotteryName,
               lId: item.lId,
               numberList: [item],
             });
             lIds.push(item.lId);
           } else {
             allLotteryNums.map(value => {
               if(value.lId == item.lId) {
                 value.numberList.push(item);
               }
             })
           }
        })
      return state.set('allLotteryNums', Immutable.fromJS(allLotteryNums))
        .set('isFetching', false).set('errMsg', '');
    });


// 清空
const clearLotteryResultList = new ActionHandler.handleAction(LotteryAction.CLEAR_LOTTERY_RESULT_LIST)
    .success((state, action) => {
      return state.set('lotteryResultList', Immutable.fromJS(action.payload.lotteryResultList))
        .set('currentLotteryType', Immutable.fromJS(action.payload.currentLotteryType))
        .set('isFetching', false).set('errMsg', '');
  });

  // 清空
  const clearOrderInfo = new ActionHandler.handleAction(LotteryAction.CLEAR_ORDER_INFO)
  .success((state, action) => {
      return state.set('orderInfo', Immutable.fromJS({}))
          .set('isFetching', false).set('errMsg', '');
    });

    // 清空
    const clearLastThreeResult = new ActionHandler.handleAction(LotteryAction.CLEAR_THREE_RSULT)
    .success((state, action) => {
        return state.set('allLotteryNums', Immutable.fromJS([]))
            .set('isFetching', false).set('errMsg', '');
      });

export default ActionHandler.handleActions(
  [
    getLotteryResultActionHandler,
    getLotteryTypeListActionHandler,
    changeLotteryTypeActionHandler,
    changePlayKindActionHandler,
    changeSelectLotteryNumbers,
    getCurrentLotteryActionHandler,
    getLotteryResultListActionHandler,
    getLotteryWinListActionHandler,
    getLotteryExpectActionHandler,
    getThisWeekStatisticActionHandler,
    getLastWeekStatisticActionHandler,
    findUserBetListActionHandler,
    setCurrentLotteryFirstMenuActionHandler,
    getUserOrderInfoActionHandler,
    getUserAddListActionHandler,
    addPickDataActionHandelr,
    deleteNthPickDataActionHandler,
    updateBeiShuActionHandler,
    updateFanshuiActionHandler,
    addBackBetActionHandler,
    updateBackBetCloseActionHandler,
    setHongKongMenuActionHandler,
    updateMoshiActionHandler,
    updateModeActionHandler,
    getLastThreeResultActionHandler,
    clearLotteryResultList,
    clearOrderInfo,
    clearLastThreeResult,
    getMoreLotteryResultListActionHandler
  ],
  defaultState,
  /^LotteryReducer\//,
);
