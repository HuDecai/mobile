// import { changeSelectLotteryNumbers } from '../../../actions/LotteryAction';
import { changeSelectLotteryNumbers } from '../../actions/LoginAction';
import CountNum from './CountNum';
var lengthError = function(detail,length)
{
    var res = detail && detail.match(/\d+/g)
    if(res == null)
    {
        return '号码选择不完整，请重新选择';
    }
    if(res.length < length)
    {
        return '号码选择不完整，请重新选择';
    }
}

function uniqueComma(detail, split) {
    var arr = detail.split(split)
    var result = [], hash = {};
    for (var i = 0, elem; (elem = arr[i]) != null; i++) {
        if (!hash[elem]) {
            result.push(elem);
            hash[elem] = true;
        }
    }
    return result.join(split);
}

// 检查当前选号是否合法
const checkNumbers = (selectLotteryNumbers, playKindId, shouldAlert = false) => {
  if (!selectLotteryNumbers) {
    alert('请选择号码');
    return;
  }
  let selectLotteryNumbersArr = [];
  switch (playKindId) {
    case 7:
      selectLotteryNumbersArr = selectLotteryNumbers.split(',');
      selectLotteryNumbersArr = selectLotteryNumbersArr.filter(item => !!item);
    if (selectLotteryNumbersArr.length != 5) {
        shouldAlert && alert('必须选中5个位置的球');
        return;
    } else {
      return true;
    }
    break;
    case 10:
    case 13:
    case 16:
    case 285:
    case 379:
    case 380:
      selectLotteryNumbersArr = selectLotteryNumbers.split(',');
      selectLotteryNumbersArr = selectLotteryNumbersArr.filter(item => !!item);
      if(selectLotteryNumbersArr.length != 3) {
        shouldAlert && alert('必须选中3个位置的球');
        return;
      } else {
        return true;
      }
      break;
    case 11:
    case 14:
    case 17:
    case 287:
      selectLotteryNumbersArr = selectLotteryNumbers.split(',');
    if(selectLotteryNumbersArr[0] != undefined && selectLotteryNumbersArr[0].length < 2)
    {
      shouldAlert && alert('组三至少要选中2个球');
      return;
    } else {
        //计算注数
      return true;
    }
      break;
    case 12:
    case 15:
    case 18:
    case 288:
      selectLotteryNumbersArr = selectLotteryNumbers.split(',');
      if(selectLotteryNumbersArr[0] != undefined && selectLotteryNumbersArr[0].match(/(\d+)/g).length < 3) {
        shouldAlert && alert('组六至少要选中3个球');
        return;
      } else {
        //计算注数
        return true;
      }
      break;
    case 19:
    case 21:
    case 377:
    case 378:
    case 500:
    case 503:
      selectLotteryNumbersArr = selectLotteryNumbers.split(',');
      selectLotteryNumbersArr = selectLotteryNumbersArr.filter(item => !!item);
      if(selectLotteryNumbersArr.length != 2) {
        shouldAlert && alert('必须选中2个位置的球');
        return;
      } else {
        return true;
      }
      break;
    case 504:
    selectLotteryNumbersArr = selectLotteryNumbers.split('#');
    for (var i = 0; i < selectLotteryNumbersArr.length; i++) {
      if (selectLotteryNumbersArr[i].length != 2) {
        shouldAlert && alert('有问题.请修正.只允许输入2位数字');
        return;
      }
    }
    return true;
    break;
    case 20:
    case 22:
    case 502:
    case 505:
      selectLotteryNumbersArr = selectLotteryNumbers.split(',');
      try{
        if(selectLotteryNumbersArr[0].length < 2)
        {
          shouldAlert && alert('组二至少要选中2个球');
          return;
        } else {
          return true;
        }
      } catch (e) {
          shouldAlert && alert('组二至少要选中2个球');
          return;
      }
      break;
    case 435:
    case 24:
    case 34:
    case 35:
    case 37:
    case 319:
    case 352:
    case 353:
    case 354:
    case 355:
    case 371:
    case 373:
    case 389:
    case 395:
    case 401:
    case 490:
      selectLotteryNumbersArr = selectLotteryNumbers.split(',');
      selectLotteryNumbersArr = selectLotteryNumbersArr.filter(item => !!item);
      if(selectLotteryNumbersArr.length < 1) {
        shouldAlert && alert('必须选中1个号码');
        return;
      } else {
        return true;
      }
      break;
    case 409:
    case 410:
    case 411:
    case 23:
    case 119:
    case 129:
    case 291:
    case 292:
    case 321:
    case 337:
      selectLotteryNumbersArr = selectLotteryNumbers.split(',');
      selectLotteryNumbersArr = selectLotteryNumbersArr.filter(item => !!item);
      if(selectLotteryNumbersArr.length < 1) {
        shouldAlert && alert('定位胆必须选中1个位置的球');
        return;
      } else {
        return true;
      }
      break;
    case 61:
    case 62:
    case 63:
    case 286:
      selectLotteryNumbersArr = selectLotteryNumbers.split('#');
      for (var i = 0; i < selectLotteryNumbersArr.length; i++) {
        if (selectLotteryNumbersArr[i].length != 3) {
          shouldAlert && alert('有问题.请修正.只允许输入3位数字');
          return;
        }
      }
      return true;
      break;
    case 64:
    case 65:
    case 501:
    selectLotteryNumbersArr = selectLotteryNumbers.split('#');
    for (var i = 0; i < selectLotteryNumbersArr.length; i++) {
      if (selectLotteryNumbersArr[i].length != 2) {
        shouldAlert && alert('有问题.请修正.只允许输入2位数字');
        return;
      }
    }
    return true;
    break;
    break;
    case 60:
    case 68:
      selectLotteryNumbersArr = selectLotteryNumbers.split(',');
      selectLotteryNumbersArr = selectLotteryNumbersArr.filter(item => !!item);
      if (selectLotteryNumbersArr.length != 4) {
          shouldAlert && alert('必须选中4个位置的球');
          return;
      } else {
        return true;
      }
      break;
    case 66:
      selectLotteryNumbersArr = selectLotteryNumbers.split('#');
      for (var i = 0; i < selectLotteryNumbersArr.length; i++) {
        if (selectLotteryNumbersArr[i].length != 5) {
          shouldAlert && alert('有问题.请修正.只允许输入5位数字');
          return;
        }
      }
      return true;
      break;
    case 67:
    case 71:
      selectLotteryNumbersArr = selectLotteryNumbers.split('#');
      for (var i = 0; i < selectLotteryNumbersArr.length; i++) {
        if (selectLotteryNumbersArr[i].length != 4) {
          shouldAlert && alert('有问题.请修正.只允许输入4位数字');
          return;
        }
      }
      return true;
      break;
    case 46:
      if(selectLotteryNumbers.split('-').length < 5) {
        shouldAlert && alert('必须选中五个号码');
        return;
      }
      return true;
      break;
    case 344:
      selectLotteryNumbersArr = selectLotteryNumbers.split(',');
      selectLotteryNumbersArr = selectLotteryNumbersArr.filter(item => !!item);
      if(selectLotteryNumbersArr.length < 1) {
        shouldAlert && alert('猜中位必须选中一个号码');
        return;
      }
      return true;
      break;
    case 345:
      selectLotteryNumbersArr = selectLotteryNumbers.split(',');
      selectLotteryNumbersArr = selectLotteryNumbersArr.filter(item => !!item);
      if(selectLotteryNumbersArr.length < 1) {
        shouldAlert && alert('定单双必须选中一个号码');
        return;
      }
      return true;
      break;
    case 346:
      if(selectLotteryNumbers.split('-').length < 5) {
        shouldAlert && alert('必须选中五个号码');
        return;
      }
      return true;
      break;
    case 347:
      // FIXME: 此处计算需确认
      selectLotteryNumbersArr = selectLotteryNumbers.split(',');
      if (!selectLotteryNumbersArr[0] || selectLotteryNumbersArr[0].split('-').length < 1) {
        shouldAlert && alert('二重号必须选中1个号码');
        return;
      } else if (!selectLotteryNumbersArr[1] || selectLotteryNumbersArr[1].split('-').length < 3) {
        shouldAlert && alert('单​号位不能选择少于3个号码');
        return;
      }
      return true;
      break;
    //组选30
    case 348:
      selectLotteryNumbersArr = selectLotteryNumbers.split(',');
      if (lengthError(selectLotteryNumbersArr[0],2)) {
        shouldAlert && alert(lengthError(selectLotteryNumbersArr[0],2));
        return;
      } else if (lengthError(selectLotteryNumbersArr[1],1)) {
        shouldAlert && alert(lengthError(selectLotteryNumbersArr[1],1));
        return;
      } else {
        return true;
      }
      break;
    case 349:
      selectLotteryNumbersArr = selectLotteryNumbers.split(',');
      if (!selectLotteryNumbersArr[0] || selectLotteryNumbersArr[0].split('-').length < 1) {
        shouldAlert && alert('三重号必须选中1个号码');
        return;
      } else if (selectLotteryNumbersArr[1].split('-').length < 2) {
        shouldAlert && alert('单号必须选中2个号码');
        return;
      }
      return true;
      break;
    case 350:
    case 351:
      selectLotteryNumbersArr = selectLotteryNumbers.split(',');
      if (lengthError(selectLotteryNumbersArr[0],1)) {
        shouldAlert && alert(lengthError(selectLotteryNumbersArr[0],1));
        return;
      } else if (lengthError(selectLotteryNumbersArr[1],1)) {
        shouldAlert && alert(lengthError(selectLotteryNumbersArr[1],1));
        return;
      } else {
        return true;
      }
      break;
    case 322:
    case 364:
    case 365:
    case 366:
      return true;
      break;
    case 323:
      selectLotteryNumbersArr = selectLotteryNumbers.split(',');
      selectLotteryNumbersArr = selectLotteryNumbersArr.filter(item => !!item);
      if(selectLotteryNumbersArr.length < 1) {
        shouldAlert && alert('任选一必须选中1个球');
        return;
      } else {
        return true;
      }
      break;
    case 324:
    case 412:
      if(selectLotteryNumbers.split('-').length < 2) {
        shouldAlert && alert('任选二必须选中2个球');
        return;
      }
      return true;
      break;
    case 325:
    case 413:
      if(selectLotteryNumbers.split('-').length < 3) {
        shouldAlert && alert('任选三必须选中3个球');
        return;
      }
      return true;
      break;
    case 326:
    case 414:
      if(selectLotteryNumbers.split('-').length < 4) {
        shouldAlert && alert('任选四必须选中4个球');
        return;
      }
      return true;
      break;
    case 327:
    case 415:
      if(selectLotteryNumbers.split('-').length < 5) {
        shouldAlert && alert('任选五必须选中5个球');
        return;
      }
      return true;
      break;
    case 328:
    case 416:
    if(selectLotteryNumbers.split('-').length < 6) {
      shouldAlert && alert('任选六必须选中6个球');
      return;
    }
    return true;
    break;
    case 329:
    case 417:
      if(selectLotteryNumbers.split('-').length < 7) {
        shouldAlert && alert('任选七必须选中7个球');
        return;
      }
      return true;
      break;
    case 330:
    case 418:
      if(selectLotteryNumbers.split('-').length < 8) {
        shouldAlert && alert('任选八必须选中8个球');
        return;
      }
      return true;
      break;
    case 367:
    case 368:
    case 506:
    case 507:
      return true;
      break;
    case 424:
      return true;
      break;
    case 426:
      var re = new RegExp('[0-9]+','g')
      var tmp = [];
      var valid = true;
      try{
          $(selectLotteryNumbers.match(re)).each(function(i,v){
              if(v > 10 || v < 1) {
                shouldAlert && alert('号码"'+v+'"有误,请检查并重新输入');
                valid = false;
              }
          })
          selectLotteryNumbersArr = selectLotteryNumbers.split('#');
          $(selectLotteryNumbersArr).each(function(i,v){
            const targetValue = v && v.split(',');
            let uniqueValue = v && uniqueComma(v, ',');
            uniqueValue = uniqueValue && uniqueValue.split(',');
            console.warn(targetValue, uniqueValue);
            if (targetValue.length !== uniqueValue.length) {
              shouldAlert && alert('输入的参数不正确，请重试。');
              valid = false;
            }
          })
          return valid;
      } catch(e){
        console.warn(e);
      }
      break;
    case 428:
      var re = new RegExp('[0-9]+','g')
      var tmp = [];
      var valid = true;
      try{
          $(selectLotteryNumbers.match(re)).each(function(i,v){
              if(v > 10 || v < 1) {
                shouldAlert && alert('号码"'+v+'"有误,请检查并重新输入');
                valid = false;
              }
          })
          selectLotteryNumbersArr = selectLotteryNumbers.split('#');
          $(selectLotteryNumbersArr).each(function(i,v){
            const targetValue = v && v.split(',');
            let uniqueValue = v && uniqueComma(v, ',');
            uniqueValue = uniqueValue && uniqueValue.split(',');
            console.warn(targetValue, uniqueValue);
            if (targetValue.length !== uniqueValue.length) {
              shouldAlert && alert('输入的参数不正确，请重试。');
              valid = false;
            }
          })
          return valid;
      } catch(e){
        console.warn(e);
      }
      break;
    case 475:
      var re = new RegExp('[0-9]+','g')
      var tmp = [];
      var valid = true;
      try{
          $(selectLotteryNumbers.match(re)).each(function(i,v){
              if(v > 10 || v < 1) {
                shouldAlert && alert('号码"'+v+'"有误,请检查并重新输入');
                valid = false;
              }
          })
          selectLotteryNumbersArr = selectLotteryNumbers.split('#');
          $(selectLotteryNumbersArr).each(function(i,v){
            const targetValue = v && v.split(',');
            let uniqueValue = v && uniqueComma(v, ',');
            uniqueValue = uniqueValue && uniqueValue.split(',');
            console.warn(targetValue, uniqueValue);
            if (targetValue.length !== uniqueValue.length) {
              shouldAlert && alert('输入的参数不正确，请重试。');
              valid = false;
            }
          })
          return valid;
      } catch(e){
        console.warn(e);
      }
      break;
    case 497:
      var re = new RegExp('[0-9]+','g')
      var tmp = [];
      var valid = true;
      try {
        selectLotteryNumbersArr = selectLotteryNumbers.split(',');
        selectLotteryNumbersArr = selectLotteryNumbersArr.filter(item => !!item);
        if(selectLotteryNumbersArr.length != 2) {
          shouldAlert && alert('输入的参数不正确，请重试。');
          return;
        } else {
          $(selectLotteryNumbers.match(re)).each(function(i,v){
              if(v > 11 || v < 1) {
                shouldAlert && alert('号码"'+v+'"有误,请检查并重新输入');
                valid = false;
              }
          });
          let uniqueNumbersArr = uniqueComma(selectLotteryNumbers, ',');
          uniqueNumbersArr = uniqueNumbersArr && uniqueNumbersArr. split(',');
          if (uniqueNumbersArr.length !== selectLotteryNumbersArr.length) {
            shouldAlert && alert('输入的参数不正确，请重试。');
            valid = false;
          }
          return valid;
        }
      } catch(e) {
        console.warn(e);
      }
      break;
    case 499:
      var re = new RegExp('[0-9]+','g')
      var tmp = [];
      var valid = true;
      try{
        selectLotteryNumbersArr = selectLotteryNumbers.split('-');
        selectLotteryNumbersArr = selectLotteryNumbersArr.filter(item => !!item);
          $(selectLotteryNumbers.match(re)).each(function(i,v){
              if(v > 11 || v < 1) {
                shouldAlert && alert('号码"'+v+'"有误,请检查并重新输入');
                valid = false;
              }
          })
          let uniqueNumbersArr = uniqueComma(selectLotteryNumbers, '-');
          uniqueNumbersArr = uniqueNumbersArr && uniqueNumbersArr. split('-');
          console.warn(selectLotteryNumbers, uniqueNumbersArr, selectLotteryNumbersArr);
          if (uniqueNumbersArr.length !== selectLotteryNumbersArr.length) {
            shouldAlert && alert('输入的参数不正确，请重试。');
            valid = false;
          }
          return valid;
      } catch(e){
      }
      break;
    case 339:
    case 421:
    case 493:
      var re = new RegExp('[0-9]+','g')
      var tmp = [];
      var valid = true;
      try {
        selectLotteryNumbersArr = selectLotteryNumbers.split(',');
        selectLotteryNumbersArr = selectLotteryNumbersArr.filter(item => !!item);
        if(selectLotteryNumbersArr.length != 3) {
          shouldAlert && alert('输入的参数不正确，请重试。');
          return;
        } else {
          $(selectLotteryNumbers.match(re)).each(function(i,v){
              if(v > 11 || v < 1) {
                shouldAlert && alert('号码"'+v+'"有误,请检查并重新输入');
                valid = false;
              }
          });
          let uniqueNumbersArr = uniqueComma(selectLotteryNumbers, ',');
          uniqueNumbersArr = uniqueNumbersArr && uniqueNumbersArr. split(',');
          if (uniqueNumbersArr.length !== selectLotteryNumbersArr.length) {
            shouldAlert && alert('输入的参数不正确，请重试。');
            valid = false;
          }
          return valid;
        }
      } catch(e) {
        console.warn(e);
      }
    break;
    case 495:
        var re = new RegExp('[0-9]+','g')
        var tmp = [];
        var valid = true;
        try{
          selectLotteryNumbersArr = selectLotteryNumbers.split('-');
          selectLotteryNumbersArr = selectLotteryNumbersArr.filter(item => !!item);
            $(selectLotteryNumbers.match(re)).each(function(i,v){
                if(v > 11 || v < 1) {
                  shouldAlert && alert('号码"'+v+'"有误,请检查并重新输入');
                  valid = false;
                }
            })
            let uniqueNumbersArr = uniqueComma(selectLotteryNumbers, '-');
            uniqueNumbersArr = uniqueNumbersArr && uniqueNumbersArr. split('-');
            console.warn(selectLotteryNumbers, uniqueNumbersArr, selectLotteryNumbersArr);
            if (uniqueNumbersArr.length !== selectLotteryNumbersArr.length) {
              shouldAlert && alert('输入的参数不正确，请重试。');
              valid = false;
            }
            return valid;
        } catch(e){
        }
        break;
    case 427:
    case 492:
      selectLotteryNumbersArr = selectLotteryNumbers.split(',');
      selectLotteryNumbersArr = selectLotteryNumbersArr.filter(item => !!item);
      if(selectLotteryNumbersArr.length != 3) {
        shouldAlert && alert('复式必选选择3个位置');
        return;
      } else {
        return true;
      }
    break;
    case 494:
      selectLotteryNumbersArr = selectLotteryNumbers.split('-');
      selectLotteryNumbersArr = selectLotteryNumbersArr.filter(item => !!item);
      if(selectLotteryNumbersArr.length < 3) {
        shouldAlert && alert('前三组选至少要选中3个球');
        return;
        } else {
          return true;
          num = count_num.org_6(detail)
        }
        break;
    case 425:
    case 496:
      selectLotteryNumbersArr = selectLotteryNumbers.split(',');
      selectLotteryNumbersArr = selectLotteryNumbersArr.filter(item => !!item);
      if(selectLotteryNumbersArr.length != 2) {
        shouldAlert && alert('复式必选选择2个位置');
        return;
      } else {
        return true;
      }
      break;
    case 498: //11xuan5 前二组选复式
      selectLotteryNumbersArr = selectLotteryNumbers.split('-');
      selectLotteryNumbersArr = selectLotteryNumbersArr.filter(item => !!item);
      try{
        if(selectLotteryNumbersArr.length < 2) {
          shouldAlert && alert('前二组选要选中2个球');
          return;
        } else {
          return true;
        }
      } catch (e) {
        shouldAlert && alert('前二组选要选中2个球');
        return;
      }
      break;
    case 460:
    case 461:
    case 462:
    case 463:
    case 464:
    case 465:
    case 466:
    case 467:
    case 468:
    case 469:
    case 476:
    case 477:
    case 478:
    case 479:
    case 480:
      if (!selectLotteryNumbers) {
        shouldAlert && alert('龙虎和必须选中1个位置');
        return;
      } else {
        return true;
      }
      break;
    case 481:
      if(selectLotteryNumbers.length < 1) {
        shouldAlert && alert('和值必须选中1个位置的球');
        return;
      } else {
        return true;
        num = 0;
        var arr = detail.match(/(\d+)/g)
        num = arr.length
      }
      break;
    case 474:
      selectLotteryNumbersArr = selectLotteryNumbers.split(',');
      selectLotteryNumbersArr = selectLotteryNumbersArr.filter(item => !!item);
      if(selectLotteryNumbersArr.length != 4) {
        shouldAlert && alert('复式必选选择4个位置');
        return;
      } else {
        return true;
      }
      break;
    default:
  }
}
export default checkNumbers;
