import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import photo1 from "../../multimedia/photo_profile1.jpeg";
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
import { GiPayMoney } from "react-icons/gi";
import { BsCalendar2Date } from "react-icons/bs";
import { AiOutlineFundProjectionScreen } from "react-icons/ai";
import AllowanceForm from "../Allowance/Allow_form";
import Allowance from "../Allowance/Allowance";
import axios from "axios";
import { toast } from "react-toastify";
import { PARENT_ALLOWANCE_DELETE, UPDATE_ALLOWANCE } from "../../help.config";

const Profile = () => {
  const navigate = useNavigate();
  const [load, setLoad] = useState(false);
  const [updateinfo, setupdateinfo] = useState(false);
  const [account2update, setaccount2update] = useState({});
  const ALLOWANCE_SPONSORS = useSelector(
    state => state.Default_Reducer.parentAllowance
  );
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

  const deleteOne = idx => {
    axios.post(`${PARENT_ALLOWANCE_DELETE}${idx}/`);
    console.log("click");
    window.location.reload(true);
  };

  const updateOne = idx => {
    const filteredAllowance = ALLOWANCE_SPONSORS.filter(
      allowance => allowance.id === idx
    );
    setaccount2update(filteredAllowance);
    setupdateinfo(true);
  };

  const data = [
    {
      name: "Page A",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Page B",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "Page C",
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "Page D",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "Page E",
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: "Page F",
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: "Page G",
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];
  return (
    <>
      <div className="personal_profile">
        <div className="header">
          <div className="personal_details">
            <div className="profile_photo">
              <img src={photo1} />
            </div>
            <div className="personal_info">
              <h5 className="name">John Doe</h5>
              <h6 className="city">Paris</h6>
            </div>
          </div>
        </div>
      </div>
      <div className="detailed_transactions">
        <div className="total_transactions detail_card">
          <div className="trans_titles">
            <BsCardHeading className="personal_icon" />
            <p>Contributions / Total</p>
          </div>

          <div className="charts_total">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart width={200} height={100} data={data}>
                <Line
                  type="monotone"
                  dataKey="pv"
                  stroke="#8884d8"
                  strokeWidth={2}
                />
                <Tooltip />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="top_title">
            <h5 className="total_personal_contributions">
              <span>Total:</span> 3000 <span>$</span>
            </h5>
          </div>
        </div>
        <div className="recent_transactions detail_card">
          <div className="trans_titles">
            <GiPayMoney className="personal_icon transact_recent_icon" />
            <p>Paiements recents</p>
          </div>
          <div className="transactions">
            <ul>
              <li>
                <AiOutlineArrowRight className="trans_icons" />
                <span className="trans_amount">500 $</span>
                <div className="stamp">
                  <span>
                    <BsCalendar2Date className="date_icon" /> 22/03/11
                  </span>
                </div>
                <span className="project">
                  <AiOutlineFundProjectionScreen className="project_icon" />{" "}
                  Mpassa
                </span>
              </li>
              <li>
                <AiOutlineArrowRight className="trans_icons" />
                <span className="trans_amount">500 $</span>
                <div className="stamp">
                  <span>
                    <BsCalendar2Date className="date_icon" /> 22/03/11
                  </span>
                </div>
                <span className="project">
                  <AiOutlineFundProjectionScreen className="project_icon" />{" "}
                  Mpassa
                </span>
              </li>
              <li>
                <AiOutlineArrowRight className="trans_icons" />
                <span className="trans_amount">500 $</span>
                <div className="stamp">
                  <span>
                    <BsCalendar2Date className="date_icon" /> 22/03/11
                  </span>
                </div>
                <span className="project">
                  <AiOutlineFundProjectionScreen className="project_icon" />{" "}
                  Mpassa
                </span>
              </li>
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
};

export default Profile;
