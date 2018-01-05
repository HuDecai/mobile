import React from 'react';
import { changeSelectLotteryNumbers } from '../../../actions/LotteryAction';
import LotteryCircleNumber from '../../../components/LotteryCircleNumber';

const styles = require('./styles.css');

class FushiType extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      types: [
        '',
        '',
        '',
        '',
        '',
      ],
      status: [
        [],
        [],
        [],
        [],
        [],
      ],
      // status: [],
      statusTwo: [],
      statusThree: [],
      statusFore: [],
      statusFive: [],
      type1: '',
      type2: '',
      type3: '',
      type4: '',
      type5: '',
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.id !== this.props.id) {
      this.setState({
        types: [
          '',
          '',
          '',
          '',
          '',
        ],
        status: [
          [],
          [],
          [],
          [],
          [],
        ],
      });
      changeSelectLotteryNumbers('');
    } else if (!nextProps.selectLotteryNumbers) {
    //   this.setState({
    //     types: [
    //       '',
    //       '',
    //       '',
    //       '',
    //       '',
    //     ],
    //     status: [
    //       [],
    //       [],
    //       [],
    //       [],
    //       [],
    //     ],
    //   });
    }
  }
  componentWillUnmount() {
    this.setState({
      types: [
        '',
        '',
        '',
        '',
        '',
      ],
      status: [
        [],
        [],
        [],
        [],
        [],
      ],
    });
  }
  changeType = (index, type) => {
    const types = this.state.types;
    let status = this.state.status;
    types[index] = type;
    let numbers = [];
    if (type === '大') {
      numbers = this.props.bigNumbers;
    } else if (type === '小') {
      numbers = this.props.smallNumbers;
    } else if (type === '全') {
      numbers = this.props.numbers;
    } else if (type === '单') {
      numbers = this.props.oddNumbers;
    } else if (type === '双') {
      numbers = this.props.evenNumbers;
    } else if (type === '清') {
      numbers = [];
    }
    status[index] = numbers;
    this.setState({
      types: [ ...types ],
      status: [ ...status ],
    });
    status = status.slice(0, this.props.labels.length);
    changeSelectLotteryNumbers(status.map(item => item.join('-')).join(','));
  }
  renderItem(label, index) {
    const { numbers } = this.props;
    let status = this.state.status;
    const selectNumbers = status[index];
    return (
      <div className={styles.fushiTypeContainer}>
        <div className={styles.lotteryNumbersHeader}>
          <div>{label}</div>
          <div>
            <span
              className={this.state.types[index] == '大' ? styles.lotteryOperationActive : styles.lotteryOperation }
              onClick={() => {
                this.changeType(index, '大');
              }}
            >
              大
            </span>
            <span
              className={this.state.types[index] == '小' ? styles.lotteryOperationActive : styles.lotteryOperation }
              onClick={() => {
                this.changeType(index, '小');
              }}
            >
              小
            </span>
            <span
              className={this.state.types[index] == '全' ? styles.lotteryOperationActive : styles.lotteryOperation }
              onClick={() => {
                this.changeType(index, '全');
              }}
            >
              全
            </span>
            <span
              className={this.state.types[index] == '单' ? styles.lotteryOperationActive : styles.lotteryOperation }
              onClick={() => {
                this.changeType(index, '单');
              }}
            >
              单
            </span>
            <span
              className={this.state.types[index] == '双' ? styles.lotteryOperationActive : styles.lotteryOperation }
              onClick={() => {
                this.changeType(index, '双');
              }}
            >
              双
            </span>
            <span
              className={this.state.types[index] == '清' ? styles.lotteryOperationActive : styles.lotteryOperation }
              onClick={() => {
                this.changeType(index, '');
              }}
            >
              清
            </span>
          </div>
        </div>
        <div className={styles.lotteryNumbers}>
          { numbers && numbers.map((number) =>
            <LotteryCircleNumber
              key={number}
              number={number}
              active={selectNumbers.indexOf(number) !== -1}
              activeBgColor='#de3c4b'
              onClick={() => {
                let currentStatus = status[index];
                let changeNumbers = [];
                if (currentStatus.indexOf(number) !== -1) {
                  const index = currentStatus.indexOf(number);
                  if (index > -1) {
                    currentStatus.splice(index, 1);
                  }
                  changeNumbers = currentStatus;
                } else {
                  changeNumbers = [...currentStatus, number].sort();
                }
                status[index] = changeNumbers;
                this.setState({
                  status: [ ...status ],
                });
                status = status.slice(0, this.props.labels.length);
                changeSelectLotteryNumbers(status.map(item => item.join('-')).join(','));
              }}
            />
          )}
        </div>
      </div>
    );
  }
  render() {
    const { labels } = this.props;
    return (
      <div className={styles.bodpding}>
        { labels && labels.map((label, index) => this.renderItem(label, index))}
      </div>
    );
  }
}

export default FushiType;
