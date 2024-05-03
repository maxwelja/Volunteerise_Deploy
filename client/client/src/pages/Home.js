import "bootstrap/dist/css/bootstrap.css";
import '../styles/VolunteerProfile.css';
import { Button, Container, Col, Row, Image} from 'react-bootstrap';
import NavBar from "../components/NavBar";
import { useEffect } from 'react';

function Home() {

  return (
    <>
      <div className="main">
          <Col className="mainCol">
            <Row>
              <NavBar/>
            </Row>

            <Row className="rowImg">
              <Col>
                <Image className="logo-image" alt="logo" src="images/logoBig.png"/>
              </Col>
            </Row>

            <Row>

              <Container className="containerHome" style={{boxShadow: "5px 5px 5px #111"}}>
                <Row className="rowHome">
                  <Button
                    href="/EventList"
                    variant='primary'
                    size="lg" className="btnHome"
                  >
                    Event List
                  </Button>
                  <Button
                    href="/EventCalendar"
                    variant='primary'
                    size="lg"
                    className="btnHome"
                  >
                    Events Calendar
                  </Button>
                </Row>

                <Row className="rowHome">
                  <Button
                    href="/VolunteerProfile"
                    variant='primary'
                    size="lg"
                    className="btnHome"
                  >           
                    Volunteer Profile
                  </Button>
                  <Button
                    href="/OrgProfile"
                    variant='primary'
                    size="lg"
                    className="btnHome"
                  >
                    Organization Profile
                  </Button>                  
                </Row>

                <Row className="rowHome">
                  <Button
                    href="/Test"
                    variant='primary'
                    size="lg"
                    className="btnHome"
                  >
                    Debug
                  </Button>
                  <Button
                    href="/Login"
                    variant='primary'
                    size="lg"
                    className="btnHome"
                  >
                    Logout
                  </Button>
                </Row>
              </Container>

            </Row>
          </Col>
        </div>
    </>
  );
}

export default Home;
