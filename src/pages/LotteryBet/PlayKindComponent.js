import React from 'react';
import FushiType from './components/FushiType';
import DanShiType from './components/DanShiType';
import HeZhiType from './components/HeZhiType';
import DingDanShuang from './components/DingDanShuang';
import LongHu from './components/LongHu';
import SaiLongHu from './components/SaiLongHu';
import HKBet from '../HKBet';
import { pk10HezhiData }  from '../../core/lottery/fanshuiData';
// 玩法对应的组件，文件命名规则 ${二级目录拼音}${三级目录拼音}.js
// import WuxingWuXingFuShi from './components/WuXingWuXingFuShi';
// import WuxingWuXingDanShi from '../../components/WuXingWuXingDanShi/';
// import ZhuXuan120 from '../../components/ZhuXuan120/';
// import WuXingZuXuanNum from '../../components/WuXingZhuXuanNum/';
// import LongHu from '../../components/LongHu/';
// import HeZhi from '../../components/HeZhi/';
// import HeZhi2 from '../../components/HeZhi2/';
// import SiXingQianSiFuShi from './components/SiXingQianSiFuShi';
// import SiXingHouSiFuShi from './components/SiXingHouSiFuShi';
// import SanXingQianSanFuShi from './components/SanXingQianSanFuShi';
// import SanXingZhongSanFuShi from './components/SanXingZhongSanFuShi';
// import SanXingHouSanFuShi from './components/SanXingHouSanFuShi';
// import GuanJunFuShi from '../../components/GuanJunFuShi/';
// // 时时彩
// import ShiShiDingWeiDan from '../../components/ShiShiDingWeiDan/';
// import ShiShiQianErFuShi from '../../components/ShiShiQianErFuShi/';
// import ShiShiHouErFuShi from '../../components/ShiShiHouErFuShi/';
// // 赛车
// import SaiCheLongHu from '../../components/SaiCheLongHu/';
// import SaiCheCaiGuanJunFuShi2 from '../../components/SaiCheCaiGuanJunFuShi2/';
// import SaiCheQianSanFuShi from '../../components/SaiCheQianSanFuShi/';
// import SaiCheQianSiFuShi from '../../components/SaiCheQianSiFuShi/';
// import SaiCheGuanJunFuShi from '../../components/SaiCheGuanJunFuShi/';
// import SaiCheDingWeiDan from '../../components/SaiCheDingWeiDan/';
// import SaiCheYaJunHeZhi from '../../components/SaiCheYaJunHeZhi/';
// // 11选5
// import ChooseFiveFuShi from '../../components/ChooseFiveFuShi/';
// import ChooseFiveZhiXuanFuShi from '../../components/ChooseFiveZhiXuanFuShi/';
// import ChooseFiveZhiXuanFuShi2 from '../../components/ChooseFiveZhiXuanFuShi2/';
// import ChooseFiveQianSanDingWeiDan from '../../components/ChooseFiveQianSanDingWeiDan/';
// import ChooseFiveCaiZhongWei from '../../components/ChooseFiveCaiZhongWei/';
// import ChooseFiveDingDanShuang from '../../components/ChooseFiveDingDanShuang/';
// // 其他系列
// import OtherZuOne from '../../components/OtherZuOne/';
// import OtherZuThreeFuShi from '../../components/OtherZuThreeFuShi/';
// import OtherZuTwo from '../../components/OtherZuTwo/';
// import OtherDingWeiDan from '../../components/OtherDingWeiDan/';
// import OtherHeZhi3 from '../../components/OtherHeZhi3/';
// import OtherHeZhi2 from '../../components/OtherHeZhi2/';

