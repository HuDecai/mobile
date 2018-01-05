import React, { PropTypes } from 'react';
import * as styles from './LotteryResult.css';
import * as HKBetAction from '../../actions/HKBetAction';
import LotteryResultIcon from '../../assets/images/lottery-result-jiantou.svg';
import { pk10Lids, pk10NumsColor, HongBo, LanBo, LvBo } from '../LotteryRecord/common/LotteryLidsData';

class LotteryResult extends React.PureComponent {
  componentWillReceiveProps(nextProps) {
  }
  getNumber(number){
    return `0${number}`.substr(-2);
  }
  showNum(result) {
    const lId = this.props.lId;
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
          <div style={{ fontSize: '5vw', margin: '1.5vw 2.5vw 1.5vw 1.5vw' }}> + </div>
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
  render() {
    const showRecodeList = (lotteryResultList) => {
      const views = [];
      if(lotteryResultList) {
        lotteryResultList.map((item, key) => {
          views.push(
            <div key={key} className={styles.recordItem}>
                <div className={styles.expect}>第{item.get('expect')}期</div>
                <div className={styles.result} style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>{this.showNum(item.get('result'))}</div>
            </div>
          )
        })
      }
      return views;
    }
    const showRecode = (lotteryResult) => {
      const views = [];
      if(lotteryResult) {
        views.push(
          <div className={styles.recordItem}
            onClick={() => {
              HKBetAction.changeIsShow({ isShowLotteryRecord: !this.props.isShowLotteryRecord });
            }}
          >
              <div>第{lotteryResult.expect}期&nbsp;开奖结果：</div>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>{this.showNum(lotteryResult.result)}</div>
              <LotteryResultIcon style={{ width: '3vw', marginRigth: '2vw' }} />
          </div>
        )
      }
      return views;
    }
    let lotteryResult = {};
    try{
      lotteryResult = this.props.lotteryResultList.toJS()[0]
    }catch(e) {}
    return (
      <div className={styles.resultBody}>
         <div>{showRecode(lotteryResult)}</div>
         <div className={this.props.isShowLotteryRecord ? styles.showContent : styles.hiddenContent }>
           <div className={`${styles.recordItem} ${styles.recordItemTitle}`}>
              <div className={styles.expect}>期号</div>
              <div className={styles.result}>结果</div>
           </div>
           {showRecodeList(this.props.lotteryResultList)}
         </div>
      </div>
    );
  }
}

export default LotteryResult;
