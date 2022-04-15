import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import photo1 from "../../multimedia/photo_profile1.jpeg";
import { Button } from "react-bootstrap";
import { Number, Currency } from "react-intl-number-format";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useSelector, useDispatch } from "react-redux";
import Join_project_form from "./Join_project_form";
import {
  AiTwotoneEdit,
  AiOutlineArrowRight,
  AiOutlineArrowLeft,
} from "react-icons/ai";

import { BsCardHeading } from "react-icons/bs";
import { RiVisaLine } from "react-icons/ri";
import { MdOutlineLocalGroceryStore } from "react-icons/md";
import { BsCalendar2Date } from "react-icons/bs";
import { AiOutlineFundProjectionScreen } from "react-icons/ai";
import AllowanceForm from "../Allowance/Allow_form";
import Allowance from "../Allowance/Allowance";
import axios from "axios";
import { toast } from "react-toastify";
import {
  PARENT_ALLOWANCE_DELETE,
  UPDATE_ALLOWANCE,
  DETAIL_ROUTE,
} from "../../help.config";
import {
  getDetailedData,
  getParentAllowance,
} from "../../store/actions/index.actions";
import { style } from "@mui/system";

const FinalProfile = () => {
  const STATE = useSelector(state => state.Default_Reducer);
  const [savedState, setSavedState] = useState(STATE);

  useEffect(async () => {
    await localStorage.getItem("stateStored");
    if (localStorage.getItem("stateStored")) {
      setSavedState(JSON.parse(localStorage.getItem("stateStored")));
    }

    console.log("saved state", savedState);
  }, []);

  return <Profile state={savedState} />;
};

const Profile = ({ state }) => {
  // local methods
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [load, setLoad] = useState(false);
  const [updateinfo, setupdateinfo] = useState(false);
  const [account2update, setaccount2update] = useState({});
  const [toggleData, setToggleData] = useState(false);
  const { idnum } = useParams();

  // access the state
  const STATE = state;
  const ALLOWANCE_SPONSORS = STATE.parentAllowance;
  const TRANSACTIONS = STATE.transactions;

  // post allowance from profile
  const sendData = async (url, data) => {
    await axios.post(url, data).then(() => {
      navigate("/mensuels");
    });
    await toast.success(`${data.allowance} successfully sent`, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 500,
    });
    setTimeout(() => {
      window.location.reload(true);
    }, 1000);
  };

  // dispatch

  // display total allowance / total investment
  const toggleAllowanceInvestment = () => {
    setToggleData(!toggleData);
  };
  const transA = TRANSACTIONS && TRANSACTIONS[0];
  const transB = TRANSACTIONS && TRANSACTIONS[1];
  console.log("transaction A", STATE);
  const alltransactions = [];
  if (transA) {
    alltransactions.push(...transA);
  }
  if (transB) {
    alltransactions.push(...transB);
  }
  const sortedTransactions = alltransactions.sort((a, b) =>
    a.timestamp > b.timestamp ? -1 : 1
  );

  const allowances_total = alltransactions
    .filter(trans => trans?.allowance)
    .reduce((acc = 0, curVal) => {
      return (acc += +curVal?.allowance);
    }, 0);

  const investments_total = alltransactions
    .filter(trans => trans?.investment)
    .reduce((acc = 0, curVal) => {
      return (acc += +curVal?.investment);
    }, 0);

  const allSUM = investments_total + allowances_total;

  const detailedUser = ALLOWANCE_SPONSORS?.filter(
    member => member.fam_member_id === +idnum
  );

  const mydetails = detailedUser && detailedUser[0];
  const totalContrib =
    detailedUser &&
    detailedUser.reduce((acc, val) => {
      acc += val;
      return acc;
    }, 0);

  if (!sortedTransactions) {
    return <h1>oops something went wrong</h1>;
  }

  if (sortedTransactions) {
    console.log(sortedTransactions, "sorted");
    return (
      <>
        <div className="personal_profile">
          <div className="header">
            <div className="personal_details">
              <div className="profile_photo">
                <img src={photo1} />
              </div>
              <div className="personal_info">
                <h5 className="name">{mydetails?.name} - contributions</h5>
                <h6 className="city">{mydetails?.city}</h6>
              </div>
            </div>
          </div>
        </div>
        <div className="detailed_transactions">
          <div className="total_transactions detail_card">
            <div className="trans_titles">
              <RiVisaLine className="personal_icon_visa" />
              <Button
                onClick={toggleAllowanceInvestment}
                className="toggle_btn_contribution"
              >
                {toggleData ? "Provision" : "Construction"}
              </Button>
            </div>

            <div className="top_title">
              <div className="total_personal_contributions">
                <h6>Contribution Totale</h6>
                <div className="numbers">
                  <span>Total:</span>
                  <Number locale="en-US" currency="USD">
                    {allSUM}
                  </Number>
                  <span>$</span>
                </div>
              </div>
            </div>
          </div>
          <div className="recent_transactions detail_card">
            <div className="trans_titles">
              <BsCardHeading className="personal_icon transact_recent_icon" />
              <p>Paiements recents</p>
            </div>
            <div className="transactions">
              <ul>
                {sortedTransactions &&
                  sortedTransactions.map(trans => {
                    return (
                      <li key={trans?.id}>
                        <AiOutlineArrowRight className="trans_icons" />
                        <span className="trans_amount">
                          {trans?.allowance
                            ? trans?.allowance
                            : trans?.investment}{" "}
                          $
                        </span>
                        <div className="stamp">
                          <span>
                            <BsCalendar2Date className="date_icon" />{" "}
                            {trans?.timestamp?.substring(0, 10)}
                          </span>
                        </div>
                        <span className="project">
                          {trans?.investment ? (
                            <div>
                              <AiOutlineFundProjectionScreen className="project_icon" />
                              <span> Mpassa</span>
                            </div>
                          ) : (
                            <div>
                              <MdOutlineLocalGroceryStore className="project_icon" />
                              <span>Mensuel</span>
                            </div>
                          )}
                        </span>
                      </li>
                    );
                  })}
              </ul>
            </div>
          </div>
          <div className="current_projects">
            <AllowanceForm
              sendData={sendData}
              updateInfo={updateinfo}
              acc2update={account2update}
            />
          </div>
        </div>
      </>
    );
  }
};

export default FinalProfile;
