// 组合所有组件  root component

import React, { PropTypes } from 'react';
import { Toast, List } from 'antd-mobile';
import CommonNavBar from '../CommonNavBar/';
import * as styles from './styles.css';
const leftIcon = require('../../assets/images/login-back.png');
import { push, goBack } from 'react-router-redux';
import { dispatch } from '../../store';
import Cookies from 'js-cookie';

class Rule extends React.PureComponent {
  render() {
    return (
      <div>
          <CommonNavBar 
             headerTitle={'规则条款'}
             leftIcon={leftIcon}
             leftAction={() => { dispatch(goBack())}}
          />
          <div className={styles.helpContent}>
            <div className={styles.firstItem}><div className={styles.firstTitle}/><div>会员资料保密条款:</div></div>
            <div className={styles.firstItemImg}>
              <div>
                  <div>1.亿合娱乐严格遵守重视会员的私隐权，我们将竭力保证您的个人信息资料与数据安全。</div>
                  <div>2.亿合娱乐绝对不会将您的个人资料泄露给任意第三方，除非收到法庭传票或应可行法律的要求及判决。我们有权通过网站向有关付款平台服务提供商以及金融保险机构提供必要的个人信息以完成付款要求。</div>
                  <div>3.会员提供的所有个人信息，其传送均通过128位SSL加密的安全端口，并存放在普通公众无法进入的保密环境之中。所有数据的内部由安全部门严格限制和严密监控。</div>
                  <div>4.亿合娱乐与我们的合作伙伴会通过邮件将您可能感兴趣的促销优惠等消息发送给您。</div>
                  <div>5.亿合娱乐绝不会透露任何能识别个人身份的资料给任何第三方数据资料，这是我们一直严格遵循的隐私权政策宗旨。</div>
              </div>
            </div>
            <br/>
            <div className={styles.firstItem}><div className={styles.firstTitle}/><div>注册开设账号和会员资格:</div></div>
            <div className={styles.firstItemImg}>
              <div>
                  <div>用户声明并承诺，用户注册和办理会员资格申请时所提供的所有资料，包括会员资格申请所填写用户姓名（‘姓名’）,资金来源（包括有关联银行账号和卡号）,任何电子邮箱地址或联系电话以及本人住址，在一切方面均真实,准确,完整。</div>
                  <div>亿合娱乐将采取必要和适当的措施对用户向我们披露的个人资料予以保密。我们将对所有收到的用户个人数据和投注资料予以严格保密，除非法律,法规,法院或监管机关,有关博彩管理执法机关的命令或决定本条规要求披露。用户对其个人资料的保密自行承担责任。我们保留在博彩网站所提供的博彩服务的付款手续所需的范围内向我们支付结算服务提供者的金融机构披露用户个人数据的权利。</div>
              </div>
            </div>
            <br/>
            <div className={styles.firstItem}><div className={styles.firstTitle}/><div>交易结算:</div></div>
            <div className={styles.firstItemImg}>
              <div>
                  <div>所有使用信用卡或借记卡的用户，持卡人姓名须与会员登记和申请过程中所使用的姓名一致。若发生持卡人姓名和账户登记和会员申请所使用的姓名不一致的情况， 亿合娱乐有权拒绝就相关交易进行结算。</div>
                  <div>用户同意对任何付款不实施或促使他人实施退款，不拒绝或撤销付款，并向亿合娱乐偿付所有被退还、拒绝或撤销的付款以及由此引起的所有损失和费用。亿合娱乐根据自主判断，有权终止向个别用户或使用某类信用卡或借记卡付款的用户提供服务或支付款项。彩金不包括下注额，用户在下注时应考虑这一因素。</div>
                  <div>您所得的彩金将存入您的账户中。用户一旦发现账户内款项汇存有误，有责任立即通知亿合娱乐财务部门且不可进行投注，亿合娱乐有权宣布用此资金的投注交易无效，并收回款项。同时，账户款项不可转存入其他账户。</div>
              </div>
            </div>
            <br/>
            <div className={styles.firstItem}><div className={styles.firstTitle}/><div>促销和红利:</div></div>
            <div className={styles.firstItemImg}><div>亿合娱乐认定有人滥用或企图滥用某项奖励或促销活动，或可能因该等滥用行为而获利，亿合娱乐有权自主决定以其认为合适的方式阻止、拒绝，中止、或撤消任何用户参加有关奖励相关促销活动。</div></div>
            <br />
            <div className={styles.firstItem}><div className={styles.firstTitle}/><div>安全免责声明:</div></div>
            <div className={styles.firstItemImg}><div>亿合娱乐对任何由本站链接到的外部网站，所含内容准确性或时效性不作任何管制，且不负任何责任。 若发生与账户结算或博彩服务的其他方面有关的系统错误或通讯错误，亿合娱乐不承担由此引起的任何责任。在此情况下，亿合娱乐有权取消所有受上述错误影响的下注并采取任何更正行动。</div></div>
         </div>
      </div>
    );
  }
}

export default Rule;
