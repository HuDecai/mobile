
import React, { PropTypes } from 'react';
import { Picker, Toast } from 'antd-mobile';
import { connect } from 'react-redux';
import * as BaseInfoAction from '../../actions/BaseInfoAction';
import * as HomePageAction from '../../actions/HomePageAction';
import * as Bstyles from './styles.css';
import * as styles from '../../assets/stylesheets/common.css';
import { push, goBack } from 'react-router-redux';
import { dispatch } from '../../store';
import CommonNavBar from '../CommonNavBar/';
const See = require('../../assets/images/login-see.png');
const NoSee = require('../../assets/images/login-no-see.png');
const leftIcon = require('../../assets/images/login-back.png');
import Loading from '../../core/decorators/Loading';
import { checkAppVersion } from '../../actions/LoginAction';

@Loading(props => props.isFetching)
class AddBankCard extends React.PureComponent {
  constructor(props: Object) {
    super(props);
    this.state = {
      type: 1,
      name: '',
      userCardBankId: '',
      cardNumber: '',
      userCardBankName: '',
      areaJson: '',
      safePassword: '',
      provinces: [],
      provinceLabel: '',
      provinceId: 0,
      cityLabel: '',
      cityId: 0,
    };
  }
  componentDidMount() {
    HomePageAction.getBaseInfo({});
    checkAppVersion();
  }
  componentWillMount() {
    this.__renderAddCardForm();
  }
  __renderAddCardForm() {
    const result = this.props.provinceAndCity && this.props.provinceAndCity.toJS();
    const provinces = result.filter(item => item.level === 1).map(item => ({ id: item.id, label: item.name, value: item.id }));
    this.setState({ provinces });
  }
  _handleSubmit(username) {
    // 判断是否为空
    if(!this.state.userCardBankId) {
      Toast.info('请选择银行', 2);
      return false;
    }
    if(!this.state.cardNumber || !this.state.cardNumber.trim()) {
      Toast.info('请填写银行卡号', 2);
      return false;
    }
    if(!this.state.provinceId) {
      Toast.info('请选择省份', 2);
      return false;
    }
    if(!this.state.cityId) {
      Toast.info('请选择城市', 2);
      return false;
    }
    if(!this.state.bankCardArea || !this.state.bankCardArea.trim()) {
      Toast.info('请填写开户行全称', 2);
      return false;
    }
    if(!this.state.safePassword) {
      Toast.info('请填写资金密码', 2);
      return false;
    }
    const str = {[this.state.provinceId]:this.state.provinceLabel,[this.state.cityId]:this.state.cityLabel};
    const params = {
        userCardBankId: this.state.userCardBankId,
        bankCardArea: this.state.bankCardArea,
        cardNumber: this.state.cardNumber,
        userCardBankName: this.state.userCardBankName,
        areaJson: JSON.stringify(str),
        safePassword: this.state.safePassword,
    };
    if(username.userRealName){
        BaseInfoAction.addBankCard({...params, name: username.userRealName,});
    }else{
        BaseInfoAction.addBankCard({...params, name: this.state.name,});
    }

  }
  showOption(data) {
    const view = [];
    if(data) {
      data.map((item) => {
        view.push({
          label: item.get('name'),
          value: `${item.get('value')}-${item.get('name')}`,
        })
      })
    }
    return view;
  }
  showOptionCity(data) {
    const view = [];
    if(data) {
      data.map((item) => {
        view.push({
          value: `${item.id}-${item.label}`,
          label: item.label,
        })
      })
    }
    return view;
  }
  showOptionCity2() {
    const result = this.props.provinceAndCity && this.props.provinceAndCity.toJS();
    const data = [];
    if(result) {
      result.map((item) => {
        if(item.pid && this.state.provinceId && item.pid == this.state.provinceId) {
            data.push({
              value: `${item.id}-${item.name}`,
              label: item.name
            })
        }
      })
    }
    return data;
  }
    _nameInput(str){
        return (
            str ? <div><input className={`${styles.inputTextNoTitle} ${Bstyles.borderStylebg}`}
                       type="text"
                       value={str}
                       disabled="true"
            /><label className={`${styles.borderStyle} ${Bstyles.borderStylebg}`} ></label></div> :<div><input className={styles.inputTextNoTitle}
                        type="text"
                        value={this.state.name}
                        onChange={(e) => {
                            const value = e.target.value;
                            this.setState({ name: value });
                        }}
            /><label className={`${styles.borderStyle}`} ></label></div>
        );
    }
  render() {
    const users=this.props.baseInfo.user||{};
    if(!users) return;
    return (
      <div>
          <CommonNavBar
             headerTitle={'添加银行卡'}
             leftIcon={leftIcon}
             leftAction={() => { dispatch(goBack())}}
          />
          <div className={Bstyles.bankContent}>
            <div className={Bstyles.titleText}>持卡人姓名</div>
            <div className={styles.loginName} >
                  {this._nameInput(users.userRealName)}
            </div>

            <div className={Bstyles.titleText}>选择银行</div>
            <Picker
              data={[this.showOption(this.props.bankList)]}
              title="选择银行"
              cascade={false}
              value={this.state.userCardBankId ? [`${this.state.userCardBankId}-${this.state.userCardBankName}`] : []}
              onChange={(e) => {
                this.setState({
                   userCardBankId: e[0].split('-')[0],
                   userCardBankName: e[0].split('-')[1],
                })
              }}
              col={1}
            >
              <div className={styles.selectStyleNoAll2}>{this.state.userCardBankName || '请选择银行'}</div>
            </Picker>

            <div className={Bstyles.titleText}>输入卡号</div>
            <div className={styles.loginName}>
              <div>
                <input className={styles.inputTextNoTitle}
                  type="text"
                  value={this.state.cardNumber}
                  onChange={(e) => {
                    const value = e.target.value;
                    this.setState({ cardNumber: value });
                  }}
                />
                <label className={styles.borderStyle} ></label>
              </div>
            </div>

            <div className={Bstyles.titleText}>开户行地区</div>
            <div className={Bstyles.kaihuhang}>
              <Picker
                data={[this.showOptionCity(this.state.provinces)]}
                title="选择省份"
                cascade={false}
                value={this.state.provinceId ? [`${this.state.provinceId}-${this.state.provinceLabel}`] : []}
                onChange={(e) => {
                  this.setState({
                    provinceLabel: e[0].split('-')[1],
                    provinceId: e[0].split('-')[0],
                    cityLabel: '',
                    cityId: 0,
                  })
                }}
                col={1}
              >
                <div className={styles.selectStyleSmall}>{this.state.provinceLabel || '请选择'}</div>
              </Picker>

              <Picker
                data={[this.showOptionCity2()]}
                value={this.state.cityId? [`${this.state.cityId}-${this.state.cityLabel}`] : []}
                title="选择城市"
                cascade={false}
                onChange={(e) => {
                  this.setState({
                    cityLabel: e[0].split('-')[1],
                    cityId: e[0].split('-')[0],
                  })
                }}
                col={1}
              >
                <div className={styles.selectStyleSmall}>{this.state.cityLabel || '请选择'}</div>
              </Picker>
            </div>

            <div className={Bstyles.titleText}>开户行全称</div>
            <div className={styles.loginName} >
              <div>
                <input  className={styles.inputTextNoTitle}
                  type="text"
                  value={this.state.bankCardArea}
                  onChange={(e) => {
                    const value = e.target.value;
                    this.setState({ bankCardArea: value });
                  }}
                />
                <label className={styles.borderStyle} ></label>
              </div>
            </div>

             <div className={Bstyles.titleText}>资金密码</div>
             <div className={styles.loginName} >
               <div>
                 <input type={this.state.type ? 'password' : 'text'} className={styles.inputTextNoTitle}
                   value={this.state.safePassword}
                   onChange={(e) => {
                     const value = e.target.value;
                     this.setState({ safePassword: value });
                   }}
                 />
                 <label className={styles.borderStyle} ></label>
               </div>
               <div>
                 <img src={this.state.type ? NoSee : See}
                    onClick={() => {
                      const type = this.state.type;
                      this.setState({ type: !type });
                    }}
                    className={styles.passwordSee}
                 />
               </div>
             </div>

             <div className={`${styles.clickLoginFormButtom} ${Bstyles.clickLoginFormButtom}`}
               onClick={() => {
                 this._handleSubmit(users);
               }}
             >
                绑 定 卡 片
             </div>
          </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isFetching: state.BaseInfoReducer.get('isFetching'),
    bankList: state.BaseInfoReducer.get('bankList'),
    provinceAndCity: state.BaseInfoReducer.get('provinceAndCity'),
    baseInfo: state.HomePageReducer.get('baseInfo'),
  };
};

export default connect(mapStateToProps)(AddBankCard);
