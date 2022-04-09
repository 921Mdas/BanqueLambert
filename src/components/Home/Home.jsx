import React from "react";
import { useLocation } from "react-router-dom";
import { SiFampay } from "react-icons/si";
import { Form, Button } from "react-bootstrap";

const Home = () => {
  return (
    <div className="Home_page">
      <div className="welcome_screen">
        <SiFampay className="logo" />
        <div className="welcome_text">
          <h3>Bienvenu</h3>
          <h3>Banque Lambert</h3>
          <hr />
          <h6>La seule banque familiale</h6>
        </div>
      </div>
      <div className="login_screen">
        <div className="Oauth">
          <h3 className="google">Connect with Google</h3>
        </div>

        <p className="OR">OR</p>

        <div className="manual_login">
          <Form className="login_form">
            <Form.Group>
              <Form.Control type="text" placeholder="Username" />
            </Form.Group>
            <Form.Group>
              <Form.Control type="email" placeholder="Email" />
            </Form.Group>
            <Form.Group>
              <Form.Control type="Password" placeholder="Password" />
            </Form.Group>
            <Button className="create_account">Create an Account</Button>
          </Form>
        </div>

        <div className="termsandconditions">
          <p className="tandcs">
            En vous inscrivant, vous acceptez nos <b>termes et conditions</b> en
            matière de données.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
