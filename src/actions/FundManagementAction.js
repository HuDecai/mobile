import Tinker from '../lib/tinker/src/index';
import reduxTinker from '../lib/tinker/src/reduxTinker';
import { dispatch } from '../store';
import { replace } from 'react-router-redux';

/**
 * 彩票订单列表信息
 * @type {String}
 */
export const GET_CAIPIAO_LIST = 'GET_CAIPIAO_LIST';
export const getCaiPiaoList = (params) => {
  const fetchHandler = new Tinker(
    `${APIURL}/web/bet/findUserBetList.do`,
    {
      method: 'POST',
    },
    params,
  );
  reduxTinker(fetchHandler, GET_CAIPIAO_LIST, dispatch).start();
};

/**
 * 彩票订单搜索信息
 * @type {String}
 */
export const GET_CAIPIAO_SEARCH = 'GET_CAIPIAO_SEARCH';
export const getCaiPiaoSearch = (params) => {
  dispatch({
    type: GET_CAIPIAO_SEARCH,
    payload: params,
  });
};

/**
 * 香港彩彩票订单搜索信息
 * @type {String}
 */
export const GET_HONG_KONG_SEARCH = 'GET_HONG_KONG_SEARCH';
export const getHongKongSearch = (params) => {
  dispatch({
    type: GET_HONG_KONG_SEARCH,
    payload: params,
  });
};

/**
 * 追号彩票订单搜索信息
 * @type {String}
 */
export const GET_ZHUIHAO_CAIPIAO_SEARCH = 'GET_ZHUIHAO_CAIPIAO_SEARCH';
export const getZhuiHaoSearch = (params) => {
  dispatch({
    type: GET_ZHUIHAO_CAIPIAO_SEARCH,
    payload: params,
  });
};

/**
 * 香港彩订单列表
 * @type {String}
 */
export const GET_HONG_KONG_LIST = 'GET_HONG_KONG_LIST';
export const getHongKongList = (params) => {
  const fetchHandler = new Tinker(
    `${APIURL}/web/bet/findUserBetList.do`,
    {
      method: 'POST',
    },
    params,
  );
  reduxTinker(fetchHandler, GET_HONG_KONG_LIST, dispatch).start();
};

/**
 * 追号订单列表信息
 * @type {String}
 */
export const GET_ZHUIHAO_CAIPIAO_LIST = 'GET_ZHUIHAO_CAIPIAO_LIST';
export const getZhuihaoCaiPiaoList = (params) => {
  const fetchHandler = new Tinker(
    `${APIURL}/web/chase/pageUserChase.do`,
    {
      method: 'POST',
    },
    params,
  );
  reduxTinker(fetchHandler, GET_ZHUIHAO_CAIPIAO_LIST, dispatch).start();
};


/**
 * 资金明细列表
 * @type {String}
 */
export const GET_MONEY_DETAIL_LIST = 'GET_MONEY_DETAIL_LIST';
export const getMoneyDetailList = (params) => {
  const fetchHandler = new Tinker(
    `${APIURL}/web/agentManagement/queryUserDebt.do`,
    {
      method: 'POST',
    },
    params,
  );
  reduxTinker(fetchHandler, GET_MONEY_DETAIL_LIST, dispatch).start();
};
