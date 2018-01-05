import { replace } from 'react-router-redux';
import { AppRegistry } from './AppRegistry';
import Tinker from './lib/tinker/src/index';
import { dispatch } from './store';
import Tool from './core/utils/tool'
import 'antd-mobile/dist/antd-mobile.css';
Tinker.engine = fetch.bind(window);
Tinker.isSuccess = result => result.status === 0;
Tinker.isFailure = result => result.status !== 0;
Tinker.failure = result => {
  if (result.status === -2000) {
    dispatch(replace('/Login'));
  } else if (result.status === -3000) {
    alert('您的账号在另一个地方登入，如有疑问请联系客服人员');
    dispatch(replace('/Login'));
  } else if (result.status === -10000) {

  } else {
  }
}
Tinker.config = {
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    "Accept": "application/json",
  },
  credentials: 'include',
}
AppRegistry();
