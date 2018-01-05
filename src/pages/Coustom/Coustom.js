// 组合所有组件  root component
import React, { PropTypes } from 'react';
import * as styles from './styles.css';
import Cookies from 'js-cookie';

class Coustom extends React.PureComponent {

  render() {
      const usernames = Cookies.get('username');
      const kflink=usernames?coustomServiceURL+'&info=userId%3D1%26name%3D'+usernames+'&s=1':coustomServiceURL+'&info=userId%3D1%26name%3D游客&s=1';
    return (
      <div className={styles.coustomBody}>
         <iframe  src={kflink}   height="100%" width="100%" />
      </div>
    );
  }
}

export default Coustom;
