import React, { PropTypes } from 'react';
import { Modal, List, Picker } from 'antd-mobile';
import Immutable from 'immutable';
import { connect } from 'react-redux';
import * as styles from './BetConfirm.css';
import * as LotteryAction from '../../actions/LotteryAction';
import * as HKBetAction from '../../actions/HKBetAction';
import { push, goBack } from 'react-router-redux';
import LotteryResult from './LotteryResult';
import LotteryTime from './LotteryTime';
import { dispatch } from '../../store';
import CommonNavBar from '../CommonNavBar/';
import Additional from './Additional';
const leftIcon = require('../../assets/images/login-back.png');
const jiantou = require('../../assets/images/jiantou.png');
import { fanshui, touZhuMaxMoney } from '../../core/lottery/fanshuiNumber';
import { chooseFiveLids, danshiId } from '../../core/lottery/fanshuiData.js';
import ConfirmBottomBar from './ConfirmBottomBar';

import Loading from '../../core/decorators/Loading';
import { checkAppVersion } from '../../actions/LoginAction';

@Loading(props => props.isFetching)
class BetConfirm extends React.PureComponent {
  constructor(props: Object) {
    super(props);
    this.state = {
      visible: false,
      content: '',
      checkboxState: true,
      checkItem: 0,
      expect: 1, // 默认期数
      maxExpect: 120, // 最大期数
      totalMoney: 0, // 累计投入
      currentMomey: 0, // 当前投入
      selectExp: this.props.currentLotteryExpect.get('openExpect'), // 当前选中期数
    };
  }
  componentWillMount() {
    checkAppVersion();
    const lId = this.props.params.lId;
    LotteryAction.getLotteryResultList({ lId, rowNumber: 10 });
    // 获取期数和倒计时
    LotteryAction.getLotteryExpect({ lId });
    const type = this.props.currentLotteryType.get('type');
    if(type) {
      fanshui(type);
    }

    window.addEventListener("resize", function() {
        if(document.activeElement.tagName=="INPUT") {
          window.setTimeout(function() {
              document.activeElement.scrollIntoViewIfNeeded();
          },300);
        }
    })
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.currentLotteryType.get('lId') !== this.props.currentLotteryType.get('lId') && nextProps.currentLotteryType.get('lId') && nextProps.currentLotteryType.get('lId') != 15) {
      LotteryAction.getLotteryResultList({ lId: nextProps.currentLotteryType.get('lId'), rowNumber: 10 });
    }
    if(nextProps.currentLotteryType.get('type') !== this.props.currentLotteryType.get('type') && nextProps.currentLotteryType.get('type')) {
        fanshui(nextProps.currentLotteryType.get('type'));
    }
  }
  componentWillUnmount() {
    HKBetAction.changeIsShow({ isShowLotteryRecord: false });
  }
  /**************追号******************/
  // 投注
  betAction() {
    const lId = this.props.params.lId;
    const pickDataList = this.props.pickDataList;
    let params = {};
    if(pickDataList) {
      pickDataList.map((item, key) => {
        const expNum = [];
        let isChase = false;
        if(this.state.expect > 1) {
          isChase = true;
          for(let i=0; i < this.state.expect; i++) {
            expNum.push({
                  "exp": `${this.getExp(i)}`,
                  "beishu": `${this.props.beishu}`,
            });
          }
        }else {
          expNum.push({
                "exp": this.props.currentLotteryExpect.get('openExpect'),
                "beishu": `${this.props.beishu}`,
          });
        }
        params[key] = {
            SingleMoney: `${this.props.singleMoney}`,
            playKind:  `${item.get('playKindId')}`,
            detail: item.get('number'),
            lId: lId,
            place: "",
            winEnd: this.state.checkboxState ? 1 : 2,
            mode: `${this.props.mode}`,
            isChase: isChase,
            expNum: expNum,
        };
      });
  }
    LotteryAction.checkPlayKind(params);
  }

  // 显示期数(追号)
  getExp(i) {
    const exp = this.props.currentLotteryExpect.get('openExpect') > this.state.selectExp ? this.props.currentLotteryExpect.get('openExpect') : this.state.selectExp;
    let test = '';
    if(exp) {
      const expArr = exp.split('-');
      if(expArr.length === 2) {
        const leg = -expArr[1].length;
        const exp1 = Number(expArr[1]) + Number(i);
        test = `${expArr[0]}-${('0000' + String(exp1)).slice(leg)}`;
      }else {
        const exp1 = Number(expArr[0]) + Number(i);
        test = exp1;
      }
    }
    return test;
  }
  showDataList(expect, pickData){
      const dataSource = [];
      let totalMoney = 0;
      const bet = pickData && pickData.bet;
      if(expect) {
        for(let i = 0; i<expect; i++) {
          const currentMoney = (this.props.singleMoney * this.props.beishu * bet).toFixed(3);
          totalMoney = parseFloat(totalMoney) + parseFloat(currentMoney);
          dataSource.push(
            <div key={i} className={styles.tableTrStyle}>
              <div>{this.getExp(i)}期</div>
              <div>{this.props.beishu}&nbsp;倍</div>
              <div  className={styles.tableTrWidth}>￥{totalMoney ? totalMoney.toFixed(3) : totalMoney}</div>
            </div>
          );
        }
        this.setState({ totalMoney });
      }
      return dataSource;
    }
    // 设置期数
  setExpect(checkItem, expect) {
    const currentExpect = expect > this.state.maxExpect ? this.state.maxExpect : expect;
    if(currentExpect !== expect) {
      checkItem = 0;
    }
    this.setState({ checkItem, expect: currentExpect })
  }
  // 最多可投期数
  getDiffExpect(selectExp, exp) {
    let maxExpect = 120;
    const selectExpArr = selectExp.split('-');
    const expArr = exp.split('-');
    if(expArr.length === 2) {
      maxExpect = 120 - (selectExpArr[1] - expArr[1]);
    }else {
      maxExpect = 120 - (selectExpArr[0] - expArr[0]);
    }
    const expect = this.state.expect > maxExpect ? maxExpect : this.state.expect;
    this.setState({ maxExpect, expect });
  }

  /************不追号*************/
  showModeList(percentage, mode) {
    const views = [];
    if(percentage) {
      percentage.map((item) => {
        views.push(
           <div className={styles.radioStyle}>
             <input type="radio"
               checked={item.get('value') == mode ? true : false }
               onClick={() => {
                 LotteryAction.updateMode({ mode:item.get('value') })
               }}
             />
                &nbsp;{item.get('name')}
            </div>
        );
      });
    }
    return views;
  }
  showMoneyList(singleMoneyList, singleMoney) {
    const views = [];
    if(singleMoneyList) {
      singleMoneyList.map((item) => {
        views.push(
           <div className={styles.radioStyle}>
             <input type="radio"
               checked={item.get('value') == singleMoney ? true : false }
               onClick={() => {
                 LotteryAction.updateMoshi({ singleMoney:item.get('value') })
               }}
             />
                &nbsp;{item.get('name')}
            </div>
        );
      });
    }
    return views;
  }

  render() {
    let pickData = {};
    let maxMoney = 0;
    try{
      pickData = this.props.pickDataList.toJS()[0];
      maxMoney = touZhuMaxMoney(this.props.singleMoney, this.props.beishu, this.props.mode, pickData.bonus, pickData.leaveBonus, pickData.playId, pickData.playKindId, pickData.number);
    }catch(e) {}
    const showNumber = (number) =>  {
      let numbers = number;
      if(!numbers || !pickData) {
        return;
      }
      const lId = this.props.currentLotteryType.get('lId');
      // 龙虎号码显示
      if (pickData.way && pickData.way.indexOf('龙虎') > -1) {
            numbers = numbers && numbers.split('-');
            numbers = numbers && numbers.map(number => {
              if (number == '1') {
                return '龙';
              } else if (number == '2') {
                return '虎';
              } else if (number == '3') {
                return '和';
              }
            });
            numbers = numbers && numbers.join('-');
      }
      //11选5 号码显示
      if(chooseFiveLids.indexOf(Number(lId)) !== -1) {
        if(danshiId.indexOf(Number(pickData.playKindId)) !== -1) {
          if(pickData.playKindId == 493 || pickData.playKindId == 497) {
           numbers = numbers && numbers.split(',');
           numbers = numbers && numbers.map(number => {
             return `0${number}`.substr(-2);
           });
           numbers = numbers && numbers.join(',');
         } else if(pickData.playKindId  == 495 || pickData.playKindId  == 499) {
           numbers = numbers && numbers.split('-');
           numbers = numbers && numbers.map(number => {
             return `0${number}`.substr(-2);
           });
           numbers = numbers && numbers.join('-');
         } else {
           // 11选5 单式展示
           numbers = numbers && numbers.split('#');
           numbers = numbers && numbers.map(number => {
             return `0${number}`.substr(-2);
           });
           numbers = numbers && numbers.join('#');
         }
        }else if(pickData.playKindId  == 345 ) {
          // 11选5 定单双
          numbers = numbers && numbers.split('-');
          numbers = numbers && numbers.map(number => {
            if (number == '1') {
              return '0单5双';
            } else if (number == '2') {
              return '1单4双';
            } else if (number == '3') {
              return '2单3双';
            } else if (number == '4') {
              return '3单2双';
            } else if (number == '5') {
              return '4单1双';
            } else if (number == '6') {
              return '5单0双';
            }
          });
          numbers = numbers && numbers.join('-');
        } else {
          // 11选5 其他
          numbers = numbers && numbers.split(',');
          numbers = numbers && numbers.map(number => {
               number = number && number.split('-');
               number = number && number.map(number => {
                 return `0${number}`.substr(-2);
               });
               return number && number.join('-');
          });
          numbers = numbers && numbers.join(',');
        }
      }
      if(danshiId.indexOf(Number(pickData.playKindId)) !== -1) {
        return numbers.split('#').map(item => `{${item}}`).join('#');
      }else {
        return numbers.split(',').map(item => `{${item}}`).join(',');
      }
    }
    return (
      <div>
        <CommonNavBar
           headerTitle={'投注确认'}
           leftIcon={leftIcon}
           leftAction={() => { dispatch(goBack())}}
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
          <div >
             <div className={styles.confirmItem1}>玩法名称： {pickData && pickData.way}</div>

             <div className={styles.confirmItem}
                 onClick={() => {
                   const detail = showNumber(pickData && pickData.number);
                   this.setState({ visible: true, content: detail })
                 }}
             >
                <div className={styles.showNumbers}>选号内容：{showNumber(pickData && pickData.number)}</div>
                <div><img src={jiantou} style={{ width: '2vw' }}/></div>
             </div>

             <div className={styles.confirmItem}>
                <div>返点模式： </div>
                <div className={styles.radioList}>
                  {this.showModeList(this.props.percentage, this.props.mode)}
                </div>
             </div>

             <div className={styles.confirmItem}>
                <div>金额模式：</div>
                <div className={styles.radioList}>
                  {this.showMoneyList(this.props.singleMoneyList, this.props.singleMoney)}
                </div>
             </div>

             <div className={styles.confirmItem}>最高奖金：{maxMoney.toFixed(3)}</div>

             <List style={{ backgroundColor: 'white' }} className="picker-list">
               <Picker
                 data={this.props.zhuihaoQishuList}
                 disabled={this.state.expect == 1 ? true : false}
                 cols={1}
                 value={[this.state.selectExp || this.props.currentLotteryExpect.get('openExpect') ]}
                 onOk={e => {
                   this.setState({ selectExp: e[0], checkItem: 0 });
                   this.getDiffExpect(e[0], this.props.currentLotteryExpect.get('openExpect'));
                 }}
                 onDismiss={e => console.log('dismiss', e)}
               >
                 <List.Item arrow="horizontal"><span style={{ color: '#5b5b5b', fontSize: '4vw' }}>开始期号：</span></List.Item>
               </Picker>
             </List>
             <div className={styles.additionalContent}>
                 <div className={styles.chaseContent}>
                     <div>倍数选择&nbsp;
                         <input
                            style={{ width: '10vw', height: '7vw', border: '1px solid #ccc'}}
                            className={styles.betInput}
                            value={this.props.beishu}
                            onChange={(e) => {
                              if(e.target.value > 9999 || e.target.value < 0 ||  e.target.value === '0') {
                                LotteryAction.updateBeiShu({ beishu: 1 });
                              }else {
                                // 将倍数放在reducer中
                               LotteryAction. updateBeiShu({ beishu: e.target.value  });
                              }
                            }}
                            onBlur={() => {
                              if(!this.props.beishu || this.props.beishu == 0) {
                                LotteryAction.updateBeiShu({ beishu: 1 });
                              }
                            }}
                            type="text"
                            name="name"
                            id='beishu'
                         />
                     </div>
                     <div>追号期数&nbsp;
                        <input
                           style={{ width: '10vw', height: '7vw', border: '1px solid #ccc'}}
                           value={this.state.expect}
                           onChange={(e) => {
                            const value = e.target.value;
                            if(value > this.state.maxExpect || value < 0 || value === '0') {
                                this.setExpect(0, 1)
                                return false;
                              }else {
                                this.setExpect(0, value)
                              }
                             }}
                             onBlur={() => {
                               if(!this.state.expect || this.state.expect == 0) {
                                  this.setExpect(0, 1)
                               }
                          }}
                          type="text"
                          name="name"
                          id='qishu'
                       />
                     </div>
                 </div>
                 <div style={{ height: '30vw', overflow: 'scroll' }}>
                    {this.showDataList(this.state.expect, pickData)}
                 </div>
                 <div className={styles.additionalCheckbox}>
                    <div><input
                      type="checkbox"
                      checked={this.state.checkboxState}
                      onChange={() => this.setState({ checkboxState: !this.state.checkboxState})}
                    /></div>
                    <div>&nbsp;中奖后停止</div>
                 </div>
             </div>
          </div>
        </div>
        <ConfirmBottomBar
           expect={this.state.selectExp || this.props.currentLotteryExpect.get('openExpect')}
           totalMoney={this.state.totalMoney && this.state.totalMoney.toFixed(3)}
           exp={pickData && pickData.bet}
           submitAction={() => {
             this.betAction();
           }}
        />
        <Modal
          visible={this.state.visible}
          transparent
          maskClosable={false}
          onClose={() => this.setState({ visible: false, content: '' })}
          title="投注内容"
          footer={[{
            text: '关闭',
            onPress: () => { this.setState({ visible: false, content: '' }) },
            style: { backgroundColor: '#de3c46', color: '#fff' }
          }]}
          wrapProps={{ onTouchStart: this.onWrapTouchStart }}
          style={{ width: '90vw' }}
        >
          <div className={styles.modalContent}>
              {this.state.content}
          </div>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isFetching: state.LotteryReducer.get('isFetching'),
    lotteryResultList: state.LotteryReducer.get('lotteryResultList'),
    currentLotteryExpect: state.LotteryReducer.get('currentLotteryExpect'),
    currentLotteryType: state.LotteryReducer.get('currentLotteryType'),
    selectPlayInfo: state.LotteryReducer.get('selectPlayInfo'),
    selectLotteryNumbers: state.LotteryReducer.get('selectLotteryNumbers'),
    percentage: state.LotteryReducer.get('percentage'),
    beishu: state.LotteryReducer.get('beishu'),
    mode: state.LotteryReducer.get('mode'),
    singleMoney: state.LotteryReducer.get('singleMoney'),
    singleMoneyList: state.LotteryReducer.get('singleMoneyList'),
    pickDataList: state.LotteryReducer.get('pickDataList'),
    zhuihaoQishuList: state.LotteryReducer.get('zhuihaoQishuList'),
    currentLotteryExpect: state.LotteryReducer.get('currentLotteryExpect'),
    isShowLotteryRecord:  state.HKBetReducer.get('isShowLotteryRecord'),
  };
};

export default connect(mapStateToProps)(BetConfirm);
