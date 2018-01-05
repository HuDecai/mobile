import { Toast } from 'antd-mobile';
import * as LotteryAction from './LotteryAction';
import Tinker from '../lib/tinker/src/index';
import reduxTinker from '../lib/tinker/src/reduxTinker';
import { dispatch } from '../store';
import { replace } from 'react-router-redux';
import moment from 'moment';

/**
 * 香港彩投注
 * @type {String}
 */
export const HONG_KONG_TOUZHU = 'HONG_KONG_TOUZHU';
export const hongKongTouzhu = (params) => {
  const fetchHandler = new Tinker(
    `${APIURL}/web/hk6Bet.do`,
    {
      method: 'POST',
    },
    params,
  ).success(result => {
    // 获取投注记录
    xiaZhuNumber({ numbers: [] });
    betResult({
      money:  params.detail.split('-').length * params.singleMoney,
      expect: params.expect,
      lId: params.lId,
    });
    dispatch(replace('bet-success'));
  }).failure(result => {
    Toast.info(result.msg, 2);
  });
  reduxTinker(fetchHandler, HONG_KONG_TOUZHU, dispatch).start();
};

/**
 * 香港彩赔率列表
 * @type {String}
 */
export const HONG_KONG_PEILV = 'HONG_KONG_PEILV';
export const hongKongPeiLv = (params) => {
  const fetchHandler = new Tinker(
    `${APIURL}/web/hk6BetBonus.do`,
    {
      method: 'GET',
    },
    params,
  );
  reduxTinker(fetchHandler, HONG_KONG_PEILV, dispatch).start();
};

/**
 * 香港彩开奖结果
 * @type {String}
 */
export const HONG_KONG_RESULT = 'HONG_KONG_RESULT';
export const getNewLotteryResult = (params) => {
  const fetchHandler = new Tinker(
    `${APIURL}/web/lotteryResult/lotteryResultHkOne.do`,
    {
      method: 'POST',
    },
    params,
  );
  reduxTinker(fetchHandler, HONG_KONG_RESULT, dispatch).start();
};

/**
 * 下注详情
 * @type {String}
 */
 
 export const XIAZHU_NUMBER = 'XIAZHU_NUMBER';
 export const xiaZhuNumber = (params) => {
   dispatch({
     type: XIAZHU_NUMBER,
     payload: params,
   });
 }
 
 
 /**
  * 投注结果
  * @type {String}
  */
  
  export const BET_RESULT = 'BET_RESULT';
  export const betResult = (params) => {
    dispatch({
      type: BET_RESULT,
      payload: params,
    });
  }
  
  /**
   * 开奖结果显示
   * @type {String}
   */
   
   export const CHANGE_STATUS = 'CHANGE_STATUS';
   export const changeIsShow = (params) => {
     console.log(params);
     dispatch({
       type: CHANGE_STATUS,
       payload: params,
     });
   }
   
   
 /**
  * 生肖号码
  * @type {String}
  */
 export const GET_ZODIAC = 'GET_ZODIAC';
 export const getZodiac = (params) => {
   const fetchHandler = new Tinker(
     `${APIURL}/web/lottery/getZodiacToNum.do`,
     {
       method: 'GET',
     },
     params,
   );
   reduxTinker(fetchHandler, GET_ZODIAC, dispatch).start();
 };

