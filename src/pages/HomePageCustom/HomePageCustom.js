import React from 'react';
import { Toast } from 'antd-mobile';
import styles from './styles.css';
import Immutable from 'immutable';
import { push, goBack } from 'react-router-redux';
import { dispatch } from '../../store';
const leftIcon = require('../../assets/images/login-back.png');
import MsgHeader from '../../pages/MyMsg/components/MsgHeader';
import AddLottery from '../../assets/images/add-lottery.svg';
import DeleteLottery from '../../assets/images/delete-lottery.svg';
import * as HomePageAction from '../../actions/HomePageAction';

class HomePageCustom extends React.PureComponent {
  constructor(props: Object) {
    super(props);
    this.state = {
      loveLotteryIds: JSON.parse(localStorage.loveLotteryIds),
    };
  }
  render() {
    const showLotteryImg = (allLotterys) => {
      const views = [];
      if(allLotterys) {
        allLotterys.map((item) => {
          const loveLotteryIds = this.state.loveLotteryIds;
          console.log(loveLotteryIds);
          if(loveLotteryIds.indexOf(item.get('lId')) == -1) {
            views.push(
              <div key={item.get('lId')} className={styles.imgCard}>
                  <AddLottery className={styles.iconStyle} 
                      onClick={() => {
                          if(loveLotteryIds.length >= 6) {
                            Toast.info('最多只能添加6个', 2);
                            return false;
                          }
                          if(loveLotteryIds.indexOf(item.get('lId')) === -1) {
                                loveLotteryIds.push(item.get('lId'));
                          }
                          this.setState({ loveLotteryIds: [...loveLotteryIds]})
                      }}
                  />
                  <div><img src={item.get('url')} className={styles.imgStyle}/></div>
              </div>
            )
          }
        })
      }
      return views;
    }
    const showLoveLotteryImg = (loveLotteryIds) => {
      const views = [];
      if(loveLotteryIds) {
        this.props.allLotterys.map((item, key) => {
          if(loveLotteryIds.indexOf(item.get('lId')) !== -1) {
            views.push(
              <div key={item.get('lId')} className={styles.imgCard}>
                   <DeleteLottery  className={styles.iconStyle} 
                       onClick={() => {
                         if(loveLotteryIds.indexOf(item.get('lId')) !== -1) {
                              let newLoveLotteryIds = loveLotteryIds.filter(value => value !== item.get('lId'))
                              console.log(newLoveLotteryIds);
                              this.setState({ loveLotteryIds: [...newLoveLotteryIds]})
                          }
                       }}
                   />
                  <div><img src={item.get('url')} className={styles.imgStyle}/></div>
              </div>
            );
          }
        })
      }
      return views;
    }
    return (
      <div>
          <MsgHeader
             headerTitle={'自定义彩种'}
             leftIcon={leftIcon}
             leftAction={() => { dispatch(goBack())}}
             RigthText={'完成'}
             rightAction={() => { 
               // 存储到本地
               localStorage.loveLotteryIds = JSON.stringify(this.state.loveLotteryIds);
               dispatch(goBack())
             }}
          />
          <div className={styles.customContent}>
            <div>
                 <div className={styles.customText}>首页显示的彩种(最多6个)</div>
                 <div className={styles.lotteryContent1}>
                     {showLoveLotteryImg(this.state.loveLotteryIds)}
                 </div>
            </div>
            <div>
                 <div className={styles.customText}>请添加感兴趣的彩种</div>
                 <div className={styles.lotteryContent}>
                     {showLotteryImg(this.props.allLotterys)}
                 </div>
            </div>
          </div>
      </div>
    );
  }
}

export default HomePageCustom;
