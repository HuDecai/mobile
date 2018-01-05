import React, { PropTypes } from 'react';
import { Toast, Modal } from 'antd-mobile';
import { connect } from 'react-redux';
import * as BaseInfoAction from '../../actions/BaseInfoAction';
import CommonNavBar from '../CommonNavBar/';
import * as styles from './styles.css';
import * as commonStyles from '../../assets/stylesheets/common.css';
const leftIcon = require('../../assets/images/login-back.png');
const jianhang = require('../../assets/images/jianhang.png');
import { push, goBack } from 'react-router-redux';
import { dispatch } from '../../store';

const alert = Modal.alert;

class DeleteBankCard extends React.PureComponent {

    _imgIco(imgname){
        const imgStr=[];
        switch (imgname){
            case '中国工商银行':
                imgStr.push(<div><img src={require('../../assets/images/cooperative_icbc.png')} className={styles.bankCardImg} /></div>)
                break;
            case '中国银行':
                imgStr.push(<div><img src={require('../../assets/images/cooperative_04.png')} className={styles.bankCardImg} /></div>)
                break;
            case '中国建设银行':
                imgStr.push(<div><img src={require('../../assets/images/cooperative_07.png')} className={styles.bankCardImg} /></div>)
                break;
            case '中国农业银行':
                imgStr.push(<div><img src={require('../../assets/images/cooperative_02.png')} className={styles.bankCardImg} /></div>)
                break;
            case '兴业银行':
                imgStr.push(<div><img src={require('../../assets/images/cooperative_08.png')} className={styles.bankCardImg} /></div>)
                break;
            case '招商银行':
                imgStr.push(<div><img src={require('../../assets/images/cooperative_10.png')} className={styles.bankCardImg} /></div>)
                break;
            case '中国民生银行':
                imgStr.push(<div><img src={require('../../assets/images/cooperative_05.png')} className={styles.bankCardImg} /></div>)
                break;
            case '邮政储蓄银行':
                imgStr.push(<div><img src={require('../../assets/images/cooperative_yz.png')} className={styles.bankCardImg} /></div>)
                break;
            case '交通银行':
                imgStr.push(<div><img src={require('../../assets/images/cooperative_09.png')} className={styles.bankCardImg} /></div>)
                break;
        }
        return imgStr;
    }


  render() {

    return (
      <div>
          <CommonNavBar 
             headerTitle={'解绑卡片'}
             leftIcon={leftIcon}
             leftAction={() => { dispatch(goBack())}}
          />
          <div className={styles.bankContent}>
            <div className={styles.bankCard}>
                {this._imgIco(this.props.bankCard.get('attrName'))}
                <div className={styles.bankCardContent}>
                    <div className={styles.bankCardTop}>
                        <div className={styles.bankCardTopText1}>{this.props.bankCard.get('attrName')}</div>
                        <div className={styles.bankCardTopText2}>储蓄卡</div>
                    </div>
                    <div className={styles.bankCardTopText3}>{this.props.bankCard.get('shotCard')}</div>
                </div>
            </div>
          </div>
          
          <div className={styles.bottomBotton}>
            <div className={commonStyles.clickLoginFormButtom}
              onClick={() => {
                alert('确定解除绑定？', '', [
                    { text: '确定', 
                      onPress: () =>{
                        BaseInfoAction.deleteBankCard({ id: this.props.bankCard.get('id')})
                      },
                      style: { backgroundColor: '#de3c46', color: '#fff' }
                    },
                    {
                      text: '取消',
                      onPress: () => {},
                      style: { backgroundColor: '#5b5b5b', color: '#fff' }
                    },
                  ])
              }}
            >
               解 除 绑 定
            </div>
          </div>
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return {
     bankCard: state.BaseInfoReducer.get('bankCard'),
  };
};

export default connect(mapStateToProps)(DeleteBankCard);
