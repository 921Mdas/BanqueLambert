import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getMpassaInvestors } from "../../store/actions/index.actions";

const CONSTRUCTION = () => {
  const MPASSA_CONTRIBUTORS = useSelector(state => state.Default_Reducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMpassaInvestors());
  }, [dispatch]);

  return <h1>welcome back</h1>;
};

export default CONSTRUCTION;
