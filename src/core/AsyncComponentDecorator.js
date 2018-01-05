import React from 'react';
export defalut (Target) => {
  return class AsyncComponent extends React.PureComponent {
    render() {
      return (
        <Target { ...this.props } />
      );
    }
  }
}
