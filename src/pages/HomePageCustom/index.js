
import { connect } from 'react-redux';
import HomePageCustom from './HomePageCustom';

const mapStateToProps = (state) => ({
  dispatch: state.dispatch,
  errMsg: state.HomePageReducer.get('errMsg'),
  isFetching: state.HomePageReducer.get('isFetching'),
  allLotterys: state.HomePageReducer.get('allLotterys'),
  // loveLotteryIds: state.HomePageReducer.get('loveLotteryIds'),
});

export default connect(mapStateToProps)(HomePageCustom);
