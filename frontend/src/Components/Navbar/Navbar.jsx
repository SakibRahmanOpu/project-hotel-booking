import React, { useState } from "react";
import "./navbar.css";
import { FaHotel } from "react-icons/fa";
import { AiFillCloseCircle } from "react-icons/ai";
import { TbGridDots } from "react-icons/tb";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useSignOut } from "react-firebase-hooks/auth";
import { auth } from "../../utils/firebase";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, updateUser } = useAuth();
  const [signOut, loading, error] = useSignOut(auth);
  //toggle
  const [active, setActive] = useState("navBar");
  const showNav = () => {
    setActive("navBar activeNavbar");
  };

  //remove navbar
  const removeNav = () => {
    setActive("navBar ");
  };
  //
  const [transparent, setTransparent] = useState("header");
  const addBg = () => {
    if (window.scrollY >= 10) {
      setTransparent(" header activeHeader");
    } else {
      setTransparent(" header ");
    }
  };
  window.addEventListener("scroll", addBg);

  const handleLogOut = async () => {
    await signOut();
    updateUser("");
  };
  const handleLogin = () => {
    navigate("/login");
  };

  const handleSignUp = () => {
    navigate("/register");
  };

  return (
    <section className="navBarSection">
      <div className={transparent}>
        <div className="logoDiv">
          <a href="/" className="logo">
            <h1 className="flex">
              <FaHotel className="icon" />
              HotelBooking.
            </h1>
          </a>
        </div>
        <div className={active}>
          <ul className="navLists flex">
            <li className="navItem">
              <Link to="/" className="navLink">
                Home
              </Link>
            </li>
            <li className="navItem">
              <Link to="/offers" className="navLink">
                Offers
              </Link>
            </li>
            <li className="navItem">
              <Link to="/hotels" className="navLink">
                Hotels
              </Link>
            </li>
            <li className="navItem">
              <Link to="/contact" className="navLink">
                Contacts
              </Link>
            </li>
            {(user?.role === "admin" || user?.role === "user") && (
              <li className="navItem">
                <Link to="/dashboard" className="navLink">
                  Dashboard
                </Link>
              </li>
            )}
            {/* {(user?.role === "user" || user?.role === "admin") && (
              <li className="navItem">
                <Link to="/my-bookings" className="navLink">
                  My Bookings
                </Link>
              </li>
            )} */}
            {!user ? (
              <div className="headerBtns flex">
                <button className="btn loginBtn" onClick={handleLogin}>
                  Login
                </button>
                <button className="btn" onClick={handleSignUp}>
                  Sign Up
                </button>
              </div>
            ) : (
              <div className="flex items-center userInfo">
                <p className="">{user?.data?.username || user?.data?.email}</p>
                <button className="btn" onClick={handleLogOut}>
                  Log Out
                </button>
              </div>
            )}{" "}
          </ul>

          <div onClick={removeNav} className="closeNavbar">
            <AiFillCloseCircle className="icon" />
          </div>
        </div>
        <div onClick={showNav} className="toggleNavbar">
          <TbGridDots className="icon" />
        </div>
      </div>
    </section>
  );
};

export default Navbar;
