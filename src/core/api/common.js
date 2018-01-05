import Tinker from '../../lib/tinker/src/index';

export function uploadBase64Str(base64) {
  return new Tinker(
    `${APIURL}/topnews/image/uploadBase64Str`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        credentials: 'include',
      }
    },
    {
      imageStr: base64,
    }
  );
}
