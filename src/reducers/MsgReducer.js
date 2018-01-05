
import Immutable from 'immutable';
import * as MsgAction from '../actions/MsgAction';
import axe from '../lib/axe/src/index';
const ActionHandler = axe.ActionHandler;

const defaultState = Immutable.fromJS({
  isFetching: false,
  errMsg: '',
  noticeList: Immutable.List([]),
  currentMsg: Immutable.Map({
    title: '',
    time: '',
    content: '',
  }),
  // userMsgList: Immutable.List([]),
  currentUserMsg: Immutable.Map({
    id: null,
    title: '',
    time: '',
    content: '',
    username: ''
  }),
});
// 获取公告信息
const getNoticeActionHandler = new ActionHandler.handleAction(MsgAction.GET_NOTICE_LIST)
  .success((state, action) => {
    return state.set('noticeList', Immutable.fromJS(action.payload.data.pageinfo.list))
      .set('isFetching', false).set('errMsg', '');
  });
  
// 获取当前公告信息
  const getCurrentNoticeActionHandler = new ActionHandler.handleAction(MsgAction.UPDATE_NOTICE)
    .success((state, action) => {
      return state.set('currentMsg', Immutable.fromJS(action.payload.currentMsg))
        .set('isFetching', false).set('errMsg', '');
    });
  
// 获取当前收件箱内容
const getCurrentUserMsgActionHandler = new ActionHandler.handleAction(MsgAction.UPDATE_USER_MSG)
        .success((state, action) => {
          return state.set('currentUserMsg', Immutable.fromJS(action.payload.currentUserMsg))
            .set('isFetching', false).set('errMsg', '');
        });

export default ActionHandler.handleActions(
  [
    getNoticeActionHandler,
    getCurrentNoticeActionHandler,
    getCurrentUserMsgActionHandler
  ],
  defaultState,
  /^MsgReducer\//,
);
