// 投注页面最上方 nav bar
import React from 'react';
import { goBack, replace } from 'react-router-redux';
import * as Immutable from 'immutable';

import { dispatch } from '../../store';
import styles from './LotteryNavBar.css';
import { changePlayKind } from '../../actions/LotteryAction';
import * as HKBetAction from '../../actions/HKBetAction';

const leftIcon = require('../../assets/images/login-back.png');
const rightIcon = require('../../assets/images/lottery-play-info.png');
const downIcon = require('../../assets/images/lottery-bet-down-arrow.png');

// 选择玩法
const ChangePlayKind = (listPlayCate, listPlayKind, currentPlayKindId, cancle, lId) => {
  const views = [];
  try {
    listPlayCate && listPlayCate.forEach(playCate => {
      const playCateKinds = listPlayKind.filter( playKind => playKind.get('playCateId') == playCate.get('id'));
      views.push(
        <div key={playCate.get('id')} className={styles.playCateCell}>
          <div className={styles.playCateName}>{playCate.get('name')}</div>
          <div className={styles.playKindItems}>
            {
              playCateKinds && playCateKinds.map(kind => (
                <div
                  className={currentPlayKindId === kind.get('id') ? styles.playKindItemActive : styles.playKindItem}
                  key={kind.get('id')}
                  onClick={() => {
                    changePlayKind(Immutable.Map({
                      playKind: kind,
                      playCate: playCate,
                    }));
                    dispatch(replace(`/lottery/${lId}?playCateId=${playCate.get('id')}&playKindId=${kind.get('id')}`))
                    cancle();
                    HKBetAction.xiaZhuNumber({numbers: []});
                  }}
                >
                  {/* {currentPlayKindId} */}
                  {/* {kind.get('id')} */}
                  {kind.get('name')}
                </div>
              ))
            }
          </div>
        </div>
      );
    });
  } catch(e) {
    console.warn(e);
  }
  return views;
};

const PlayInfo = (playInfo) => {
  try {
    return (
      <div className={styles.playInfoBoard}>
        <div>【玩法说明】</div>
        <div>{playInfo && playInfo.get('help')}</div>
        <br />
        <div>【中奖举例】</div>
        <div>{playInfo && playInfo.get('example')}</div>
        <br />
        <div>【奖金上限】</div>
        <div>{playInfo && playInfo.get('maxBonus')}</div>
        <br />
      </div>
    )
  } catch(e) {
  }
}

// 玩法帮助信息
const PlayKindInfo = ({}) => {
  return (
    <div>

    </div>
  );
};

class LotteryNavBar extends React.PureComponent {
  state = {
    showChangePlayKind: false, // 是否显示玩法选择面板
    showPlayInfo: false, // 是否显示完玩法说明面板
  };
  componentWillReceiveProps(nextProps) {
    if (nextProps.selectLotteryNumbers !== this.props.selectLotteryNumbers || nextProps.touzhuDetail !== this.props.touzhuDetail) {
      this.setState({
        showChangePlayKind: false, // 是否显示玩法选择面板
        showPlayInfo: false, // 是否显示完玩法说明面板
      });
    }
  }
  render() {
    const lId = this.props.lId;
    const playKind = this.props.selectPlayInfo.get('playKind');
    const playCate = this.props.selectPlayInfo.get('playCate');
    const playKindName = playKind && playKind.get('name');
    const currentPlayKindId = playKind && playKind.get('id');
    const playCateName = playCate && playCate.get('name');
    const {
      showChangePlayKind,
      showPlayInfo,
    } = this.state;
    const currentLottery = this.props.currentLottery;
    const listPlayCate = currentLottery && currentLottery.get('listPlayCate');
    const listPlayKind = currentLottery && currentLottery.get('listPlayKind');
    const lotteryFetching = this.props.lotteryFetching;
    return (
      <div className={styles.navBar}>
        <div onClick={() => dispatch(goBack())} className={styles.leftAction}><img src={leftIcon} className={styles.leftImg} /></div>
        <div className={showChangePlayKind ? styles.headerTitleActive : styles.headerTitle} onClick={() => this.setState({ showChangePlayKind: !showChangePlayKind })}>
          {!lotteryFetching && playKindName && `${playCateName}-${playKindName}`} {!lotteryFetching && <img src={downIcon} style={{ width: '4.8vw', height: '4.8vw', marginLeft: '1vw' }}/>}
        </div>
        { showChangePlayKind &&
          <div className={styles.playKindBoard}>
            {ChangePlayKind(listPlayCate, listPlayKind, currentPlayKindId, () => this.setState({ showChangePlayKind: false }), lId)}
          </div>
        }
       <div className={styles.rightAction}>
        <div className={ showPlayInfo ? styles.rigthImgActive : null }>
          <img
            className={styles.RigthImg}
            src={ rightIcon }
            onClick={(e) => {
              e.preventDefault();
              console.log(this.state.showPlayInfo);
              this.setState({
                showPlayInfo: !showPlayInfo,
              });
            }}
          />
        </div>
        {
          showPlayInfo &&
          <div className={styles.playInfo}>
            {PlayInfo(playKind)}
          </div>
        }
        </div>
      </div>
    );
  }
}

export default LotteryNavBar;
