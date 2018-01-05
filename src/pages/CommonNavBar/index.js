import React, { PropTypes } from 'react';
import * as styles from './styles.css';

// 参数headerTitle  leftIcon  rightIcon  rightAction  leftAction
class CommonNavBar extends React.PureComponent {
  render() {
    return (
      <div className={styles.navBar}>
        <div onClick={() => this.props.leftAction()} className={styles.leftAction}><img src={this.props.leftIcon} className={styles.leftImg} /></div>
        <div className={styles.headerTitle}>{this.props.headerTitle}</div>
        <div className={styles.rigthAction}><img src={this.props.rightIcon } className={styles.RigthImg} style={this.props.rigthStyle} onClick={() => this.props.rightAction()}/></div>
      </div>
    );
  }
}

export default CommonNavBar;
