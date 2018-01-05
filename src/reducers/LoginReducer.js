
import Immutable from 'immutable';
import * as LoginAction from '../actions/LoginAction';
import axe from '../lib/axe/src/index';
const ActionHandler = axe.ActionHandler;

const defaultState = Immutable.fromJS({
  isFetching: false,
  errMsg: '',
  VCode: '', //验证码
  isLogin: false, // 是否登录
});
// 获取用户信息
const getUserInfoActionHandler = new ActionHandler.handleAction('GET_USER_INFO')
  .success((state, action) => {
    return state.set('isLogin', true)
                .set('errMsg', '').set('isFetching', false);
  })
  .failure((state, action) => {
    return state.set('isFetching', false).set('errMsg', action.payload.msg);
  });

const loginOutActionHandler = new ActionHandler.handleAction(LoginAction.LOGIN_OUT)
    .success((state, action) => {
      return state.set('isFetching', false)
                  .set('isLogin', false)
                  .set('errMsg', '');
    })
    .failure((state, action) => {
      return state.set('isFetching', false).set('errMsg', '');
    });

const getCodeActionHandler = new ActionHandler.handleAction('GET_REGISTER_CODE')
      .success((state, action) => {
          return state.set('Vcode',  action.payload.data.code);
    });


export default ActionHandler.handleActions(
  [
    getUserInfoActionHandler,
    loginOutActionHandler,
    getCodeActionHandler,
  ],
  defaultState,
  /^LoginReducer\//,
);
