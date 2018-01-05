
import Immutable from 'immutable';
import * as BaseInfoAction from '../actions/BaseInfoAction';
import axe from '../lib/axe/src/index';
import ProvinceAndCity from './city';
const ActionHandler = axe.ActionHandler;

const defaultState = Immutable.fromJS({
  isFetching: false,
  errMsg: '',
  tixianInit: Immutable.Map({}),
  bankCardList: Immutable.List([]),
  bankCard: Immutable.Map({}),
  selectBankCard: Immutable.Map({}),
  provinceAndCity: Immutable.fromJS(ProvinceAndCity.datas),
  okMoneyPassword:Immutable.Map({}),
  bankList: Immutable.List([
    Immutable.Map({
      value: '',
      name: '请选择银行',
      url: '',
    }),
    Immutable.Map({
      value: 'ICBC',
      name: '中国工商银行',
      code: '01020000',
      url: '',
    }),
    Immutable.Map({
      value: 'BOC',
      name: '中国银行',
      code: '01040000',
      url: '',
    }),
    Immutable.Map({
      value: 'CCB',
      name: '中国建设银行',
      code: '01050000',
      url: '',
    }),
    Immutable.Map({
      value: 'ABC',
      name: '中国农业银行',
      code: '01030000',
      url: '',
    }),
    Immutable.Map({
      value: 'CIB',
      name: '兴业银行',
      code: '03090000',
      url: '',
    }),
    Immutable.Map({
      value: 'CMBC',
      name: '招商银行',
      code: '03080000',
      url: '',
    }),
    Immutable.Map({
      value: 'CMBCS',
      name: '中国民生银行',
      code: '03050000',
      url: '',
    }),
    Immutable.Map({
      value: 'PSBC',
      name: '邮政储蓄银行',
      code: 'PSBC',
      url: '',
    }),
    Immutable.Map({
      value: 'BOCOM',
      name: '交通银行',
      code: '03010000',
      url: '',
    }),
  ]),
  payTypes: Immutable.List([]),
  payTypesList: Immutable.List([]),
  bankInfos: Immutable.Map({}),
  rechargeInfo: Immutable.Map({}),
  oldPassword: '',
  questionInfo:Immutable.List([]),
});

//银行卡列表
const getBankCards = new ActionHandler.handleAction(BaseInfoAction.GET_BANK_CARD)
    .success((state, action) => {
      return state.set('bankCardList', Immutable.fromJS(action.payload.data.bankLists))
                  .set('isFetching', false);
    })
    
//银行卡选择
const getBankCardInfo = new ActionHandler.handleAction(BaseInfoAction.SET_BANK_CARD)
    .success((state, action) => {
        return state.set('bankCard', Immutable.fromJS(action.payload)).set('isFetching', false);
})
//确认资金密码
const getOkMoneyPassword = new ActionHandler.handleAction(BaseInfoAction.OK_MONEY_PASSWORD)
    .success((state, action) => {
        return state.set('okMoneyPassword', Immutable.fromJS(action.payload)).set('isFetching', false);
    })
//银行卡选择
const selectBankCardInfo = new ActionHandler.handleAction(BaseInfoAction.SELECT_BANK_CARD)
    .success((state, action) => {
        return state.set('selectBankCard', Immutable.fromJS(action.payload)).set('isFetching', false);
})   
// 提现初始化
const tiXianInit = new ActionHandler.handleAction(BaseInfoAction.TI_XIAN_INIT)
      .success((state, action) => {
          return state.set('tixianInit', Immutable.fromJS(action.payload.data))
                .set('isFetching', false);
      })
      
      
// 获取支付类型
const getPayTypeActionHandler = new ActionHandler.handleAction(BaseInfoAction.GET_PAY_TYPES)
          .success((state, action) => {
            const payTypesList = [];
            action.payload.data.map((item) => {payTypesList.push(item.type)});
            return state.set('payTypes', Immutable.fromJS(action.payload.data))
                        .set('payTypesList', Immutable.fromJS(payTypesList))
                        .set('isFetching', false);
          })
          
// 获取转账银行卡信息
const getBankInfoHandler = new ActionHandler.handleAction(BaseInfoAction.GET_BANK_INFO)
      .success((state, action) => {
          return state.set('bankInfos', Immutable.fromJS(action.payload.data)).set('isFetching', false);
      })

// 网银充值
const bankRecharge = new ActionHandler.handleAction(BaseInfoAction.RECHARGE_BANK)
      .success((state, action) => {
        return state.set('bankCode', action.payload.data.code)
        .set('bankUrl',action.payload.data.bankUrl)
        .set('isFetching', false);
      })
      
// 保存旧密码
const savePasswordHandler = new ActionHandler.handleAction(BaseInfoAction.SAVE_PASSWORD)
      .success((state, action) => {
          return state.set('oldPassword', action.payload.data)
          .set('isFetching', false);
})

//密保问题
const getQuestionInfo = new ActionHandler.handleAction(BaseInfoAction.GET_QUESTION_INFO)
    .success((state, action) => {
      return state.set('questionInfo', action.payload.data).set('isFetching', false);
    });

//转账信息
const setRechargeInfo = new ActionHandler.handleAction(BaseInfoAction.SET_RECHARGE_INFO)
        .success((state, action) => {
          return state.set('rechargeInfo', Immutable.fromJS(action.payload)).set('isFetching', false);
        });

export default ActionHandler.handleActions(
  [ 
    getBankCards,
    tiXianInit,
    getBankCardInfo,
    selectBankCardInfo,
    getPayTypeActionHandler,
    getBankInfoHandler,
    bankRecharge,
    getOkMoneyPassword,
    savePasswordHandler,
    getQuestionInfo,
    setRechargeInfo
  ],
  defaultState,
  /^BaseInfoReducer\//,
);
