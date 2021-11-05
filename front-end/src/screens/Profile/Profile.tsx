import React, { useEffect, useState } from "react";
import { Col, Form, Row, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import MainScreen from "../../component/MainScreen";
import ErrorMessage from "../../component/ErrorMessage";
import Loading from "../../component/Loading";
import { updateProfile } from "../../actions/userAction";
import { useHistory } from "react-router";
import "./Profile.css";
import {RootState} from '../../store'
const Profile = () => {
  const history = useHistory();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const dispatch = useDispatch();
  const userLogin = useSelector((state:RootState) => state.userLogin);
  const { userInfo }:any = userLogin;
  const userUpdate = useSelector((state:RootState) => state.userUpdate);
  const { loading, error, success }:any = userUpdate;

  useEffect(() => {
    if (!userInfo) {
      history.push("/");
    } else {
      setName(userInfo.name);
      setEmail(userInfo.email);
    }
  }, [history, userInfo]);

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(updateProfile({ name, email, password }));
    
  };
  return (
    <MainScreen title="Edit Profile">
      <div>
        <Row className="profileContainer">
          <Col md={6}>
            <Form onSubmit={submitHandler}>
              {loading && <Loading />}
              {success && (
                <ErrorMessage variant="success">
                  Updated Successfully
                </ErrorMessage>
              )}
              {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
              <Form.Group controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="email">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="confirmPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                ></Form.Control>
              </Form.Group>{" "}
              <Button variant="outline-danger" className="my-3" type="submit">
                Update
              </Button>
            </Form>
          </Col>
        </Row>
      </div>
    </MainScreen>
  );
};

export default Profile;
