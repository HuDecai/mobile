
import Immutable from 'immutable';
import * as HomePageAction from '../actions/HomePageAction';
import axe from '../lib/axe/src/index';
const ActionHandler = axe.ActionHandler;

const defaultState = Immutable.fromJS({
  isFetching: false,
  errMsg: '',
  noticeList: Immutable.List([]),
  lotteryTypesList: Immutable.fromJS({
    // Type:彩票类型1:时时彩,2:北京赛车Pk10,3:11选5,4:3D
    1: [],
    2: [],
    3: [],
    4: [],
    5: [],
  }),
  userCaptial: Immutable.Map({
    points: '', //积分
    useMoney: '', //余额
  }),
  changePoints: Immutable.Map({
    points: '', //兑换的积分
    pointsMoney: '', //兑换的余额
  }),
  baseInfo: Immutable.Map({}),
  
  // 所有彩种
  allLotterys: [
    {
      lId: 2,
      name: '重庆时时彩',
      url: require('../assets/images/chongqing.png'),
    },
    {
      lId: 4,
      name: '北京赛车PK10',
      url: require('../assets/images/beijingcar.png'),
    },
    {
      lId: 5,
      name: '澳门时时彩',
      url: require('../assets/images/macau.png'),
    },
    {
      lId: 7,
      name: '广东11选5',
      url: require('../assets/images/guangdong.png'),
    },
    {
      lId: 9,
      name: '江西11选5',
      url: require('../assets/images/jiangxi.png'),
    },
    {
      lId: 10,
      name: '山东11选5',
      url: require('../assets/images/shandong.png'),
    },
    {
      lId: 11,
      name: '福彩3D',
      url: require('../assets/images/3d.png'),
    },
    {
      lId: 12,
      name: '体彩排列3',
      url: require('../assets/images/pailie3.png'),
    },
    {
      lId: 13,
      name: '天津时时彩',
      url: require('../assets/images/tianjin.png'),
    },
    {
      lId: 14,
      name: '新加坡分分彩',
      url: require('../assets/images/xinjiapo.png'),
    },
    {
      lId: 15,
      name: '香港彩',
      url: require('../assets/images/hongkongsix.png'),
    },
    {
      lId: 20,
      name: '加拿大三分彩',
      url: require('../assets/images/canada.png'),
    },
    {
      lId: 24,
      name: '黑龙江时时彩',
      url: require('../assets/images/heilongjiang.png'),
    },
    {
      lId: 25,
      name: '德国赛车PK10',
      url: require('../assets/images/germanycar.png'),
    },
    {
      lId: 26,
      name: '香港11选5',
      url: require('../assets/images/hongkong.png'),
    },
  ],
  // // 感兴趣的彩种
  // loveLotteryIds: [2,4,7,14,20,25],
});
// 获取公告信息
const getNoticeActionHandler = new ActionHandler.handleAction(HomePageAction.GET_NOTICE_LIST)
  .success((state, action) => {
    return state.set('noticeList', Immutable.fromJS(action.payload.data.pageinfo.list))
      .set('isFetching', false).set('errMsg', '');
  });
  
const getLotteryTypeListActionHandler = new ActionHandler.handleAction(HomePageAction.GET_LOTTERY_TYPE_LIST)
    .success((state, action) => {
      // Type:彩票类型1:时时彩,2:北京赛车Pk10,3:11选5,4:3D
      const lotteryTypesList = Immutable.fromJS({
        1: action.payload.data.filter(item => item.type === '1'),
        2: action.payload.data.filter(item => item.type === '2'),
        3: action.payload.data.filter(item => item.type === '3'),
        4: action.payload.data.filter(item => item.type === '4'),
        5: action.payload.data.filter(item => item.type === '5'),
      })
      return state.set('lotteryTypesList', lotteryTypesList)
        .set('isFetching', false)
        .set('errMsg', '');
});

// 获取用户资金
const getUserCaptialInfoActionHandler = new ActionHandler.handleAction(HomePageAction.GET_USER_CAPTIAL_INFO)
        .request((state, action) => {
          return state.set('isFetching', false).set('errMsg', '');
        }).success((state, action) => {
            return state.set('userCaptial', Immutable.fromJS(action.payload.data))
                .set('isFetching', false).set('errMsg', '');
});

// 获取用户资金
const changePointsActionHandler = new ActionHandler.handleAction(HomePageAction.UPDATE_POINTER)
        .success((state, action) => {
            const points = action.payload.points;
            const changePoints = {
              points: points, //兑换的积分
              pointsMoney: points / 1000 , //兑换的余额
            }
            return state.set('changePoints', Immutable.fromJS(changePoints))
                .set('isFetching', false).set('errMsg', '');
});

// 获取用户信息
const getBaseInfoActionHandler = new ActionHandler.handleAction(HomePageAction.BASE_INFO)
    .success((state, action) => {
      return state.set('baseInfo', action.payload.data).set('isFetching', false);
    });
    
    
// // 修改自定义彩种
// const updateLotteryActionHandler = new ActionHandler.handleAction(HomePageAction.CHANGE_LOTTERY)
//      .success((state, action) => {
//           const type = action.payload.type;
//           const item = action.payload.item.toJS();
//           let loveLotteryIds = state.get('loveLotteryIds').toJS();
//           if(type == 'add') {
//             if(loveLotteryIds.indexOf(item.lId) === -1) {
//               loveLotteryIds.push(item.lId);
//             }
//           }
//           if(type == 'delete') {
//             if(loveLotteryIds.indexOf(item.lId) !== -1) {
//               let newLoveLotteryIds = loveLotteryIds.filter(value => value !== item.lId)
//               loveLotteryIds = newLoveLotteryIds;
//             }
//           }
//           localStorage.loveLotteryIds=loveLotteryIds;
//           return state.set('loveLotteryIds', Immutable.fromJS(loveLotteryIds))
//           .set('isFetching', false);
//       });

export default ActionHandler.handleActions(
  [
    getNoticeActionHandler,
    getUserCaptialInfoActionHandler,
    getLotteryTypeListActionHandler,
    changePointsActionHandler,
    getBaseInfoActionHandler,
    // updateLotteryActionHandler
  ],
  defaultState,
  /^HomePageReducer\//,
);
