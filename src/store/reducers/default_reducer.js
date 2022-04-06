import {
  GET_FAM_MEMBERS,
  GET_PARENT_ALLOWANCE,
  GET_MPASSA_INVESTMENT,
} from "../type";

const Default_Reducer = (state = {}, action) => {
  switch (action.type) {
    case GET_FAM_MEMBERS:
      return { ...state, familyMembers: action.payload };
    case GET_MPASSA_INVESTMENT:
      return { ...state, mpassainvestors: action.payload };
    case GET_PARENT_ALLOWANCE:
      return { ...state, parentAllowance: action.payload };
    default:
      return { state };
  }
};

export default Default_Reducer;
