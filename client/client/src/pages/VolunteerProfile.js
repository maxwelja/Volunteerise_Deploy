import '../styles/VolunteerProfile.css';
import { Button, Container, Col, Row, Image, Modal } from 'react-bootstrap';
import NavBar from '../components/NavBar';
import GetBtn from '../components/CustomButtons/GetBtn';
import Details from '../components/Details';
import { useEffect, useState } from 'react';
import axios from 'axios';

function VolunteerProfile({activeID}) {
  if (!activeID) activeID = "6630bee58763d8e65feee48f";
  const [userID, setUserID] = useState(activeID);
  const [userData, setUserData] = useState(null);
  const [showPastEventsModal, setShowPastEventsModal] = useState(false);
  const [pastEvents, setPastEvents] = useState([]);

  useEffect(() => {
    if (userID) {
      // Define an async function to fetch data
      const fetchData = async () => {
        try {
          console.log("ID:", userID);
          const res = await axios.get(`http://localhost:4000/api/VolunteerData/${userID}`);
          await setUserData(res.data[0])
          console.log("Found:", userData)
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

      // Call the fetchData function
      fetchData();
    }
    if (userData) console.log(userData);
  }, [pastEvents, userID]);

  const getPastEvents = async () => {
    if (userID && userData && userData.attendedEvents) {

      try {
        console.log("Trying get events", userData.attendedEvents);
        for (const id of userData.attendedEvents) {
          console.log("Trying event:", id);
          const res = await axios.get(`http://localhost:4000/api/events/${id}`);

          // handle against null values and avoid duplicate data in pastEvents
          if (res.data && res.data._id && !pastEvents.some(event => event._id === res.data._id)) {
            console.log("Past res:", res.data._id);
            setPastEvents(prevState => [...prevState, res.data] )
            console.log("after:", pastEvents);
          }
        }
      } catch (error) {

      } 
    }
    handleShowPastEventsModal();
  }

  const handleShowPastEventsModal = () => {
    setShowPastEventsModal(true);
  }
  const handleClosePastEventsModal = () => {
    setShowPastEventsModal(false);
  }

  const handleDeleteAccount = async (e) => {
    e.preventDefault();

    try {
      console.log(userData._id);
      const res = await axios.delete(`http://localhost:4000/api/VolunteerData/${userData._id}`);
      if (res.data) {
        alert('ACCOUNT DELETED');
      }
    } catch (error) {
      console.log(error);
    }

  }

  return (
    <>
      <div className="main">
        <Col className="mainCol">
          <Row>
            <NavBar />
          </Row>
          <Row>
            <Container className='mainContainer'>
              {/* First row: "profile" and "infoContainer" */}
              <Row>
                  <Col>
                    <Image className="profile" src="images/profilePic.png" />
                  </Col>
                  <Col>
                    {!userData ? (
                    <Container className="infoContainer">
                      <Row>Name: John Smith</Row>
                      <Row>Email: example@mail.com</Row>
                      <Row>Phone: (123)456-7890</Row>
                      <Row>Summary:<br />Hello, my name is John and I volunteer!</Row>
                    </Container>
                    ) : (
                      <Container className="infoContainer">
                        <Row>Name: {userData.volunteerName}</Row>
                        <Row>Email: {userData.volunteerEmail}</Row>
                        <Row>Phone: (123)456-7890</Row>
                        <Row>Summary:<br />{userData.bio}</Row>
                      </Container>
                    )}
                  </Col>
                </Row>
              {/* Second row: "container3", "container4", and "container5" */}
              <Row className="bottom row">
                <Col className='box1'>
                  <Row className='karmaRow'>
                    <Col className='karmaLabel'>
                      <h2>Karma<br />
                      Rating</h2>
                    </Col>
                    <Col className="karmaRating">
                      {userData && userData.karma && (
                        <p style={{marginTop: "10px"}}>
                          {userData.karma}
                        </p>
                      )}
                    </Col>
                    <p/>
                  </Row>
                  <Row className="Events Attended">
                    <Button onClick={getPastEvents}
                      className='btnDisplay'
                      variant='primary'
                    > My Past Events
                    </Button>
                    <p/>
                  </Row>
                  <Row style={{marginLeft: "22px"}}>
                    <GetBtn
                      btnLabel="All Events"
                      collection="events"
                      queryKey=""
                    />
                  </Row>
                </Col>
                <Col className='box2'>
                  <Container className='box3'>
                      <Row style={{marginBottom: '10px'}}>
                        <Col className="vhours">
                          Volunteer<br />Hours
                        </Col>
                        <Container className="hours">
                          {userData && userData.attendedEvents && (
                            <p style={{marginTop: "10px"}}>
                              {userData.attendedEvents.length * 2 /* assuming 1.5hrs per event */}
                            </p>
                          )}
                        </Container>
                      </Row>
                    <div className="box4">
                      <Row>
                        <Col className="attended">
                          Events<br />Attended
                        </Col>
                        <Container className="events">
                          {userData && userData.attendedEvents && (
                            <p style={{marginTop: "10px"}}>
                              {userData.attendedEvents.length}
                            </p>
                          )}
                        </Container>
                      </Row>
                    </div>
                  </Container>
                  <Container className="container5">
                    <div className='box4'>
                      <GetBtn color="black"
                        btnLabel="My RSVP'd Events"
                        collection="rsvp"

                      />
                    </div>
                  </Container>
                </Col>
              </Row>
            </Container>
          </Row>
          <Row style={{width: "900px"}}>
            <Container>
              <Col>
                <GetBtn
                  btnLabel="My Notifications"
                  collection="notifications"
                  isOrg={false}
                  buttons={false}
                  input={false}
                />
              </Col>
              <Col>
                Delete disabled:<br/>
                deleting from database<br/>
                crashes page
              </Col>
              <Col>
                <Button>
                  Delete Account
                </Button>
              </Col>
            </Container>
          </Row>
        </Col>
            
        {/* Past Events Modal */}
        <Modal
            show={showPastEventsModal}
            onHide={handleClosePastEventsModal}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header closeButton>
            <Modal.Title>Events Attended</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <div>
                {pastEvents && pastEvents.map((entry, index) => {
                  return <Details key={index} entry={entry} buttons={false} organization={false}/>
                })}
            </div>
            </Modal.Body>
            <Modal.Footer>
            <Button className="btnForm" variant="secondary" onClick={(e) => handleClosePastEventsModal(e, true)}>
                Close
            </Button>
            </Modal.Footer>
        </Modal>
      </div>
    </>
  );
}

export default VolunteerProfile;