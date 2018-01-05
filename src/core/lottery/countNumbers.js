import CountNum from './CountNum';
import checkNumbers from './checkNumbers';
// 检查当前选号是否合法
const countNumbers = (selectLotteryNumbers, playKindId) => {
  let arr;
  let arrTmp;
  let num = 0;
  if (!selectLotteryNumbers) {
    return 0;
  } else if (!checkNumbers(selectLotteryNumbers, playKindId)){
    return 0;
  }
  switch (playKindId) {
    case 7:
      return CountNum.mul(selectLotteryNumbers);
      break;
    case 10:
    case 13:
    case 16:
    case 285:
    case 379:
    case 380:
      return CountNum.mul(selectLotteryNumbers);
      break;
    case 11:
    case 14:
    case 17:
    case 287:
      return CountNum.org_3(selectLotteryNumbers);
      break;
    case 12:
    case 15:
    case 18:
    case 288:
      return CountNum.org_6(selectLotteryNumbers);
      break;
    case 19:
    case 21:
    case 377:
    case 378:
    case 500:
    case 503:
      return CountNum.mul(selectLotteryNumbers);
      break;
    case 20:
    case 22:
    case 502:
    case 505:
      return CountNum.org_2(selectLotteryNumbers)/2;
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
      return CountNum.position(selectLotteryNumbers);
      break;
    case 61:
    case 62:
    case 63:
    case 64:
    case 65:
    case 286:
    case 501:
    case 504:
      return CountNum.single(CountNum.unique(selectLotteryNumbers));
      break;
    case 60:
    case 68:
      return CountNum.mul(selectLotteryNumbers);
      break;
    case 66:
      return CountNum.single(CountNum.unique(selectLotteryNumbers));
      break;
    case 67:
    case 71:
      return CountNum.single(CountNum.unique(selectLotteryNumbers));
      break;
    case 344:
      return selectLotteryNumbers.split('-').length;
      break;
    case 345:
      return selectLotteryNumbers.split('-').length;
      break;
    case 346:
      arr = selectLotteryNumbers.match(/(\d+)/g);
      return CountNum.groupSelection(arr.length, 5);
      break;
    case 347:
      return CountNum.groupSelectionMore(selectLotteryNumbers,3,1);
      break;
    case 348:
      return CountNum.groupSelectionMore(selectLotteryNumbers,1,2);
    case 349:
      return CountNum.groupSelectionMore(selectLotteryNumbers,2,1);
    case 350:
    case 351:
      return CountNum.groupSelectionMore(selectLotteryNumbers,1,1);
    case 322:
    case 364:
    case 365:
    case 366:
      arrTmp = [1,3,6,10,15,21,28,36,45,55,63,69,73,75,75,73,69,63,55,45,36,28,21,15,10,6,3,1];
      arr = selectLotteryNumbers && selectLotteryNumbers.split('-');
      arr && arr.forEach((item, index) => {
        num += arrTmp[item];
      });
      return num;
      break;
    case 323:
      return selectLotteryNumbers.split('-').length;
      break;
    case 324:
    case 412:
      return CountNum.mul_allow_2(selectLotteryNumbers);
      break;
    case 325:
    case 413:
      return CountNum.mul_allow_3(selectLotteryNumbers);
      break;
    case 326:
    case 414:
      return CountNum.mul_allow_4(selectLotteryNumbers);
      break;
    case 327:
    case 415:
      return CountNum.mul_allow_5(selectLotteryNumbers);
      break;
    case 328:
    case 416:
      return CountNum.mul_allow_6(selectLotteryNumbers);
      break;
    case 329:
    case 417:
      return CountNum.mul_allow_7(selectLotteryNumbers);
      break;
    case 330:
    case 418:
      return CountNum.mul_allow_8(selectLotteryNumbers);
      break;
    case 367:
    case 368:
    case 506:
    case 507:
      arrTmp = [1,2,3,4,5,6,7,8,9,10,9,8,7,6,5,4,3,2,1];
      arr = selectLotteryNumbers && selectLotteryNumbers.split('-');
      arr && arr.forEach((item, index) => {
        num += arrTmp[item];
      });
      return num;
      break;
    case 424:
      return CountNum.position(selectLotteryNumbers)
      break;
    case 425:
    case 496:
      return CountNum.shiyi_mul_2(selectLotteryNumbers.replace(/,,/g,','));
      break;
    case 426:
      return CountNum.single(selectLotteryNumbers);
      break;
    case 428:
      return CountNum.single(selectLotteryNumbers);
      break;
    case 475:
      return CountNum.single(selectLotteryNumbers);
    case 497:
    case 493:
      return CountNum.single(CountNum.unique(selectLotteryNumbers));
      break;
    case 427:
    case 492:
      return CountNum.shiyi_mul(selectLotteryNumbers.replace(/,,/g,','));
      break;
    case 494:
    case 495:
      return CountNum.org_6(selectLotteryNumbers)
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
      return selectLotteryNumbers && selectLotteryNumbers.split('-').length;
      break;
    case 481:
      arr = selectLotteryNumbers.match(/(\d+)/g)
      return arr.length
      break;
    case 474:
      return CountNum.shiyi_mul_4(selectLotteryNumbers.replace(/,,/g,','));
    case 498:
    case 499:
      return CountNum.org_2(selectLotteryNumbers)/2;
    default:
      return 0;
  }
}
export default countNumbers;
