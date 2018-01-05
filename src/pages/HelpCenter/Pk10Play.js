// 组合所有组件  root component

import React, { PropTypes } from 'react';
import { Toast, List } from 'antd-mobile';
import CommonNavBar from '../CommonNavBar/';
import * as styles from './styles.css';
const leftIcon = require('../../assets/images/login-back.png');
import { push, goBack } from 'react-router-redux';
import { dispatch } from '../../store';
import Cookies from 'js-cookie';

class Pk10Play extends React.PureComponent {
  render() {
    return (
      <div>
          <CommonNavBar 
             headerTitle={'PK10系列'}
             leftIcon={leftIcon}
             leftAction={() => { dispatch(goBack())}}
          />
          <div className={styles.helpContent}>
       <div className={styles.playInfoTitle}>
          <div className={styles.playInfoItem1}>玩法组</div>
          <div className={styles.playInfoItem1}>玩法</div>
          <div className={styles.playInfoItem2}>玩法说明</div>
       </div>
       <div className={styles.playInfoContent}>
          <div className={styles.playInfoContentItem}>
            <div className={styles.playInfoItem1}>猜冠军</div>
            <div className={styles.playInfoItem1}>冠军复式</div>
            <div className={styles.playInfoItem3}>猜开奖号码的第一位。由1到10中选选择一个号码进行投注，若投注号码与开奖号码的第一位一致， 即为中奖。</div>
          </div>
       </div>
       <div className={styles.playInfoContent}>
          <div className={styles.playInfoContentItem}>
            <div className={styles.playInfoItem1}>猜冠亚军</div>
            <div className={styles.playInfoItem1}>前二复式</div>
            <div className={styles.playInfoItem3}>冠军,亚军分别选一个号码组成一注或多个号码,所选号码与开奖号码一致且顺序一致即为中奖。</div>
          </div>
          <div className={styles.playInfoContentItem}>
            <div className={styles.playInfoItem1} />
            <div className={styles.playInfoItem1}>前二单式</div>
            <div className={styles.playInfoItem3}>手动输入二个号码组成一注或多个号码,所选号码与开奖号码冠军,亚军位置相同且顺序一样即为中奖。</div>
          </div>
       </div>
       <div className={styles.playInfoContent}>
          <div className={styles.playInfoContentItem}>
            <div className={styles.playInfoItem1}>猜前三名</div>
            <div className={styles.playInfoItem1}>前三复式</div>
            <div className={styles.playInfoItem3}>冠军,亚军,第三名分别选一个号码组成一注或多个号码,所选号码与开奖号码一致且顺序一致即为中奖。</div>
          </div>
          <div className={styles.playInfoContentItem}>
            <div className={styles.playInfoItem1}/>
            <div className={styles.playInfoItem1}>前三单式</div>
            <div className={styles.playInfoItem3}>手动输入三个号码组成一注或多个号码,所选号码与开奖号码冠军,亚军,第三名位置相同且顺序一致即为中奖。</div>
          </div>
       </div>
       <div className={styles.playInfoContent}>
          <div className={styles.playInfoContentItem}>
            <div className={styles.playInfoItem1}>猜前四名</div>
            <div className={styles.playInfoItem1}>前四复式</div>
            <div className={styles.playInfoItem3}>冠军,亚军,第三名,第四名分别选择一个号码组成一注或多个号码,所选号码与开奖号码相同且顺序一致即为中奖。</div>
          </div>
          <div className={styles.playInfoContentItem}>
            <div className={styles.playInfoItem1}/>
            <div className={styles.playInfoItem1}>前四单式</div>
            <div className={styles.playInfoItem3}>手动输入四个号码组成一注或多个号码，所选号码与开奖号码冠军,亚军,第三名,第四名位置相同且顺序一致,即为中奖</div>
          </div>
       </div>
       <div className={styles.playInfoContent}>
          <div className={styles.playInfoContentItem}>
            <div className={styles.playInfoItem1}>定位胆</div>
            <div className={styles.playInfoItem1}>前五定位胆</div>
            <div className={styles.playInfoItem3}>冠军,亚军,第三名,第四名,第五名中任意选择一个位置或多个位置选出一个号码或多个号码,所选位置号码和开奖位置号码相同即为中奖。</div>
          </div>
          <div className={styles.playInfoContentItem}>
            <div className={styles.playInfoItem1}/>
            <div className={styles.playInfoItem1}>后五定位胆</div>
            <div className={styles.playInfoItem3}>第六名,第七名,第八名,第九名,第十名中任意选择一个位置或多个号码选出一个号码或多个号码,所选位置号码和开奖位置号码相同即为中奖。</div>
          </div>
       </div>
       <div className={styles.playInfoContent}>
          <div className={styles.playInfoContentItem}>
            <div className={styles.playInfoItem1}>和值</div>
            <div className={styles.playInfoItem1}>冠亚和值</div>
            <div className={styles.playInfoItem3}>冠军,亚军开奖号码相加总和为冠亚和值,所选和值号码与开奖号码的冠军,亚军相加总和一致即为中奖。</div>
          </div>
       </div>
       <div className={styles.playInfoContent}>
          <div className={styles.playInfoContentItem}>
            <div className={styles.playInfoItem1}/>
            <div className={styles.playInfoItem1}>1vs10龙虎</div>
            <div className={styles.playInfoItem3}>第一名和第十名开奖号码比大小,第一名号码大第十名号码为“龙”,第一名号码小第十名号码为“虎”,所选形态与开奖号码形态一致即为中奖。</div>
          </div>
          <div className={styles.playInfoContentItem}>
            <div className={styles.playInfoItem1}/>
            <div className={styles.playInfoItem1}>2vs9龙虎</div>
            <div className={styles.playInfoItem3}>第二名和第九名开奖号码比大小,第二名号码大第九名号码为“龙”,第二名号码小第九名号码为“虎”,所选形态与开奖号码形态一致即为中奖。</div>
          </div>
          <div className={styles.playInfoContentItem}>
            <div className={styles.playInfoItem1}>龙虎</div>
            <div className={styles.playInfoItem1}>3vs8龙虎</div>
            <div className={styles.playInfoItem3}>第三名和第八名开奖号码比大小,第三名号码大第八名号码为“龙”,第三名号码小第八名号码为“虎”,所选号码与开奖号码形态一致即为中奖。</div>
          </div>
          <div className={styles.playInfoContentItem}>
            <div className={styles.playInfoItem1}/>
            <div className={styles.playInfoItem1}>4vs7龙虎</div>
            <div className={styles.playInfoItem3}>第四名和第七名开奖号码比大小,第四名号码比第七名号码大为“龙”,第四名号码比第七名号码小为“虎”,所选号码与开奖号码形态一致即为中奖。</div>
          </div>
          <div className={styles.playInfoContentItem}>
            <div className={styles.playInfoItem1}/>
            <div className={styles.playInfoItem1}>5vs6龙虎</div>
            <div className={styles.playInfoItem3}>第五名和第六名开奖号码比大小,第五名号码比第七名号码大为“龙”,第五名号码比第七名号码小为“虎”,所选号码与开奖号码形态一致即为中奖。</div>
          </div>
       </div>
    </div>
      </div>
    );
  }
}

export default Pk10Play;
