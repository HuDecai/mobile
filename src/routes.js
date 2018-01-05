/* @flow */
import React from 'react';
import { Route, IndexRoute } from 'react-router';
import AsyncComponent from './core/AsyncComponent';

const Login = () => <AsyncComponent load={() => import('./pages/Login')} />;
// const Register = () => <AsyncComponent load={() => import('./pages/Register')} />;
const BootPage = () => <AsyncComponent load={() => import('./pages/BootPage/BootPage')} />;
const IOSExplain = () => <AsyncComponent load={() => import('./pages/BootPage/IOSExplain')} />;
const RegisterSuccess = () => <AsyncComponent load={() => import('./pages/Register/RegisterSuccess')} />;
const HomePageCustom = () => <AsyncComponent load={() => import('./pages/HomePageCustom')} />;
const VerifyPassWord = () => <AsyncComponent load={() => import('./pages/PassWordReset/VerifyPassWord')} />;
const ResetPassWordSuccess = () => <AsyncComponent load={() => import('./pages/PassWordReset/ResetPassWordSuccess')} />;
const MyMsg = () => <AsyncComponent load={() => import('./pages/MyMsg/MyMsg')} />;
const MyMsgList = () => <AsyncComponent load={() => import('./pages/MyMsg/MyMsgList')} />;
const SendMsg = () => <AsyncComponent load={() => import('./pages/MyMsg/SendMsg')} />;
const SystemMsg = () => <AsyncComponent load={() => import('./pages/MyMsg/SystemMsg')} />;
const AgentCenter = () => <AsyncComponent load={() => import('./pages/AgentCenter/')} />;
const HelpCenter = () => <AsyncComponent load={() => import('./pages/HelpCenter/HelpCenter')} />;
const VerifyQuestions = () => <AsyncComponent load={() => import('./pages/PassWordReset/VerifyQuestions')} />;
const ResetNewPassWord = () => <AsyncComponent load={() => import('./pages/PassWordReset/ResetNewPassWord')} />;

import RootContainer from './container/RootContainer';
// import Login from './pages/Login/';
import Register from './pages/Register/';
// import BootPage from './pages/BootPage/BootPage';
// import IOSExplain from './pages/BootPage/IOSExplain';
// import RegisterSuccess from './pages/Register/RegisterSuccess';
// import HomePageCustom from './pages/HomePageCustom/';
// import VerifyPassWord from './pages/PassWordReset/VerifyPassWord';
// import ResetPassWordSuccess from './pages/PassWordReset/ResetPassWordSuccess';
import Index from './pages/Index';
// import MyMsg from './pages/MyMsg/MyMsg';
// import MyMsgList from './pages/MyMsg/MyMsgList';
// import SendMsg from './pages/MyMsg/SendMsg';
// import SystemMsg from './pages/MyMsg/SystemMsg';

// import AgentCenter from './pages/AgentCenter/';
import AgentAddUser from './pages/AgentContent/AgentAddUser';
import AgentAddUserSuccess from './pages/AgentContent/AgentAddUserSuccess';
import AgentLink from './pages/AgentContent/AgentLink';
import AgentLinkQrCode from './pages/AgentContent/AgentLinkQrCode';
import AgentTeamList from './pages/AgentContent/AgentTeamList';
import AgentUserList from './pages/AgentContent/AgentUserList';
import AgentTransfer from './pages/AgentContent/AgentTransfer';
import AgentTeamYue from './pages/AgentContent/AgentTeamYue';

import Exchange from './pages/Exchange/Exchange';
import ExchangeSuccess from './pages/Exchange/ExchangeSuccess';
import MoneyPassWord from './pages/TiXian/MoneyPassWord';
import MoneyPassWordPrompt from './pages/TiXian/MoneyPassWordPrompt';
import TixianSuccess from './pages/TiXian/TiXianSuccess';
import Tixian from './pages/TiXian/Tixian';
import BankCardSelect from './pages/TiXian/BankCardSelect';

