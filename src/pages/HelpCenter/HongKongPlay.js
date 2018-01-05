// 组合所有组件  root component

import React, { PropTypes } from 'react';
import { Toast, List } from 'antd-mobile';
import CommonNavBar from '../CommonNavBar/';
import * as styles from './styles.css';
const leftIcon = require('../../assets/images/login-back.png');
import { push, goBack } from 'react-router-redux';
import { dispatch } from '../../store';
import Cookies from 'js-cookie';

class HongKongPlay extends React.PureComponent {
  render() {
    return (
      <div>
          <CommonNavBar 
             headerTitle={'香港彩'}
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
              <div className={styles.playInfoItem1}>特码</div>
              <div className={styles.playInfoItem1}>特码</div>
              <div className={styles.playInfoItem3}>香港六合彩公司当期开出的最後一码为特码。</div>
            </div>
            <div className={styles.playInfoContentItem}>
              <div className={styles.playInfoItem1}/>
              <div className={styles.playInfoItem1}>特码大小</div>
              <div className={styles.playInfoItem3}>特小：开出的特码，(01~24)小于或等于24。<br/>特大：开出的特码，(25~49)小于或等于49</div>
            </div>
            <div className={styles.playInfoContentItem}>
              <div className={styles.playInfoItem1}/>
              <div className={styles.playInfoItem1}>特码单双</div>
              <div className={styles.playInfoItem3}>特双：特码为双数，如18、20、34、42。<br />特单：特码为单数，如01，11，35，47。</div>
            </div>
            <div className={styles.playInfoContentItem}>
              <div className={styles.playInfoItem1}/>
              <div className={styles.playInfoItem1}>特码合数单双</div>
              <div className={styles.playInfoItem3}>特双：指开出特码的个位加上十位之和为‘双数’，如02，11，33，44。<br />特单：指开出特码的个位加上十位之和为‘单数’，如01，14，36，47。</div>
            </div>
            <div className={styles.playInfoContentItem}>
              <div className={styles.playInfoItem1}/>
              <div className={styles.playInfoItem1}>特码尾数大小</div>
              <div className={styles.playInfoItem3}>特尾大：5尾~9尾为大，如05、18、19。<br />特尾小：0尾~4尾为小，如01，32，44。</div>
            </div>
            <div className={styles.playInfoContentItem}>
              <div className={styles.playInfoItem1}/>
              <div className={styles.playInfoItem1}>特码半特</div>
              <div className={styles.playInfoItem3}>
              以特码大小与特码单双游戏为一个投注组合；当期特码开出符合投注组合，即视为中奖；若当期特码开出49号，其余情形视为不中奖。<br />
              大单：25、27、29、31、33、35、37、39，41、43、45、47、49<br />
              大双：26、28、30、32、34、36、38、40，42、44、46、48<br />
              小单：01、03、05、07、09、11、13、15，17、19、21、23<br />
              小双：02、04、06、08、10、12、14、16，18、20、22、24<br />
              </div>
            </div>
            <div className={styles.playInfoContentItem}>
              <div className={styles.playInfoItem1}/>
              <div className={styles.playInfoItem1}>特码合数大小</div>
              <div className={styles.playInfoItem3}>合数大：特码的个位加上十位之和来决定大小，和数大于或等于7为大。<br />合数小：特码的个位加上十位之和来决定大小，和数小于或等于6为小。</div>
            </div>
            <div className={styles.playInfoContentItem}>
              <div className={styles.playInfoItem1}/>
              <div className={styles.playInfoItem1}>正码</div>
              <div className={styles.playInfoItem3}>香港六合彩公司每期开出的前面六个号码为正码，下注号码如在六个正码号码里中奖。</div>
            </div>
            <div className={styles.playInfoContentItem}>
              <div className={styles.playInfoItem1}/>
              <div className={styles.playInfoItem1}>总和大小</div>
              <div className={styles.playInfoItem3}>总和大：所以七个开奖号码的分数总和大于或等于175。<br />总和小：所以七个开奖号码的分数总和小于或等于174。</div>
            </div>
            <div className={styles.playInfoContentItem}>
              <div className={styles.playInfoItem1}/>
              <div className={styles.playInfoItem1}>总和单双</div>
              <div className={styles.playInfoItem3}>总和单：所以七个开奖号码的分数总和是‘单数’，如分数总和是133、197。<br />总和双：所以七个开奖号码的分数总和是‘双数’，如分数总和是120、188。</div>
            </div>
            <div className={styles.playInfoContentItem}>
              <div className={styles.playInfoItem1}/>
              <div className={styles.playInfoItem1}>半波</div>
              <div className={styles.playInfoItem3}>以特码色波和特单，特双，特大，特小为一个投注组合，当期特码开出符合投注组合，即视为中奖； 若当期特码开出49号，则视为和局；其余情形视为不中奖。</div>
            </div>
            <div className={styles.playInfoContentItem}>
              <div className={styles.playInfoItem1}/>
              <div className={styles.playInfoItem1}>半半波</div>
              <div className={styles.playInfoItem3}>以特码色波和特单双及特大小等游戏为一个投注组合，当期特码开出符合投注组合，即视为中奖； 若当期特码开出49号，则视为和局；其余情形视为不中奖。</div>
            </div>
            <div className={styles.playInfoContentItem}>
              <div className={styles.playInfoItem1}/>
              <div className={styles.playInfoItem1}>特码生肖</div>
              <div className={styles.playInfoItem3}>
                生肖顺序为 鼠 >牛 >虎 >兔 >龙 >蛇 >马 >羊 >猴 >鸡 >狗 >猪 。<br />
                如今年是猴年，就以猴为开始，依顺序将49个号码分为12个生肖『如下』<br />
                鸡：01、13、25、37、49<br />
                猴：02、14、26、38<br />
                羊：03、15、27、39<br />
                马：04、16、28、40<br />
                蛇：05、17、29、41<br />
                龙：06、18、30、42<br />
                兔：07、19、31、43<br />
                虎：08、20、32、44<br />
                牛：09、21、33、45<br />
                鼠：10、22、34、46<br />
                猪：11、23、35、47<br />
                狗：12、24、36、48<br />
                若当期特别号，落在下注生肖范围内，视为中奖 。
              </div>
            </div>
            <div className={styles.playInfoContentItem}>
              <div className={styles.playInfoItem1}/>
              <div className={styles.playInfoItem1}>特码色波</div>
              <div className={styles.playInfoItem3}>
              香港六合彩49个号码球分别有红、蓝、绿三种颜色，以特码开出的颜色和投注的颜色相同视为中奖，颜色代表如下:<br />
              红波：01 ,02 ,07 ,08 ,12 ,13 ,18 ,19 ,23 ,24 ,29 ,30 ,34 ,35 ,40 ,45 ,46<br />
              蓝波：03 ,04 ,09 ,10 ,14 ,15 ,20 ,25 ,26 ,31 ,36 ,37 ,41 ,42 ,47 ,48<br />
              绿波：05 ,06 ,11 ,16 ,17 ,21 ,22 ,27 ,28 ,32 ,33 ,38 ,39 ,43 ,44 ,49
              </div>
            </div>
            <div className={styles.playInfoContentItem}>
              <div className={styles.playInfoItem1}/>
              <div className={styles.playInfoItem1}>特码头数</div>
              <div className={styles.playInfoItem3}>
                  特码头数：是指特码属头数的号码<br />
                  "0"头：01、02、03、04、05、06、07、08、09<br />
                  "1"头：10、11、12、13、14、15、16、17、18、19<br />
                  "2"头：20、21、22、23、24、25、26、27、28、29<br />
                  "3"头：30、31、32、33、34、35、36、37、38、39<br />
                  "4"头：40、41、42、43、44、45、46、47、48、49<br />
                  例如：开奖结果特别号码为21则2头为中奖，其他头数都不中奖。
              </div>
            </div>
            <div className={styles.playInfoContentItem}>
              <div className={styles.playInfoItem1}/>
              <div className={styles.playInfoItem1}>特码尾数</div>
              <div className={styles.playInfoItem3}>
                特码尾数：是指特码属尾数的号码。<br />
                "0"尾：10、20、30、40<br />
                "1"尾：01、11、21、31、41<br />
                "2"尾：02、12、22、32、42<br />
                "3"尾：03、13、23、33、43<br />
                "4"尾：04、14、24、34、44<br />
                "5"尾：05、15、25、35、45<br />
                "6"尾：06、16、26、36、46<br />
                "7"尾：07、17、27、37、47<br />
                "8"尾：08、18、28、38、48<br />
                "9"尾：09、19、29、39、49<br />
                例如：开奖结果特别号码为21则1尾数为中奖，其他尾数都不中奖。<br />
              </div>
            </div>
            <div className={styles.playInfoContentItem}>
              <div className={styles.playInfoItem1}/>
              <div className={styles.playInfoItem1}>五行</div>
              <div className={styles.playInfoItem3}>
                挑选一个五行选项为一个组合，若开奖号码的特码在此组合内，即视为中奖； <br />             
                若开奖号码的特码亦不在此组合内，即视为不中奖；<br />    
                金：01、02、15、16、23、24、31、32、45、46<br />    
                木：05、06、13、14、27、28、35、36、43、44<br />    
                水：03、04、11、12、19、20、33、34、41、42、49<br />    
                火：07、08、21、22、29、30、37、38<br />    
                土：09、10、17、18、25、26、39、40、47、48
              </div>
            </div>
            <div className={styles.playInfoContentItem}>
              <div className={styles.playInfoItem1}/>
              <div className={styles.playInfoItem1}>平特一肖</div>
              <div className={styles.playInfoItem3}>
                指开奖的7个号码中含有所属生肖的一个或多个号码，但派彩指派一次，即不论同生肖号码出现一个或多个号码都指派一次。<br />
                鸡：01、13、25、37、49<br />
                猴：02、14、26、38<br />
                羊：03、15、27、39<br />
                马：04、16、28、40<br />
                蛇：05、17、29、41<br />
                龙：06、18、30、42<br />
                兔：07、19、31、43<br />
                虎：08、20、32、44<br />
                牛：09、21、33、45<br />
                鼠：10、22、34、46<br />
                猪：11、23、35、47<br />
                狗：12、24、36、48
              </div>
            </div>
            <div className={styles.playInfoContentItem}>
              <div className={styles.playInfoItem1}/>
              <div className={styles.playInfoItem1}>平特尾数</div>
              <div className={styles.playInfoItem3}>
                  指开奖的7个号码中含有所属生肖的一个或多个号码，但派彩指派一次，即不论同生肖号码出现一个或多个号码都指派一次。<br />
                  "0"尾：10、20、30、40<br />
                  "1"尾：01、11、21、31、41<br />
                  "2"尾：02、12、22、32、42<br />
                  "3"尾：03、13、23、33、43<br />
                  "4"尾：04、14、24、34、44<br />
                  "5"尾：05、15、25、35、45<br />
                  "6"尾：06、16、26、36、46<br />
                  "7"尾：07、17、27、37、47<br />
                  "8"尾：08、18、28、38、48<br />
                  "9"尾：09、19、29、39、49<br />
                  例如：开奖结果正码号码为11、31、42、44、35、32特别号码为21则1尾2尾4尾5尾都为中奖，其他尾数都不中奖。
              </div>
            </div>
            <div className={styles.playInfoContentItem}>
              <div className={styles.playInfoItem1}/>
              <div className={styles.playInfoItem1}>连码</div>
              <div className={styles.playInfoItem3}>
                三中二：所投注的每三个号码为一组合，若其中2个是开奖号码中的正码，即为三中二，视为中奖；若3个都是开奖号码中的正码，即为三中二之中三，其余情形视为不中奖，如06、07、08 为一组合，开奖号码中有06、07两个正码，没有08，即为三中二，按三中二赔付；如开奖 号码中有06、07、08三个正码，即为三中二之中三，按中三赔付；如出现1个或没有，视为不中奖 。<br />
                四全中：选择投注号码每四个为一组（四个或四个以上），兑奖号为正码，如四个号码都在开奖号码的正码里面，视为中奖，其他情形都视为不中奖 。<br />
                三全中：所投注的每三个号码为一组合，若三个号码都是开奖号码之正码，视为中奖，其余情形视为 不中奖。如06、07、08三个都是开奖号码之正码，视为中奖，如两个正码加上一个特别号 码视为不中奖 。<br />
                二全中：所投注的每二个号码为一组合，二个号码都是开奖号码之正码，视为中奖，其余情形视为不 中奖（含一个正码加一个特别号码之情形）。<br />
                二中特：所投注的每二个号码为一组合，二个号码都是开奖号码之正码，叫二中特之中二；若其中一 个是正码，一个是特别号码，叫二中特之中特；其余情形视为不中奖 。<br />
                特串：所投注的每二个号码为一组合，其中一个是正码，一个是特别号码，视为中奖，其余情形视为不中奖（含二个号码都是正码之情形） 。
              </div>
            </div>
            <div className={styles.playInfoContentItem}>
              <div className={styles.playInfoItem1}/>
              <div className={styles.playInfoItem1}>连肖连尾</div>
              <div className={styles.playInfoItem3}>
                生肖（尾数）所对应的号码和特码生肖（尾数）项目的一样；一个生肖（尾数）对应多个号码，不论同生肖（尾数）的号码出现一个或多个，派彩只派一次。每个生肖（尾数）都有自己的赔率，下注组合的总赔率，取该组合生肖（尾数）的最低赔率为总赔率。<br />
                二连尾:选择二个尾数为一投注组合进行下注。该注的二个尾数必须在当期开出的7个开奖号码相对应的尾数中，视为中奖。<br />
                三连尾:选择三个尾数为一投注组合进行下注。该注的三个尾数必须在当期开出的7个开奖号码相对应的尾数中，视为中奖。<br />
                四连尾:选择四个尾数为一投注组合进行下注。该注的四个尾数必须在当期开出的7个开奖号码相对应的尾数中，视为中奖。<br />
                五连尾:选择五个尾数为一投注组合进行下注。该注的五个尾数必须在当期开出的7个开奖号码相对应的尾数中，视为中奖。<br />
                二连肖:选择二个生肖为一投注组合进行下注。该注的二个生肖必须在当期开出的7个开奖号码相对应的生肖中，视为中奖。<br />
                三连肖:选择三个生肖为一投注组合进行下注。该注的三个生肖必须在当期开出的7个开奖号码相对应的生肖中，视为中奖。<br />
                四连肖:选择四个生肖为一投注组合进行下注。该注的四个生肖必须在当期开出的7个开奖号码相对应的生肖中，视为中奖。<br />
                五连肖:选择五个生肖为一投注组合进行下注。该注的五个生肖必须在当期开出的7个开奖号码相对应的生肖中，视为中奖。
              </div>
            </div>
            <div className={styles.playInfoContentItem}>
              <div className={styles.playInfoItem1}/>
              <div className={styles.playInfoItem1}>合肖</div>
              <div className={styles.playInfoItem3}>
                挑选2-11个生肖『排列如同生肖』为一个组合，并选择开奖号码的特码是否在此组合内『49号除外』，即视为中奖；若当期特码开出49号，则所有组合皆视为和局。
              </div>
            </div>
            <div className={styles.playInfoContentItem}>
              <div className={styles.playInfoItem1}/>
              <div className={styles.playInfoItem1}>自选不中</div>
              <div className={styles.playInfoItem3}>
                挑选最少5个号码为一投注组合进行下注。当期开出的7个开奖号码都没有在该下注组合中，即视为中奖。每个号码都有自己的赔率，下注组合的总赔率，取该组合号码的最低赔率为总赔率。如下注组合为1-2-3-4-5，开奖号码为6，7，8，9，10，11，12，即为中奖，如果开奖号码为5，6，7，8，9，10，11，那麽为不中奖。
              </div>
            </div>
            <div className={styles.playInfoContentItem}>
              <div className={styles.playInfoItem1}/>
              <div className={styles.playInfoItem1}>总肖</div>
              <div className={styles.playInfoItem3}>
                当期号码(所有正码与最後开出的特码)开出的不同生肖总数，与所投注之预计开出之生肖总数合(不用指定特定生肖)，则视为中奖，其余情形视为不中奖。例如：如果当期号码为19、24、12、34、40、39 特别号：49，总计六个生肖，若选总肖【6】则为中奖(请注意：49号亦算输赢，不为和）。
              </div>
            </div>
            <div className={styles.playInfoContentItem}>
              <div className={styles.playInfoItem1}/>
              <div className={styles.playInfoItem1}>总肖单双</div>
              <div className={styles.playInfoItem3}>
                当期号码（正码和特码）开出的不同生肖总数若为单数则为单，若为双数则为双。
              </div>
            </div>
            <div className={styles.playInfoContentItem}>
              <div className={styles.playInfoItem1}/>
              <div className={styles.playInfoItem1}>七色波</div>
              <div className={styles.playInfoItem3}>
                以开出的7个色波，那种颜色最多为中奖。 开出的6个正码各以1个色波计，特别号以1.5个色波计。而以下3种结果视为和局。<br />
                1： 6个正码开出3蓝3绿，而特别码是1.5红<br />
                2： 6个正码开出3蓝3红，而特别码是1.5绿<br />
                3： 6个正码开出3绿3红，而特别码是1.5蓝<br />
                如果出现和局，所有投注红，绿，蓝七色波的金额将全数退回，会员也可投注和局
              </div>
            </div>
         </div>
      </div>
      </div>
    );
  }
}

export default HongKongPlay;
