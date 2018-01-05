
import { connect } from 'react-redux';
import HomePage from './HomePage';

const mapStateToProps = (state) => ({
  dispatch: state.dispatch,
  errMsg: state.HomePageReducer.get('errMsg'),
  isFetching: state.HomePageReducer.get('isFetching'),
  noticeList: state.HomePageReducer.get('noticeList'),
  loveLotteryIds: state.HomePageReducer.get('loveLotteryIds'),
  allLotterys: state.HomePageReducer.get('allLotterys'),
  userCaptial: state.HomePageReducer.get('userCaptial'),
});

export default connect(mapStateToProps)(HomePage);
