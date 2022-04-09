import axios from "axios";
import {
  FAMILY_MEMBERS_API,
  PARENT_ALLOWANCE_API,
  MPASSA_API,
} from "../help.config";

// GET

const API = async URL => {
  const response = await axios.get(URL);
  const results = await response.data;
  return results;
};

// POST

// ALL GET
const ALL_FAMILY_MEMBERS = API(FAMILY_MEMBERS_API);
const MPASSA_INVESTORS = API(MPASSA_API);
const PARENT_ALLOWANCE = API(PARENT_ALLOWANCE_API);

export { ALL_FAMILY_MEMBERS, PARENT_ALLOWANCE, MPASSA_INVESTORS };
