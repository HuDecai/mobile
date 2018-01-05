import Tinker from '../../lib/tinker/src/index';

// 找回密码
export function setPassword() {
  return new Tinker(
    `${APIURL}/user/forgetUserPassWd.do`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        credentials: 'include',
      }
    },
    {},
  );
}
