import { connect } from 'react-redux';
import LotteryRecord from './LotteryRecord';

const mapStateToProps = (state) => ({
  dispatch: state.dispatch,
  errMsg: state.LotteryReducer.get('errMsg'),
  isFetching: state.LotteryReducer.get('isFetching'),
  currentLotteryType: state.LotteryReducer.get('currentLotteryType'),
  lotteryResultList: state.LotteryReducer.get('lotteryResultList'),
});

export default connect(mapStateToProps)(LotteryRecord);