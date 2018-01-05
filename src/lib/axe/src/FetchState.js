/**
 * Created by leiyouwho on 6/12/16.
 */

export const SUCCESS = (actionName: string) => {
  return `${actionName}_SUCCESS`;
};

export const FAILURE = (actionName: string) => {
  return `${actionName}_FAILURE`;
};

export const REQUEST = (actionName: string) => {
  return `${actionName}_REQUEST`;
};

export const CLEAR = (actionName: string) => {
  return `${actionName}_CLEAR`;
};
