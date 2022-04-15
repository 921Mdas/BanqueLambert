import {
  GET_FAM_MEMBERS,
  GET_PARENT_ALLOWANCE,
  GET_MPASSA_INVESTMENT,
  GET_DETAIL_DATA,
} from "../type";
import {
  ALL_FAMILY_MEMBERS,
  PARENT_ALLOWANCE,
  MPASSA_INVESTORS,
  DETAIL_DATA,
} from "../data";

import axios from "axios";

import { DETAIL_VIEW } from "../../help.config";

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

export const getDetailedData = async id => {
  const response = await axios.get(`${DETAIL_VIEW}${id}/`);
  const results = await response.data;
  return {
    type: GET_DETAIL_DATA,
    payload: results,
  };
};
