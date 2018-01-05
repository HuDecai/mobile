import React, { PropTypes } from 'react';
import { Modal } from 'antd-mobile';
import * as styles from './LotteryTime.css';
import * as LotteryAction from '../../actions/LotteryAction';
import LotteryTimeIcon from '../../assets/images/lottery-daojishi.svg';
import { checkAppVersion } from '../../actions/LoginAction';

class LotteryTime extends React.PureComponent {
  state = {
      showLotteryTypeList: false,
      secondsElapsed: this.props.currentLotteryExpect.get('time'), // 倒计时时间
      visible: false, // 显示弹窗
      times: 0, // 弹出倒计时
      isShow: 0, // 1显示   0 不显示
    };
    componentWillMount() {
      this.setState({
        secondsElapsed: Number(this.props.currentLotteryExpect.get('time')),
        isShow: this.props.isShow,
      });
      checkAppVersion();
    }
    componentWillReceiveProps(nextProps) {
      if(this.props.currentLotteryExpect.get('time') !== nextProps.currentLotteryExpect.get('time')) {
        this.setState({
          secondsElapsed: Number(nextProps.currentLotteryExpect.get('time')),
        });
      }
      if (this.props.currentLotteryExpect !== nextProps.currentLotteryExpect) {
        clearInterval(this.interval);
        // clearInterval(this.interval1);
        this.interval = setInterval(() => this.tick(), 1000);
      }
    }
    changeTimes() {
      // 弹窗倒计时
      if(this.state.times > 0) {
        this.setState((prevState) => ({
          times: prevState.times - 1
        }));
      } else if(this.state.times === 0) {
          this.setState({ times: 0, visible: false, isShow: 0 });
          clearInterval(this.interval1);
      }
    }
    setTime() {
      // 弹窗的倒计时
      clearInterval(this.interval1);
      if (this.state.times) {
        this.interval1 = setInterval(() => this.changeTimes(), 1000);
      }
    }
    tick() {
      const expect = this.props.currentLotteryExpect;
      if(this.state.secondsElapsed > 0) {
        this.setState((prevState) => ({
          secondsElapsed: prevState.secondsElapsed - 1
        }));
      } else if(this.state.secondsElapsed === 0 && expect.get('openExpect')) {
        // 倒计时到0的时候请求下一期
        LotteryAction.getLotteryExpect({ lId: this.props.lId });
        if (this.props.isChaseNumber === true) {
          this.setState({ isShow: 1, visible: true, times: 0 });
        } else {
          this.setState({ isShow: 1, visible: true, times: 3 });
          this.setTime();
        }
      }
    }
    formatTime(second) {
      return [parseInt(second / 60 / 60), parseInt(second / 60 % 60), parseInt(second % 60)].join(":").replace(/\b(\d)\b/g, "0$1");
    }
    componentDidMount() {
      // header 的倒计时
      this.interval = setInterval(() => this.tick(), 1000);
    }
    componentWillUnmount() {
      clearInterval(this.interval);
      clearInterval(this.interval1);
    }
  render() {
    const expect = this.props.currentLotteryExpect;
    return (
      <div className={styles.timeContent}>
         <div>{this.props.lotteryName}</div>
         <div>当前期数 {expect.get('openExpect')}</div>
         <div className={styles.lotteryTime}>
           <LotteryTimeIcon style={{ width: '3.5vw', marginRight: '1vw' }}/>
           <div className={styles.lotteryTimer}>{this.formatTime(this.state.secondsElapsed)}</div>
         </div>
         <Modal
           visible={this.state.visible}
           transparent
           maskClosable={false}
           title="友情提示:"
           footer={[
             { text: `确认(${this.state.times})`,
               onPress: () => {
                 this.setState({ visible: false, times: 0, isShow: 0 });
                 clearInterval(this.interval1);
               },
               style: { backgroundColor: '#de3c46', color: '#fff' }
             }
           ]}
           style={{ width: '98vw' }}
         >
           <div>
              <p style={{ fontSize: '4vw', padding: '5px'}}>您好，<span style={{ color: 'red'}}>{expect.get('closeExpect')}</span> 期已截止， 当前是 <span style={{ color: 'red'}}>{expect.get('openExpect')}</span> 期， 投注时请确认您选择的期号。</p>
           </div>
         </Modal>
      </div>
    );
  }
}

export default LotteryTime;
