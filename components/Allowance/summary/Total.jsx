import "./Total.scss";
import React from "react";
import { AiOutlineArrowUp, AiOutlineArrowDown } from "react-icons/ai";
import { FcMoneyTransfer } from "react-icons/fc";
import { MdOutlineMoneyOffCsred } from "react-icons/md";
import {
  AiTwotoneEdit,
  AiOutlineArrowRight,
  AiOutlineArrowLeft,
} from "react-icons/ai";

const TOTAL = ({ ALLOWANCE_SPONSORS }) => {
  const totalAllowanceOwed = 2400;
  const totalAllowanceReceived = ALLOWANCE_SPONSORS?.reduce((acc, val) => {
    acc += val?.allowance;
    return acc;
  }, 0);
  const missingPayment = totalAllowanceOwed - totalAllowanceReceived;
  const percentageReceived = Math.trunc(
    (totalAllowanceReceived / totalAllowanceOwed) * 100
  );
  const percentageMissing = Math.trunc(
    (missingPayment / totalAllowanceOwed) * 100
  );

  return (
    <>
      <div className="payments_widgets">
        <div className="top_left top_widget">
          <h5 className="widget_title">Recus</h5>
          <span className="perc_allowance perc_left">
            {percentageReceived}%
            <span>
              {percentageReceived > 50 ? (
                <AiOutlineArrowUp className="perc_icons" />
              ) : percentageReceived === 50 ? (
                <AiOutlineArrowRight className="perc_icons" />
              ) : (
                <AiOutlineArrowDown className="perc_icons" />
              )}
            </span>
          </span>
          <h2>
            <span>$</span> {totalAllowanceReceived}
          </h2>
          <span>
            <FcMoneyTransfer className="icon_message im_left" />
          </span>
        </div>
        <div className="top_right top_widget">
          <h5 className="widget_title">Manquant</h5>
          <span className="perc_allowance perc_right">
            {percentageMissing}%
            <span>
              {percentageMissing > 50 ? (
                <AiOutlineArrowUp className="perc_icons" />
              ) : percentageMissing === 50 ? (
                <AiOutlineArrowRight className="perc_icons" />
              ) : (
                <AiOutlineArrowDown className="perc_icons" />
              )}
            </span>
          </span>
          <h2>
            <span>$</span> {missingPayment}
          </h2>
          <span>
            <MdOutlineMoneyOffCsred className="icon_message im_right" />
          </span>
        </div>
      </div>
      <div className="remaining_payments"></div>
    </>
  );
};

export default React.memo(TOTAL);
