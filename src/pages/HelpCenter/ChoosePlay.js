// 组合所有组件  root component

import React, { PropTypes } from 'react';
import { Toast, List } from 'antd-mobile';
import CommonNavBar from '../CommonNavBar/';
import * as styles from './styles.css';
const leftIcon = require('../../assets/images/login-back.png');
import { push, goBack } from 'react-router-redux';
import { dispatch } from '../../store';
import Cookies from 'js-cookie';

class ChoosePlay extends React.PureComponent {
  render() {
    return (
      <div>
          <CommonNavBar 
             headerTitle={'11选5系列'}
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
              <div className={styles.playInfoItem1}/>
              <div className={styles.playInfoItem1}>一中一</div>
              <div className={styles.playInfoItem3}>从1-11中至少选择一个号码或多个号码,所选号码在开奖号码5个位置中出现一个即为中奖</div>
            </div>
            <div className={styles.playInfoContentItem}>
              <div className={styles.playInfoItem1}/>
              <div className={styles.playInfoItem1}>二中二</div>
              <div className={styles.playInfoItem3}>从1-11中至少选择二个号码多个号码,所选号码在开奖号码5个位置中出现二个即为中奖。</div>
            </div>
            <div className={styles.playInfoContentItem}>
              <div className={styles.playInfoItem1}/>
              <div className={styles.playInfoItem1}>三中三</div>
              <div className={styles.playInfoItem3}>从1-11中至少选择三个号码或多个号码，所选号码在开奖号码5个位置中出现三个即为中奖。</div>
            </div>
            <div className={styles.playInfoContentItem}>
              <div className={styles.playInfoItem1}>任选复式</div>
              <div className={styles.playInfoItem1}>四中四</div>
              <div className={styles.playInfoItem3}>从1-11中至少选择四个号码或多个号码，所选号码在开奖号码5个位置中出现4个即为中奖。</div>
            </div>
            <div className={styles.playInfoContentItem}>
              <div className={styles.playInfoItem1}/>
              <div className={styles.playInfoItem1}>五中五</div>
              <div className={styles.playInfoItem3}>从1-11中至少选择五个号码或多个号码，所选号码在开奖号码5个位置中出现五个即为中奖。</div>
            </div>
            <div className={styles.playInfoContentItem}>
              <div className={styles.playInfoItem1}/>
              <div className={styles.playInfoItem1}>六中五</div>
              <div className={styles.playInfoItem3}>从1-11中至少选择六个号码或多个号码，所选号码在开奖5个位置中出现五个即为中奖。</div>
            </div>
            <div className={styles.playInfoContentItem}>
              <div className={styles.playInfoItem1}/>
              <div className={styles.playInfoItem1}>七中五</div>
              <div className={styles.playInfoItem3}>从1-11中至少选择七个号码或多个号码，所选号码在开奖5个位置中出现五个即为中奖。</div>
            </div>
            <div className={styles.playInfoContentItem}>
              <div className={styles.playInfoItem1}/>
              <div className={styles.playInfoItem1}>八中五</div>
              <div className={styles.playInfoItem3}>从1-11中至少选择八个号码或多个号码，所选号码在开奖5个位置中出现五个即为中奖。</div>
            </div>
         </div>
         <div className={styles.playInfoContent}>
            <div className={styles.playInfoContentItem}>
              <div className={styles.playInfoItem1}/>
              <div className={styles.playInfoItem1}>直选复式</div>
              <div className={styles.playInfoItem3}>第一名,第二名,第三名中选择不重复的号码组成一注或多个号码，所选号码位置且顺序一致即为中奖。</div>
            </div>
            <div className={styles.playInfoContentItem}>
              <div className={styles.playInfoItem1}>前三</div>
              <div className={styles.playInfoItem1}>直选单式</div>
              <div className={styles.playInfoItem3}>手动输入第一名,第二名,第三名不重复的号码组成一注或多个号码，所选号码位置且顺序一致即为中奖。</div>
            </div>
            <div className={styles.playInfoContentItem}>
              <div className={styles.playInfoItem1}/>
              <div className={styles.playInfoItem1}>组选复式</div>
              <div className={styles.playInfoItem3}>从1-11中选择三个号码组成一注或多个号码，所选号码在前三位置出现（顺序不限）即为中奖。</div>
            </div>
            <div className={styles.playInfoContentItem}>
              <div className={styles.playInfoItem1}/>
              <div className={styles.playInfoItem1}>组选单式</div>
              <div className={styles.playInfoItem3}>手动输入不重复三个号码或多个号码，所选号码在前三位置初选（顺序不限）即为中奖。</div>
            </div>
         </div>
         <div className={styles.playInfoContent}>
            <div className={styles.playInfoContentItem}>
              <div className={styles.playInfoItem1}/>
              <div className={styles.playInfoItem1}>直选复式</div>
              <div className={styles.playInfoItem3}>第一名,第二名中选择不重复的号码组成一组或多个号码，所选号码位置且顺序一致即为中奖。</div>
            </div>
            <div className={styles.playInfoContentItem}>
              <div className={styles.playInfoItem1}>前二</div>
              <div className={styles.playInfoItem1}>直选单式</div>
              <div className={styles.playInfoItem3}>手动输入第一名,第二名,第三名不重复的号码组成一注或多个号码，所选号码位置且顺序一致即为中奖。</div>
            </div>
            <div className={styles.playInfoContentItem}>
              <div className={styles.playInfoItem1}/>
              <div className={styles.playInfoItem1}>组选复式</div>
              <div className={styles.playInfoItem3}>从1-11中选择二个号码组成一注或多个号码，所选位置在前二位置出现（顺序不限）即为中奖。</div>
            </div>
         </div>
         <div className={styles.playInfoContent}>
            <div className={styles.playInfoContentItem}>
              <div className={styles.playInfoItem1}>不定位胆</div>
              <div className={styles.playInfoItem1}>前三不定位</div>
              <div className={styles.playInfoItem3}>从1-11中至少选择一个号码或多个号码，所选号码在前三位置中出现即为中奖。</div>
            </div>
         </div>
         <div className={styles.playInfoContent}>
            <div className={styles.playInfoContentItem}>
              <div className={styles.playInfoItem1}>定位胆</div>
              <div className={styles.playInfoItem1}>前三定位胆</div>
              <div className={styles.playInfoItem3}>第一名,第二名,第三名中任意一个位置或多个位置选一个号码或多个号码，所选号码位置与开奖号码位置一直即为中奖。</div>
            </div>
         </div>
         <div className={styles.playInfoContent}>
            <div className={styles.playInfoContentItem}>
              <div className={styles.playInfoItem1}>猜中位</div>
              <div className={styles.playInfoItem1}>猜中位</div>
              <div className={styles.playInfoItem3}>从03至09中选择1个号码进行购买，所选号码与5个开奖号码按照大小顺序排列后的第3个号码相同，即为中奖。</div>
            </div>
         </div>
         <div className={styles.playInfoContent}>
            <div className={styles.playInfoContentItem}>
              <div className={styles.playInfoItem1}>定单双</div>
              <div className={styles.playInfoItem1}>定单双</div>
              <div className={styles.playInfoItem3}>从6种单双个数组合中选择1种组合，当期开奖号码的单双个数与所选单双组合一致，即为中奖。0单5双为一等奖。5单0双为二等奖。1单4双为三等奖。4单1双为四等奖。2单3双为五等奖。3单2双为六等奖。</div>
            </div>
         </div>
      </div>
      </div>
    );
  }
}

export default ChoosePlay;
