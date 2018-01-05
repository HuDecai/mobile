import { Toast } from 'antd-mobile';
import Tinker from '../lib/tinker/src/index';
import reduxTinker from '../lib/tinker/src/reduxTinker';
import { dispatch } from '../store';
import { replace, push } from 'react-router-redux';

/**
 * 公告信息
 * @type {String}
 */
export const GET_NOTICE_LIST = 'GET_NOTICE_LIST';
export const getNotice = (params) => {
  const fetchHandler = new Tinker(
    `${APIURL}/web/userReMessage.do`,
    {
      method: 'POST',
    },
    params,
  );
  reduxTinker(fetchHandler, GET_NOTICE_LIST, dispatch).start();
};

// 修改当前公告内容
export const UPDATE_NOTICE = 'UPDATE_NOTICE';
export const currentMsg = (params) => {
  dispatch({
    type: UPDATE_NOTICE,
    payload: params,
  });
};

// 修改当前收件箱消息
export const UPDATE_USER_MSG = 'UPDATE_USER_MSG';
export const currentUserMsg = (params) => {
  dispatch({
    type: UPDATE_USER_MSG,
    payload: params,
  });
};


/**
 * 发送新消息
 * @type {String}
 */
export const sendMessage = (params) => {
  const fetchHandler = new Tinker(
      `${APIURL}/web/sendMessage.do`,
      {
        method: 'POST',
      },
      params
  ).success((result)=>{
    Toast.info('发送成功');
    dispatch(replace('my-msg-list'));
  })
  fetchHandler.start()
};
