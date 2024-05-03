// OrgProfilePage.js
import React, {useEffect, useState} from 'react';
import {Row, Col, Button, Component, Container, Image } from 'react-bootstrap';
import OrgBio from '../components/OrgBio';
import NavBar from '../components/NavBar';
import GetBtn from '../components/CustomButtons/GetBtn';
import DeleteBtn from '../components/CustomButtons/DeleteBtn';
import axios from 'axios';
import Details from '../components/Details';

function OrgProfilePage() {
  const [userID, setUserID] = useState("6630a17d9fc924feb0865b61"); // known Org ID in the database
  const [userData, setUserData] = useState(null);
  const [hostedList, setHostedList] = useState(null);

  useEffect(() => {
    // get org user data to populate profile
    if (!userData && userID) {
      const fetchData = async () => {
        try {
          const res = await axios.get(`http://localhost:4000/api/OrganizationData/${userID}`);
          await setUserData(res.data[0]);
        } catch (error) {
          console.error('Error fetching data:', error);
        }

        // get hosted events
        try {
          const res = await axios.get(`http://localhost:4000/api/hosting/${userID}`);
          await setHostedList(res.data)
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

      // Call the fetchData function
      fetchData();
    }
  }, [userData, userID, hostedList]);

  const handleGoToDonate = () => {
    window.location.href = "https://donate.cancer.org/";
  }

  const handleDeleteAccount = async (e) => {
    e.preventDefault();

    try {
      console.log(userData._id);
      //const res = await axios.delete(`http://localhost:4000/api/VolunteerData/${userData._id}`);
    } catch (error) {
      console.log(error);
    }

  }

  // Preset organization data
  const organization = 
  {
    name: 'Example Non-Profit',
    location: 'City, Country',
    email: 'example@example.com',
    phone: '123-456-7890',
    website: 'www.cancer.org',
    about: 'XXXX XX XXXXX XXXX XXX XXXXXX XXXXXX XX.'
    // Add more organization information as needed
  };

  // Styles
  const contentContainerStyle = {
    display: 'flex',
    flexDirection: 'column', // Stack items vertically
    //alignItems: 'center', // Center items horizontally
    //alignItems: 'flex-start', // Align items at the top
    borderRadius: '20px', // Apply border radius for curved edges
    border: '1px solid #ccc', // Add border for better visibility
    padding: '20px', // Add padding for spacing
    backgroundColor: '#f0f0f0', // Add background color
  };

  return (
    <>
      <div className='main'>
        <Col className="mainCol">
          <Row>
            <NavBar />
          </Row>
          <Row>
            <Container className='mainContainer'>
              
              <Row>
                <Col>
                  <Image className="profile" src="images/profilePic.png" />
                </Col>
                <Col>
                  <Container className="infoContainer">
                    {!userData ? (
                      <>
                        <h2>American Cancer Society<br /></h2>
                        <h6>Organization Owner: {organization.name}</h6>
                        <h6>Location: {organization.location}</h6>
                        <h6>Email: {organization.email}</h6>
                        <h6>Phone Number: {organization.phone}</h6>
                        <h6>Website: <a href="https://cancer.org">{organization.website}</a></h6>
                        <h6>About: {organization.about}</h6>
                      </>
                    ) : (
                      <>
                        <h2>American Cancer Society<br /></h2>
                        <h6>Organization Owner: {userData.orgName}</h6>
                        <h6>Location: {organization.location}</h6>
                        <h6>Email: {userData.orgEmail}</h6>
                        <h6>Phone Number: {organization.phone}</h6>
                        <h6>Website: <a href="https://cancer.org">{organization.website}</a></h6>
                        <h6>About: {organization.about}</h6>
                      </>
                    )}
                  </Container>
                </Col>
              </Row>
              
              <Row className="bottom row">
                <Container>
                  <Row>
                    <Button onClick={handleGoToDonate}>
                      Donate Here
                    </Button>
                  </Row>

                  <Row>
                    <GetBtn
                      btnLabel="Announcements"
                      collection="notifications"
                      isOrg={false}
                      buttons={false}
                      input={false}
                    />                    
                  </Row>

                  <Row>
                    <Button>
                      Delete Account
                    </Button>
                    {/* Disabled to prevent page crash
                    (currently connected to event IDs)
                    <DeleteBtn
                      btnLabel="Delete Account"
                      collection="VolunteerData"
                      isOrg={false}
                      buttons={true}
                      input={false}
                    /> */}
                    <Col>
                      Delete button disabled:<br/>
                      Feature is functional, but deleting<br/>
                      from the database crashes page
                    </Col>
                  </Row>
                </Container>
                <p/>
                <Container
                  style={{width: "400px",
                          boxShadow: "5px 5px 5px #111",
                          backgroundColor: "#5276ff"}}>
                  <h3>Our Events</h3>
                </Container>
                <Container style={{display: "flex", overflowY: "auto", backgroundColor: "#5276ff", marginTop: "10px"}}>
                    {hostedList && hostedList.map((event, index) => (
                      <Col key={index}>
                        <Details entry={event} organization={false} buttons={true}/>
                      </Col>
                    ))}
                </Container>
              </Row>
            </Container>
          </Row>
        </Col>
      </div>
    {/* <Header logoUrl="/website-logo.jpg" titleUrl="/website-name.jpg" /> */}
    {/* <OrgBio organization={organization} /> Use OrgBio component */}
    {/* <Donate /> Include the Donate component */}
    {/* Other content of your website */}
    </>
  );
}

export default OrgProfilePage;