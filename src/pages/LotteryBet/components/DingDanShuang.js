import React from 'react';
import { changeSelectLotteryNumbers } from '../../../actions/LotteryAction';
import LotteryCircleNumber from '../../../components/LotteryCircleNumber';

const styles = require('./styles.css');

class DingDanShuang extends React.PureComponent {
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
  renderItem(numbers) {
    const views = [];
    if(numbers) {
      numbers.map(item => {
        views.push(
          <div 
            onClick={() => {
                this.changeState(item);
            }}
            className={ this.state.status.indexOf(item) !== -1 ? styles.onSelectDetailNumberCard : styles.selectDetailNumberCard}
          >
            {`${5-(item-1)}单${item-1}双`}
          </div>
        )
      })
    }
    return views;
  }
  render() {
    return (
      <div className={styles.danshuangContent}>
        {this.renderItem(this.props.numbers)}
      </div>
    );
  }
}

export default DingDanShuang;
