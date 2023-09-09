import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Alert, Col, Container, Form, FormGroup, Row } from "reactstrap";
import Usericon from "../../assets/666201.png";
import RegImg from "../../assets/register.png";
import { postData } from "../../utils/api";
import { BASE_URL } from "../../utils/config";
import CommonSection from "../CommonSection/CommonSection";
import "../Login/login.css";
import "./register.css";
import GoogleOauth from "../GoogleOauth/GoogleOauth";

const Register = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const data = await postData(`${BASE_URL}/auth/register`, credentials);
      if (data.success) {
        navigate("/login");
      } else {
        setIsError(true);
      }
      console.log(data);
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
      <section className="register">
        <Container>
          <Row>
            <Col lg="8" className="m-auto">
              {isError && (
                <Alert className="text-center" color="danger">
                  Could not create user! Try again later.
                </Alert>
              )}
              <div className="login_container d-flex justify-content-between">
                <div className="login_img">
                  <img src={RegImg} alt="" />
                </div>
                <div className="login_form">
                  <div className="user">
                    <img src={Usericon} alt="" />
                  </div>
                  <h2> Register</h2>
                  <Form onSubmit={handleClick}>
                    <GoogleOauth />
                    <FormGroup>
                      <input
                        type="text"
                        placeholder="Enter Your name"
                        required
                        id="username"
                        onChange={handleChange}
                      />
                    </FormGroup>
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
                      {isLoading ? "Loading" : "Register"}
                    </button>
                  </Form>
                  <p>
                    Already have an acoount? <Link to="/login">Login</Link>
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

export default Register;
