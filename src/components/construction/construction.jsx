import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getMpassaInvestors } from "../../store/actions/index.actions";
import { FaRegMoneyBillAlt, FaMoneyBillAlt, FaBuilding } from "react-icons/fa";
import { FcMoneyTransfer } from "react-icons/fc";
import { BsBuilding } from "react-icons/bs";
import { MPASSA_API } from "../../help.config";
import { Number, Currency } from "react-intl-number-format";
import constrPic from "../../multimedia/construction_icon.png";
import { UPLOAD_PHOTO } from "../../help.config";
import {
  AiOutlineArrowUp,
  AiOutlineArrowDown,
  AiOutlineArrowRight,
} from "react-icons/ai";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";

const Construction = () => {
  const STATE = useSelector(state => state.Default_Reducer);
  console.log("main STATE", STATE);
  const [savedState, setSavedState] = useState(STATE);

  useEffect(async () => {
    await localStorage.getItem("stateStored");
    if (localStorage.getItem("stateStored")) {
      setSavedState(JSON.parse(localStorage.getItem("stateStored")));
    }
  }, []);

  return <CONSTRUCTION state={savedState} />;
};

const CONSTRUCTION = ({ state }) => {
  // main data source
  const MPASSA_CONTRIBUTORS = state.mpassainvestors;

  // get total, reduce method
  const createTotal = (arr, key) => {
    if (key) {
      return arr?.reduce((acc = 0, cur) => {
        acc += cur[key];
        return acc;
      }, 0);
    } else {
      return arr?.reduce((acc = 0, cur) => {
        acc += cur;
        return acc;
      }, 0);
    }
  };

  const totalInvested = createTotal(MPASSA_CONTRIBUTORS, "investment");

  // get unique total cost of all projects
  const totalCostsPR = [];
  const totalCostOfProject = MPASSA_CONTRIBUTORS?.map((val, i) => {
    const costRelated = val.cost;
    totalCostsPR.push(costRelated);
  });
  const uniqueCosts = Array.from(new Set(totalCostsPR));
  const AmountsNeeded = createTotal(uniqueCosts);
  const percentageMissing = `${Math.ceil(
    (totalInvested / AmountsNeeded) * 100
  )} %`;

  // get different project phases
  const getProjectPhase = (arr, filterkey, key) => {
    return arr?.filter(project => project[filterkey] === key);
  };

  // phase creator function
  const project_phases = [];
  uniqueCosts.forEach((cost, idx) => {
    const index = idx + 1;
    project_phases.push(
      getProjectPhase(MPASSA_CONTRIBUTORS, "phase_id", index)
    );
  });

  // getting data on load
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMpassaInvestors());
  }, [dispatch]);

  return (
    <div className="construction">
      <div className="construction_title">
        <BsBuilding className="construction_icon" /> <h1>Construction</h1>
      </div>
      <div className="total_received_construction">
        <img src={constrPic} alt="" />
        <TOTALWIDGET total={AmountsNeeded} title={"Cout total des projects"} />
        <TOTALWIDGET
          total={totalInvested}
          perc={percentageMissing}
          title={"Contributions recues"}
        />
      </div>
      <div className="phases_descriptions">
        <ConstructionPHASE data={project_phases} phase_cost={uniqueCosts} />
      </div>
      <div className="upload_schema">
        <PhotoUpload />
      </div>
    </div>
  );
};

const TOTALWIDGET = ({ total, title, perc }) => {
  return (
    <div className="constructions_total">
      <div className="all_construction_contributions">
        <div className="top_left top_widget">
          <h5 className="widget_title">{title}</h5>
          <div className="total_construction_amount">
            <span>
              <FcMoneyTransfer className="icon_construction_money" />
            </span>
            <Number locale="en-US" currency="USD">
              {total}
            </Number>
            <span>$</span>
          </div>
          <span className="perc_allowance perc_left">{perc}</span>
        </div>
      </div>
    </div>
  );
};

const ConstructionPHASE = ({ data, phase_cost }) => {
  return data?.map((phase, idx) => {
    return (
      <div className="Phase_Widget" key={phase.id}>
        <div className="phase_title">
          <h3>{phase[0]["project"]}</h3>
          <h6 className="phase_desc">{phase[0]["description"]}</h6>
          <span className="total_phase_desc_sections">
            <h3>{phase_cost[idx]} $</h3>
            <h5>Cout Total</h5>
          </span>
        </div>
        <div className="table">
          <table>
            <thead>
              <tr>
                <td>Investisseur</td>
                <td>Montant</td>
                <td>Date</td>
                <td>Pourcents</td>
                <td className="last-head-tab">supprimer</td>
              </tr>
            </thead>
            <tbody>
              {phase.map((ph, od) => {
                let total_inv = 0;
                total_inv += ph?.investment;
                return (
                  <tr key={od}>
                    <td>{ph.name}</td>
                    <td>{ph.investment}</td>
                    <td>{`${ph?.timestamp}`.substring(5, 7)}</td>
                    <td>
                      {`${Math.round(
                        (ph.investment / phase_cost[idx]) * 100
                      )} %`}
                    </td>
                    <td>x</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  });
};

const PhotoUpload = () => {
  function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== "") {
      var cookies = document.cookie.split(";");
      for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i].trim();
        if (cookie.substring(0, name.length + 1) === name + "=") {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  }
  // const formik = useFormik({
  //   initialValues: {
  //     photo-file: "",

  //   },

  //   onSubmit: (values, { resetForm }) => {
  //     uploadDataPhoto(values);
  //   },
  // });

  var csrftoken = getCookie("csrftoken");

  const options = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-CSRFToken": csrftoken,
    },
  };

  const uploadDataPhoto = async () => {
    await axios.post(UPLOAD_PHOTO, options);
  };

  return (
    <form
      action={UPLOAD_PHOTO}
      encType="multipart/form-data"
      className="aws-upload"
    >
      <input
        type="file"
        name="photo-file"
        id="photo-file"
        // {...formik.getFieldProps("photo_file")}
      />
      <br />
      <br />
      <input
        type="submit"
        className="btn-upload"
        value="Upload Photo"
        onClick={() => uploadDataPhoto()}
      />
      <input type="hidden" name="csrfmiddlewaretoken" value={csrftoken} />
    </form>
  );
};

export default Construction;
