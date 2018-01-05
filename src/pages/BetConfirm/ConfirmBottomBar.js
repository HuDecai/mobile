import React, { PureComponent } from 'react';
import { Toast, Modal } from 'antd-mobile';
import checkNumbers from '../../core/lottery/checkNumbers';
import countNumbers from '../../core/lottery/countNumbers';
import { push, goBack } from 'react-router-redux';
import { dispatch } from '../../store';

const styles = require('./ConfirmBottomBar.css');
const rightArrow = require('../../assets/images/lottery-bottom-right-arrow.png');
const alert = Modal.alert;
class LotteryBottomBar extends PureComponent {
  render() {
    console.log(this.props.expect);
    return (
      <div className={ this.props.exp > 0 ? styles.bottomBarActive : styles.bottomBar}>
        <div  className={styles.bottomBarLeft} style={{ fontSize: '4vw' }}>
           <div>合计注数：{this.props.exp} 注</div>
           <div style={{ marginTop: '1vw' }}>合计金额：{this.props.totalMoney}</div>
        </div>
        <div
          className={styles.bottomBarRight}
          onClick={() => {
            if (!this.props.exp) {
              Toast.info('号码有误,请检查并重新选号', 2);
            } else {
              if(this.props.totalMoney) {
                alert('友情提示：', <div><div>投注期数 <span style={{ color: '#de3c46'}}>{this.props.expect}</span></div> <div>总投注金额为 <span style={{ color: '#de3c46'}}>{this.props.totalMoney}</span></div></div>, [
                    { text: '确认投注', 
                      onPress: () =>{
                        this.props.submitAction();
                      },
                      style: { backgroundColor: '#de3c46', color: '#fff' }
                    },
                    {
                      text: '取消投注',
                      onPress: () => {},
                      style: { backgroundColor: '#5b5b5b', color: '#fff' }
                    },
                  ])
              } else {
                Toast.info('请填写投注金额', 2);
              }
            }
          }}
        >
          <img src={rightArrow} style={{ width: '5.8vw', marginRight: '1vw' }}/>
          去投注
        </div>
      </div>
    );
  }
}

export default LotteryBottomBar;
