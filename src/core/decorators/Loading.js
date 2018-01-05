import React from 'react';
// import { Spin } from 'antd';
import { ActivityIndicator } from 'antd-mobile';

const Loading = (isLoading) => (Target) => {
  return class Loading extends React.PureComponent {
    render() {
      return (
        <div style={{ height: '100%'}}>
          <ActivityIndicator animating={isLoading(this.props)} toast text="正在加载" size="large" />
          <Target { ...this.props } style={{ height: '100%'}} />
        </div>
      )
    }
  }
};
export default Loading;
