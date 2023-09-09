import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Alert, Col, Container, Form, FormGroup, Row } from "reactstrap";
import Usericon from "../../assets/666201.png";
import loginImg from "../../assets/login-img.png";
import CommonSection from "../CommonSection/CommonSection";
import "./login.css";
import { postData } from "../../utils/api";
import { BASE_URL } from "../../utils/config";
import { setCookie } from "../../utils/cookie";
import useAuth from "../../hooks/useAuth";
import GoogleOauth from "../GoogleOauth/GoogleOauth";

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();
  const { user, updateUser } = useAuth();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    console.log(credentials);
    setIsLoading(true);
    try {
      const data = await postData(`${BASE_URL}/auth/login`, credentials);
      console.log(data);
      // setCookie('accessToken', data.token)
      // localStorage.setItem("authHotelBooking", JSON.stringify(data));
      updateUser(data);
      if (data.token) {
        navigate("/");
      } else {
        setIsError(true);
      }
    } catch (error) {
      console.error(error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <CommonSection />
      <section className="login">
        <Container>
          <Row>
            <Col lg="8" className="m-auto">
              {isError && (
                <Alert color="danger" className="text-center">
                  Something went wrong! Couldn't sign in!
                </Alert>
              )}
              <div className="login_container d-flex justify-content-between">
                <div className="login_img">
                  <img src={loginImg} alt="" />
                </div>
                <div className="login_form">
                  <div className="user">
                    <img src={Usericon} alt="" />
                  </div>
                  <h2> Login</h2>
                  <Form onSubmit={handleClick}>
                    <GoogleOauth />
                    <FormGroup>
                      <input
                        type="email"
                        placeholder="Enter Email"
                        required
                        id="email"
                        onChange={handleChange}
                      />
                    </FormGroup>
                    <FormGroup>
                      <input
                        type="password"
                        placeholder="Enter Password"
                        required
                        id="password"
                        onChange={handleChange}
                      />
                    </FormGroup>
                    <button
                      className="btn secondary_btn auth_btn"
                      type="Submit"
                      disabled={isLoading}
                    >
                      {isLoading ? "Loading" : "Login"}
                    </button>
                  </Form>
                  <p>
                    Don't have an acoount? <Link to="/register">Create</Link>
                  </p>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Login;
