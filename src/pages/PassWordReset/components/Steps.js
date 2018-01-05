// 密码重置步数组件
import React, { PropTypes } from 'react';
import * as styles from './styles.css';

class Steps extends React.PureComponent {
  render() {
    const step = this.props.step ? this.props.step : 1;
    const firstColor = step == 1 ? '#459ad6' : '#a1a1a1';
    const secondColor = step == 2 ? '#459ad6' : '#a1a1a1';
    const threeColor = step == 3 ? '#459ad6' : '#a1a1a1';
    return (
      <div className={styles.lineStyle}>
        <div className={styles.steps}>
           <div className={styles.stepCard} style={{ backgroundColor: `${firstColor}` }}>1</div>
           <div className={styles.stepCardLine} />
           <div className={styles.stepCard} style={{ backgroundColor: `${secondColor}` }}>2</div>
           <div className={styles.stepCardLine} />
           <div className={styles.stepCard} style={{ backgroundColor: `${threeColor}` }}>3</div>
        </div>
        <div className={styles.stepsText}>
           <div className={styles.stepText} style={{ color: `${firstColor}` }}>验证资金密码</div>
           <div className={styles.stepText} style={{ color: `${secondColor}` }}>验证密保问题</div>
           <div className={styles.stepText} style={{ color: `${threeColor}` }}>设置新的密码</div>
        </div>
      </div>
    );
  }
}

export default Steps;
