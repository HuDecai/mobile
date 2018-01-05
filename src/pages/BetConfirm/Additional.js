// 追号页面
import React, { PropTypes } from 'react';
import { Picker, List } from 'antd-mobile';
import Immutable from 'immutable';
import { connect } from 'react-redux';
import * as styles from './BetConfirm.css';
import * as LotteryAction from '../../actions/LotteryAction';
import { fanshui, touZhuMaxMoney } from '../../core/lottery/fanshuiNumber';
import ConfirmBottomBar from './ConfirmBottomBar';


class Additional extends React.PureComponent {
  constructor(props: Object) {
    super(props);
    this.state = {
      checkboxState: true,
      checkItem: 0,
      expect: 1, // 默认期数
      maxExpect: 120, // 最大期数
      totalMoney: 0, // 累计投入
      currentMomey: 0, // 当前投入
      selectExp: this.props.exp, // 当前选中期数
    };
  }

  // 不追号投注
  betAction() {
    const lId = this.props.lId;
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
                "exp": this.props.exp,
                "beishu": `${this.props.beishu}`,
          });
        }
        params[key] = {
            SingleMoney: `${this.props.singleMoney}`,
            playKind:  `${item.get('playKindId')}`,
            detail: item.get('number'),
            lId: lId,
            place: "",
            winEnd: 2,
            mode: `${this.props.mode}`,
            isChase: isChase,
            expNum: expNum,
        };
      });
  }
  console.log('params:', params);
  LotteryAction.checkPlayKind(params);
}
  
  // 显示期数(追号)
  getExp(i) {
    const exp = this.props.exp > this.state.selectExp ? this.props.exp : this.state.selectExp;
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
  showDataList(expect){
     console.log('expect:', expect);
      const dataSource = [];
      let totalMoney = 0;
      if(expect) {
        for(let i = 0; i<expect; i++) {
          const currentMoney = (this.props.singleMoney * this.props.beishu * this.props.bet).toFixed(3);
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
  render() {
    return (
      <div>
        <List style={{ backgroundColor: 'white' }} className="picker-list">
          <Picker
            data={this.props.zhuihaoQishuList}
            disabled={this.state.expect == 1 ? true : false}
            cols={1}
            value={[this.state.selectExp || this.props.exp ]}
            onOk={e => {
              this.setState({ selectExp: e[0], checkItem: 0 });
              this.getDiffExpect(e[0], this.props.exp);
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
                  />
                </div>
            </div>
            <div style={{ height: '30vw', overflow: 'scroll' }}>
               {this.showDataList(this.state.expect)}
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
        <ConfirmBottomBar
           expect={this.state.selectExp || this.props.exp}
           totalMoney={this.state.totalMoney && this.state.totalMoney.toFixed(3)}
           exp={this.props.bet}
           submitAction={() => {
             this.betAction();
           }}
        />
      </div>
    );
  }
}

export default Additional;
