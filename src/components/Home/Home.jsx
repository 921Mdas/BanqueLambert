import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "../Home/Home.scss";
import { getFamilyMembers } from "../../store/actions/index.actions";

// components
import ALLOWANCE from "../Allowance/Allowance";
import CONSTRUCTION from "../construction/construction";

const Home = () => {
  const FAMILY_MEMBERS = useSelector(state => state.Default_Reducer);
  const [globalEvent, setglobalEvent] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFamilyMembers());
  }, [dispatch]);

  return (
    <>
      <div className="main_app">
        <ALLOWANCE />
        <CONSTRUCTION />
      </div>
    </>
  );
};

export default Home;
