
import { connect } from 'react-redux';
import Register from './Register';

const mapStateToProps = (state) => ({
  dispatch: state.dispatch,
  errMsg: state.LoginReducer.get('errMsg'),
  isFetching: state.LoginReducer.get('isFetching'),
  VCode: state.LoginReducer.get('VCode'),
  fandianTuiguangLink: state.AgentReducer.get('fandianTuiguangLink'),
  wuFandianTuiguangLink: state.AgentReducer.get('wuFandianTuiguangLink'),
});

export default connect(mapStateToProps)(Register);