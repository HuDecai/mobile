import { connect } from 'react-redux';
import LotteryTrend from './LotteryTrend';

const mapStateToProps = (state) => ({
  dispatch: state.dispatch,
  errMsg: state.LotteryReducer.get('errMsg'),
  isFetching: state.LotteryReducer.get('isFetching'),
  allLotteryNums: state.LotteryReducer.get('allLotteryNums'),
});

export default connect(mapStateToProps)(LotteryTrend);