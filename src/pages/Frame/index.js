import React, { Component } from 'react';
import { push, goBack } from 'react-router-redux';
import { dispatch } from '../../store';
import CommonNavBar from '../CommonNavBar/';

const styles = require('./style.css');
const leftIcon = require('../../assets/images/login-back.png');

class Frame extends Component {
  componentWillMount() {
    let viewport = document.querySelector("meta[name=viewport]");
    viewport.setAttribute('content', 'width=device-width, initial-scale=1');
  }
  render() {
    const url = this.props.location.query.src;
    const title = this.props.location.query.title || '充值';
    return (
      <div className={styles.frameContainer}>
        <CommonNavBar
           headerTitle={title}
           leftIcon={leftIcon}
           leftAction={() => { dispatch(goBack())}}
        />
        <iframe src={url} className={styles.frame} scrolling="yes" />
        {/* <div>{url}</div> */}
      </div>
    );
  }
}

export default Frame;
