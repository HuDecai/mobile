// 组合所有组件  root component

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import shallowCompare from 'react-addons-shallow-compare';
import { replace } from 'react-router-redux';
import { dispatch } from '../store';

const propTypes = {
  children: PropTypes.node,
  dispatch: PropTypes.func,
  openid: PropTypes.string,
};

class RootContainer extends React.PureComponent {
  componentWillMount() {
    // console.warn(window.location.href, window.location.search);
    try {
      if (window.location.search) {
        // console.log(window.location.search);
        dispatch(replace(window.location.search.slice(1)));
      } else if (this.props.location.pathname === '/') {
        dispatch(replace('/login'))
      }
    } catch(e) {
    }
  }
  componentWillReceiveProps(nextProps) {
    console.warn(window.location.href);
    try {
      if (nextProps.location.pathname === '/') {
        dispatch(replace('/login'))
      }
    } catch(e) {
    }
  }
  render() {
    return (
      <div style={{ width: '100vw', height: '100vh', backgroundColor: '#f4f4f4', overflow: 'hidden' }}>
        {this.props.children}
      </div>
    );
  }
}

RootContainer.propTypes = propTypes;

const mapStateToProps = (state) => {
  return {
    isLogin: state.LoginReducer.get('isLogin'),
  };
};

export default connect(mapStateToProps)(RootContainer);
