
import React, { PropTypes } from 'react';
import { Toast } from 'antd-mobile';
import * as LotteryAction from '../../actions/LotteryAction';
import CommonNavBar from '../CommonNavBar/';
import * as styles from './styles.css';
import * as commonStyles from '../../assets/stylesheets/common.css';
const leftIcon = require('../../assets/images/login-back.png');
import { push, goBack } from 'react-router-redux';
import { dispatch } from '../../store';
import Cookies from 'js-cookie';
import { pk10Lids, pk10NumsColor, HongBo, LanBo, LvBo } from './common/LotteryLidsData';
import Loading from '../../core/decorators/Loading';
import moment from 'moment';
import { checkAppVersion } from '../../actions/LoginAction';


@Loading(props => props.isFetching)
class LotteryRecord extends React.PureComponent {
  constructor(props: Object) {
    super(props);
    this.state = {
    };
  }
  componentWillMount() {
    checkAppVersion();
    try {
      if (this.props.params.lId) {
        const lId = this.props.params.lId;
        // 获取当前彩种信息
         LotteryAction.getCurrentLottery({ lId });
        // 获取当前彩种开奖列表
        LotteryAction.getMoreLotteryResultList({ lId, rowNumber: 100 });
      }
    } catch(e) {
    }
  }
  getNumber(number){
    return `0${number}`.substr(-2);
  }
  showNum(result) {
    const lId = this.props.params.lId;
    const views = [];
    if(result) {
      const resultArr = result.split(',');
      if(pk10Lids.indexOf(Number(lId)) !== -1) {
        // pk10
        resultArr.map((item, key) => {
          views.push(<div className={styles.pk10NumStyle} style={{ background: `${pk10NumsColor[item-1]}` }}>{item}</div>)
        })
      }else if(lId == 15) {
        // 香港

        const numbers = result.split(',');
        const tema = numbers.pop();
        numbers.map((item, key) => {
          const items = item.split('-');
          const Styles = this.getNumberStyle(Number(items[0]));
          views.push(
            <div className={styles.hkNumStyle}>
               <div className={Styles}>{this.getNumber(items[0])}</div>
               <div className={styles.zodiac}>{items[1]}</div>
            </div>
          );
        });
        views.push(
          <div style={{ fontSize: '5vw', marginRight: '2vw', marginTop: '-6.5vw' }}> + </div>
        )
        const temas = tema.split('-');
        const Styles = this.getNumberStyle(Number(temas[0]));
        views.push(
          <div className={styles.hkNumStyle}>
             <div className={Styles}>{this.getNumber(temas[0])}</div>
             <div className={styles.zodiac}>{temas[1]}</div>
          </div>
        );
      }else if(lId == 26) {
        resultArr.map((item, key) => {
          views.push(<div className={styles.numStyle}>{this.getNumber(item)}</div>)
        })
      }else {
        // 普通显示
        resultArr.map((item, key) => {
          views.push(<div className={styles.numStyle}>{item}</div>)
        })
      }
    }
    return views;
  }
  getNumberStyle(number) {
    let Styles = null;
    if(HongBo.indexOf(number) !== -1) {
      Styles = styles.ballOne;
    }else if(LanBo.indexOf(number) !== -1) {
      Styles= styles.ballThree;
    }else if(LvBo.indexOf(number) !== -1) {
      Styles= styles.ballTwo;
    }
    return Styles;
  }
  componentWillUnmount() {
    // 清空reducer
    LotteryAction.clearLotteryResultList({ lotteryResultList: [], currentLotteryType: {} });
  }
  render() {
    const showRecodeList = (lotteryResultList) => {
      const views = [];
      if(lotteryResultList) {
        lotteryResultList.map((item, key) => {
          views.push(
            <div key={key} className={styles.recordItem}>
                <div>第{item.get('expect')}期&nbsp;&nbsp;{moment(item.get('time')).format('HH:mm:ss')}开奖</div>
                <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>{this.showNum(item.get('result'))}</div>
            </div>
          )
        })
      }
      return views;
    }
    return (
      <div>
          <CommonNavBar
             headerTitle={this.props.currentLotteryType.get('name')}
             leftIcon={leftIcon}
             leftAction={() => { dispatch(goBack())}}
          />
          <div className={styles.recordContent}>
              {showRecodeList(this.props.lotteryResultList)}
          </div>
          <div className={commonStyles.bottomButton}>
            <div className={commonStyles.clickLoginFormButtom}
              onClick={() => {
                dispatch(push(`/lottery/${this.props.params.lId}`));
              }}
            >
               去 投 注
            </div>
          </div>
      </div>
    );
  }
}

export default LotteryRecord;
