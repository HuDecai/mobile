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


/**
 * 获取彩种列表
 * @type {String}
 */
export const GET_LOTTERY_TYPE_LIST = 'GET_LOTTERY_TYPE_LIST';
export const getLotteryTypeList = (params) => {
  const fetchHandler = new Tinker(
    `${APIURL}/web/lottery/findListLottery.do`,
    {
      method: 'GET',
    },
    params,
  )
  reduxTinker(fetchHandler, GET_LOTTERY_TYPE_LIST, dispatch).start();
};

/**
 *  获取用户资金信息
 * @type {String}
 */
export const GET_USER_CAPTIAL_INFO = 'GET_USER_CAPTIAL_INFO';
export const getUserCaptialInfo = (params) => {
  const fetchHandler = new Tinker(
    `${APIURL}/web/getUserCaptialInfo.do`,
    {
      method: 'GET',
    },
    params,
  );
  reduxTinker(fetchHandler, GET_USER_CAPTIAL_INFO, dispatch).start();
};

// 积分兑换
export const POINTER_TO_MONEY = 'POINTER_TO_MONEY';
export const pointerToMoney = (params) => {
  const fetchHandler = new Tinker(
    `${APIURL}/web/userCaptial/pointerToMoney.do`,
    {
      method: 'GET',
    },
    params,
  ).success(result => {
    updatePointer({ points: params.pointer});
    getUserCaptialInfo();
    dispatch(push('exchange-success'));
  }).failure(result => {
    Toast.fail(result.msg, 2);
  });
  reduxTinker(fetchHandler, POINTER_TO_MONEY, dispatch).start();
};

// 修改积分兑换reducer
export const UPDATE_POINTER = 'UPDATE_POINTER';
export const updatePointer = (params) => {
  dispatch({
    type: UPDATE_POINTER,
    payload: params,
  });
};

/**
 * 获取用户信息
 * @type {String}
 */
export const BASE_INFO = 'BASE_INFO';
export const getBaseInfo = (params) => {
  const fetchHandler = new Tinker(
      `${APIURL}/web/userBaseInfo.do`,
      {
        method: 'GET',
      },
      params,
  );
  reduxTinker(fetchHandler, BASE_INFO, dispatch).start();
};


// 修改自定义彩种
export const CHANGE_LOTTERY = 'CHANGE_LOTTERY';
export const updateLottery = (params) => {
  dispatch({
    type: CHANGE_LOTTERY,
    payload: params,
  });
};