import PersonalSet from './pages/PersonalSet';
import AboutUs from './pages/HelpCenter/AboutUs';
import TiXian from './pages/HelpCenter/TiXian';
import Rule from './pages/HelpCenter/Rule';
import Safe from './pages/HelpCenter/Safe';
import Play from './pages/HelpCenter/Play';
import ShiShiCaiPlay from './pages/HelpCenter/ShiShiCaiPlay';
import Pk10Play from './pages/HelpCenter/Pk10Play';
import ChoosePlay from './pages/HelpCenter/ChoosePlay';
import OtherPlay from './pages/HelpCenter/OtherPlay';
import HongKongPlay from './pages/HelpCenter/HongKongPlay';
import PlayTime from './pages/HelpCenter/PlayTime';

import BetRecord  from './pages/FundManagement/BetRecord';
import ChaseRecode from './pages/FundManagement/ChaseRecode';
import HongKongRecode from './pages/FundManagement/HongKongRecode';
import FundDetails from './pages/FundManagement/FundDetails';
import OrderDetails from './pages/FundManagement/OrderDetails';
import ChaseOrderDetails from './pages/FundManagement/ChaseOrderDetails';

import Recharge from './pages/Recharge/Recharge';
import RechargeQuick from './pages/Recharge/RechargeQuick';
import RechargeAlipay from './pages/Recharge/RechargeAlipay';
import RechargeAlipayConfirm from './pages/Recharge/RechargeAlipayConfirm';
import RechargeOnline from './pages/Recharge/RechargeOnline';
import RechargeOnlineConfirm from './pages/Recharge/RechargeOnlineConfirm';
import RechargeWechat from './pages/Recharge/RechargeWechat';
import RechargeQQ from './pages/Recharge/RechargeQQ';
import AlipayH5 from './pages/Recharge/AliPayH5';
import WechatH5 from './pages/Recharge/WechatH5';

import BankCardManage from './pages/BaseInfo/BankCardManage';
import AddBankCardMessage from './pages/BaseInfo/AddBankCardMessage';
import AddBankCard from './pages/BaseInfo/AddBankCard';
import DeleteBankCard from './pages/BaseInfo/DeleteBankCard';
import SetLoginPassword from './pages/BaseInfo/SetLoginPassword';
import SetLoginPassword2 from './pages/BaseInfo/SetLoginPassword2';
import SetLoginPasswordSuccess from './pages/BaseInfo/SetLoginPasswordSuccess';
import SetSecurity1 from './pages/BaseInfo/SetSecurity1';
import SetSecurity2 from './pages/BaseInfo/SetSecurity2';
import SetSecuritySuccess from './pages/BaseInfo/SetSecuritySuccess';

import LotteryBet from './pages/LotteryBet/index';
import BetConfirm from './pages/BetConfirm/BetConfirm';
import HKBet from './pages/HKBet';
import HKBetConfirm from './pages/BetConfirm/HKBetConfirm';
import LotteryTrend from './pages/LotteryTrend';
import LotteryRecord from './pages/LotteryRecord';
import BetSuccess from './pages/BetConfirm/BetSuccess';
import BetNumbers from './pages/BetConfirm/BetNumbers';
import Coustom from './pages/Coustom/Coustom';

import Frame from './pages/Frame';

