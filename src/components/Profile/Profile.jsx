import React from "react";
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

import {
  AiTwotoneEdit,
  AiOutlineArrowRight,
  AiOutlineArrowLeft,
} from "react-icons/ai";
import { BsCardHeading } from "react-icons/bs";

const Profile = () => {
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
            <p>Total contributions</p>
          </div>

          <div className="charts_total">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart width={300} height={100} data={data}>
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
              3000 <span>$</span>
            </h5>
          </div>
        </div>
        <div className="recent_transactions detail_card">
          <div className="trans_titles">
            <BsCardHeading className="personal_icon" />
            <p>Transactions</p>
          </div>
          <div className="transactions">
            <ul>
              <li>
                <AiOutlineArrowRight className="trans_icons" />
                <span className="trans_amount">500</span> <span>$</span>
                <div className="stamp">
                  <span>22/03/11</span>
                </div>
              </li>
              <li>
                <AiOutlineArrowRight className="trans_icons" />
                <span className="trans_amount">200</span> <span>$</span>
                <div className="stamp">
                  <span>22/02/01</span>
                </div>
              </li>
              <li>
                <AiOutlineArrowRight className="trans_icons" />
                <span className="trans_amount">150</span> <span>$</span>
                <div className="stamp">
                  <span>22/01/12</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className="current_projects detail_card">
          2<div className="add_project">2/5 form</div>
        </div>
      </div>
    </>
  );
};

export default Profile;
