import { Toast } from 'antd-mobile';
import Tinker from '../lib/tinker/src/index';
import reduxTinker from '../lib/tinker/src/reduxTinker';
import { dispatch } from '../store';
import { replace, push, goBack } from 'react-router-redux';
import * as HomePageAction from './HomePageAction';

/**
 * 用户列表信息
 * @type {String}
 */
export const GET_USER_ANGET_LIST = 'GET_USER_ANGET_LIST';
export const getUserList = (params) => {
  const fetchHandler = new Tinker(
    `${APIURL}/web/agentManagement/queryAgentManagement.do`,
    {
      method: 'POST',
    },
    params,
  );
  reduxTinker(fetchHandler, GET_USER_ANGET_LIST, dispatch).start();
};

/**
 * 团队列表信息
 * @type {String}
 */
export const GET_TEAM_ANGET_LIST = 'GET_TEAM_ANGET_LIST';
export const getTeamList = (params) => {
  const fetchHandler = new Tinker(
    `${APIURL}/web/agentManagement/queryWebTeamStatistic.do`,
    {
      method: 'POST',
    },
    params,
  );
  reduxTinker(fetchHandler, GET_TEAM_ANGET_LIST, dispatch).start();
};

/**
 * 个人代理报表信息
 * @type {String}
 */
export const GET_GENREN_ANGET_LIST = 'GET_GENREN_ANGET_LIST';
export const getGenRenList = (params) => {
  const fetchHandler = new Tinker(
    `${APIURL}/web/agentManagement/querySysStatistics.do`,
    {
      method: 'POST',
    },
    params,
  );
  reduxTinker(fetchHandler, GET_GENREN_ANGET_LIST, dispatch).start();
};

/**
 * 团队帐变报表信息
 * @type {String}
 */
export const GET_TEAM_ZHANGBIAN_LIST = 'GET_TEAM_ZHANGBIAN_LIST';
export const getTeamZhangBianList = (params) => {
  const fetchHandler = new Tinker(
    `${APIURL}/web/agentManagement/queryUserDebt.do`,
    {
      method: 'POST',
    },
    params,
  );
  reduxTinker(fetchHandler, GET_TEAM_ZHANGBIAN_LIST, dispatch).start();
};


/**
 * 团队帐变报表信息
 * @type {String}
 */
export const GET_TEAM_MONEY = 'GET_TEAM_MONEY';
export const getTeamMoney = (params) => {
  const fetchHandler = new Tinker(
    `${APIURL}/web/agentManagement/teamTotalMoney.do`,
    {
      method: 'GET',
    },
    params,
  );
  reduxTinker(fetchHandler, GET_TEAM_MONEY, dispatch).start();
};

/**
 * 生成返点推广链接
 * @type {String}
 */
export const CREATE_TUIGUANG_LINK = 'CREATE_TUIGUANG_LINK';
export const createTuiguangLink = (params) => {
  const fetchHandler = new Tinker(
    `${APIURL}/web/agentManagement/createPopularize.do`,
    {
      method: 'POST',
    },
    params,
  ).success(result => {
    dispatch(push('agent-center-link-qrcode'));
  });
  reduxTinker(fetchHandler, CREATE_TUIGUANG_LINK, dispatch).start();
};

/**
 * 生成无返点推广链接
 * @type {String}
 */
export const CREATE_NO_TUIGUANG_LINK = 'CREATE_NO_TUIGUANG_LINK';
export const createNoTuiguangLink = (params) => {
  const fetchHandler = new Tinker(
    `${APIURL}/web/agentManagement/createPopularize.do`,
    {
      method: 'POST',
    },
    params,
  ).success(result => {
    dispatch(push('agent-center-link-qrcode'));
  });
  reduxTinker(fetchHandler, CREATE_NO_TUIGUANG_LINK, dispatch).start();
};

/**
 * 新增用户
 * @type {String}
 */
export const ADD_USER = 'ADD_USER';
export const addUser = (params, callback) => {
  const fetchHandler = new Tinker(
    `${APIURL}/web/agentManagement/addUser.do`,
    {
      method: 'POST',
    },
    params,
  ).success(result => {
    dispatch(push('agent-center-adduser-success'));
  }).failure(result => {
    callback(result);
  });
  reduxTinker(fetchHandler, ADD_USER, dispatch).start();
};

/**
 * 修改下级返点
 * @type {String}
 */
export const UPDATE_LOWER_FANDIAN = 'UPDATE_LOWER_FANDIAN';
export const updateLowerFandian = (params) => {
  const fetchHandler = new Tinker(
    `${APIURL}/web/agentManagement/updateLowerUserRebate.do`,
    {
      method: 'POST',
    },
    params.params,
  ).success(result => {
    Toast.info(result.msg, 2);
    getUserList(params.searchData);
  });
  reduxTinker(fetchHandler, UPDATE_LOWER_FANDIAN, dispatch).start();
};


/**
* 获取下级用户列表（用于下级转账）
* @type {String}
*/
export const GET_XIAJI_LIST = 'GET_XIAJI_LIST';
export const getXiajiList = (params) => {
  const fetchHandler = new Tinker(
      `${APIURL}/web/queryUserChildMessage.do`,
      {
        method: 'POST',
      },
      params
  )
  reduxTinker(fetchHandler, GET_XIAJI_LIST, dispatch).start();
};

/**
* 转账操作
* @type {String}
*/
export const ZHUAN_ZHANG_ACTION = 'ZHUAN_ZHANG_ACTION';
export const zhuanZhang = (params) => {
  const fetchHandler = new Tinker(
      `${APIURL}/web/userCaptial/zhuanzhang.do`,
      {
        method: 'POST',
      },
      params
  ).success(result => {
    Toast.info('转账成功', 2);
    HomePageAction.getUserCaptialInfo();
    dispatch(goBack());
  }).failure(result => {
    Toast.info(result.msg, 2);
  });
  reduxTinker(fetchHandler, ZHUAN_ZHANG_ACTION, dispatch).start();
};

// 修改彩票返点列表
export const UPDATE_CAIPIAO_FANDIAN= 'UPDATE_CAIPIAO_FANDIAN';
export const updateCaipiaoFandian = (params) => {
  dispatch({
    type: UPDATE_CAIPIAO_FANDIAN,
    payload: params,
  });
}

// 修改香港彩返点列表
export const UPDATE_HONGKONG_FANDIAN = 'UPDATE_HONGKONG_FANDIAN';
export const updateHongKongFandian = (params) => {
  dispatch({
    type: UPDATE_HONGKONG_FANDIAN,
    payload: params,
  });
}

// 清除用户数据
export const CLEAR_USRE_DATA = 'CLEAR_USRE_DATA';
export const clearUserData = (params) => {
  dispatch({
    type: CLEAR_USRE_DATA,
    payload: params,
  });
}