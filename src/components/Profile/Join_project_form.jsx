import React from "react";
import { useFormik } from "formik";
import { Form, Button } from "react-bootstrap";

const Join_project_form = () => {
  const formik = useFormik({
    initialValues: {
      projects: [],
    },
  });

  return (
    <div>
      <div className="current_projects_in">current projects</div>
      <Form>
        <Form.Group>
          <Form.Select type="select">
            <option value="0">Rejoindre un projet</option>
            <option value="1">Mpassa</option>
            <option value="1">Lutendele</option>
          </Form.Select>
          <Button>Ajouter</Button>
        </Form.Group>
      </Form>
    </div>
  );
};

export default Join_project_form;
