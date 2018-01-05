import React from 'react';
import { changeSelectLotteryNumbers } from '../../../actions/LotteryAction';
import LotteryCircleNumber from '../../../components/LotteryCircleNumber';
const long = require('../../../assets/images/lottery-long.png');
const hu = require('../../../assets/images/lottery-hu.png');
const he = require('../../../assets/images/lottery-he.png');
const vs = require('../../../assets/images/lottery-vs.png');
const selectHu = require('../../../assets/images/lottery-select-hu.png');
const selectHe = require('../../../assets/images/lottery-hu-he.png');
const selectLong = require('../../../assets/images/lottery-select-long.png');

const styles = require('./styles.css');

class SaiLongHu extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      status: [],
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.id !== this.props.id) {
      this.state = {
        status: [],
      };
      changeSelectLotteryNumbers('');
    } else if (!nextProps.selectLotteryNumbers) {
    
    }
  }
  componentWillUnmount() {
    this.state = {
      status: [],
    };
  }
  remove(val) {
    const status = this.state.status
    var index = status.indexOf(val);
    if (index > -1) {
       status.splice(index, 1);
    }
    this.setState({ status: [...status] });
    const numbers = [...status] && [...status].sort() && [...status].sort().join('-');
    changeSelectLotteryNumbers(numbers);
  }
  changeState(value) {
    if(this.state.status.indexOf(value) !== -1) {
      // 删除
      const delData = this.remove(value);
    } else {
      // 添加
      const status = [...this.state.status, value].sort();
      this.setState({ status });
      const numbers = status && status.join('-');
      changeSelectLotteryNumbers(numbers);
    }
  }
  render() {
    return (
      <div className={styles.longhuContent}>
        <div className={styles.longhuBody}>
          <div className={styles.longhu1}>
              {this.state.status.indexOf(1) !== -1 ? 
                <div className={styles.onLonghuCard} onClick={() => {this.changeState(1)}}><img src={selectLong} className={styles.long} /></div> :
                <div className={styles.longhuCard} onClick={() => {this.changeState(1)}}><img src={long} className={styles.long} /></div>
              }
              <div><img src={vs} className={styles.vs} /></div>
              {this.state.status.indexOf(2) !== -1 ? 
                <div className={styles.onLonghuCard} onClick={() => {this.changeState(2)}}><img src={selectHu} className={styles.hu} /></div> :
                <div className={styles.longhuCard} onClick={() => {this.changeState(2)}}><img src={hu} className={styles.hu} /></div>
              }
          </div>
        </div>
      </div>
    );
  }
}

export default SaiLongHu;
