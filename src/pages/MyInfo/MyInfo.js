// 组合所有组件  root component

import React, { PropTypes } from 'react';
import { Toast, List } from 'antd-mobile';
import * as HomePageAction from '../../actions/HomePageAction';
import * as LotteryAction from '../../actions/LotteryAction';
import * as styles from './styles.css';
import LeftIcon from '../../assets/images/myinfo-email.svg';
import Update from '../../assets/images/myinfo-update.svg';
const RightIcon = require('../../assets/images/login-kefu.png');
const userImg = require('../../assets/images/myinfo-touxiang.png');
const chongzhi = require('../../assets/images/myinfo-chongzhi.png');
const tixian = require('../../assets/images/myinfo-tixian.png');
const touzhu = require('../../assets/images/myinfo-touzhu.png');
const zhuihao = require('../../assets/images/myinfo-zhuihao.png');
const xianggangcai = require('../../assets/images/myinfo-xianggangcai.png');
const zijin = require('../../assets/images/myinfo-zijin.png');
const daili = require('../../assets/images/myinfo-daili.png');
import Duihuan from '../../assets/images/myinfo-duihuan.svg';
import { push } from 'react-router-redux';
import { dispatch } from '../../store';
import Cookies from 'js-cookie';
import moment from 'moment';
import Loading from '../../core/decorators/Loading';
import { checkAppVersion } from '../../actions/LoginAction';


