// 登录页面

import { connect } from 'react-redux';
import Login from './Login';

const mapStateToProps = (state) => ({
  dispatch: state.dispatch,
  errMsg: state.LoginReducer.get('errMsg'),
  isFetching: state.LoginReducer.get('isFetching'),
});

export default connect(mapStateToProps)(Login);