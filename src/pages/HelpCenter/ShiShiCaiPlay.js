// 组合所有组件  root component

import React, { PropTypes } from 'react';
import { Toast, List } from 'antd-mobile';
import CommonNavBar from '../CommonNavBar/';
import * as styles from './styles.css';
const leftIcon = require('../../assets/images/login-back.png');
import { push, goBack } from 'react-router-redux';
import { dispatch } from '../../store';
import Cookies from 'js-cookie';

class ShiShiCaiPlay extends React.PureComponent {
  render() {
    return (
      <div>
          <CommonNavBar 
             headerTitle={'时时彩'}
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
              <div className={styles.playInfoItem1}>五星复式</div>
              <div className={styles.playInfoItem3}>于万、千、百、十、个位分别自0~9选择1个号码、2个号码或多个号码，只要当期开奖结果与所选的号码相同且顺序一致时，即为中奖。</div>
            </div>
            <div className={styles.playInfoContentItem}>
              <div className={styles.playInfoItem1}/>
              <div className={styles.playInfoItem1}>五星单式</div>
              <div className={styles.playInfoItem3}>手动输入一个5位数号码组成一注，所选号码的万位、千位、百位、十位、个位与开奖号码相同，且顺序一致，即为中奖。</div>
            </div>
            <div className={styles.playInfoContentItem}>
              <div className={styles.playInfoItem1}/>
              <div className={styles.playInfoItem1}>组选120</div>
              <div className={styles.playInfoItem3}>从0-9中任意选择5个号码组成一注，所选号码与开奖号码的万位、千位、百位、十位、个位相同，顺序不限，即为中奖。</div>
            </div>
            <div className={styles.playInfoContentItem}>
              <div className={styles.playInfoItem1}>五星</div>
              <div className={styles.playInfoItem1}>组选60</div>
              <div className={styles.playInfoItem3}>选择1个二重号码和3个单号号码组成一注，所选的单号号码与开奖号码相同，且所选二重号码在开奖号码中出现了2次，即为中奖。</div>
            </div>
            <div className={styles.playInfoContentItem}>
              <div className={styles.playInfoItem1}/>
              <div className={styles.playInfoItem1}>组选30</div>
              <div className={styles.playInfoItem3}>选择2个二重号和1个单号号码组成一注，所选的单号号码与开奖号码相同，且所选的2个二重号码分别在开奖号码中出现了2次，即为中奖。</div>
            </div>
            <div className={styles.playInfoContentItem}>
              <div className={styles.playInfoItem1}/>
              <div className={styles.playInfoItem1}>组选20</div>
              <div className={styles.playInfoItem3}>选择1个三重号码和2个单号号码组成一注，所选的单号号码与开奖号码相同，且所选三重号码在开奖号码中出现了3次，即为中奖。</div>
            </div>
            <div className={styles.playInfoContentItem}>
              <div className={styles.playInfoItem1}/>
              <div className={styles.playInfoItem1}>组选10</div>
              <div className={styles.playInfoItem3}>选择1个三重号码和1个二重号码，所选三重号码在开奖号码中出现3次，并且所选二重号码在开奖号码中出现了2次，即为中奖。</div>
            </div>
            <div className={styles.playInfoContentItem}>
              <div className={styles.playInfoItem1}/>
              <div className={styles.playInfoItem1}>组选5</div>
              <div className={styles.playInfoItem3}>选择1个四重号码和1个单号号码组成一注，所选的单号号码与开奖号码相同，且所选四重号码在开奖号码中出现了4次，即为中奖</div>
            </div>
         </div>
         <div className={styles.playInfoContent}>
            <div className={styles.playInfoContentItem}>
              <div className={styles.playInfoItem1}/>
              <div className={styles.playInfoItem1}>前四复式</div>
              <div className={styles.playInfoItem3}>从万位、千位、百位、十位中选择一个4位数号码组成一注，所选号码与开奖号码相同，且顺序一致，即为中奖。</div>
            </div>
            <div className={styles.playInfoContentItem}>
              <div className={styles.playInfoItem1}>四星</div>
              <div className={styles.playInfoItem1}>前四单式</div>
              <div className={styles.playInfoItem3}>手动输入一个4位数号码组成一注，所选号码的千位、百位、十位、个位与开奖号码相同，且顺序一致，即为中奖。</div>
            </div>
            <div className={styles.playInfoContentItem}>
              <div className={styles.playInfoItem1}/>
              <div className={styles.playInfoItem1}>后四复式</div>
              <div className={styles.playInfoItem3}>从千位、百位、十位、个位中选择一个4位数号码组成一注，所选号码与开奖号码相同，且顺序一致，即为中奖。</div>
            </div>
            <div className={styles.playInfoContentItem}>
              <div className={styles.playInfoItem1}/>
              <div className={styles.playInfoItem1}>后四单式</div>
              <div className={styles.playInfoItem3}>手动输入一个4位数号码组成一注，所选号码的千位、百位、十位、个位与开奖号码相同，且顺序一致，即为中奖。</div>
            </div>
         </div>
         <div className={styles.playInfoContent}>
            <div className={styles.playInfoContentItem}>
              <div className={styles.playInfoItem1}/>
              <div className={styles.playInfoItem1}>前三复式</div>
              <div className={styles.playInfoItem3}>从万位、千位、百位中选择一个3位数号码组成一注，所选号码与开奖号码的前3位相同，且顺序一致，即为中奖。</div>
            </div>
            <div className={styles.playInfoContentItem}>
              <div className={styles.playInfoItem1}>前三</div>
              <div className={styles.playInfoItem1}>前三单式</div>
              <div className={styles.playInfoItem3}>手动输入一个3位数号码组成一注，所选号码的万位、千位、百位与开奖号码相同，且顺序一致，即为中奖。</div>
            </div>
            <div className={styles.playInfoContentItem}>
              <div className={styles.playInfoItem1}/>
              <div className={styles.playInfoItem1}>前三组三</div>
              <div className={styles.playInfoItem3}>从0-9中选择2个数字组成两注，所选号码与开奖号码的万位、千位、百位相同，且顺序不限，即为中奖。</div>
            </div>
            <div className={styles.playInfoContentItem}>
              <div className={styles.playInfoItem1}/>
              <div className={styles.playInfoItem1}>前三组六</div>
              <div className={styles.playInfoItem3}>从0-9中任意选择3个号码组成一注，所选号码与开奖号码的万位、千位、百位相同，顺序不限，即为中奖。</div>
            </div>
         </div>
         <div className={styles.playInfoContent}>
            <div className={styles.playInfoContentItem}>
              <div className={styles.playInfoItem1}/>
              <div className={styles.playInfoItem1}>中三复式</div>
              <div className={styles.playInfoItem3}>从千位、百位、十位中选择一个3位数号码组成一注，所选号码与开奖号码中3位相同，且顺序一致，即为中奖。</div>
            </div>
            <div className={styles.playInfoContentItem}>
              <div className={styles.playInfoItem1}>中三</div>
              <div className={styles.playInfoItem1}>中三单式</div>
              <div className={styles.playInfoItem3}>手动输入一个3位数号码组成一注，所选号码的千位、百位、十位与开奖号码相同，且顺序一致，即为中奖。</div>
            </div>
            <div className={styles.playInfoContentItem}>
              <div className={styles.playInfoItem1}/>
              <div className={styles.playInfoItem1}>中三组三</div>
              <div className={styles.playInfoItem3}>从0-9中选择2个数字组成两注，所选号码与开奖号码的千位、百位、十位相同，且顺序不限，即为中奖。</div>
            </div>
            <div className={styles.playInfoContentItem}>
              <div className={styles.playInfoItem1}/>
              <div className={styles.playInfoItem1}>中三组六</div>
              <div className={styles.playInfoItem3}>从0-9中任意选择3个号码组成一注，所选号码与开奖号码的千位、百位、十位相同，顺序不限，即为中奖。</div>
            </div>
         </div>
         <div className={styles.playInfoContent}>
            <div className={styles.playInfoContentItem}>
              <div className={styles.playInfoItem1}/>
              <div className={styles.playInfoItem1}>后三复式</div>
              <div className={styles.playInfoItem3}>从百位、十位、个位中选择一个3位数号码组成一注，所选号码与开奖号码后3位相同，且顺序一致，即为中奖。</div>
            </div>
            <div className={styles.playInfoContentItem}>
              <div className={styles.playInfoItem1}>后三</div>
              <div className={styles.playInfoItem1}>后三单式</div>
              <div className={styles.playInfoItem3}>手动输入一个3位数号码组成一注，所选号码的百位、十位、个位与开奖号码相同，且顺序一致，即为中奖。</div>
            </div>
            <div className={styles.playInfoContentItem}>
              <div className={styles.playInfoItem1}/>
              <div className={styles.playInfoItem1}>后三组三</div>
              <div className={styles.playInfoItem3}>从0-9中选择2个数字组成两注，所选号码与开奖号码的百位、十位、个位相同，且顺序不限，即为中奖。</div>
            </div>
            <div className={styles.playInfoContentItem}>
              <div className={styles.playInfoItem1}/>
              <div className={styles.playInfoItem1}>后三组六</div>
              <div className={styles.playInfoItem3}>从0-9中任意选择3个号码组成一注，所选号码与开奖号码的百位、十位、个位相同，顺序不限，即为中奖。</div>
            </div>
         </div>
         <div className={styles.playInfoContent}>
            <div className={styles.playInfoContentItem}>
              <div className={styles.playInfoItem1}/>
              <div className={styles.playInfoItem1}>前二复式</div>
              <div className={styles.playInfoItem3}>从万位、千位中选择一个2位数号码组成一注，所选号码与开奖号码的前2位相同，且顺序一致，即为中奖。</div>
            </div>
            <div className={styles.playInfoContentItem}>
              <div className={styles.playInfoItem1}>前二</div>
              <div className={styles.playInfoItem1}>前二单式</div>
              <div className={styles.playInfoItem3}>手动输入一个2位数号码组成一注，所选号码的万位、千位与开奖号码相同，且顺序一致，即为中奖。</div>
            </div>
            <div className={styles.playInfoContentItem}>
              <div className={styles.playInfoItem1}/>
              <div className={styles.playInfoItem1}>前二组二</div>
              <div className={styles.playInfoItem3}>从0-9中选2个号码组成一注，所选号码与开奖号码的万位、千位相同，顺序不限（不含对子号），即中奖</div>
            </div>
         </div>
         <div className={styles.playInfoContent}>
            <div className={styles.playInfoContentItem}>
              <div className={styles.playInfoItem1}/>
              <div className={styles.playInfoItem1}>后二复式</div>
              <div className={styles.playInfoItem3}>从十位、个位中选择一个2位数号码组成一注，所选号码与开奖号码的十位、个位相同，且顺序一致，即为中奖。</div>
            </div>
            <div className={styles.playInfoContentItem}>
              <div className={styles.playInfoItem1}>后二</div>
              <div className={styles.playInfoItem1}>后二单式</div>
              <div className={styles.playInfoItem3}>手动输入一个2位数号码组成一注，所选号码的十位、个位与开奖号码相同，且顺序一致，即为中奖。</div>
            </div>
            <div className={styles.playInfoContentItem}>
              <div className={styles.playInfoItem1}/>
              <div className={styles.playInfoItem1}>后二组二</div>
              <div className={styles.playInfoItem3}>从0-9中选2个号码组成一注，所选号码与开奖号码的十位、个位相同，顺序不限（不含对子号），即为中奖。</div>
            </div>
         </div>
         <div className={styles.playInfoContent}>
            <div className={styles.playInfoContentItem}>
              <div className={styles.playInfoItem1}/>
              <div className={styles.playInfoItem1}>前三一码</div>
              <div className={styles.playInfoItem3}>从0-9中选择1个号码，每注由1个号码组成，只要开奖号码的万位、千位、百位中包含所选号码，即为中奖。</div>
            </div>
            <div className={styles.playInfoContentItem}>
              <div className={styles.playInfoItem1}>不定位胆</div>
              <div className={styles.playInfoItem1}>中三一码</div>
              <div className={styles.playInfoItem3}>从0-9中选择1个号码，每注由1个号码组成，只要开奖号码的千位、百位、十位中包含所选号码，即为中奖。</div>
            </div>
            <div className={styles.playInfoContentItem}>
              <div className={styles.playInfoItem1}/>
              <div className={styles.playInfoItem1}>后三一码</div>
              <div className={styles.playInfoItem3}>从0-9中选择1个号码，每注由1个号码组成，只要开奖号码的百位、十位、个位中包含所选号码，即为中奖。</div>
            </div>
         </div>
         <div className={styles.playInfoContent}>
            <div className={styles.playInfoContentItem}>
              <div className={styles.playInfoItem1}>定位胆 </div>
              <div className={styles.playInfoItem1}>定位胆 </div>
              <div className={styles.playInfoItem3}> 从万位、千位、百位、十位、个位分别自0~9选择任意的1个或多个号码投注只要当期开奖结果与所选的号码相同且顺序一致时，即为中奖。</div>
            </div>
         </div>
         <div className={styles.playInfoContent}>
            <div className={styles.playInfoContentItem}>
              <div className={styles.playInfoItem1}/>
              <div className={styles.playInfoItem1}>前三和值</div>
              <div className={styles.playInfoItem3}>所选数值等于开奖号码的万位、千位、百位三个数字相加之和，即为中奖。</div>
            </div>
            <div className={styles.playInfoContentItem}>
              <div className={styles.playInfoItem1}>和值 </div>
              <div className={styles.playInfoItem1}>中三和值</div>
              <div className={styles.playInfoItem3}> 所选数值等于开奖号码的千位、百位、十位三个数字相加之和，即为中奖。</div>
            </div>
            <div className={styles.playInfoContentItem}>
              <div className={styles.playInfoItem1}/>
              <div className={styles.playInfoItem1}>后三和值</div>
              <div className={styles.playInfoItem3}>所选数值等于开奖号码的百位、十位、个位三个数字相加之和，即为中奖。</div>
            </div>
            <div className={styles.playInfoContentItem}>
              <div className={styles.playInfoItem1}/>
              <div className={styles.playInfoItem1}>前二和值</div>
              <div className={styles.playInfoItem3}>所选数值等于开奖号码的万位、千位二个数字相加之和，即为中奖</div>
            </div>
            <div className={styles.playInfoContentItem}>
              <div className={styles.playInfoItem1}/>
              <div className={styles.playInfoItem1}>后二和值</div>
              <div className={styles.playInfoItem3}>所选数值等于开奖号码的十位、个位二个数字相加之和，即为中奖</div>
            </div>
         </div>
         <div className={styles.playInfoContent}>
            <div className={styles.playInfoContentItem}>
              <div className={styles.playInfoItem1}/>
              <div className={styles.playInfoItem1}>万千龙虎</div>
              <div className={styles.playInfoItem3}>根据万位、千位开奖号码比大小，万位大于千位为龙，万位小于千位为虎，号码相同则为和。所选形态与开奖号码形态一致即为中奖。</div>
            </div>
            <div className={styles.playInfoContentItem}>
              <div className={styles.playInfoItem1}/>
              <div className={styles.playInfoItem1}>万百龙虎</div>
              <div className={styles.playInfoItem3}>根据万位、百位开奖号码比大小，万位大于百位为龙，万位小于百位为虎，号码相同则为和。所选形态与开奖号码形态一致即为中奖。</div>
            </div>
            <div className={styles.playInfoContentItem}>
              <div className={styles.playInfoItem1}/>
              <div className={styles.playInfoItem1}>万十龙虎</div>
              <div className={styles.playInfoItem3}>根据万位、十位开奖号码比大小，万位大于十位为龙，万位小于十位为虎，号码相同则为和。所选形态与开奖号码形态一致即为中奖。</div>
            </div>
            <div className={styles.playInfoContentItem}>
              <div className={styles.playInfoItem1}/>
              <div className={styles.playInfoItem1}>万个龙虎</div>
              <div className={styles.playInfoItem3}>根据万位、个位开奖号码比大小，万位大于个位为龙，万位小于个位为虎，号码相同则为和。所选形态与开奖号码形态一致即为中奖。</div>
            </div>
            <div className={styles.playInfoContentItem}>
              <div className={styles.playInfoItem1}>龙虎</div>
              <div className={styles.playInfoItem1}>千百龙虎</div>
              <div className={styles.playInfoItem3}>根据千位、百位开奖号码比大小，千位大于百位为龙，千位小于百位为虎，号码相同则为和。所选形态与开奖号码形态一致即为中奖。</div>
            </div>
            <div className={styles.playInfoContentItem}>
              <div className={styles.playInfoItem1}/>
              <div className={styles.playInfoItem1}>千十龙虎</div>
              <div className={styles.playInfoItem3}>根据千位、十位开奖号码比大小，千位大于十位为龙，千位小于十位为虎，号码相同则为和。所选形态与开奖号码形态一致即为中奖。</div>
            </div>
            <div className={styles.playInfoContentItem}>
              <div className={styles.playInfoItem1}/>
              <div className={styles.playInfoItem1}>千个龙虎</div>
              <div className={styles.playInfoItem3}>根据千位、个位开奖号码比大小，千位大于个位为龙，千位小于个位为虎，号码相同则为和。所选形态与开奖号码形态一致即为中奖。</div>
            </div>
            <div className={styles.playInfoContentItem}>
              <div className={styles.playInfoItem1}/>
              <div className={styles.playInfoItem1}>百十龙虎</div>
              <div className={styles.playInfoItem3}>根据百位、十位开奖号码比大小，百位大于十位为龙，百位小于十位为虎，号码相同则为和。所选形态与开奖号码形态一致即为中奖。</div>
            </div>
            <div className={styles.playInfoContentItem}>
              <div className={styles.playInfoItem1}/>
              <div className={styles.playInfoItem1}>百个龙虎</div>
              <div className={styles.playInfoItem3}>根据百位、个位开奖号码比大小，百位大于个位为龙，百位小于个位为虎，号码相同则为和。所选形态与开奖号码形态一致即为中奖。</div>
            </div>
            <div className={styles.playInfoContentItem}>
              <div className={styles.playInfoItem1}/>
              <div className={styles.playInfoItem1}>十个龙虎</div>
              <div className={styles.playInfoItem3}>根据十位、个位开奖号码比大小，十位大于个位为龙，十位小于个位为虎，号码相同则为和。所选形态与开奖号码形态一致即为中奖。</div>
            </div>
         </div>
      </div>
      </div>
    );
  }
}

export default ShiShiCaiPlay;
