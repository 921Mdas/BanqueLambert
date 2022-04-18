import React, { useEffect, useState, useReducer, Suspense } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getDetailedData,
  getParentAllowance,
} from "../../store/actions/index.actions";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useNavigate } from "react-router-dom";
import { FaFileInvoiceDollar } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { AiOutlineBank } from "react-icons/ai";
import { SiFampay } from "react-icons/si";
import { Form, Button } from "react-bootstrap";

import {
  AiTwotoneEdit,
  AiOutlineArrowRight,
  AiOutlineArrowLeft,
} from "react-icons/ai";
import { AiFillEye } from "react-icons/ai";
import { FcFolder } from "react-icons/fc";
import axios from "axios";
import { toast } from "react-toastify";
import TOTAL from "./summary/Total";
import {
  PARENT_ALLOWANCE_API,
  PARENT_ALLOWANCE_DELETE,
  DETAIL_VIEW,
  DETAIL_ROUTE,
} from "../../help.config";

// components
import AllowanceForm from "./Allow_form";
import TrendingG from "./TrendingGraph/TrendingG";

const ALLOWANCE = () => {
  const [load, setLoad] = useState(false);
  const [updateinfo, setupdateinfo] = useState(false);
  const [account2update, setaccount2update] = useState({});
  const navigate = useNavigate();

  // get allowance data
  const ALLOWANCE_SPONSORS = useSelector(
    state => state.Default_Reducer.parentAllowance
  );
  const STATE = useSelector(state => state.Default_Reducer);

  useEffect(() => {
    localStorage.setItem("stateStored", JSON.stringify(STATE));
  }, [STATE]);

  console.log(ALLOWANCE_SPONSORS);

  // rows for table
  const rows = ALLOWANCE_SPONSORS;
  const sortedRows = rows?.sort((a, b) => (a.id > b.id ? -1 : 1));

  // make call for detail voiew
  const dispatch = useDispatch();

  const sendData = async (url, data) => {
    await axios.post(url, data);
    await toast.success(`${data.allowance} successfully sent`, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 500,
    });
    setTimeout(() => {
      window.location.reload(true);
    }, 1000);
  };

  const deleteOne = idx => {
    axios.post(`${PARENT_ALLOWANCE_DELETE}${idx}/`).then(() => {
      window.location.reload(true);
    });
    console.log("deleted");
  };

  const updateOne = idx => {
    const filteredAllowance = ALLOWANCE_SPONSORS.filter(
      allowance => allowance.id === idx
    );
    setaccount2update(filteredAllowance);
    setupdateinfo(true);
  };

  const detailView = async id => {
    await dispatch(getDetailedData(id));
    navigate(`${DETAIL_ROUTE}${id}`);
  };

  useEffect(() => {
    setLoad(true);
    dispatch(getParentAllowance()).then(() => {
      setLoad(false);
    });
  }, [dispatch]);

  return (
    <div className="allowance">
      <div className="allowance_title">
        <span>
          <SiFampay className="title_icon" />
        </span>
        <h1>Paiements Mensuels</h1>
      </div>

      <div className="exec_summary">
        <TOTAL ALLOWANCE_SPONSORS={ALLOWANCE_SPONSORS} />
      </div>

      <div className="trending_graph">
        <TrendingG ALLOWANCE_SPONSORS={ALLOWANCE_SPONSORS} />
      </div>

      {load ? (
        <div className="spin">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <TableContainer className="Allowance_Table" component={Paper}>
          <Table sx={{ maxWidth: "100%" }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell className="tab_mensuels">Membre</TableCell>
                <TableCell className="tab_mensuels" align="center">
                  Paiement
                </TableCell>
                <TableCell className="tab_mensuels" align="center">
                  Date
                </TableCell>
                <TableCell className="tab_mensuels" align="center">
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows &&
                sortedRows.map(row => (
                  <TableRow
                    key={row.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell
                      component="th"
                      scope="row"
                      className="pers_allowance_parent"
                      onClick={() => detailView(row.fam_member_id)}
                    >
                      <div className="person_view_portal">
                        <FcFolder className="person_allowance" /> {row.name}
                      </div>
                    </TableCell>
                    <TableCell align="center" className="payment_tab">
                      <span className="money_in">
                        {<AiOutlineArrowRight className="arrow_in" />}
                        {row.allowance} $
                      </span>
                    </TableCell>
                    <TableCell align="center">
                      {row.timestamp.substring(0, 10)}
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{ width: "10px", backgroundColor: "grey" }}
                      className="action_table"
                    >
                      <div className="action_content">
                        <button className="action_buttons">
                          <AiTwotoneEdit
                            className="act_icons update"
                            onClick={() => updateOne(row.id)}
                          />
                        </button>
                        <button>
                          <MdDeleteForever
                            className="act_icons delete"
                            onClick={() => deleteOne(row.id)}
                          />
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <div className="send_allowance">
        <AllowanceForm
          sendData={sendData}
          updateInfo={updateinfo}
          acc2update={account2update}
        />
      </div>
    </div>
  );
};

export default React.memo(ALLOWANCE);
