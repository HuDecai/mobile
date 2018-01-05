/**
 * Created by leiyouwho on 6/29/16.
 */

class HandleAction {
  constructor(type) {
    this.type = type;
    this.requestCallBack = (state) => {
      return state.set('isFetching', true).set('errMsg', '');
    }
    this.successCallBack = (state) => {
      return state.set('isFetching', false).set('errMsg', '');
    }
    this.failureCallBack = (state, action) => {
      return state.set('isFetching', false).set('errMsg', action.errMsg);
    }
  }
  request(requestCallBack) {
    this.requestCallBack = requestCallBack;
    return this;
  }
  success(successCallBack) {
    this.successCallBack = successCallBack;
    return this;
  }
  failure(failureCallBack) {
    this.failureCallBack = failureCallBack;
    return this;
  }
  catch(catchCallBack) {
    this.catchCallBack = catchCallBack;
    return this;
  }
}

export default HandleAction;
