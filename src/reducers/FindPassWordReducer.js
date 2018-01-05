
import Immutable from 'immutable';
import * as FindPassWordAction from '../actions/FindPassWordAction';
import axe from '../lib/axe/src/index';
const ActionHandler = axe.ActionHandler;

const defaultState = Immutable.fromJS({
  isFetching: false,
  errMsg: '',
  step: 1,
  passWordInfo: Immutable.Map({
    username: '', // 账号
    safePassw: '',// 资金密码
    answerOne: '', // 问题1答案
    answerTwo: '', // 问题2答案
    ques1: '', // 问题1
    ques2: '', // 问题2
    newPassword: '', //新密码
    newPassword1: '', //验证新密码使用
  }),
});
// 获取用户信息
const firstStepActionHandler = new ActionHandler.handleAction(FindPassWordAction.SET_PASSWORD)
  .success((state, action) => {
    console.log(action.payload.data);
    const step = state.get('step');
    if(step === 2) {
      return state.setIn(['passWordInfo', 'ques1'], Immutable.fromJS(action.payload.data[0]))
        .setIn(['passWordInfo', 'ques2'], Immutable.fromJS(action.payload.data[1]))
        .set('isFetching', false).set('errMsg', '');
    }else {
      return state.set('isFetching', false).set('errMsg', '');
    }
  }).failure((state, action) => {
    return state.set('isFetching', false).set('errMsg', action.payload.msg);
  });

  // 获取用户信息
  const setDataActionHandler = new ActionHandler.handleAction(FindPassWordAction.PASSWORD_DATA)
    .success((state, action) => {
      const data = action.payload;
      if(data.step === 1) {
        return state.setIn(['passWordInfo', 'username'], data.username)
          .setIn(['passWordInfo', 'safePassw'], data.safePassw)
          .set('step', 2)
          .set('isFetching', false).set('errMsg', '');
      }
      if(data.step === 2) {
        return state.setIn(['passWordInfo', 'answerOne'], data.answerOne)
          .setIn(['passWordInfo', 'answerTwo'], data.answerTwo)
          .set('step', 3)
          .set('isFetching', false).set('errMsg', '');
      }
      if(data.step === 0) {
        return state.setIn('passWordInfo', Immutable.fromJS({}))
          .set('step', 1)
          .set('isFetching', false).set('errMsg', '');
      }
    });

export default ActionHandler.handleActions(
  [
    firstStepActionHandler, setDataActionHandler
  ],
  defaultState,
  /^FindPassWordReducer\//,
);
