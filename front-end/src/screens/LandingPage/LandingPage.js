import "./LandingPage.css";
import { Container, Row, Button } from "react-bootstrap";
import { useEffect } from "react";
const LandingPage = ({ history }) => {
  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      history.push("/mynotes");
    }
  }, [history]);
  return (
    <div className="main">
      <Container>
        <Row>
          <div className="intro-text">
            <div>
              <h1 className="title">Welcome to Quick Note</h1>
              <p className="subtitle">Quick Note Quick Life</p>
            </div>
          </div>
          <div className="buttonContainer">
            <a href="/Login">
              <Button
                size="lg"
                className="landingbutton"
                variant="outline-danger"
              >
                Login
              </Button>
            </a>
            <a href="/register">
              <Button
                size="lg"
                className="landingbutton"
                variant="outline-danger"
              >
                Signup
              </Button>
            </a>
          </div>
        </Row>
      </Container>
    </div>
  );
};
export default LandingPage;
