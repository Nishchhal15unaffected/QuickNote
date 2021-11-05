import React, { useState, useEffect } from "react";
import { Col, Form, Row, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import ErrorMessage from "../../component/ErrorMessage";
import Loading from "../../component/Loading";
import MainScreen from "../../component/MainScreen";
import "./LoginScreen.css";
import { login } from "../../actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {RootState} from '../../store'
function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const userLogin = useSelector((state:RootState) => state.userLogin);
  const history = useHistory();
  const { loading, error, userInfo }:any = userLogin;
  useEffect(() => {
    if (userInfo) {
      history.push("/mynotes");
    }
  }, [history, userInfo]);
  const submitHandler = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(login({email, password}));
  };
  return (
    <MainScreen title="LOGIN">
      <div className="loginContainer">
        {error && <ErrorMessage variant="warning">{error}</ErrorMessage>}
        {loading && <Loading />}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="fromBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="fromBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Button variant="outline-danger" className="my-3" type="submit">
            Submit
          </Button>
        </Form>
        <Row className="py-2">
          <Col>
            New User ? <Link to="/register">Register here</Link>
          </Col>
        </Row>
      </div>
    </MainScreen>
  );
}

export default LoginScreen;
