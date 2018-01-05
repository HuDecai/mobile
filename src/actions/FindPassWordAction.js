import Tinker from '../lib/tinker/src/index';
import reduxTinker from '../lib/tinker/src/reduxTinker';
import { dispatch } from '../store';
import { replace, push } from 'react-router-redux';

/**
 * 重置密码
 * @type {String}
 */
export const SET_PASSWORD = 'SET_PASSWORD';
export const setPassword = (params) => {
  const fetchHandler = new Tinker(
    `${APIURL}/user/forgetUserPassWd.do`,
    {
      method: 'POST',
    },
    params,
  )
  .success(result => {
     if(params.step === 1) {
       dispatch(replace('verify-questions'));
       dispatch(setData(params));
     }else if(params.step === 2) {
       dispatch(replace('reset-new-password'));
       dispatch(setData(params));
     }else if(params.step === 3) {
       dispatch(replace('reset-passWord-success'));
       dispatch(setData({}));
     }
  })
  reduxTinker(fetchHandler, SET_PASSWORD, dispatch).start();
};

export const PASSWORD_DATA = 'PASSWORD_DATA';
export function setData(params: Object) {
  return {
    payload: params,
    type: PASSWORD_DATA,
  };
}

