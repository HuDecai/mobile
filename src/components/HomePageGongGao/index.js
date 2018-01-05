import React from 'react';
import { Carousel } from 'antd-mobile';
import styles from './styles.css';
import { push } from 'react-router-redux';
import { dispatch } from '../../store';
const notice = require('../../assets/images/home-news.png');
import Immutable from 'immutable';

class HomePageGongGao extends React.PureComponent {
  render() {
    const noticeList = this.props.noticeList;
    const showNotic = () => {
      const views = [];
      if(noticeList) {
        noticeList.map((item, key) => {
          views.push(
            <div key={key} className={styles.noticList}>
               {item.get('title')}
            </div>
          );
        })
      }
      return views;
    }
    return (
      <div className={styles.carouselBottom}>
         <div className={styles.container}>
           <img src={notice} style={{ width: '10vw', height: '5vw' }}/>
           <div className={styles.litBox}>
             <Carousel className="my-carousel"
                vertical
                dots={false}
                dragging={false}
                swiping={false}
                autoplay
                infinite
                style={{ height: '5vw', marginTop: '0.5vw' }}
              >
                {showNotic()}
              </Carousel>
           </div>
         </div>
         <div
           className={styles.lotteryTitleRigth}
           onClick={() => {
             dispatch(push('system-msg-list'));
           }}
         >更多</div>
      </div>
    );
  }
}

export default HomePageGongGao;
