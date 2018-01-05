import React from 'react';

const styles = require('./styles.css');

class Loading extends React.PureComponent {
  render() {
    return (
      <div className={styles.loadingContainer}>
        加载中
      </div>
    );
  }
}

export default Loading;
