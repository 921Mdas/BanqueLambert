import {
  GET_FAM_MEMBERS,
  GET_PARENT_ALLOWANCE,
  GET_MPASSA_INVESTMENT,
} from "../type";
import {
  ALL_FAMILY_MEMBERS,
  PARENT_ALLOWANCE,
  MPASSA_INVESTORS,
} from "../data";

export const getFamilyMembers = () => {
  return {
    type: GET_FAM_MEMBERS,
    payload: ALL_FAMILY_MEMBERS,
  };
};

export const getMpassaInvestors = () => {
  return {
    type: GET_MPASSA_INVESTMENT,
    payload: MPASSA_INVESTORS,
  };
};

export const getParentAllowance = () => {
  return {
    type: GET_PARENT_ALLOWANCE,
    payload: PARENT_ALLOWANCE,
  };
};
