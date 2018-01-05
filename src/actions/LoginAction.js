import { Toast } from 'antd-mobile';
import Tinker from '../lib/tinker/src/index';
import reduxTinker from '../lib/tinker/src/reduxTinker';
import { dispatch } from '../store';
import { replace, push } from 'react-router-redux';
import Cookies from 'js-cookie'
import debounce from 'lodash.debounce';
window.alertDebounce = debounce(() => alert('当前不是最新版本，请重新下载APP'), 1000);

/**
 * 登录获取用户信息
 * @type {String}
 */
 export const GET_USER_INFO = 'GET_USER_INFO';
 export const login = (params) => {
  const fetchHandler = new Tinker(
    `${APIURL}/user/weblogin.do`,
      {
        method: 'POST',
      },
      params,
    ).success(result => {
      dispatch({
        type: GET_USER_INFO,
      });
      // 判断是否有默认的彩种
      try{
        if(!localStorage.loveLotteryIds || localStorage.loveLotteryIds == "null") {
          localStorage.loveLotteryIds = JSON.stringify([2,4,7,14,20,25]);
        }
      }catch(e) {}
      dispatch(push('index/home'));
    });
  reduxTinker(fetchHandler, GET_USER_INFO, dispatch).start();
 };

/**
 * 退出登录
 * @type {String}
 */
export const LOGIN_OUT = 'LOGIN_OUT';
export const loginOut = (params) => {
  const fetchHandler = new Tinker(
    `${APIURL}/web/outWeblogin.do`,
    {
      method: 'GET',
    },
    params,
  ).success(result => {
    dispatch(replace('/Login'));
  });
  reduxTinker(fetchHandler, LOGIN_OUT, dispatch).start();
};


/**
 * 测速
 * @type {String}
 */
var startDate = null;
var endDate = null;
export const SPEED_TEST = 'SPEED_TEST';
export const speedTest = (params) => {
  const fetchHandler = new Tinker(
    `${APIURL}/user/getDomainSpeed.do`,
    {
      method: 'GET',
    },
    params,
  ).request(() => {
    startDate = new Date();
  }).success(() => {
  }).convertResult((result) => ({
    ...result,
    timeSpeed: new Date() - startDate,
  }))
  reduxTinker(fetchHandler, SPEED_TEST, dispatch).start();
};

// 用户注册
export const USER_REGISTER = 'USER_REGISTER';
export const register = (params) => {
  const fetchHandler = new Tinker(
    `${APIURL}/user/addUser.do`,
    {
      method: 'POST',
    },
    params,
  ).success(result => {
    Toast.info('注册成功', 2);
    dispatch(replace('/register-success'));
  }).failure(result => {
    Toast.info(result.msg, 2);
  });
  reduxTinker(fetchHandler, USER_REGISTER, dispatch).start();
};

// 获取验证码
export const GET_REGISTER_CODE = 'GET_REGISTER_CODE';
export const getRegisterCode = (params) => {
  const fetchHandler = new Tinker(
    `${APIURL}/code.do`,
    {
      method: 'GET',
    },
    params,
  );
  reduxTinker(fetchHandler, GET_REGISTER_CODE, dispatch).start();
};


// 判断版本号
export const checkAppVersion = (params) => {
  const fetchHandler = new Tinker(
    `${APIURL}/appVersion.do`,
    {
      method: 'GET',
    },
    params,
  ).success(result => {
    try {
      if (result.data.app_version !== app_version) {
        alertDebounce();
      }
    } catch(e) {
      console.log(e);
    }
  })
  fetchHandler.start();
}
