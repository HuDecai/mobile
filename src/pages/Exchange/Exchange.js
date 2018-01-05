import React, { PropTypes } from 'react';
import { Modal } from 'antd-mobile';
import { connect } from 'react-redux';
import * as HomePageAction from '../../actions/HomePageAction';
import * as Estyles from './styles.css';
import * as styles from '../../assets/stylesheets/common.css';
import { push, goBack } from 'react-router-redux';
import { dispatch } from '../../store';
import CommonNavBar from '../CommonNavBar/';
const leftIcon = require('../../assets/images/login-back.png');
import Loading from '../../core/decorators/Loading';
import { checkAppVersion } from '../../actions/LoginAction';

const alert = Modal.alert;

@Loading(props => props.isFetching)
class Exchange extends React.PureComponent {
  constructor(props: Object) {
    super(props);
    this.state = {
      points: '',
    };
  }
  componentWillMount() {
    HomePageAction.getUserCaptialInfo();
    checkAppVersion();
  }
  submitAction() {
    if(this.state.points) {
      HomePageAction.pointerToMoney({ pointer: this.state.points });
    }
  }
  render() {
    return (
      <div>
        <CommonNavBar
           headerTitle={'积分兑换页面'}
           leftIcon={leftIcon}
           leftAction={() => {
             dispatch(goBack());
           }}
        />
        <div className={Estyles.content}>
              <div className={Estyles.contentBody}>
                  <div>我的积分：{this.props.userCaptial.get('points')}</div>
              </div>
              <div className={Estyles.contentBody1Text}>本次兑换</div>
              <div className={Estyles.contentBody1}>
                  <div className={Estyles.contentBodyInput}>
                     <input className={Estyles.input}
                        value={this.state.points}
                        type="text"
                        onChange={(e) => {
                          const value = e.target.value;
                          this.setState({ points: value });
                        }}
                     />
                  </div>
                  <div className={Estyles.contentBody1Text}>1000积分兑换1元 输入积分数必须为整数</div>
              </div>
        </div>
        <div className={styles.bottomButton}>
          <div className={this.state.points && !isNaN(Number(this.state.points)) ? styles.clickLoginFormButtom :styles.loginFormButtom}
            onClick={() => {
              if(this.state.points && !isNaN(Number(this.state.points))) {
                alert('积分兑换不可逆，确定兑换？', '', [
                    { text: '确定',
                      onPress: () =>{
                        if(this.state.points) {
                          this.submitAction();
                        }
                      },
                      style: { backgroundColor: '#de3c46', color: '#fff' }
                    },
                    {
                      text: '取消',
                      onPress: () => {},
                      style: { backgroundColor: '#5b5b5b', color: '#fff' }
                    },
                  ])
                }
            }}
          >
             确 定 兑 换
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isFetching: state.HomePageReducer.get('isFetching'),
    userCaptial: state.HomePageReducer.get('userCaptial'),
  };
};

export default connect(mapStateToProps)(Exchange);
