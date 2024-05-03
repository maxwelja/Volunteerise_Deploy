import '../styles/VolunteerProfile.css'
import { Row, Col, Button, Container, Form } from 'react-bootstrap';
import GetBtn from '../components/CustomButtons/GetBtn';
import PostBtn from '../components/CustomButtons/PostBtn';
import DropdownMenu from '../components/DropdownMenu';
import DeleteBtn from '../components/CustomButtons/DeleteBtn';
import NavBar from '../components/NavBar';


function Test() {

  return (
    <div className='main'>
      <div className='mainCol'>
        <Row>
          <Container>
            <h2>Debugging Page for Testing Custom Components</h2>
          </Container>
        </Row>
        <Row>
          <NavBar/>
          <p/>
          <Container style={{flexDirection: "column"}}>
              <Row>
                Volunteer<br/>
                User: 1
                <Col>
                  <GetBtn
                    btnLabel="Get By Title"
                    collection="events"
                    queryKey="title"
                    isOrg={false}
                    input={true}
                  />
                </Col>
              
                <Col>
                  <GetBtn
                    btnLabel="Get By Location"
                    collection="events"
                    queryKey="location"
                    isOrg={false}
                    input={true}
                  />
                </Col>
                
                <Col>
                  <GetBtn
                    btnLabel="Get My Events"
                    collection="rsvp"
                    btnID="662f080527f5c6cb55fe5f97"
                    queryKey=""
                    buttons={false}
                    isOrg={false}
                    input={false}
                  />
                </Col>
              </Row>
              
              <Row>
              Organization<br/>
              User 1
                <Col>
                  <GetBtn
                    btnLabel="Get By Org"
                    collection="events"
                    queryKey="organization"
                    isOrg={true}
                    input={true}
                  />
                </Col>
              </Row>

              <Row>
                <Col>
                  <GetBtn
                    btnLabel="Get Users"
                    collection="VolunteerData"
                    queryKey="volunteerName"
                    buttons={false}
                    isOrg={true}
                    input={true}
                  />
                <PostBtn />
                <DeleteBtn collection="events" form={true} />
                </Col>

              </Row>
          </Container>
        </Row>
      </div>
    </div>
  );
}

export default Test;