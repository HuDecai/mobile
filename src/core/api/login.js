import Tinker from '../../lib/tinker/src/index';

// 登录接口
export function getUserInfo() {
  console.log(APIURL);
  return new Tinker(
    `${APIURL}/user/weblogin.do`,
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

export function invalidateSession() {
  return new Tinker(
    `${APIURL}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      },
      credentials: 'include'
    },
    {},
  );
}
