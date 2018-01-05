import React, { PureComponent } from 'react';
import { TextareaItem } from 'antd-mobile';

import { changeSelectLotteryNumbers } from '../../../actions/LotteryAction';
import CountNum from '../../../core/lottery/CountNum';

const styles = require('./styles.css');

class DanShiType extends PureComponent {
  state = {
    type1: '',
  };
  componentWillReceiveProps(nextProps) {
    if (nextProps.id !== this.props.id) {
      this.setState({
        type1: '',
      });
      changeSelectLotteryNumbers('');
    } else if (!nextProps.selectLotteryNumbers) {
    }
  }
  changeData = (e) => {
    let value = '';
    try {
      value = e.target.value;
    } catch(e) {
    }
    var pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？[A-z]");
    if (pattern.test(value)) {
    } else {
      this.setState({
        type1: value,
      });
      const re = new RegExp('[0-9]+','g')
      let numbers = '';
      try{
        if (this.props.id === 426) {
          var tmp = [];
          $(value.match(re)).each(function(i,v){
              tmp[tmp.length] = parseInt(v,10);
              if(tmp.length == 2)
              {
                  numbers += tmp[0]+','+tmp[1]+'#'
                  tmp = [];
              }
          })
          numbers = numbers.substr(0,numbers.length-1)
        } else if (this.props.id === 428) {
          var tmp = [];
          $(value.match(re)).each(function(i,v){
              tmp[tmp.length] = parseInt(v,10);
              if(tmp.length == 3)
              {
                  numbers += tmp[0]+','+tmp[1]+','+tmp[2]+'#'
                  tmp = [];
              }
          })
          numbers = numbers.substr(0,numbers.length-1)
        } else if (this.props.id === 475) {
          var tmp = [];
          $(value.match(re)).each(function(i,v){
              tmp[tmp.length] = parseInt(v,10);
              if(tmp.length == 4)
              {
                  numbers += tmp[0]+','+tmp[1]+','+tmp[2]+','+tmp[3]+'#'
                  tmp = [];
              }
          })
          numbers = numbers.substr(0,numbers.length-1)
        } else if (this.props.id === 493 || this.props.id === 497) {
          numbers = value && value.match(re);
          // numbers = numbers && numbers.map(number => Number(number));
          numbers = numbers && numbers.join(',');
        } else if (this.props.id === 495 || this.props.id === 499) {
          numbers = value && value.match(re);
          // numbers = numbers && numbers.map(number => Number(number));
          numbers = numbers && numbers.join('-');
        } else {
          numbers = value && value.match(re);
          // numbers = numbers && numbers.map(number => Number(number));
          numbers = numbers && numbers.join('#');
        }
      } catch(e){
        console.warn(e);
      }
      // 时时彩系列，单式选号需要去重
      // if (this.props.playCateId == 10) {
        try {
          numbers = CountNum.unique(numbers);
        } catch(e) {
          console.error(e);
        }
      // }
      try {
        changeSelectLotteryNumbers(numbers);
      } catch(e) {
      }
    }
  }

  render() {
    const { notices } = this.props;
    return (
      <div className={styles.danshiContainer}>
        <div className={styles.noticeTitle}>请将号码复制或者输入在下方区域</div>
        <textarea
          className={styles.danshiTextarea}
          rows="8"
          value={this.state.type1}
          onChange={this.changeData}
        />
        <div>
          <div className={styles.noticeTitle}>温馨提示</div>
          <div className={styles.noticeItem}>
            <div>请把您已有的大底号码复制或者输入到下边文本框中</div>
            <div>{notices[0] && `例如：${notices[0]}`}</div>
          </div>
          <div className={styles.noticeItem}>
            <div>每注号码之间必须用换行符号或者半形空格隔开</div>
            <div>{notices[1] && `例如：${notices[1]}`}</div>
          </div>
          <div className={styles.noticeItem}>
            <div>每注号码每位之间必须用空格，逗号或者加号分开</div>
            <div>{notices[2] && `例如：${notices[2]}`}</div>
          </div>
          <div className={styles.noticeItem}>
            <div>仅支持单式</div>
            <div>{notices[3] && `例如：${notices[3]}`}</div>
          </div>
        </div>
      </div>
    );
  }

}

export default DanShiType;
