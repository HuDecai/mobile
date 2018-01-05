import React from 'react';
// import { Spin } from 'antd';
import { ActivityIndicator } from 'antd-mobile';

const styles = require('./styles.css');

const LoadingPage = (isLoading) => (Target) => {
  return class Loading extends React.PureComponent {
    render() {
      return (
        <div style={{ height: '100%'}}>
          {/* <ActivityIndicator animating={isLoading(this.props)} toast text="正在加载" size="large" /> */}
          {isLoading(this.props) && <div className={styles.loadingPage}>
            <ActivityIndicator animating={isLoading(this.props)} toast text="正在加载" size="large" />
            {/* <img className={styles.loadingImg} src="https://qufenqipublicrw.oss-cn-hangzhou.aliyuncs.com/fe/loading2.gif" /> */}
            {/* <div className={styles.loadingText}>正在拼命加载...</div> */}
          </div>}
          <Target { ...this.props } style={{ height: '100%'}} />
        </div>
      )
    }
  }
};
export default LoadingPage;
