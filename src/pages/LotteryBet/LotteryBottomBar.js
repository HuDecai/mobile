import React, { PureComponent } from 'react';
import { Toast } from 'antd-mobile'; 
import * as LotteryAction from '../../actions/LotteryAction';
import checkNumbers from '../../core/lottery/checkNumbers';
import countNumbers from '../../core/lottery/countNumbers';
import { push, goBack } from 'react-router-redux';
import { dispatch } from '../../store';

const styles = require('./LotteryBottomBar.css');
const rightArrow = require('../../assets/images/lottery-bottom-right-arrow.png');

class LotteryBottomBar extends PureComponent {

  render() {
    const { selectPlayInfo, lId, touzhuDetail } = this.props;
    const playKind = selectPlayInfo && selectPlayInfo.get('playKind');
    const playCateId = selectPlayInfo && selectPlayInfo.get('playCateId');
    const playKindId = playKind && playKind.get('id');
    let exp = 0;
    if(lId == 15) {
      exp = touzhuDetail.length;
    }else {
      exp = countNumbers(this.props.selectLotteryNumbers, Number(playKindId));
    }
    return (
      <div className={ exp > 0 ? styles.bottomBarActive : styles.bottomBar}>
        <div className={styles.bottomBarLeft}>已选 {exp} 注</div>
        <div
          className={styles.bottomBarRight}
          onClick={() => {
            if (!exp) {
              Toast.info('号码有误,请检查并重新输入', 2);
            } else if ((exp && lId == 15) || checkNumbers(this.props.selectLotteryNumbers, playKindId, true)) {
              if(this.props.lId == 15) {
                dispatch(push(`hk-bet-confirm/${this.props.lId}`));
              }else {
                LotteryAction.addPickData({
                  way: playKind.get('name'),
                  playId: playCateId,
                  playKindId: playKindId,
                  number: this.props.selectLotteryNumbers,
                  bet: exp,
                  beishu: Number(this.props.beishu) ? this.props.beishu : 1,
                  mode: this.props.mode,
                  bonus: playKind.get('bonus'),
                  leaveBonus: playKind.get('leaveBonus'),
                });
                dispatch(push(`bet-confirm/${this.props.lId}`));
              }
            }
          }}
        >
          <img src={rightArrow} style={{ width: '5.8vw', marginRight: '1vw' }}/>
          去投注
        </div>
      </div>
    );
  }
}

export default LotteryBottomBar;
