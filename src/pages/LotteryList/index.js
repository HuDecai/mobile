// 彩票大厅 彩票列表

import { connect } from 'react-redux';
import LotteryList from './LotteryList';

const mapStateToProps = (state) => ({
  errMsg: state.LotteryReducer.get('errMsg'),
  isFetching: state.LotteryReducer.get('isFetching'),
  lotteryTypesList: state.LotteryReducer.get('lotteryTypesList'),
});

export default connect(mapStateToProps)(LotteryList);
