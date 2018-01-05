import { connect } from 'react-redux';
import MyInfo from './MyInfo';

const mapStateToProps = (state) => ({
   isFetching: state.LotteryReducer.get('isFetching'),
   dispatch: state.dispatch,
   userCaptial: state.HomePageReducer.get('userCaptial'),
   baseInfo: state.HomePageReducer.get('baseInfo'),
   todayProfit: state.LotteryReducer.get('todayProfit'),
});

export default connect(mapStateToProps)(MyInfo);