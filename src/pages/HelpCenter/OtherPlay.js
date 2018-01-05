// 组合所有组件  root component

import React, { PropTypes } from 'react';
import { Toast, List } from 'antd-mobile';
import CommonNavBar from '../CommonNavBar/';
import * as styles from './styles.css';
const leftIcon = require('../../assets/images/login-back.png');
import { push, goBack } from 'react-router-redux';
import { dispatch } from '../../store';
import Cookies from 'js-cookie';

class OtherPlay extends React.PureComponent {
  render() {
    return (
      <div>
          <CommonNavBar 
             headerTitle={'其他系列'}
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
              <div className={styles.playInfoItem1}>三星复式</div>
              <div className={styles.playInfoItem3}>百位,十位,个位中选择3个号码组成一注或多个号码，所选号码与开奖号码一致且顺序相同即为中奖。</div>
            </div>
            <div className={styles.playInfoContentItem}>
              <div className={styles.playInfoItem1}>三星</div>
              <div className={styles.playInfoItem1}>三星单式</div>
              <div className={styles.playInfoItem3}>手动输入3个号码组成一注或多个号码，所选号码与开奖号码位置一致且顺序相同即为中奖。</div>
            </div>
            <div className={styles.playInfoContentItem}>
              <div className={styles.playInfoItem1}/>
              <div className={styles.playInfoItem1}>三星组三</div>
              <div className={styles.playInfoItem3}>从0-9中选择一个至少2个号码组成一注或多个号码，所选号码与开奖号码形成组三形态即为中奖。</div>
            </div>
            <div className={styles.playInfoContentItem}>
              <div className={styles.playInfoItem1}/>
              <div className={styles.playInfoItem1}>三星组六</div>
              <div className={styles.playInfoItem3}>从0-9中选择一个至少3个号码组成一注或多个号码，所选号码与开奖号码形成组六形态即为中奖。</div>
            </div>
         </div>
         <div className={styles.playInfoContent}>
            <div className={styles.playInfoContentItem}>
              <div className={styles.playInfoItem1}/>
              <div className={styles.playInfoItem1}>前二复式</div>
              <div className={styles.playInfoItem3}>百位,十位中选择2个号码组成一注或多个号码，所选号码与开奖号码相同且顺序一致即为中奖。</div>
            </div>
            <div className={styles.playInfoContentItem}>
              <div className={styles.playInfoItem1}>前二</div>
              <div className={styles.playInfoItem1}>前二单式</div>
              <div className={styles.playInfoItem3}>手动输入一个2个号码组成一注或多个号码，所选号码与开奖号码相同且顺序一致即为中奖。</div>
            </div>
            <div className={styles.playInfoContentItem}>
              <div className={styles.playInfoItem1}/>
              <div className={styles.playInfoItem1}>前二组二</div>
              <div className={styles.playInfoItem3}>从0-9中选择至少2个号码组成一注或多个号码，所选号码与开奖号码中出现（顺序不限）即为中奖。</div>
            </div>
         </div>
         <div className={styles.playInfoContent}>
            <div className={styles.playInfoContentItem}>
              <div className={styles.playInfoItem1}/>
              <div className={styles.playInfoItem1}>后二复式</div>
              <div className={styles.playInfoItem3}>十位,个位中选择2个号码组成一注或多个号码，所选号码与开奖号码相同且顺序一致即为中奖。</div>
            </div>
            <div className={styles.playInfoContentItem}>
              <div className={styles.playInfoItem1}>后二</div>
              <div className={styles.playInfoItem1}>后二单式</div>
              <div className={styles.playInfoItem3}>手动输入一个2位数号码组成一注或多注号码,只要当前开奖结果与所选的号 码十位,个位相同且顺序一致,即为中奖。</div>
            </div>
            <div className={styles.playInfoContentItem}>
              <div className={styles.playInfoItem1}/>
              <div className={styles.playInfoItem1}>后二组二</div>
              <div className={styles.playInfoItem3}>从0-9中选择至少2个号码组成一注或多个号码，所选号码与开奖号码出现（顺序不限）即为中奖。</div>
            </div>
         </div>
         <div className={styles.playInfoContent}>
            <div className={styles.playInfoContentItem}>
              <div className={styles.playInfoItem1}>不定位胆</div>
              <div className={styles.playInfoItem1}>三星不定位</div>
              <div className={styles.playInfoItem3}>从0-9中选择1个号码或多个号码，所选号码与开奖号码一致（顺序不限）即为中奖。</div>
            </div>
         </div>
         <div className={styles.playInfoContent}>
            <div className={styles.playInfoContentItem}>
              <div className={styles.playInfoItem1}>定位胆</div>
              <div className={styles.playInfoItem1}>三星定位胆</div>
              <div className={styles.playInfoItem3}>百位,十位,个位任意位置选择1个号码或多个号码，所选号码与开奖号码位置相同即为中奖。</div>
            </div>
         </div>
         <div className={styles.playInfoContent}>
            <div className={styles.playInfoContentItem}>
              <div className={styles.playInfoItem1}/>
              <div className={styles.playInfoItem1}>三星和值</div>
              <div className={styles.playInfoItem3}>百位,十位,个位开奖号码相加总和为三星和值。</div>
            </div>
            <div className={styles.playInfoContentItem}>
              <div className={styles.playInfoItem1}>和值</div>
              <div className={styles.playInfoItem1}>前二和值</div>
              <div className={styles.playInfoItem3}>百位,十位开奖号码相加总和为前二和值。</div>
            </div>
            <div className={styles.playInfoContentItem}>
              <div className={styles.playInfoItem1}/>
              <div className={styles.playInfoItem1}>后二和值</div>
              <div className={styles.playInfoItem3}>十位,个位开奖号码相加总和为后二和值。</div>
            </div>
         </div>
      </div>
      </div>
    );
  }
}

export default OtherPlay;
