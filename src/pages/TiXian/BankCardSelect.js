// 设置新的密码
import React, { PropTypes } from 'react';
import { List } from 'antd-mobile';
import { connect } from 'react-redux';
import * as Tstyles from './styles.css';
import { push, goBack } from 'react-router-redux';
import { dispatch } from '../../store';
import * as BaseInfoAction from '../../actions/BaseInfoAction';
import CommonNavBar from '../CommonNavBar/';
const leftIcon = require('../../assets/images/login-back.png');
import Jianhang from '../../assets/images/jianhang.svg';
import Checked from '../../assets/images/checked.svg';
import Loading from '../../core/decorators/Loading';

@Loading(props => props.isFetching)
class BankCardSelect extends React.PureComponent {
  constructor(props: Object) {
    super(props);
    this.state = {
      type: 1,
    };
  }
  componentWillMount() {
    BaseInfoAction.getBankCard();
  }

    _imgIco(imgname){
        const imgStr=[];
        switch (imgname){
            case '中国工商银行':
                imgStr.push(<div><img src={require('../../assets/images/cooperative_icbc.png')} className={Tstyles.bankCardImg} /></div>)
                break;
            case '中国银行':
                imgStr.push(<div><img src={require('../../assets/images/cooperative_04.png')} className={Tstyles.bankCardImg} /></div>)
                break;
            case '中国建设银行':
                imgStr.push(<div><img src={require('../../assets/images/cooperative_07.png')} className={Tstyles.bankCardImg} /></div>)
                break;
            case '中国农业银行':
                imgStr.push(<div><img src={require('../../assets/images/cooperative_02.png')} className={Tstyles.bankCardImg} /></div>)
                break;
            case '兴业银行':
                imgStr.push(<div><img src={require('../../assets/images/cooperative_08.png')} className={Tstyles.bankCardImg} /></div>)
                break;
            case '招商银行':
                imgStr.push(<div><img src={require('../../assets/images/cooperative_10.png')} className={Tstyles.bankCardImg} /></div>)
                break;
            case '中国民生银行':
                imgStr.push(<div><img src={require('../../assets/images/cooperative_05.png')} className={Tstyles.bankCardImg} /></div>)
                break;
            case '邮政储蓄银行':
                imgStr.push(<div><img src={require('../../assets/images/cooperative_yz.png')} className={Tstyles.bankCardImg} /></div>)
                break;
            case '交通银行':
                imgStr.push(<div><img src={require('../../assets/images/cooperative_09.png')} className={Tstyles.bankCardImg} /></div>)
                break;
        }
        return imgStr;
    }

  showBankCard(data, id) {
    const views = [];
    if(data) {
      data.map(item => {
        views.push(
          <div className={Tstyles.bankCard}
             onClick={() => {
               BaseInfoAction.selectBankCard(item.toJS());
               dispatch(goBack());
             }}
          >
               <div className={Tstyles.bankCardLeft}>
                   {this._imgIco(item.get('attrName'))}
                   <div>
                       <div style={{ color: '#5b5b5b', fontSize: '5.3vw' }}>{item.get('attrName')}</div>
                       <div style={{ color: '#5b5b5b', fontSize: '4vw' }}>尾号{item.get('card') && item.get('card').slice(-4)} 储蓄卡</div>
                   </div>
               </div>
               {item.get('id') == id &&
               <div><Checked style={{ width: '6vw' }}/></div>}
          </div>
        )
      })
    }
    return views;
  }




  render() {
    let id = 0;
    try{
      id = this.props.selectBankCard.get('id') ? this.props.selectBankCard.get('id') : this.props.bankCardList.toJS()[0].id;
    }catch(e){
    }
    return (
      <div>
        <div>   
          <CommonNavBar 
             headerTitle={'选择银行卡'}
             leftIcon={leftIcon}
             leftAction={() => { dispatch(goBack())}}
          />
          <div className={Tstyles.formContent}>
             {this.showBankCard(this.props.bankCardList, id)}
          </div> 
        </div>  
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isFetching: state.BaseInfoReducer.get('isFetching'),
    selectBankCard: state.BaseInfoReducer.get('selectBankCard'),
    bankCardList: state.BaseInfoReducer.get('bankCardList'),
  };
};

export default connect(mapStateToProps)(BankCardSelect);

