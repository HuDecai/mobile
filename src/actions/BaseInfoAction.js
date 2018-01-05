import { Toast } from 'antd-mobile';
import Tinker from '../lib/tinker/src/index';
import reduxTinker from '../lib/tinker/src/reduxTinker';
import { dispatch } from '../store';
import { replace, push, goBack } from 'react-router-redux';
import Cookies from 'js-cookie'

/**
 * 更改资金密码
 * @type {String}
 */
export const UPDATE_MONEY_PASSWORD = 'UPDATE_MONEY_PASSWORD';
export const updateMoneyPassword = (params,meg) => {
    const fetchHandler = new Tinker(
        `${APIURL}/web/updateSafePassword.do`,
        {
            method: 'POST',
        },
        params,
    ).success(result => {
        Toast.info(meg, 2);
        dispatch(goBack());
    }).failure(result => {
        Toast.info(result.msg, 2);
    })
    reduxTinker(fetchHandler, UPDATE_MONEY_PASSWORD, dispatch).start();
};
/**
 * 确认资金密码
 * @type {String}
 */
export const OK_MONEY_PASSWORD = 'OK_MONEY_PASSWORD';
export const okMoneyPassword = (params) => {
    const fetchHandler = new Tinker(
        `${APIURL}/web/checkSafePassword.do`,
        {
            method: 'POST',
        },
        params,
    ).success(result => {
        Toast.info(result.msg, 2);
        Cookies.set('safePassword', result.data.safePassword);
        dispatch(goBack());
    }).failure(result => {
        Toast.info(result.msg, 2);
    })
    reduxTinker(fetchHandler, OK_MONEY_PASSWORD, dispatch).start();
};


/**
* 提现操作
* @type {String}
*/
export const TI_XIAN_ACTION = 'TI_XIAN_ACTION';
export const tiXian = (params) => {
  const fetchHandler = new Tinker(
      `${APIURL}/web/userCaptial/tixian.do`,
      {
        method: 'POST',
      },
      params
  ).success(result => {
    dispatch(push('tixian-success'));
    LotteryAction.getUserCaptialInfo();
  }).failure(result => {
    Toast.info(result.msg, 2);
  });
  reduxTinker(fetchHandler, TI_XIAN_ACTION, dispatch).start();
};

/**
* 提现初始化
* @type {String}
*/
export const TI_XIAN_INIT = 'TI_XIAN_INIT';
export const tiXianInit = (params) => {
  const fetchHandler = new Tinker(
      `${APIURL}/web/userCaptial/initWithdraw.do`,
      {
        method: 'GET',
      },
      params
  )
  reduxTinker(fetchHandler, TI_XIAN_INIT, dispatch).start();
};

/**
* 获取银行卡
* @type {String}
*/
export const GET_BANK_CARD = 'GET_BANK_CARD';
export const getBankCard = (params) => {

  const fetchHandler = new Tinker(
      `${APIURL}/web/getUserBankInfo.do`,
      {
        method: 'GET',
      },
      params,
  )
  reduxTinker(fetchHandler, GET_BANK_CARD, dispatch).start();
};


/**
 * 删除银行卡
 * @type {String}
 */
export const deleteBankCard = (params) => {
  const fetchHandler = new Tinker(
      `${APIURL}/web/deleteUserCardBank.do`,
      {
        method: 'POST',
      },
      params,
  ).success((result)=>{
    Toast.info(result.msg, 2);
    dispatch(goBack());
  }).failure(result => {
    Toast.info(result.msg, 2);
    dispatch(goBack());
  })
  fetchHandler.start()
};

/**
 * 单个银行卡
 * @type {String}
 */
export const SET_BANK_CARD = 'SET_BANK_CARD';
export const setBankCard = (params) => {
  dispatch({
    type: SET_BANK_CARD,
    payload: params,
  });
}

/**
 * 添加银行卡
 * @type {String}
 */
export const addBankCard = (params,callback) => {
  const fetchHandler = new Tinker(
      `${APIURL}/web/insertUserCardBank.do`,
      {
        method: 'POST',
      },
      params,
  ).success(result=>{
    Toast.info(result.msg, 2);
    dispatch(goBack());
  }).failure(result => {
    Toast.info(result.msg, 2);
  })
  fetchHandler.start()
}

