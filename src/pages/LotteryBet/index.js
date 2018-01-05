import { connect } from 'react-redux';

import LotteryBet from './LotteryBet';

const mapStateToProps = (state) => ({
  isFetching: state.LotteryReducer.get('isFetching'),
  lotteryFetching: state.LotteryReducer.get('lotteryFetching'),
  currentLotteryType: state.LotteryReducer.get('currentLotteryType'),
  currentLottery: state.LotteryReducer.get('currentLottery'),
  currentLotteryFirstMenu: state.LotteryReducer.get('currentLotteryFirstMenu'),
  selectPlayInfo: state.LotteryReducer.get('selectPlayInfo'),
  selectLotteryNumbers: state.LotteryReducer.get('selectLotteryNumbers'),
  lotteryResultList: state.LotteryReducer.get('lotteryResultList'),
  touzhuDetail: state.HKBetReducer.get('touzhuDetail'),
  currentLotteryExpect: state.LotteryReducer.get('currentLotteryExpect'),
  mode: state.LotteryReducer.get('mode'),
  singleMoney: state.LotteryReducer.get('singleMoney'),
  isShowLotteryRecord:  state.HKBetReducer.get('isShowLotteryRecord'),
});

export default connect(mapStateToProps)(LotteryBet);
