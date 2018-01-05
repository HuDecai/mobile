const jiaoyiType = [
  {
    value: 1,
    name: '实际投注',
  },
  {
    value: 2,
    name: '下级返点',
  },
  {
    value: 3,
    name: '用户充值',
  },
  {
    value: 4,
    name: '奖金派送',
  },
  {
    value: 5,
    name: '追号扣款',
  },
  {
    value: 6,
    name: '追号返款',
  },
  {
    value: 7,
    name: '撤单返款',
  },
  {
    value: 8,
    name: '用户提现',
  },
  {
    value: 9,
    name: '积分兑换',
  },
  {
    value: 10,
    name: '投注返点',
  },
  {
    value: 11,
    name: '上级转入',
  },
  {
    value: 12,
    name: '消费佣金',
  },
  {
    value: 13,
    name: '亏损佣金',
  },
  {
    value: 14,
    name: '投注扣款',
  },
  {
    value: 15,
    name: '投注返款',
  },
  {
    value: 16,
    name: '签到奖金',
  },
  {
    value: 17,
    name: '每日达量',
  },
  {
    value: 18,
    name: '存款利息',
  },
  {
    value: 19,
    name: '电子存款',
  },
  {
    value: 20,
    name: '充值加倍送',
  },
  {
    value: 21,
    name: '转账返换',
  },
  {
    value: 22,
    name: '手动分红',
  },
  {
    value: 24,
    name: '后台充值',
  },
  {
    value: 25,
    name: '其他',
  },
  {
    value: 26,
    name: '转账下级',
  },
  {
    value: 27,
    name: '系统扣除',
  },
  {
    value: 28,
    name: '撤销分红',
  },
  {
    value: 29,
    name: '礼金派送',
  },
  {
    value: 30,
    name: '充值送钱',
  },
  {
    value: 31,
    name: '总代消费佣金',
  },
  {
    value: 32,
    name: '总代亏损佣金',
  },
  {
    value: 33,
    name: '私返佣金',
  },
  {
    value: 34,
    name: '用户注册',
  },
  {
    value: 35,
    name: '系统撤单返款',
  },
  {
    value: 36,
    name: '提现返款',
  },
  {
    value: 37,
    name: '积分赠送',
  },
];

export const getJiaoyiType = (type) => {
  let name = '';
  if(type) {
    jiaoyiType.map(item => {
      if(item.value == type) {
        name = item.name;
      }
    })
  }
  return name;
}