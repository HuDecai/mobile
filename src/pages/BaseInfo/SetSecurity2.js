// 设置新的密码
import React, { PropTypes } from 'react';
import { Toast } from 'antd-mobile';
import { connect } from 'react-redux';
import * as BaseInfoAction from '../../actions/BaseInfoAction';
import * as Tstyles from './styles.css';
import * as styles from '../../assets/stylesheets/common.css';
import { push, goBack } from 'react-router-redux';
import { dispatch } from '../../store';
import CommonNavBar from '../CommonNavBar/';
const See = require('../../assets/images/login-see.png');
const NoSee = require('../../assets/images/login-no-see.png');
const leftIcon = require('../../assets/images/login-back.png');
import Loading from '../../core/decorators/Loading';
import Cookies from  'js-cookie';
import { checkAppVersion } from '../../actions/LoginAction';

@Loading(props => props.isFetching)
class SetSecurity2 extends React.PureComponent {
  constructor(props: Object) {
    super(props);
    this.state = {
      question1: '',
      answer1: '',
      question2: '',
      answer2: '',
    };
  }
  componentWillMount() {
    BaseInfoAction.getQuestionInfo();
    checkAppVersion();
  }
  showOption(options) {
    const view = [];
    if(options) {
      options.map((item, key) => {
        view.push(<option value={item.get('value')} key={key}>{item.get('name')}</option>)
      });
    }
    return view;
  }

    _renderQuestionChildren(){
        const {questionInfo} = this.props
        if (questionInfo && questionInfo.length > 0){
            return questionInfo.map((item,index)=>{
                return (<option value={item.question} key={item.question} >{item.question}</option>)
            })
        }
    }
  render() {
    const {question1, answer1, question2, answer2} = this.state;
    const isShow = () => {
      if(question1&&answer1&&question2&&answer2) {
        return true;
      }
      return false;
    }
    return (
      <div>
          <CommonNavBar
             headerTitle={'设置密保问题'}
             leftIcon={leftIcon}
             leftAction={() => { dispatch(goBack())}}
          />
          <div className={Tstyles.formContent1}>

              <div className={Tstyles.titleText} style={{ marginBottom: '2vw' }}>密保问题1：</div>
              <select className={styles.selectStyleNoAll}
                  value={this.state.question1}
                  onChange={(e) => {
                    if(e.target.value == this.state.question2) {
                      Toast.info('密保问题不能重复');
                      return false;
                    }
                    this.setState({
                       question1: e.target.value,
                    })
                  }}
              >
                  <option value="">请选择</option>
                  {this.props.questionInfo && this._renderQuestionChildren()}
              </select>

              <div className={Tstyles.titleText}>答案：</div>
              <div className={styles.loginName} >
                <div>
                  <input className={styles.inputTextNoTitle}
                    type="text"
                    value={this.state.answer1}
                    onChange={(e) => {
                      this.setState({
                         answer1: e.target.value,
                      })
                    }}
                  />
                  <label className={styles.borderStyle} ></label>
                </div>
              </div>

              <div className={Tstyles.titleText} style={{ marginBottom: '2vw' }}>密保问题2：</div>
              <select className={styles.selectStyleNoAll}
                value={this.state.question2}
                onChange={(e) => {
                  if(e.target.value == this.state.question1) {
                    Toast.info('密保问题不能重复');
                    return false;
                  }
                  this.setState({
                     question2: e.target.value,
                  })
                }}
              >
                    <option value="">请选择</option>
                    {this.props.questionInfo && this._renderQuestionChildren()}
              </select>

              <div className={Tstyles.titleText}>答案：</div>
              <div className={styles.loginName} >
                <div>
                  <input className={styles.inputTextNoTitle}
                    type="text"
                    value={this.state.answer2}
                    onChange={(e) => {
                      this.setState({
                         answer2: e.target.value,
                      })
                    }}
                  />
                  <label className={styles.borderStyle} ></label>
                </div>
              </div>

             <div className={styles.bottomButton}>
               <div className={isShow() ? styles.clickLoginFormButtom :styles.loginFormButtom}
                 onClick={() => {
                   if(isShow()) {
                     let param = {question1, answer1, question2, answer2};
                     let json_param = {questionJson:JSON.stringify(param)}
                     BaseInfoAction.updateQueInfo(json_param);
                   }
                 }}
               >
                   下 一 步
               </div>
             </div>
          </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isFetching: state.BaseInfoReducer.get('isFetching'),
    questionInfo: state.BaseInfoReducer.get('questionInfo'),
  };
};

export default connect(mapStateToProps)(SetSecurity2);
