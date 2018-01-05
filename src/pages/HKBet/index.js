import { connect } from 'react-redux';
import HKBet from './HKBet';

const mapStateToProps = (state) => ({
  dispatch: state.dispatch,
  errMsg: state.HKBetReducer.get('errMsg'),
  isFetching: state.HKBetReducer.get('isFetching'),
  hongKongTeMa: state.HKBetReducer.get('hongKongTeMa'),
  hongKongTwoSide: state.HKBetReducer.get('hongKongTwoSide'),
  touzhuDetail: state.HKBetReducer.get('touzhuDetail'),
  lotteryResult: state.HKBetReducer.get('lotteryResult'),
  twoSidesDetail: state.HKBetReducer.get('twoSidesDetail'),
  hongKongWeishu: state.HKBetReducer.get('hongKongWeishu'),
  zodiac: state.HKBetReducer.get('zodiac'),
  weiZodiac: state.HKBetReducer.get('weiZodiac'),
});

export default connect(mapStateToProps)(HKBet);