const routes = (
  <Route path="/" component={RootContainer} >
    {/* 登录页面 */}
    <Route path="login" component={Login} />

    {/* 注册页面 */}
    <Route path="register-page" component={Register} />
    {/* 注册成功页面 */}
    <Route path="register-success" component={RegisterSuccess} />
    <Route path="boot-page" component={BootPage} />
    <Route path="ios-explain" component={IOSExplain} />

    {/* tabbar */}
    <Route path="index/(:tab)" component={Index}/>
    {/* 首页选择彩种页面 */}
    <Route path="home-page-custom" component={HomePageCustom} />
    {/* 选注页面，lId是彩票类型 */}
    <Route path="lottery/:lId" component={LotteryBet} />
    {/* 投注确认页面 */}
    <Route path="bet-confirm/:lId" component={BetConfirm} />
    {/* 香港彩投注 */}
    <Route path="hk-bet" component={HKBet} />
    {/* 投注确认页面 */}
    <Route path="hk-bet-confirm/:lId" component={HKBetConfirm} />
    {/* 投注成功页面 */}
    <Route path="bet-success" component={BetSuccess} />
    {/* 选号内容页面 */}
    <Route path="bet-number" component={BetNumbers} />

    {/* 开奖走势 */}
    <Route path="lottery-trend" component={LotteryTrend} />
    {/* 开奖记录 */}
    <Route path="lottery-record/:lId" component={LotteryRecord} />

    {/* 验证资金密码页面 */}
    <Route path="verify-password" component={VerifyPassWord} />
    {/* 验证密保问题页面 */}
    <Route path="verify-questions" component={VerifyQuestions} />
    {/* 设置新密码页面 */}
    <Route path="reset-new-password" component={ResetNewPassWord} />
    {/* 新密码设置成功页面 */}
    <Route path="reset-passWord-success" component={ResetPassWordSuccess} />

    {/* 代理页面 */}
    <Route path="agent-center" component={AgentCenter} />
    {/* 代理用户列表 */}
    <Route path="agent-center-userlist" component={AgentUserList} />
    {/* 代理团队列表 */}
    <Route path="agent-center-teamlist" component={AgentTeamList} />
    {/* 代理下级转账 */}
    <Route path="agent-center-transfer" component={AgentTransfer} />
    {/* 代理团队余额 */}
    <Route path="agent-center-balance" component={AgentTeamYue} />
    {/* 代理新增会员 */}
    <Route path="agent-center-adduser" component={AgentAddUser} />
    {/* 代理新增会员成功 */}
    <Route path="agent-center-adduser-success" component={AgentAddUserSuccess} />
    {/* 代理 代理链接 */}
    <Route path="agent-center-link" component={AgentLink} />
    {/* 代理 代理链接二维码 */}
    <Route path="agent-center-link-qrcode" component={AgentLinkQrCode} />

    {/* 积分兑换 */}
    <Route path="exchange" component={Exchange} />
    {/* 积分兑换成功 */}
    <Route path="exchange-success" component={ExchangeSuccess} />

    {/*  提现页面  */}
    <Route path="tixian" component={Tixian} />
    {/*  提现成功 页面 */}
    <Route path="tixian-success" component={TixianSuccess} />
    {/*  提现 银行卡选择 页面 */}
    <Route path="bank-card-select" component={BankCardSelect} />

    {/*  充值主页面 */}
    <Route path="recharge" component={Recharge} />
    {/*  充值快捷  */}
    <Route path="recharge-quick" component={RechargeQuick} />
    {/*  TODO 充值 支付宝 */}
    <Route path="recharge-alipay" component={RechargeAlipay} />
    {/*  TODO 充值 支付宝 确认  */}
    <Route path="recharge-alipay-confirm" component={RechargeAlipayConfirm} />
    {/*  TODO 充值 网银转账 */}
    <Route path="recharge-onlie" component={RechargeOnline} />
    {/*  TODO 充值 网银转账 确认 */}
    <Route path="recharge-onlie-confirm" component={RechargeOnlineConfirm} />
    {/* 充值  微信 */}
    <Route path="recharge-wechat" component={RechargeWechat} />
    {/* 充值  QQ */}
    <Route path="recharge-qq" component={RechargeQQ} />
    {/* 支付宝H5 */}
    <Route path="alipay-h5" component={AlipayH5} />
    {/* 微信H5 */}
    <Route path="wechat-h5" component={WechatH5} />

    {/* 我的消息列表页面 */}
    <Route path="my-msg-list" component={MyMsgList} />
    {/* 我的消息详情页面 */}
    <Route path="my-msg-info" component={MyMsg} />
    {/* 我的消息发送页面 */}
    <Route path="send-msg" component={SendMsg} />
    {/* 系统消息列表页面 */}
    <Route path="system-msg-list" component={MyMsgList} />
    {/* 系统消息详情页面 */}
    <Route path="system-msg" component={SystemMsg} />

    {/* 投注记录页面 */}
    <Route path="bet-record" component={BetRecord} />
    {/* 追号页面 */}
    <Route path="chase-recode" component={ChaseRecode} />
    {/* 香港彩记录 */}
    <Route path="HongKong-recode" component={HongKongRecode} />
    {/* 资金明细页面 */}
    <Route path="fund-details" component={FundDetails} />
    {/* 不追号订单详情 */}
    <Route path="order-details/:id" component={OrderDetails} />
    {/* 追号订单详情 */}
    <Route path="chase-order-details/:id" component={ChaseOrderDetails} />

    {/* 个人设置页面 */}
    <Route path="personal-setting" component={PersonalSet} />

    {/*  提现资金密码设置  */}
    <Route path="set-money-password" component={MoneyPassWord} />
    {/*  提现资金密码设置提示  */}
    <Route path="set-money-password-prompt" component={MoneyPassWordPrompt} />
    {/*  修改登录密码 1 */}
    <Route path="set-login-password" component={SetLoginPassword} />
    {/*  修改登录密码 2 */}
    <Route path="set-login-password2" component={SetLoginPassword2} />
    {/*  修改登录密码成功页面  */}
    <Route path="set-login-password-success" component={SetLoginPasswordSuccess} />

    {/*  修改密保问题 1 */}
    <Route path="set-security1" component={SetSecurity1} />
    {/*  修改密保问题 2 */}
    <Route path="set-security2" component={SetSecurity2} />
    {/* 修改密保问题 成功 */}
    <Route path="set-security-success" component={SetSecuritySuccess} />

    {/*  银行卡管理 */}
    <Route path="bank-card-manage" component={BankCardManage} />
    {/*  添加银行卡提示 */}
    <Route path="add-bank-card-message" component={AddBankCardMessage} />
    {/*  添加银行卡 */}
    <Route path="add-bank-card" component={AddBankCard} />
    {/*  删除银行卡 */}
    <Route path="delete-bank-card" component={DeleteBankCard} />

    {/* 帮助中心页面 */}
    <Route path="help-center" component={HelpCenter} />
    {/* 帮助中心 - 提现页面 */}
    <Route path="help-center-tixian" component={TiXian} />
    {/* 帮助中心 - 玩法介绍页面 */}
    <Route path="help-center-play" component={Play} />
    {/* 帮助中心 - 玩法介绍页面 */}
    <Route path="help-center-shishicai" component={ShiShiCaiPlay} />
    {/* 帮助中心 - 玩法介绍页面 */}
    <Route path="help-center-pk10" component={Pk10Play} />
    {/* 帮助中心 - 玩法介绍页面 */}
    <Route path="help-center-choose" component={ChoosePlay} />
    {/* 帮助中心 - 玩法介绍页面 */}
    <Route path="help-center-other" component={OtherPlay} />
    {/* 帮助中心 - 玩法介绍页面 */}
    <Route path="help-center-hongkong" component={HongKongPlay} />
    {/* 帮助中心 - 玩法介绍页面 */}
    <Route path="help-center-time" component={PlayTime} />
    {/* 帮助中心 - 规则条款页面 */}
    <Route path="help-center-rule" component={Rule} />
    {/* 帮助中心 - 安全须知页面 */}
    <Route path="help-center-safe" component={Safe} />
    {/* 帮助中心 - 关于我们页面 */}
    <Route path="help-center-about-us" component={AboutUs} />
    <Route path="coustom" component={Coustom} />
    <Route path="frame" component={Frame} />
  </Route>
);

export default routes;