class PlayKindComponents extends React.PureComponent {
  render() {

    const playCate = this.props.selectPlayInfo.get('playCate');
    const playKind = this.props.selectPlayInfo.get('playKind');
    const selectLotteryNumbers = this.props.selectLotteryNumbers;


    if (playCate.get('id') && playKind.get('id')) {
      if (playCate.get('id') === 10 && playKind.get('id') === 7) {
        return (
          <FushiType
            id={playKind.get('id')}
            labels={['万', '千', '百', '十', '个']}
            numbers={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]}
            bigNumbers={[5, 6, 7, 8, 9]}
            smallNumbers={[0, 1, 2, 3, 4]}
            oddNumbers={[1, 3, 5, 7, 9]}
            evenNumbers={[0, 2, 4, 6, 8]}
          />
        )
      } else if (playCate.get('id') === 10 && playKind.get('id') === 66) {
        // 五星单式
        return (
          <DanShiType
            id={playKind.get('id')}
            notices={['12345 67890', '12345,67890', '1+2+3+4+5 6+7+8+9+0', '1,2,3,4,5 6,7,8,9,0']}
          />
        );
      } else if (playCate.get('id') === 10 && playKind.get('id') === 346) {
        // 组选120
        return (
          <FushiType
            id={playKind.get('id')}
            labels={['120']}
            numbers={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]}
            bigNumbers={[5, 6, 7, 8, 9]}
            smallNumbers={[0, 1, 2, 3, 4]}
            oddNumbers={[1, 3, 5, 7, 9]}
            evenNumbers={[0, 2, 4, 6, 8]}
          />
        );
      } else if (playCate.get('id') === 10 && playKind.get('id') === 347) {
        // 组选60
        return (
          <FushiType
            id={playKind.get('id')}
            labels={['二重号', '单号']}
            numbers={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]}
            bigNumbers={[5, 6, 7, 8, 9]}
            smallNumbers={[0, 1, 2, 3, 4]}
            oddNumbers={[1, 3, 5, 7, 9]}
            evenNumbers={[0, 2, 4, 6, 8]}
          />
        );
      } else if (playCate.get('id') === 10 && playKind.get('id') === 348) {
        // 组选30
        return (
          <FushiType
            id={playKind.get('id')}
            labels={['二重号', '单号']}
            numbers={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]}
            bigNumbers={[5, 6, 7, 8, 9]}
            smallNumbers={[0, 1, 2, 3, 4]}
            oddNumbers={[1, 3, 5, 7, 9]}
            evenNumbers={[0, 2, 4, 6, 8]}
          />
        );
      } else if (playCate.get('id') === 10 && playKind.get('id') === 349) {
        // 组选20
        return (
          <FushiType
            id={playKind.get('id')}
            labels={['三重号', '单号']}
            numbers={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]}
            bigNumbers={[5, 6, 7, 8, 9]}
            smallNumbers={[0, 1, 2, 3, 4]}
            oddNumbers={[1, 3, 5, 7, 9]}
            evenNumbers={[0, 2, 4, 6, 8]}
          />
        );
      } else if (playCate.get('id') === 10 && playKind.get('id') === 350) {
        // 组选10
        return (
          <FushiType
            id={playKind.get('id')}
            labels={['三重号', '二重号']}
            numbers={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]}
            bigNumbers={[5, 6, 7, 8, 9]}
            smallNumbers={[0, 1, 2, 3, 4]}
            oddNumbers={[1, 3, 5, 7, 9]}
            evenNumbers={[0, 2, 4, 6, 8]}
          />
        );
      } else if (playCate.get('id') === 10 && playKind.get('id') === 351) {
        // 组选5
        return (
          <FushiType
            id={playKind.get('id')}
            labels={['四重号', '单号']}
            numbers={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]}
            bigNumbers={[5, 6, 7, 8, 9]}
            smallNumbers={[0, 1, 2, 3, 4]}
            oddNumbers={[1, 3, 5, 7, 9]}
            evenNumbers={[0, 2, 4, 6, 8]}
          />
        );
      } else if (playCate.get('id') === 11 && playKind.get('id') === 60) {
        // 前四复式
        return (
          <FushiType
            id={playKind.get('id')}
            labels={['万', '千', '百', '十']}
            numbers={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]}
            bigNumbers={[5, 6, 7, 8, 9]}
            smallNumbers={[0, 1, 2, 3, 4]}
            oddNumbers={[1, 3, 5, 7, 9]}
            evenNumbers={[0, 2, 4, 6, 8]}
          />
        );
      } else if (playCate.get('id') === 11 && playKind.get('id') === 67) {
        // 前四单式
        return (
          <DanShiType
            id={playKind.get('id')}
            notices={['1234 5678', '1234,5678', '1+2+3+4 5+6+7+8', '1,2,3,4 5,6,7,8']}
          />
        );
      } else if (playCate.get('id') === 11 && playKind.get('id') === 68) {
        // 后四复式
        return (
          <FushiType
            id={playKind.get('id')}
            labels={['千', '百', '十', '个']}
            numbers={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]}
            bigNumbers={[5, 6, 7, 8, 9]}
            smallNumbers={[0, 1, 2, 3, 4]}
            oddNumbers={[1, 3, 5, 7, 9]}
            evenNumbers={[0, 2, 4, 6, 8]}
          />
        );
      } else if (playCate.get('id') === 11 && playKind.get('id') === 71) {
        // 后四单式
        return (
          <DanShiType
            id={playKind.get('id')}
            notices={['1234 5678', '1234,5678', '1+2+3+4 5+6+7+8', '1,2,3,4 5,6,7,8']}
          />
        );
      } else if (playCate.get('id') === 18 && playKind.get('id') === 10) {
        // 前三复式
        return (
          <FushiType
            id={playKind.get('id')}
            labels={['万', '千', '百']}
            numbers={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]}
            bigNumbers={[5, 6, 7, 8, 9]}
            smallNumbers={[0, 1, 2, 3, 4]}
            oddNumbers={[1, 3, 5, 7, 9]}
            evenNumbers={[0, 2, 4, 6, 8]}
          />
        );
      } else if (playCate.get('id') === 18 && playKind.get('id') === 61) {
        // 前三单式
        return (
          <DanShiType
            id={playKind.get('id')}
            notices={['123 456', '123,456', '1+2+3 4+5+6', '1,2,3 4,5,6']}
          />
        );
      } else if (playCate.get('id') === 18 && playKind.get('id') === 11) {
        // 前三组三
        return (
          <FushiType
            id={playKind.get('id')}
            labels={['组三']}
            numbers={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]}
            bigNumbers={[5, 6, 7, 8, 9]}
            smallNumbers={[0, 1, 2, 3, 4]}
            oddNumbers={[1, 3, 5, 7, 9]}
            evenNumbers={[0, 2, 4, 6, 8]}
          />
        );
      } else if (playCate.get('id') === 18 && playKind.get('id') === 12) {
        // 前三组六
        return (
          <FushiType
            id={playKind.get('id')}
            labels={['组六']}
            numbers={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]}
            bigNumbers={[5, 6, 7, 8, 9]}
            smallNumbers={[0, 1, 2, 3, 4]}
            oddNumbers={[1, 3, 5, 7, 9]}
            evenNumbers={[0, 2, 4, 6, 8]}
          />
        );
      } else if (playCate.get('id') === 19 && playKind.get('id') === 13) {
        // 中三复式
        return (
          <FushiType
            id={playKind.get('id')}
            labels={['千', '百', '十']}
            numbers={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]}
            bigNumbers={[5, 6, 7, 8, 9]}
            smallNumbers={[0, 1, 2, 3, 4]}
            oddNumbers={[1, 3, 5, 7, 9]}
            evenNumbers={[0, 2, 4, 6, 8]}
          />
        );
      } else if (playCate.get('id') === 19 && playKind.get('id') === 62) {
        // 中三单式
        return (
          <DanShiType
            id={playKind.get('id')}
            notices={['123 456', '123,456', '1+2+3 4+5+6', '1,2,3 4,5,6']}
          />
        );
      } else if (playCate.get('id') === 19 && playKind.get('id') === 14) {
        // 中三组三
        return (
          <FushiType
            id={playKind.get('id')}
            labels={['组三']}
            numbers={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]}
            bigNumbers={[5, 6, 7, 8, 9]}
            smallNumbers={[0, 1, 2, 3, 4]}
            oddNumbers={[1, 3, 5, 7, 9]}
            evenNumbers={[0, 2, 4, 6, 8]}
          />
        );
      } else if (playCate.get('id') === 19 && playKind.get('id') === 15) {
        // 中三组六
        return (
          <FushiType
            id={playKind.get('id')}
            labels={['组六']}
            numbers={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]}
            bigNumbers={[5, 6, 7, 8, 9]}
            smallNumbers={[0, 1, 2, 3, 4]}
            oddNumbers={[1, 3, 5, 7, 9]}
            evenNumbers={[0, 2, 4, 6, 8]}
          />
        );
      } else if (playCate.get('id') === 20 && playKind.get('id') === 16) {
        // 后三复式
        return (
          <FushiType
            id={playKind.get('id')}
            labels={['百', '十', '个']}
            numbers={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]}
            bigNumbers={[5, 6, 7, 8, 9]}
            smallNumbers={[0, 1, 2, 3, 4]}
            oddNumbers={[1, 3, 5, 7, 9]}
            evenNumbers={[0, 2, 4, 6, 8]}
          />
        );
      } else if (playCate.get('id') === 20 && playKind.get('id') === 63) {
        // 后三单式
        return (
          <DanShiType
            id={playKind.get('id')}
            notices={['123 456', '123,456', '1+2+3 4+5+6', '1,2,3 4,5,6']}
          />
        );
      } else if (playCate.get('id') === 20 && playKind.get('id') === 17) {
        // 后三组三
        return (
          <FushiType
            id={playKind.get('id')}
            labels={['组三']}
            numbers={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]}
            bigNumbers={[5, 6, 7, 8, 9]}
            smallNumbers={[0, 1, 2, 3, 4]}
            oddNumbers={[1, 3, 5, 7, 9]}
            evenNumbers={[0, 2, 4, 6, 8]}
          />
        );
      } else if (playCate.get('id') === 20 && playKind.get('id') === 18) {
        // 后三组六
        return (
          <FushiType
            id={playKind.get('id')}
            labels={['组六']}
            numbers={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]}
            bigNumbers={[5, 6, 7, 8, 9]}
            smallNumbers={[0, 1, 2, 3, 4]}
            oddNumbers={[1, 3, 5, 7, 9]}
            evenNumbers={[0, 2, 4, 6, 8]}
          />
        );
      } else if (playCate.get('id') === 21 && playKind.get('id') === 19) {
        // 前二复式
        return (
          <FushiType
            id={playKind.get('id')}
            labels={['万', '千']}
            numbers={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]}
            bigNumbers={[5, 6, 7, 8, 9]}
            smallNumbers={[0, 1, 2, 3, 4]}
            oddNumbers={[1, 3, 5, 7, 9]}
            evenNumbers={[0, 2, 4, 6, 8]}
          />
        );
      } else if (playCate.get('id') === 21 && playKind.get('id') === 64) {
        // 前二单式
        return (
          <DanShiType
            id={playKind.get('id')}
            notices={['12 34', '12,34', '1+2 3+4', '1,2 3,4']}
          />
        );
      } else if (playCate.get('id') === 21 && playKind.get('id') === 20) {
        // 前二组二
        return (
          <FushiType
            id={playKind.get('id')}
            labels={['组二']}
            numbers={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]}
            bigNumbers={[5, 6, 7, 8, 9]}
            smallNumbers={[0, 1, 2, 3, 4]}
            oddNumbers={[1, 3, 5, 7, 9]}
            evenNumbers={[0, 2, 4, 6, 8]}
          />
        );
      }else if (playCate.get('id') === 22 && playKind.get('id') === 21) {
        // 后二复式
        return (
          <FushiType
            id={playKind.get('id')}
            labels={['十', '个']}
            numbers={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]}
            bigNumbers={[5, 6, 7, 8, 9]}
            smallNumbers={[0, 1, 2, 3, 4]}
            oddNumbers={[1, 3, 5, 7, 9]}
            evenNumbers={[0, 2, 4, 6, 8]}
          />
        );
      }else if (playCate.get('id') === 22 && playKind.get('id') === 65) {
        // 后二单式
        return (
          <DanShiType
            id={playKind.get('id')}
            notices={['12 34', '12,34', '1+2 3+4', '1,2 3,4']}
          />
        );
      }else if (playCate.get('id') === 22 && playKind.get('id') === 22) {
        // 后二组二
        return (
          <FushiType
            id={playKind.get('id')}
            labels={['组二']}
            numbers={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]}
            bigNumbers={[5, 6, 7, 8, 9]}
            smallNumbers={[0, 1, 2, 3, 4]}
            oddNumbers={[1, 3, 5, 7, 9]}
            evenNumbers={[0, 2, 4, 6, 8]}
          />
        );
      }else if (playCate.get('id') === 24 && [34, 37, 35 ].indexOf(playKind.get('id')) !== -1) {
        // 前三一码 中三一码 后三一码
        return (
          <FushiType
            id={playKind.get('id')}
            labels={['胆码']}
            numbers={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]}
            bigNumbers={[5, 6, 7, 8, 9]}
            smallNumbers={[0, 1, 2, 3, 4]}
            oddNumbers={[1, 3, 5, 7, 9]}
            evenNumbers={[0, 2, 4, 6, 8]}
          />
        );
      }else if (playCate.get('id') === 23 && playKind.get('id') === 23) {
        // 定位胆
        return (
          <FushiType
            id={playKind.get('id')}
            labels={['万', '千', '百', '十', '个']}
            numbers={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]}
            bigNumbers={[5, 6, 7, 8, 9]}
            smallNumbers={[0, 1, 2, 3, 4]}
            oddNumbers={[1, 3, 5, 7, 9]}
            evenNumbers={[0, 2, 4, 6, 8]}
          />
        );
      }else if (playCate.get('id') === 44 && [364, 365, 366].indexOf(playKind.get('id')) !== -1) {
        // 前三和值 中三和值 后三和值
        return (
          <HeZhiType
            id={playKind.get('id')}
            labels={['和值']}
            numbers={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27]}
            indexs={[1, 3, 6, 10, 15, 21, 28, 36, 45, 55, 63, 69, 73, 75, 75, 73, 69, 63, 55, 45, 36, 28, 21, 15, 10, 6, 3, 1]}
          />
        );
      }else if (playCate.get('id') === 44 && [367, 368].indexOf(playKind.get('id')) !== -1) {
        // 前二和值 后二和值
        return (
          <HeZhiType
            id={playKind.get('id')}
            labels={['和值']}
            numbers={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]}
            indexs={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1]}
          />
        );
      }else if (playCate.get('id') === 102 && [460,461,462,463,464,465,466,467,468,469].indexOf(playKind.get('id')) !== -1) {
        // 龙虎
        return (
          <LongHu
            id={playKind.get('id')}
          />
        );
      }else if (playCate.get('id') === 102 && [476, 477, 478, 479 ,480].indexOf(playKind.get('id')) !== -1) {
        // 赛车 龙虎
        return (
          <SaiLongHu
            id={playKind.get('id')}
          />
        );
      }else if (playCate.get('id') === 84 && playKind.get('id') === 424) {
        // 赛车 冠军复式
        return (
          <FushiType
            id={playKind.get('id')}
            labels={['冠军']}
            numbers={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
            bigNumbers={[6, 7, 8, 9, 10]}
            smallNumbers={[1, 2, 3, 4, 5]}
            oddNumbers={[1, 3, 5, 7, 9]}
            evenNumbers={[2, 4, 6, 8, 10]}
          />
        );
      }else if (playCate.get('id') === 85 &&  playKind.get('id') === 425) {
        // 赛车 前二复式
        return (
          <FushiType
            id={playKind.get('id')}
            labels={['冠军', '亚军']}
            numbers={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
            bigNumbers={[6, 7, 8, 9, 10]}
            smallNumbers={[1, 2, 3, 4, 5]}
            oddNumbers={[1, 3, 5, 7, 9]}
            evenNumbers={[2, 4, 6, 8, 10]}
          />
        );
      }else if (playCate.get('id') === 85 && playKind.get('id') === 426) {
        // 赛车 前二单式
        return (
          <DanShiType
            id={playKind.get('id')}
            notices={['2 3', '2+3', '2,3', '']}
          />
        );
      }else if (playCate.get('id') === 86 && playKind.get('id') === 427) {
        // 赛车 前三复式
        return (
          <FushiType
            id={playKind.get('id')}
            labels={['冠军', '亚军', '季军']}
            numbers={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
            bigNumbers={[6, 7, 8, 9, 10]}
            smallNumbers={[1, 2, 3, 4, 5]}
            oddNumbers={[1, 3, 5, 7, 9]}
            evenNumbers={[2, 4, 6, 8, 10]}
          />
        );
      }else if (playCate.get('id') === 86 && playKind.get('id') === 428) {
        // 赛车 前三单式
        return (
          <DanShiType
            id={playKind.get('id')}
            notices={['2 3 4', '2+3+4', '2,3,4', '']}
          />
        );
      }else if (playCate.get('id') === 103 && playKind.get('id') === 474) {
        // 赛车 前四复式
        return (
          <FushiType
            id={playKind.get('id')}
            labels={['冠军', '亚军', '季军', '第四名']}
            numbers={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
            bigNumbers={[6, 7, 8, 9, 10]}
            smallNumbers={[1, 2, 3, 4, 5]}
            oddNumbers={[1, 3, 5, 7, 9]}
            evenNumbers={[2, 4, 6, 8, 10]}
          />
        );
      }else if (playCate.get('id') === 103 && playKind.get('id') === 475) {
        // 赛车 前四单式
        return (
          <DanShiType
            id={playKind.get('id')}
            notices={['2 3 4 5', '2+3+4+5', '2,3,4,5', '']}
          />
        );
      }else if (playCate.get('id') === 23 && playKind.get('id') === 409) {
        // 赛车 前5定位胆
        return (
          <FushiType
            id={playKind.get('id')}
            labels={['冠军', '亚军', '季军', '第四名', '第五名']}
            numbers={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
            bigNumbers={[6, 7, 8, 9, 10]}
            smallNumbers={[1, 2, 3, 4, 5]}
            oddNumbers={[1, 3, 5, 7, 9]}
            evenNumbers={[2, 4, 6, 8, 10]}
          />
        );
      }else if (playCate.get('id') === 23 && playKind.get('id') === 410) {
        // 赛车 后5定位胆
        return (
          <FushiType
            id={playKind.get('id')}
            labels={['第六名', '第七名', '第八名', '第九名', '第十名']}
            numbers={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
            bigNumbers={[6, 7, 8, 9, 10]}
            smallNumbers={[1, 2, 3, 4, 5]}
            oddNumbers={[1, 3, 5, 7, 9]}
            evenNumbers={[2, 4, 6, 8, 10]}
          />
        );
      }else if (playCate.get('id') === 44 && playKind.get('id') === 481) {
        // 赛车 冠军和值
        const indexs = [];
        pk10HezhiData.map((item, key) => {
          indexs.push(
            ((item.maxBouns - this.props.mode * 2 * item.leaveBouns - (100 - this.props.rebate) * item.leaveBouns) * this.props.singleMoney / 2).toFixed(3)
          );
        })
        return (
          <HeZhiType
            id={playKind.get('id')}
            labels={['和值']}
            numbers={[3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19]}
            indexs={indexs}
          />
        )
      }else if (playCate.get('id') === 45 && [323,324,325,326,327,328,329,330].indexOf(playKind.get('id')) !== -1) {
        // 11 选5 任选复式
        const playKindId = playKind.get('id');
        let text = '';
        if(playKindId == 323) {
          text = '一中一';
        }else if(playKindId == 324) {
          text = '二中二';
        }else if(playKindId == 325) {
          text = '三中三';
        }else if(playKindId == 326) {
          text = '四中四';
        }else if(playKindId == 327) {
          text = '五中五';
        }else if(playKindId == 328) {
          text = '六中五';
        }else if(playKindId == 329) {
          text = '七中五';
        }else if(playKindId == 330) {
           text = '八中五';
        }
        return (
          <FushiType
            id={playKind.get('id')}
            labels={[text]}
            numbers={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]}
            bigNumbers={[6, 7, 8, 9, 10, 11]}
            smallNumbers={[1, 2, 3, 4, 5]}
            oddNumbers={[1, 3, 5, 7, 9, 11]}
            evenNumbers={[2, 4, 6, 8, 10]}
          />
        );
      }else if (playCate.get('id') === 18 && playKind.get('id') === 492) {
        // 11 选5 直选复式
        return (
          <FushiType
            id={playKind.get('id')}
            labels={['第一位', '第二位', '第三位']}
            numbers={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]}
            bigNumbers={[6, 7, 8, 9, 10, 11]}
            smallNumbers={[1, 2, 3, 4, 5]}
            oddNumbers={[1, 3, 5, 7, 9, 11]}
            evenNumbers={[2, 4, 6, 8, 10]}
          />
        );
      }else if (playCate.get('id') === 18 && playKind.get('id') === 493) {
        // 11 选5 直选单式
        return (
          <DanShiType
            id={playKind.get('id')}
            notices={['5 3 7', '10 8 11', '4,5,6', '']}
          />
        );
      }else if (playCate.get('id') === 18 && playKind.get('id') === 494) {
        // 11 选5 组选复式
        return (
          <FushiType
            id={playKind.get('id')}
            labels={['组选']}
            numbers={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]}
            bigNumbers={[6, 7, 8, 9, 10, 11]}
            smallNumbers={[1, 2, 3, 4, 5]}
            oddNumbers={[1, 3, 5, 7, 9, 11]}
            evenNumbers={[2, 4, 6, 8, 10]}
          />
        );
      }else if (playCate.get('id') === 18 && playKind.get('id') === 495) {
        // 11 选5 组选单式
        return (
          <DanShiType
            id={playKind.get('id')}
            notices={['5 3 7', '10 8 11', '4,5,6', '']}
          />
        );
      }else if (playCate.get('id') === 21 && playKind.get('id') === 496) {
        // 11 选5 二直复式
        return (
          <FushiType
            id={playKind.get('id')}
            labels={['第一位', '第二位']}
            numbers={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]}
            bigNumbers={[6, 7, 8, 9, 10, 11]}
            smallNumbers={[1, 2, 3, 4, 5]}
            oddNumbers={[1, 3, 5, 7, 9, 11]}
            evenNumbers={[2, 4, 6, 8, 10]}
          />
        );
      }else if (playCate.get('id') === 21 && playKind.get('id') === 497) {
        // 11 选5 二直单式
        return (
          <DanShiType
            id={playKind.get('id')}
            notices={['5 3 7', '10 8 11', '4,5,6', '']}
          />
        );
      }else if (playCate.get('id') === 21 && playKind.get('id') === 498) {
        // 11 选5 二组复式
        return (
          <FushiType
            id={playKind.get('id')}
            labels={['组选']}
            numbers={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]}
            bigNumbers={[6, 7, 8, 9, 10, 11]}
            smallNumbers={[1, 2, 3, 4, 5]}
            oddNumbers={[1, 3, 5, 7, 9, 11]}
            evenNumbers={[2, 4, 6, 8, 10]}
          />
        );
      }else if (playCate.get('id') === 21 && playKind.get('id') === 499) {
        // 11 选5 二组单式
        return (
          <DanShiType
            id={playKind.get('id')}
            notices={['5 3 7', '10 8 11', '4,5,6', '']}
          />
        );

      }else if (playCate.get('id') === 24 && playKind.get('id') === 490) {
        // 11 选5 前3不定位
        return (
          <FushiType
            id={playKind.get('id')}
            labels={['前三位']}
            numbers={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]}
            bigNumbers={[6, 7, 8, 9, 10, 11]}
            smallNumbers={[1, 2, 3, 4, 5]}
            oddNumbers={[1, 3, 5, 7, 9, 11]}
            evenNumbers={[2, 4, 6, 8, 10]}
          />
        );
      }else if (playCate.get('id') === 40 && playKind.get('id') === 337) {
        // 11 选5 前3定位胆
        return (
          <FushiType
            id={playKind.get('id')}
            labels={['第一位', '第二位', '第三位']}
            numbers={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]}
            bigNumbers={[6, 7, 8, 9, 10, 11]}
            smallNumbers={[1, 2, 3, 4, 5]}
            oddNumbers={[1, 3, 5, 7, 9, 11]}
            evenNumbers={[2, 4, 6, 8, 10]}
          />
        );
      }else if (playCate.get('id') === 46 && playKind.get('id') === 344) {
        // 11 选5 猜中位
        return (
          <FushiType
            id={playKind.get('id')}
            labels={['猜中位']}
            numbers={[3, 4, 5, 6, 7, 8, 9]}
            bigNumbers={[6, 7, 8, 9]}
            smallNumbers={[3, 4, 5]}
            oddNumbers={[3, 5, 7, 9]}
            evenNumbers={[4, 6, 8]}
          />
        );
      }else if (playCate.get('id') === 47 && playKind.get('id') === 345) {
        // 11 选5 定单双
        return (
          <DingDanShuang
            id={playKind.get('id')}
            numbers={[1, 2, 3, 4 , 5, 6]}
          />
        );
      }else if (playCate.get('id') === 42 && playKind.get('id') === 285) {
        // 其他系列 三星复式
         return (
           <FushiType
             id={playKind.get('id')}
             labels={['百位', '十位', '个位']}
             numbers={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]}
             bigNumbers={[5, 6, 7, 8, 9]}
             smallNumbers={[0, 1, 2, 3, 4]}
             oddNumbers={[1, 3, 5, 7, 9]}
             evenNumbers={[0, 2, 4, 6, 8]}
           />
         )
      }else if (playCate.get('id') === 42 && playKind.get('id') === 286) {
        // 其他系列 三星单式
        return (
          <DanShiType
            id={playKind.get('id')}
            notices={['123 456', '123,456', '1+2+3 4+5+6', '1,2,3 4,5,6']}
          />
        );
      }else if (playCate.get('id') === 42 && playKind.get('id') === 287) {
        // 其他系列 三星组三
         return (
           <FushiType
             id={playKind.get('id')}
             labels={['组三']}
             numbers={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]}
             bigNumbers={[5, 6, 7, 8, 9]}
             smallNumbers={[0, 1, 2, 3, 4]}
             oddNumbers={[1, 3, 5, 7, 9]}
             evenNumbers={[0, 2, 4, 6, 8]}
           />
         );
      }else if (playCate.get('id') === 42 && playKind.get('id') === 288) {
        // 其他系列 三星组六
        return (
          <FushiType
            id={playKind.get('id')}
            labels={['组六']}
            numbers={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]}
            bigNumbers={[5, 6, 7, 8, 9]}
            smallNumbers={[0, 1, 2, 3, 4]}
            oddNumbers={[1, 3, 5, 7, 9]}
            evenNumbers={[0, 2, 4, 6, 8]}
          />
        );
      }else if (playCate.get('id') === 105 && playKind.get('id') === 500) {
        // 其他系列 前二复式
        return (
          <FushiType
            id={playKind.get('id')}
            labels={['十', '个']}
            numbers={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]}
            bigNumbers={[5, 6, 7, 8, 9]}
            smallNumbers={[0, 1, 2, 3, 4]}
            oddNumbers={[1, 3, 5, 7, 9]}
            evenNumbers={[0, 2, 4, 6, 8]}
          />
        );
      }else if (playCate.get('id') === 105 && playKind.get('id') === 501) {
        // 其他系列 前二单式
        return (
          <DanShiType
            id={playKind.get('id')}
            notices={['12 34', '12,34', '1+2 3+4', '1,2 3,4']}
          />
        );
      }else if (playCate.get('id') === 105 && playKind.get('id') === 502) {
        // 其他系列 前二组二
        return (
          <FushiType
            id={playKind.get('id')}
            labels={['组二']}
            numbers={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]}
            bigNumbers={[5, 6, 7, 8, 9]}
            smallNumbers={[0, 1, 2, 3, 4]}
            oddNumbers={[1, 3, 5, 7, 9]}
            evenNumbers={[0, 2, 4, 6, 8]}
          />
        );
      }else if (playCate.get('id') === 106 && playKind.get('id') === 503) {
        // 其他系列 后二复式
        return (
          <FushiType
            id={playKind.get('id')}
            labels={['十', '个']}
            numbers={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]}
            bigNumbers={[5, 6, 7, 8, 9]}
            smallNumbers={[0, 1, 2, 3, 4]}
            oddNumbers={[1, 3, 5, 7, 9]}
            evenNumbers={[0, 2, 4, 6, 8]}
          />
        );
      }else if (playCate.get('id') === 106 && playKind.get('id') === 504) {
        // 其他系列 后二单式
        return (
          <DanShiType
            id={playKind.get('id')}
            notices={['12 34', '12,34', '1+2 3+4', '1,2 3,4']}
          />
        );
      }else if (playCate.get('id') === 106 && playKind.get('id') === 505) {
        // 其他系列 后二组二
        return (
          <FushiType
            id={playKind.get('id')}
            labels={['组二']}
            numbers={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]}
            bigNumbers={[5, 6, 7, 8, 9]}
            smallNumbers={[0, 1, 2, 3, 4]}
            oddNumbers={[1, 3, 5, 7, 9]}
            evenNumbers={[0, 2, 4, 6, 8]}
          />
        );
      }else if (playCate.get('id') === 24 && playKind.get('id') === 319) {
        // 其他系列 三星不定位
        return (
          <FushiType
            id={playKind.get('id')}
            labels={['胆码']}
            numbers={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]}
            bigNumbers={[5, 6, 7, 8, 9]}
            smallNumbers={[0, 1, 2, 3, 4]}
            oddNumbers={[1, 3, 5, 7, 9]}
            evenNumbers={[0, 2, 4, 6, 8]}
          />
        );
      }else if (playCate.get('id') === 23 && playKind.get('id') === 321) {
        // 其他系列 三星定位胆
         return (
           <FushiType
             id={playKind.get('id')}
             labels={['百', '十', '个']}
             numbers={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]}
             bigNumbers={[5, 6, 7, 8, 9]}
             smallNumbers={[0, 1, 2, 3, 4]}
             oddNumbers={[1, 3, 5, 7, 9]}
             evenNumbers={[0, 2, 4, 6, 8]}
           />
         );
      }else if (playCate.get('id') === 44 && playKind.get('id') === 322) {
        // 其他系列 三星和值
        return (
          <HeZhiType
            id={playKind.get('id')}
            labels={['和值']}
            numbers={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27]}
            indexs={[1, 3, 6, 10, 15, 21, 28, 36, 45, 55, 63, 69, 73, 75, 75, 73, 69, 63, 55, 45, 36, 28, 21, 15, 10, 6, 3, 1]}
          />
        )

      }else if (playCate.get('id') === 44 && playKind.get('id') === 506) {
        // 其他系列 前二和值
        return (
          <HeZhiType
            id={playKind.get('id')}
            labels={['和值']}
            numbers={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]}
            indexs={[1, 2, 3, 4, 5, 6, 7, 8, 9,20,9,8,7,6,5,4,3,2,1]}
          />
        )
      }else if (playCate.get('id') === 44 && playKind.get('id') === 507) {
      // 其他系列 后二和值
        return (
          <HeZhiType
            id={playKind.get('id')}
            labels={['和值']}
            numbers={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]}
            indexs={[1, 2, 3, 4, 5, 6, 7, 8, 9,20,9,8,7,6,5,4,3,2,1]}
          />
        )
      }else if(playCate.get('id') === 97 && playKind.get('id') === 600) {
        // 香港彩特码
        return (
          <HKBet
            selectLotteryNumbers={selectLotteryNumbers}
            id={playKind.get('id')}
            lId={this.props.lId}
          />
        );
      }else if(playCate.get('id') === 97 && playKind.get('id') === 601) {
        // 香港彩两面
        return (
          <HKBet
            selectLotteryNumbers={selectLotteryNumbers}
            id={playKind.get('id')}
            lId={this.props.lId}
          />
        );
      }else if(playCate.get('id') === 96 && playKind.get('id') === 602) {
        // 香港彩两面
        return (
          <HKBet
            selectLotteryNumbers={selectLotteryNumbers}
            id={playKind.get('id')}
            lId={this.props.lId}
          />
        );
      }
    }
    // 没有匹配任何玩法
    return <div />;
  }
}

export default PlayKindComponents;