@Loading(props => props.isFetching)
class MyInfo extends React.PureComponent {
  componentWillMount() {
    HomePageAction.getBaseInfo();
    HomePageAction.getUserCaptialInfo();
    // 获取今日投注记录
    LotteryAction.findUserBetList({ pageNo: 1, pageSize: 100, betTimeStart: moment().format('YYYY-MM-DD') });
    checkAppVersion();
  }
  render() {
    const userType = Cookies.get('type');
    const useMoney = this.props.userCaptial.get('useMoney');
    const points = this.props.userCaptial.get('points');
    const todayProfit = this.props.todayProfit;
    const infos=this.props.baseInfo;
      const usernames = Cookies.get('username');
      // const kflink=usernames?coustomServiceURL+'&info=userId%3D1%26name%3D'+usernames+'&s=1&enterurl='+${window.location.origin}+'/?#/index.me':coustomServiceURL+'&info=userId%3D1%26name%3D游客&s=1&enterurl='+${window.location.origin}+'/?#/login';
    const kflink = usernames ? `${coustomServiceURL}&info=userId%3D1%26name%3D${usernames}&s=1&enterurl=${window.location.origin}/mobile.html?index/me` : `${coustomServiceURL}&info=userId%3D1%26name%3D游客&s=1&enterurl=${window.location.origin}/mobile.html?login`

    if(!infos) return;
    const username = infos.user ? (infos.user.username ?  infos.user.username : '无名' ): '无名';
    const showTodayProfit = () => {
      const views = [];
      if(todayProfit >= 0) {
        views.push(<span style={{ color: '#de3c4b'}}>{todayProfit.toFixed(3)}</span>)
      }
      if(todayProfit && todayProfit < 0) {
        views.push(<span style={{ color: '#28a128'}}>{todayProfit.toFixed(3)}</span>)
      }
      return views;
    }
    return (
      <div>
         {/****navbar****/}
         <div className={styles.navBar}>
           <div><LeftIcon className={styles.leftImg} onClick={() => {dispatch(push('my-msg-list'))}} /></div>
           <div className={styles.rightImgs}>
              <img src={RightIcon} className={styles.RigthImg} onClick={() => {
                  Cookies.set('cc','');
                  // window.open(kflink);
                 // console.warn(kflink)
                  window.location.href = kflink;
              }}/>
              <Update className={styles.leftImg} onClick={() => {dispatch(push('personal-setting'))}} />
           </div>
         </div>
         <div className={styles.content}>
           {/*******用户信息*******/}
           <div className={styles.userInfo}>
               <div className={styles.userInfoLeft}>
                   <div><img src={userImg} className={styles.userInfoLeftImg} /></div>
                   <div>{username}</div>
               </div>
               <div className={styles.userInfoline} />
               <div className={styles.userInfoRigth}>
                   <div className={styles.userInfoRigthItem}><div style={{ fontSize: '3.5vw'}}>用户余额</div><div>￥{useMoney?useMoney.toFixed(3):0}</div></div>
                   <div className={styles.userInfoRigthItem}><div style={{ fontSize: '3.5vw'}}>累计积分</div><div>{points}</div></div>
                   <div className={styles.userInfoRigthItem}><div style={{ fontSize: '3.5vw'}}>今日盈亏</div><div>￥{showTodayProfit()}</div></div>
               </div>
           </div>

           {/*******用户操作1*******/}
           <div className={styles.userInfoContent}>
             <div className={styles.userInfoCard}
                onClick={() => {
                  dispatch(push('recharge'));
                }}
             >
               <div><img src={chongzhi} className={styles.userInfoCardImg} /></div>
               <div>充值</div>
             </div>
             <div className={styles.userInfoCard}
                 onClick={() => {
                   const hasSafePassword = Cookies.get('hasSafePassword');
                   if(hasSafePassword == 1) {
                     dispatch(push('set-money-password-prompt'));
                   }else {
                       if(infos.bank==0){
                           dispatch(push('bank-card-manage'));
                       }else{
                           dispatch(push('tixian'));
                       }

                   }
                 }}
             >
               <div><img src={tixian} className={styles.userInfoCardImg}/></div>
               <div>提现</div>
             </div>
             <div className={styles.userInfoCard}
               onClick={() => {
                 dispatch(push('exchange'));
               }}
             >
                 <Duihuan className={styles.userInfoCardImg} />
                 <div>兑换</div>
             </div>
           </div>
           {/*******用户操作2*******/}
           <div className={styles.userInfoContent2}>
               <List className="my-list">
                 <List.Item
                    key={1}
                    className={styles.ListCard}
                    thumb={<img src={touzhu} style={{ width: '6.7vw', height: '6.7vw'}}/>}
                    multipleLine
                    onClick={() => {
                      dispatch(push('bet-record'));
                    }}
                    arrow="horizontal"
                  >
                    <span className={styles.userInfoText}>投注记录</span>
                  </List.Item>
               </List>
               <List className="my-list">
                 <List.Item
                    key={2}
                    className={styles.ListCard}
                    thumb={<img src={zhuihao} style={{ width: '6.7vw', height: '6.7vw'}}/>}
                    multipleLine
                    onClick={() => {
                      dispatch(push('chase-recode'));
                    }}
                    arrow="horizontal"
                  >
                    <span className={styles.userInfoText}>追号记录</span>
                  </List.Item>
               </List>
               <List className="my-list">
                 <List.Item
                    key={3}
                    className={styles.ListCard}
                    thumb={<img src={xianggangcai} style={{ width: '6.7vw', height: '6.7vw'}}/>}
                    multipleLine
                    onClick={() => {
                      dispatch(push('HongKong-recode'));
                    }}
                    arrow="horizontal"
                  >
                    <span className={styles.userInfoText}>香港彩记录</span>
                  </List.Item>
               </List>
               <List className="my-list">
                 <List.Item
                    key={4}
                    className={styles.ListCard}
                    thumb={<img src={zijin} style={{ width: '6.7vw', height: '6.7vw'}}/>}
                    multipleLine
                    onClick={() => {
                      dispatch(push('fund-details'));
                    }}
                    arrow="horizontal"
                  >
                    <span className={styles.userInfoText}>资金明细</span>
                  </List.Item>
               </List>
                {(userType == 1 || userType == 2|| userType == 5) ?
                 <List className="my-list">
                   <List.Item
                      key={5}
                      className={styles.ListCard}
                      thumb={<img src={daili} style={{ width: '6.7vw', height: '6.7vw'}}/>}
                      multipleLine
                      onClick={() => {
                        dispatch(push('agent-center'));
                      }}
                      arrow="horizontal"
                    >
                      <span className={styles.userInfoText}>代理管理</span>
                    </List.Item>
                 </List> : <div /> }
           </div>
         </div>
      </div>
    );
  }
}

export default MyInfo;
