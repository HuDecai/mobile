import React, { PropTypes } from 'react';
import { Toast } from 'antd-mobile';
import Immutable from 'immutable';
import * as LotteryAction from '../../actions/LotteryAction';
import * as HKBetAction from '../../actions/HKBetAction';
import * as styles from './HKBetConfirm.css';
import LotteryResult from './LotteryResult';
import LotteryTime from './LotteryTime';
import { connect } from 'react-redux';
import { push, goBack } from 'react-router-redux';
import * as commonStyles from '../../assets/stylesheets/common.css';
import { dispatch } from '../../store';
import CommonNavBar from '../CommonNavBar/';
import ConfirmBottomBar from './ConfirmBottomBar';
const leftIcon = require('../../assets/images/login-back.png');
import Loading from '../../core/decorators/Loading';
import { checkAppVersion } from '../../actions/LoginAction';

@Loading(props => props.isFetching)
class HKBetConfirm extends React.PureComponent {
  constructor(props: Object) {
    super(props);
    this.state = {
      touZhuMoney: '',
    };
  }
  componentWillMount() {
    const lId = this.props.params.lId;
    LotteryAction.getLotteryResultList({ lId, rowNumber: 10 });
    LotteryAction.getLotteryExpect({ lId });
    checkAppVersion();
  }
  componentWillUnmount() {
    HKBetAction.changeIsShow({ isShowLotteryRecord: false });
  }
  changeMoney(money) {
      let touZhuMoney = this.state.touZhuMoney;
      this.setState({ touZhuMoney: Number(touZhuMoney) + money });
  }
  touZhuAction() {
    if(!this.state.touZhuMoney || !this.props.touzhuDetail.length) {
      Toast.info('请先选号或填写金额！', 2);
      return false;
    }
    HKBetAction.hongKongTouzhu({
      singleMoney: this.state.touZhuMoney,
      playKindId: this.props.selectPlayInfo.get('playKind').get('id'), // 那种玩法
      detail: this.props.touzhuDetail.join('-'), // 选择的号码
      expect: this.props.currentLotteryExpect.get('openExpect'), //当前期数
      lId: this.props.params.lId,
    });
    this.setState({ touZhuMoney: ''});
  }
  cancelAction() {
    this.setState({ touZhuMoney: ''});
    HKBetAction.xiaZhuNumber({numbers: []});
  }
  render() {
    const touZhuMoney = this.state.touZhuMoney;
    const keyinMoney = () => {
      const peilv = [];
      [...this.props.hongKongTeMa.toJS(), ...this.props.hongKongTwoSide.toJS()].map((item) => {
        if(this.props.touzhuDetail.indexOf(item.number) !== -1 || this.props.touzhuDetail.indexOf(`0${item.number}`.substr(-2)) !== -1) {
          peilv.push(`${item.bonus}`);
        }
      });
      peilv.sort(function (x,y) {
          return y-x;
      });
      return peilv[0] && (parseFloat(peilv[0])*touZhuMoney).toFixed(3);
    }
    const showDetails = (playKindId) => {
      if(playKindId == 600) {
        const touzhuDetail = this.props.touzhuDetail.map(item => `{${item}}`);
        return touzhuDetail.join(',');
      }else if(playKindId == 601 || playKindId == 602) {
          const twoSidesDetail = this.props.twoSidesDetail;
        return twoSidesDetail.join(',');
      }
      return '';
    }
    return (
      <div>
        <CommonNavBar
           headerTitle={'投注确认'}
           leftIcon={leftIcon}
           leftAction={() => {
             dispatch(goBack());
             this.cancelAction();
           }}
        />
        <div className={styles.lotteryBetHeader}>
          <LotteryResult
             lotteryResultList={this.props.lotteryResultList}
             lId={this.props.params.lId}
             isShowLotteryRecord={this.props.isShowLotteryRecord}
          />
          <LotteryTime
              currentLotteryExpect={this.props.currentLotteryExpect}
              lotteryName={this.props.currentLotteryType.get('name')}
              lId={this.props.params.lId}
              isShow={0}
          />
        </div>
          <div className={styles.content}
            onClick={() => {
              if(this.props.isShowLotteryRecord) {
                HKBetAction.changeIsShow({ isShowLotteryRecord: false });
              }
            }}
          >
            <div>
             <div className={styles.confirmItem}>玩法名称: {this.props.selectPlayInfo.get('playKind').get('name')}</div>
             <div className={styles.confirmItem}>选号内容: {showDetails(this.props.selectPlayInfo.get('playKind').get('id'))}</div>

             <div className={styles.formtext}>输入金额</div>
             <div className={commonStyles.loginNameAll1} >
               <div>
                 <span style={{ fontSize: '8vw' }}>￥</span>
                 <input className={commonStyles.inputTextAll}
                   type="text"
                   value={touZhuMoney}
                   onChange={(e) => {
                     const value = e.target.value;
                     this.setState({ touZhuMoney: value });
                   }}
                   style={{ fontSize: '8vw', width: '75vw' }}
                 />
               </div>
             </div>

             <div className={styles.contents}>
                 <div className={styles.content1} onClick={() => this.changeMoney(5)}>5</div>
                 <div className={styles.content2} onClick={() => this.changeMoney(10)}>10</div>
                 <div className={styles.content3} onClick={() => this.changeMoney(50)}>50</div>
                 <div className={styles.content4} onClick={() => this.changeMoney(100)}>100</div>
                 <div className={styles.content5} onClick={() => this.changeMoney(500)}>500</div>
              </div>
             <div className={styles.confirmItem}>合计金额：{touZhuMoney && (touZhuMoney * this.props.touzhuDetail.length).toFixed(3)}</div>
             <div className={styles.confirmItem}>可以赢金额：{keyinMoney()}</div>
          </div>
        </div>
        <ConfirmBottomBar
           expect={this.props.currentLotteryExpect.get('openExpect')}
           totalMoney={touZhuMoney && (touZhuMoney * this.props.touzhuDetail.length).toFixed(3)}
           exp={this.props.touzhuDetail.length}
           submitAction={() => {
             this.touZhuAction();
           }}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isFetching: state.HKBetReducer.get('isFetching'),
    touzhuDetail: state.HKBetReducer.get('touzhuDetail'),
    twoSidesDetail: state.HKBetReducer.get('twoSidesDetail'),
    hongKongTeMa: state.HKBetReducer.get('hongKongTeMa'),
    hongKongTwoSide: state.HKBetReducer.get('hongKongTwoSide'),
    maxPeiLv: state.HKBetReducer.get('maxPeiLv'),
    lotteryResultList: state.LotteryReducer.get('lotteryResultList'),
    currentLotteryExpect: state.LotteryReducer.get('currentLotteryExpect'),
    currentLotteryType: state.LotteryReducer.get('currentLotteryType'),
    selectPlayInfo: state.LotteryReducer.get('selectPlayInfo'),
    isShowLotteryRecord:  state.HKBetReducer.get('isShowLotteryRecord'),
  };
};

export default connect(mapStateToProps)(HKBetConfirm);
