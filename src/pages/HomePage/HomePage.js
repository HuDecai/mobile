import React from 'react';
import { Carousel } from 'antd-mobile';
import * as HomePageAction from '../../actions/HomePageAction';
import * as MsgAction from '../../actions/MsgAction';
import styles from './styles.css';
const CarouselImg = require('../../assets/images/mo1.png');
const CarouselImg1 = require('../../assets/images/mo2.png');
import HomePageGongGao from '../../components/HomePageGongGao/';
import HomePageUserInfo from '../../components/HomePageUserInfo/';
import HomePageLotterSelect from '../../components/HomePageLotterSelect/';
// import Loading from '../../core/decorators/Loading';
import { checkAppVersion } from '../../actions/LoginAction';

// @Loading(props => props.isFetching)
class HomePage extends React.PureComponent {
  componentWillMount() {
    checkAppVersion();
    // 获取首页公告
    MsgAction.getNotice({ signMessage: 3, pageNo: 1, pageSize: 11});
    HomePageAction.getUserCaptialInfo();
    if(!localStorage.loveLotteryIds) {
      localStorage.loveLotteryIds = JSON.stringify([2,4,7,14,20,25]);
    }
  }
  render() {
    const imgArr = [CarouselImg, CarouselImg1];
    return (
      <div className={styles.content}>
         {/****轮播***/}
         <div style={{ width: '100vw', height: '51.5vw' }}>
           <Carousel
               className="my-carousel"
               autoplay
               infinite
               selectedIndex={1}
               swipeSpeed={35}
             >
               {imgArr.map((item,key) => (
                 <a key={key}>
                   <img
                     src={item}
                     style={{ width: '100vw' }}
                   />
                 </a>
               ))}
             </Carousel>
           </div>
           {/**消息**/}
           <HomePageGongGao noticeList={this.props.noticeList} />
           {/**用户账户信息**/}
           <HomePageUserInfo userCaptial={this.props.userCaptial} />
           {/**彩种选择**/}
           <HomePageLotterSelect
              loveLotteryIds={localStorage.loveLotteryIds}
              allLotterys={this.props.allLotterys}
           />
      </div>
    )
  }
}

export default HomePage;
