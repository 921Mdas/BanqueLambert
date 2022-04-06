import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Form, Button } from "react-bootstrap";
import { MdOutlineSendToMobile } from "react-icons/md";
import { IoSend } from "react-icons/io5";
import { BiEdit } from "react-icons/bi";
import { toast } from "react-toastify";
import axios from "axios";
import { getParentAllowance } from "../../store/actions/index.actions";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import {
  PARENT_ALLOWANCE_API,
  UPDATE_ALLOWANCE,
  PARENT_ALLOWANCE_DELETE,
} from "../../help.config";

const AllowanceForm = ({ sendData, updateInfo, acc2update }) => {
  const [showform, setShowForm] = useState(false);
  const AccToUpdate = acc2update[0];
  console.log(AccToUpdate);
  const handleShowForm = () => {
    setShowForm(!showform);
  };

  const formik = useFormik({
    initialValues: {
      fam_member: "",
      timestamp: "",
      allowance: "",
    },

    validationSchema: Yup.object({
      fam_member: Yup.string().required("Qui envoie?"),
      timestamp: Yup.date().required("Quelle date?"),
      allowance: Yup.number()
        .required("Quel montant?")
        .min(50, "Minimum 50 dollars svp"),
    }),

    onSubmit: (values, { resetForm }) => {
      if (!postMessage) return;
      const request = updateInfo
        ? `${UPDATE_ALLOWANCE}${AccToUpdate.id}/`
        : PARENT_ALLOWANCE_API;
      sendData(request, values).then(() => {
        resetForm();
      });
    },
  });

  useEffect(() => {
    setShowForm(true);
    formik.initialValues.allowance = AccToUpdate?.allowance;
    formik.initialValues.fam_member = AccToUpdate?.fam_member_id;
    formik.initialValues.timestamp = AccToUpdate?.timestamp;
    console.log(formik.initialValues.allowance);
  }, [updateInfo]);

  return (
    <div className="form_parent">
      <div className="allowance-add-title">
        <span>
          <MdOutlineSendToMobile className="phone_icon" />
        </span>
        <h5>
          {updateInfo
            ? `Modifier la contribution de ${AccToUpdate.name}`
            : `Ajouter une
          contribution`}
        </h5>
      </div>
      <div className="toggle_form">
        <Button
          className={updateInfo ? "bounce" : "dontbounce"}
          onClick={() => handleShowForm()}
        >
          {showform ? "-" : "+"}
        </Button>
      </div>

      {showform ? (
        <Form className="formulaire">
          <Form.Group>
            <Form.Control
              type="number"
              placeholder="montant"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              id="allowance"
              name="allowance"
              {...formik.getFieldProps("allowance")}
              className={formik.errors.allowance ? "redish" : "greenish"}
            />
            <div className="error_container">
              {formik.errors.allowance && formik.touched.allowance ? (
                <p className="form_notif">{formik.errors.allowance}</p>
              ) : null}
            </div>
          </Form.Group>

          <Form.Group>
            <Form.Select
              aria-label="Default select example"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              id="fam_member"
              name="fam_member"
              {...formik.getFieldProps("fam_member")}
              className={formik.errors.fam_member ? "redish" : "greenish"}
            >
              <option>Qui envoie?</option>
              <option value="1">Bijou</option>
              <option value="2">Joe</option>
              <option value="3">Minor</option>
              <option value="4">Spes</option>
              <option value="5">Deo</option>
            </Form.Select>
            {formik.errors.fam_member && formik.touched.fam_member ? (
              <p className="form_notif">{formik.errors.fam_member}</p>
            ) : null}
          </Form.Group>
          <Form.Group>
            <Form.Control
              type="date"
              id="timestamp"
              name="timestamp"
              {...formik.getFieldProps("timestamp")}
              placeholder="payé le.."
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={formik.errors.timestamp ? "redish" : "greenish"}
            />

            {formik.errors.timestamp && formik.touched.timestamp ? (
              <p className="form_notif">{formik.errors.timestamp}</p>
            ) : null}
          </Form.Group>
          <Button
            onClick={formik.handleSubmit}
            className={updateInfo ? "transferupdate" : "transfer"}
          >
            {updateInfo ? (
              <BiEdit className="sending_icon sending_icon_update" />
            ) : (
              <IoSend className="sending_icon" />
            )}
          </Button>
        </Form>
      ) : null}
    </div>
  );
};

export default React.memo(AllowanceForm);
