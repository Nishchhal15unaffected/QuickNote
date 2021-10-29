import { Container, Row, Col } from "react-bootstrap";
const Footer = () => (
  <>
    <footer
      style={{
        width: "100%",
        position: "relative",
        bottom: 0,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Container>
        <Row>
          <Col className="text-center py3">**Devloped by Nish**</Col>
        </Row>
      </Container>
    </footer>
  </>
);
export default Footer;