/**
 * 选择银行卡
 * @type {String}
 */
export const SELECT_BANK_CARD = 'SELECT_BANK_CARD';
export const selectBankCard = (params) => {
  dispatch({
    type: SELECT_BANK_CARD,
    payload: params,
  });
}

/**
* 获取用户支付类型
* @type {String}
*/
export const GET_PAY_TYPES = 'GET_PAY_TYPES';
export const getPayTypes = (params) => {
  const fetchHandler = new Tinker(
      `${APIURL}/web/checkMobilePayMethodOpen.do`,
      {
        method: 'GET',
      },
      params
  )
  reduxTinker(fetchHandler, GET_PAY_TYPES, dispatch).start();
};

/**
 * 非网银充值接口
 * @type {String}
 */
export const RECHARGE = 'RECHARGE';
export const recharge = (params) => {
  const fetchHandler = new Tinker(
      `${APIURL}/web/rechargeMoney.do`,
      {
        method: 'POST'
      },
      params
  ).success(result => {
    // LotteryAction.getUserCaptialInfo();
  })
  fetchHandler.start()
};

/**
 * 转账接收银行卡信息
 * @type {String}
 */
export const GET_BANK_INFO = 'GET_BANK_INFO';

export const getBankInfo = (params,callback) => {
  const fetchHandler = new Tinker(
      `${APIURL}/web/getReceiveBank.do`,
      {
        method: 'POST'
      },
      params
  ).success(result=>{
    setRechargeInfo(params)
    callback(result);
  })
  reduxTinker(fetchHandler, GET_BANK_INFO, dispatch).start();
};

/**
 * 保存原密码
 * @type {String}
 */
export const SET_RECHARGE_INFO = 'SET_RECHARGE_INFO';
export const setRechargeInfo = (params) => {
  dispatch({
    type: SET_RECHARGE_INFO,
    payload: params,
  });
}

/**
 * 网银充值接口
 * @type {String}
 */
export const RECHARGE_BANK = 'RECHARGE_BANK';

export const rechargeBank = (params) => {
  const fetchHandler = new Tinker(
      `${APIURL}/web/addRechargeBankResult.do`,
      {
        method: 'POST'
      },
      params
  ).success(result => {
    // LotteryAction.getUserCaptialInfo();
  })
  reduxTinker(fetchHandler, RECHARGE_BANK, dispatch).start();
};

/**
 * 保存原密码
 * @type {String}
 */
export const SAVE_PASSWORD = 'SAVE_PASSWORD';
export const savePassword = (params) => {
  dispatch({
    type: SAVE_PASSWORD,
    payload: params,
  });
}

/**
 * 更改登录密码
 * @type {String}
 */
export const UPDATE_LOGIN_PASSWORD = 'UPDATE_LOGIN_PASSWORD';
export const updateLoginPassword = (params) => {
  const fetchHandler = new Tinker(
      `${APIURL}/web/updatePassword.do`,
      {
        method: 'POST',
      },
      params,
  ).success((result)=>{
    dispatch(replace('set-login-password-success'));
  }).failure(result => {
    Toast.info(result.msg);
  })
  fetchHandler.start()
};

/**
 * 获取密保问题
 * @type {String}
 */
export const GET_QUESTION_INFO = 'GET_QUESTION_INFO';
export const getQuestionInfo = (params) => {
  const fetchHandler = new Tinker(
      `${APIURL}/web/secQuestionInfo.do`,
      {
        method: 'GET',
      },
      params,
  ).failure((result)=>{
    Toast.info(result.msg);
  })
  reduxTinker(fetchHandler, GET_QUESTION_INFO, dispatch).start();
};
/**
 * 更改密保问题
 * @type {String}
 */
export const UPDATE_QUE_INFO = 'UPDATE_QUE_INFO';
export const updateQueInfo = (params) => {
  const fetchHandler = new Tinker(
      `${APIURL}/web/setSecQuestion.do`,
      {
        method: 'POST',
      },
      params,
  ).success((result)=>{
    dispatch(replace('set-security-success'))
  }).failure((result)=>{
    Toast.info(result.msg);
  })
  fetchHandler.start()
};


