import React from 'react';
import styles from './styles.css';
import Immutable from 'immutable';
import { push } from 'react-router-redux';
import { dispatch } from '../../store';
const lotteryImg = require('../../assets/images/home-pages-lottery.png');
const lotteryImgs = require('../../assets/images/home-pages-lotterys.png');
import Zidingyi from '../../assets/images/home-page-zidingyi.svg';

class HomePageLotterySelect extends React.PureComponent {
  render() {
    const showLotteryList = (loveLotteryIds) => {
      const views = [];
      if(loveLotteryIds) {
        this.props.allLotterys.map((item, key) => {
          if(loveLotteryIds.indexOf(item.get('lId')) !== -1) {
            views.push(
              <div key={item.get('lId')} className={styles.imgCard}
                  onClick={() => {
                      dispatch(push(`/lottery/${item.get('lId')}`));
                  }}
              >
                  <img src={item.get('url')} className={styles.imgStyle}/>
              </div>
            );
          }
        })
      }
      return views;
    }
    return (
      <div>
         <div className={styles.lotteryTitle}>
           <div className={styles.lotteryTitleLeft}>
             <img src={lotteryImg} style={{ width: '5.3vw', marginRight: '1vw' }}/>
             <div style={{ fontWeight: 'bold' }}>热门彩种</div>
           </div>
           <div className={styles.lotteryTitleRigth}
              onClick={() => {
                dispatch(push('home-page-custom'));
              }}
           >
             <div><Zidingyi style={{ width: '4vw', height: '3.7vw' }}/></div>
             <div>自定义</div>
           </div>
         </div>
         <div className={styles.lotteryContent}>
             {showLotteryList(JSON.parse(this.props.loveLotteryIds))}
         </div>
      </div>
    );
  }
}

export default HomePageLotterySelect;
