import { updateFanshui } from '../../actions/LotteryAction';
import { dingDanShuanData, caizhongweiData, pk10HezhiData, shishicaiLongHu, SSCLonghu } from './fanshuiData';
import Cookies from 'js-cookie';

function getBonus(type){
  let bonus = 0;
  switch(Number(type)) {
    case 1:
      bonus = 1960;
      break;
    case 2:
      bonus = 1960;
      break;
    case 3:
      bonus = 1950;
      break;
    case 4:
      bonus = 1950;
      break;
  }
  return bonus;
}

function getDanShuangLeaveBonus(number) {
  let leaveBonus = 0;
  switch(Number(number)) {
    case 1:
      leaveBonus = 5;
      break;
    case 2:
      leaveBonus = 0.1;
      break;
    case 3:
      leaveBonus = 0.02;
      break;
    case 4:
      leaveBonus = 0.02;
      break;
    case 5:
      leaveBonus = 0.05;
      break;
    case 6:
      leaveBonus = 1;
      break;
  }
  return leaveBonus;
}

function getDanShuangMaxBonus(number) {
  let maxBonus = 0;
  switch(Number(number)) {
    case 1:
      maxBonus = 900;
      break;
    case 2:
      maxBonus = 30;
      break;
    case 3:
      maxBonus = 6.0;
      break;
    case 4:
      maxBonus = 4.5;
      break;
    case 5:
      maxBonus = 12;
      break;
    case 6:
      maxBonus = 150;
      break;
  }
  return maxBonus;
}

export function fanshui(type) {
  console.log(type);
  const bonus = getBonus(type)
  const rebate =  Cookies.get('rebate');
  // 最大返水  最高奖金-0.00%
  // 最大奖金 = bonus -(100-rebate)*10 
  const maxMoney = bonus-(100-rebate)*10; // 最大奖金
  const minMoney = 1800; // 最小奖金
  let num = 0;
  if(type == 1 || type == 2) {
    num = 84;
  }else if(type == 3 || type == 4) {
    num = 85;
  }
  const mode = ((rebate-num) / 2.00).toFixed(2);

  updateFanshui({
    mode: 0,
    fanshui: [
      {
        name: `${maxMoney}/0.00%`,
        value: 0,
      },
      {
        name: `${minMoney}/${mode}%`,
        value: mode,
      },
    ]
  });
}

// 默认最高奖金计算： bonus - mode * 2 * leavel_bonus- (100 - rebate) * leave_bonus;
/*
* @ 字段都来源于玩法详情中
* playId 102 龙虎
 */
export function defaultMaxMoney(bonus, mode, leaveBonus, playId, playKindId) {
  const rebate =  Cookies.get('rebate');
  const defaultMoney = bonus - mode * 2 * leaveBonus- (100 - rebate) * leaveBonus;
  return defaultMoney;
}

// 投注最高奖金  投注最高奖金=默认最高奖金*moshi*beishu
// 字段来源玩法详情和选号列表

export function touZhuMaxMoney(moshi, beishu, mode, bonus, leaveBonus, playId, playKindId, number) {
  // 获取默认最高奖金
  let defaultMoney = 0;
  // 时时彩龙虎  460
  // 定单双 345
  // pk10冠亚和值  481
  // 猜中位 344
  // pk10龙虎  476
  if(playKindId == 345) {
    
    const maxBouns = [];
    dingDanShuanData.map((item, key) => {
      if(number.split('-').indexOf(`${item.number}`) !== -1) {
        maxBouns.push(item.maxBouns);
      }
    })
    const bonus1 = maxBouns.sort((x,y) => { return y-x })[0];
    const leaveBonus1 =  dingDanShuanData.filter(item => item.maxBouns == bonus1)[0].leaveBouns;
    defaultMoney = defaultMaxMoney(bonus1, mode, leaveBonus1, playId, playKindId);
    
  }else if(shishicaiLongHu.indexOf(Number(playKindId)) !== -1) {
    const maxBouns = [];
    SSCLonghu.map((item, key) => {
      if(number.split('-').indexOf(`${item.number}`) !== -1) {
        maxBouns.push(item.maxBouns);
      }
    })
    const bonus1 = maxBouns.sort((x,y) => { return y-x })[0];
    const leaveBonus1 =  SSCLonghu.filter(item => item.maxBouns == bonus1)[0].leaveBouns;
    defaultMoney = defaultMaxMoney(bonus1, mode, leaveBonus1, playId, playKindId);
  }else if(playKindId == 481) {
    
    const maxBouns = [];
    pk10HezhiData.map((item, key) => {
      if(number.split(',').indexOf(`${item.number}`) !== -1) {
        maxBouns.push(item.maxBouns);
      }
    })
    const bonus1 = maxBouns.sort((x,y) => { return y-x })[0];
    const leaveBonus1 =  pk10HezhiData.filter(item => item.maxBouns == bonus1)[0].leaveBouns;
    defaultMoney = defaultMaxMoney(bonus1, mode, leaveBonus1, playId, playKindId);
    
  } else if(playKindId == 344) {
    
    const maxBouns = [];
    caizhongweiData.map((item, key) => {
      if(number.split('-').indexOf(`${item.number}`) !== -1) {
        maxBouns.push(item.maxBouns);
      }
    })
    const bonus1 = maxBouns.sort((x,y) => { return y-x })[0];
    const leaveBonus1 =  caizhongweiData.filter(item => item.maxBouns == bonus1)[0].leaveBouns;
    defaultMoney = defaultMaxMoney(bonus1, mode, leaveBonus1, playId, playKindId);
    
  }else {
    // 普遍计算奖金方式
    defaultMoney = defaultMaxMoney(bonus, mode, leaveBonus, playId, playKindId);
  }
  
  const touZhuMaxMoney = defaultMoney * moshi/2 * 1;
  return touZhuMaxMoney;
}