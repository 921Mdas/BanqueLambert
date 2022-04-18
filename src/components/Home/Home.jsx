import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { SiFampay } from "react-icons/si";
import { Form, Button } from "react-bootstrap";
import { GoogleLogin } from "react-google-login";

const Home = () => {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState(
    localStorage.getItem("loginData")
      ? JSON.parse(localStorage.getItem("loginData"))
      : null
  );

  const handleLogin = async googleData => {
    navigate("/mensuels");
    // const res = await fetch("http://127.0.0.1:8000/accounts/google/login/", {
    //   method: "POST",
    //   body: JSON.stringify({ token: googleData.tokenId }),
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // });

    // const data = await res.json();
    // setLoginData(data);

    // data ? navigate("/mensuels") : navigate("/mensuels");
    // localStorage.setItem("loginData", JSON.stringify(data));
  };

  const handleFailure = err => {
    console.log(err);
  };

  const handleLogout = () => {
    localStorage.removeItem("loginData");
    setLoginData(null);
  };

  // useEffect(() => {
  //   if (!loginData) return;
  //   dispatch({ type: COMMANDS.UPDATE_USERONLINE, payload: loginData });
  // }, [loginData]);

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
          <GoogleLogin
            className="loginBtn"
            clientId={
              "491779798833-rfagv3dr6d8fks8ninet3narhrdlvpfm.apps.googleusercontent.com"
            }
            buttonText="Log in with Google"
            onSuccess={handleLogin}
            onFailure={handleFailure}
            cookiePolicy={"single_host_origin"}
          ></GoogleLogin>
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
