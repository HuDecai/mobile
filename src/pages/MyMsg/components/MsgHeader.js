import React, { PropTypes } from 'react';
import * as styles from './MsgHeader.css';

class MsgHeader extends React.PureComponent {
  render() {
    return (
      <div className={styles.navBar}>
        <div onClick={() => this.props.leftAction()} className={styles.leftAction}><img src={this.props.leftIcon} className={styles.leftImg} /></div>
        <div className={styles.headerTitle}>{this.props.headerTitle}</div>
        <div className={styles.RigthText} onClick={() => this.props.rightAction()} >{this.props.RigthText}</div>
      </div>
    );
  }
}

export default MsgHeader;
