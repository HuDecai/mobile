// 添加会员
import React, { PropTypes } from 'react';
import * as AgentCenterAction from '../../actions/AgentCenterAction';
import * as Astyles from './styles.css';
import { connect } from 'react-redux';
import * as styles from '../../assets/stylesheets/common.css';
import { push, goBack } from 'react-router-redux';
import { dispatch } from '../../store';
import CommonNavBar from '../CommonNavBar/';
const leftIcon = require('../../assets/images/login-back.png');
import Cookies from 'js-cookie';
import Loading from '../../core/decorators/Loading';
import { checkAppVersion } from '../../actions/LoginAction';

@Loading(props => props.isFetching)
class AgentLink extends React.PureComponent {
  constructor(props: Object) {
    super(props);
    this.state = {
      rebate: this.props.caiPiaoFandianMax,
      type: 0,
      hkWater: this.props.hongKongCaiPiaoFandianMax,
    };
  }
  componentWillMount() {
    // 根据登录用户获取返点列表范围 和 香港彩返点列表
    AgentCenterAction.updateCaipiaoFandian({ rebate: Cookies.get('rebate') });
    AgentCenterAction.updateHongKongFandian({ hkRebate: Cookies.get('hk6Rebate')});
    checkAppVersion();
  }
  componentWillReceiveProps(nextProps) {
    if(nextProps.caiPiaoFandianMax !== this.props.caiPiaoFandianMax) {
      this.state = {
        rebate: nextProps.caiPiaoFandianMax,
        type: 0,
        hkWater: nextProps.hongKongCaiPiaoFandianMax,
      };
    }
  }
  getLinkAction() {
    const rebate = this.state.rebate;
    const type = this.state.type;
    const hkWater = this.state.hkWater;
    const params = {
      rebate,
      type,
      hkWater,
    }
    if(!rebate && !hkWater || rebate == 100 && hkWater == 3.0) {
      AgentCenterAction.createNoTuiguangLink(params);
    }else {
      AgentCenterAction.createTuiguangLink(params);
    }
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
  render() {
    const { rebate, type, hkWater } = this.state;
    return (
      <div>
        <CommonNavBar
           headerTitle={'制作注册链接'}
           leftIcon={leftIcon}
           leftAction={() => { dispatch(goBack())}}
        />
        <div className={Astyles.passwordContent}>
            <div className={styles.formContent}>
               <div className={Astyles.formtext}>彩票返点</div>
               <select className={styles.selectStyle}
                 value={this.state.rebate}
                 onChange={(e) => this.setState({ rebate: e.target.value })}
               >
                   {this.showOption(this.props.caiPiaoFandian)}
               </select>
               <div className={Astyles.formtext}>香港彩返点</div>
               <select className={styles.selectStyle}
                 value={this.state.hkWater}
                 onChange={(e) => this.setState({ hkWater: e.target.value })}
               >
                   {this.showOption(this.props.hongKongCaiPiaoFandian)}
               </select>
               <div className={Astyles.formtext}>类型选择</div>
               <select
                  className={styles.selectStyle}
                  value={this.state.type}
                  onChange={(e) => this.setState({ type: e.target.value })}
               >
                  <option value={'0'}>会员</option>
                  <option value={'1'}>代理</option>
               </select>
            </div>
        </div>
        <div className={styles.bottomButton}>
          <div className={styles.clickLoginFormButtom}
            onClick={() => {
              this.getLinkAction();
            }}
          >
             生成二维码
          </div>
        </div>
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    isFetching: state.AgentReducer.get('isFetching'),
    caiPiaoFandian: state.AgentReducer.get('caiPiaoFandian'),
    hongKongCaiPiaoFandian: state.AgentReducer.get('hongKongCaiPiaoFandian'),
    caiPiaoFandianMax: state.AgentReducer.get('caiPiaoFandianMax'),
    hongKongCaiPiaoFandianMax: state.AgentReducer.get('hongKongCaiPiaoFandianMax'),
  };
};

export default connect(mapStateToProps)(AgentLink);
