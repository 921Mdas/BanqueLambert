import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import ReduxStore from "./store/index_store";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import FinalProfile from "./components/Profile/Profile";
import Depenses from "./components/Depenses/Depenses";
import "./index.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import AllowancePage from "./components/Mensuels/AllowancePage";
import Home from "./components/Home/Home";

ReactDOM.render(
  <Provider store={ReduxStore()}>
    <React.StrictMode>
      <BrowserRouter>
        <Navbar />
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/mensuels" element={<AllowancePage />} />
          <Route path="/depenses" element={<Depenses />} />
          <Route path="mensuels/detail/:idnum" element={<FinalProfile />} />
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

{
  /* <Route path="/construction" element={<Home />} />
          <Route path="/depenses" element={<Home />} />
          <Route path="/depenses-detail/:id" element={<Home />} />
          <Route path="/detail/:id" element={<Home />} /> */
}
