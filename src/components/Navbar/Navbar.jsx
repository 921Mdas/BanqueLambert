import "./Navbar.scss";
import React, { useState, useEffect } from "react";
import {
  AiOutlineMenuUnfold,
  AiOutlineMenuFold,
  AiOutlineHome,
  AiTwotoneHome,
} from "react-icons/ai";
import { IoIosNotificationsOutline, IoIosNotifications } from "react-icons/io";
import { BsBuilding } from "react-icons/bs";
import { FaRegMoneyBillAlt, FaMoneyBillAlt, FaBuilding } from "react-icons/fa";
import { MdPayment, MdPayments, MdOutlinePayments } from "react-icons/md";
import { BiLogOut } from "react-icons/bi";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation().pathname;
  const isLoginPage = useLocation().pathname === "/";
  const [showNavs, setshowNavs] = useState(true);
  const [showmenu, setShowMenu] = useState(false);
  const setClass = showmenu ? "" : "close";
  const menu = () => {
    setShowMenu(true);
  };

  useEffect(() => {
    isLoginPage ? setshowNavs(true) : setshowNavs(false);
  }, [location]);

  const activeCloseMenu = () => {
    setShowMenu(false);
  };

  const closeMenu = () => {
    setShowMenu(false);
  };

  if (!showNavs) {
    return (
      <>
        <div className="navbar">
          <AiOutlineMenuUnfold
            className="hamburger_btn"
            onClick={() => menu()}
          />
          <div className={`${setClass} navbar_container`}>
            <AiOutlineMenuFold
              className="closeburger_btn"
              onClick={() => closeMenu()}
            />
            <div className="top_nav">
              <div className="titles">
                <h3>Banque Lambert</h3>
                <h6>Bienvenue dans la banque familiale</h6>
              </div>
            </div>
            <div className="bottom_nav">
              <ul>
                <Link
                  to="/"
                  className="navigation_links"
                  onClick={() => activeCloseMenu()}
                >
                  <li>
                    <div className="twin_icons">
                      <AiTwotoneHome className="menu_icon" />
                      <AiOutlineHome className="menu_icon" />{" "}
                    </div>
                    <span>Acceuil</span>
                  </li>
                </Link>

                <Link
                  to="/detail/:id"
                  className="navigation_links"
                  onClick={() => activeCloseMenu()}
                >
                  <li>
                    <div className="twin_icons">
                      <IoIosNotifications className="menu_icon" />
                      <IoIosNotificationsOutline className="menu_icon" />{" "}
                    </div>
                    <span>Notifications</span>
                  </li>
                </Link>

                <Link
                  to="/"
                  className="navigation_links"
                  onClick={() => activeCloseMenu()}
                >
                  <li>
                    <div className="twin_icons">
                      <FaMoneyBillAlt className="menu_icon" />
                      <FaRegMoneyBillAlt className="menu_icon" />
                    </div>
                    <span>Depenses</span>
                  </li>
                </Link>

                <Link
                  to="/mensuels"
                  className="navigation_links"
                  onClick={() => activeCloseMenu()}
                >
                  <li>
                    <div className="twin_icons">
                      <MdPayments className="menu_icon" />
                      <MdOutlinePayments className="menu_icon" />
                    </div>
                    <span>Mensuel</span>
                  </li>
                </Link>

                <Link
                  to="/"
                  className="navigation_links"
                  onClick={() => activeCloseMenu()}
                >
                  <li>
                    <div className="twin_icons">
                      <FaBuilding className="menu_icon" />
                      <BsBuilding className="menu_icon" />
                    </div>
                    <span>Construction</span>
                  </li>
                </Link>

                <Link
                  to="/"
                  className="navigation_links"
                  onClick={() => activeCloseMenu()}
                >
                  <li>
                    <div className="twin_icons">
                      <BiLogOut className="menu_icon" />
                      <BiLogOut className="menu_icon" />
                    </div>
                    <span>Quitter</span>
                  </li>
                </Link>
              </ul>
            </div>
          </div>
        </div>
        <div className="menu_nav">
          <ul className="menu_bottom">
            <Link to="/" className="bottom_menu_links">
              <li>
                <AiOutlineHome className="icon_menu_bottom" />
                <span>Acceuil</span>
              </li>
            </Link>
            <Link to="/detail/:id" className="bottom_menu_links">
              <li>
                <IoIosNotificationsOutline className="icon_menu_bottom" />
                <span>Notifications</span>
              </li>
            </Link>

            <Link to="/" className="bottom_menu_links">
              <li>
                <FaRegMoneyBillAlt className="icon_menu_bottom" />
                <span>Depenses</span>
              </li>
            </Link>

            <Link to="/mensuels" className="bottom_menu_links">
              <li>
                <MdOutlinePayments className="icon_menu_bottom" />
                <span>Mensuels</span>
              </li>
            </Link>

            <Link to="/" className="bottom_menu_links">
              <li>
                <BsBuilding className="icon_menu_bottom" />
                <span>Construction</span>
              </li>
            </Link>
          </ul>
        </div>
      </>
    );
  }

  if (showNavs) {
    return "";
  }
};

export default Navbar;
