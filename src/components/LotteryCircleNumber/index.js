/*
  彩票圆形号码
 */
import React from 'react';

import styles from './styles.css';

const lotteryUnselectedIcon = require('../../assets/images/lottery-unselected.png');

class LotteryCircleNumber extends React.PureComponent {
  render() {
    const {
      active, // 是否选中
      activeBgColor, // 选中的背景色
      number, // 号码
      isDibit, // 是不是两位
      onClick,
      index, // 下标
    } = this.props;
    let numberStyle;
    let showNumber;
    if (isDibit) {
      if (number > 10) {
        showNumber = number;
      } else {
        showNumber = `0${number}`;
      }
    } else {
      showNumber = number;
    }
    if (active) {
      numberStyle = {
        width: '11.3vw',
        height: '11.3vw',
        fontSize: '7.4vw',
        lineHeight: '11.3vw',
        borderRadius: '11.3vw',
        textAlign: 'center',
        color: '#fff',
        background: activeBgColor,
        boxShadow: '0px 5px 2px #bebebe',
        boxSizing: 'border-box',
      };
    } else {
      numberStyle = {
        width: '11.3vw',
        height: '11.3vw',
        fontSize: '7.4vw',
        lineHeight: '11.3vw',
        borderRadius: '11.3vw',
        textAlign: 'center',
        color: '#5b5b5b',
        backgroundImage: `url(${lotteryUnselectedIcon})` ,
        backgroundSize: '11.3vw',
        backgroundRepeat: 'no-repeat',
      };
    }
    const indexStyle ={
      width: '11.3vw',
      textAlign: 'center',
      color: '#ccc',
      display: 'inline-block',
      fontSize: '4vw'
    };
    return (
      <span>
        <div style={numberStyle} onClick={onClick}>
          {showNumber}
        </div>
        {index >= 0 && <span style={indexStyle}>{index}</span>}
      </span>

    );
  }
}

export default LotteryCircleNumber;
