import React from 'react';
import { changeSelectLotteryNumbers } from '../../../actions/LotteryAction';
import LotteryCircleNumber from '../../../components/LotteryCircleNumber';

const styles = require('./styles.css');

class FushiType extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      status: [],
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.id !== this.props.id) {
      this.setState({
        status: [],
      });
      changeSelectLotteryNumbers('');
    } else if (!nextProps.selectLotteryNumbers) {
    }
  }
  componentWillUnmount() {
    this.setState({
      status: [],
    });
  }
  renderItem(label, index) {
    const { numbers, indexs } = this.props;
    let status = this.state.status;
    const selectNumbers = status;
    return (
      <div className={styles.fushiTypeContainer}>
        <div className={styles.lotteryNumbersHeader}>
          <div>{label}</div>
        </div>
        <div className={styles.lotteryNumbers}>
          { numbers && numbers.map((number, key) =>
            <LotteryCircleNumber
              key={number}
              number={number}
              index={indexs[key]}
              active={selectNumbers.indexOf(number) !== -1}
              activeBgColor='#de3c4b'
              onClick={() => {
                let currentStatus = this.state.status;
                let changeNumbers = [];
                if (currentStatus && currentStatus.indexOf(number) !== -1) {
                  const index = currentStatus.indexOf(number);
                  if (index > -1) {
                    currentStatus.splice(index, 1);
                  }
                  changeNumbers = currentStatus;
                } else {
                  changeNumbers = currentStatus && [...currentStatus, number].sort(function(a, b) {return a-b });
                }
                status = changeNumbers;
                this.setState({
                  status: [ ...status ],
                });
                changeSelectLotteryNumbers(status.join('-'));
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
      <div >
        { labels && labels.map((label, index) => this.renderItem(label, index))}
      </div>
    );
  }
}

export default FushiType;
