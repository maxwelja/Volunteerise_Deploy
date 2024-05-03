import '../styles/EventCalendar.css';
import axios from 'axios';
import NavBar from '../components/NavBar';
import { useEffect, useState } from 'react';
import { Card, Row, Col, Dropdown, ButtonGroup, Container, Modal, Button } from 'react-bootstrap';
import Details from '../components/Details';

function Calendar() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [eventDates, setEventDates] = useState([]);
  const [events, setEvents] = useState([]);
  const [clickedDay, setClickedDay] = useState("");
  const [selectedDayOfEvents, setSelectedDayOfEvents] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [custom, setCustom] = useState(false);

  // get the entire event list once on render
  useEffect(() => {
    if (!custom) {
      // Function to fetch data
      const fetchData = async () => {
        try {
          // Make a GET request and extract only the dates from the response
          // date attributes match the format of React's Date() object
          const res = await axios.get('http://localhost:4000/api/events');
          setEventDates(res.data.map(entry => entry.date));
          setEvents(res.data)
        } catch (error) {
          console.log('error: ', error);
        }
      };

      // Call the fetch data function
      fetchData();

      // Cleanup function (optional)
      return () => {
        // Any cleanup code can go here
      };
    } else {
      // Function to fetch data
      const fetchData = async () => {
        try {
          // Make a GET request and extract only the dates from the response
          // date attributes match the format of React's Date() object
          const res = await axios.get(`http://localhost:4000/api/rsvp/${custom}`);
          await setEventDates(res.data.map(entry => entry.date));
          await setEvents(res.data)
        } catch (error) {
          console.log('error: ', error);
        }
      };
      // Call the fetch data function
      fetchData();
  
      // Cleanup function (optional)
      return () => {
        // Any cleanup code can go here
      };

    }
  }, [custom]);

  // Handle modal whenever clickedDay changes
  useEffect(() => {
    if (clickedDay) {
      handleShowModal();
    }
  }, [clickedDay]);

  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay();
  };

  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  const handleMonthChange = (month) => {
    setSelectedDate(new Date(selectedDate.getFullYear(), month, selectedDate.getDate()));
  };

  const handleYearChange = (year) => {
    setSelectedDate(new Date(year, selectedDate.getMonth(), selectedDate.getDate()));
  };

  // function to build arrays representing weeks on a calendar
function generateDaysArray(selectedDate) {
  const daysArray = [];
  const daysInMonth = getDaysInMonth(selectedDate.getFullYear(), selectedDate.getMonth());
  const firstDayOfMonth = getFirstDayOfMonth(selectedDate.getFullYear(), selectedDate.getMonth());

  // Add empty slots for days before the first day of the month
  for (let i = 0; i < firstDayOfMonth; i++) {
    daysArray.push(null);
  }

  // Add the days of the month
  for (let i = 1; i <= daysInMonth; i++) {
    const dateString = parseDateToString(selectedDate.getFullYear(), selectedDate.getMonth(), i);
    const isInEventDates = eventDates.includes(dateString);
    daysArray.push({ day: i, isInEventDates });
  }

  // Add empty slots for remaining days to fill 5 weeks (35 days)
  const remainingDays = 35 - daysArray.length;
  for (let i = 0; i < remainingDays; i++) {
    daysArray.push(null);
  }

  return daysArray;
};

  const handleDateClick = (clickedDate) => {
    setSelectedDate(clickedDate);
    const dateString = parseDateToString(
      clickedDate.getFullYear(),
      clickedDate.getMonth(),
      clickedDate.getDate()
    )

    setClickedDay(dateString);
  };

  // helper function to parse the date string from the database event objects
  const parseDateToString = (year, month, day) => {
    return `${month+1}/${day}/${year}`;
  }

  const handleShowModal = () => {
    setShowModal(true);
    const filteredEvents = Object.values(events).map(event => {
      return event.date === clickedDay ? event : null;
    }).filter(event => event !== null);
    setSelectedDayOfEvents(filteredEvents);
  }

  const handleCloseModal = () => {
    setShowModal(false);
  }

  const toggleCustomID = () => {
    if (custom) {
      setCustom(false);
    } else {
      setCustom("6630bee58763d8e65feee48f"); // known volunteer ID in the database
    }
  }

  //const isInEventDates = eventDates.includes(parseDateToString(selectedDate.getFullYear(), selectedDate.getMonth(), i));

  return (
    <div className="calendar">
      <Col className="mainCol">
        <Row>
          <NavBar />
        </Row>

        <Row>
          <Container className="calendar-container"
            style={{boxShadow: "5px 5px 5px #111"}}
          >
            <Row>
              <h2>{months[selectedDate.getMonth()]} {selectedDate.getFullYear()}</h2>
            </Row>

            <Row style={{width: "850px"}}>
              {custom ? (
                <Row>
                  <Button  style={{marginRight: "35px"}} onClick={toggleCustomID}>
                    Switch to All Events
                  </Button>
                  <h4 style={{width: "300px"}}>Currently Viewing:<br/>My Events</h4>
                </Row>
              ) : (
                <Row>
                  <Button  style={{marginRight: "35px"}} onClick={toggleCustomID}>
                    Switch to My Events
                  </Button>
                  <h4 style={{width: "300px"}}>Currently Viewing:<br/>All Events</h4>
                </Row>
              )}
            </Row>

            <Row className="mb-3">
              <Col>
                <Dropdown as={ButtonGroup}>
                  <Dropdown.Toggle variant="primary">Select Month</Dropdown.Toggle>
                  <Dropdown.Menu>
                    {months.map((month, index) => (
                      <Dropdown.Item key={index} onClick={() => handleMonthChange(index)}>{month}</Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              </Col>
              
              <Col>
                <Dropdown as={ButtonGroup} className="selector">
                  <Dropdown.Toggle variant="primary">Select Year</Dropdown.Toggle>
                  <Dropdown.Menu>
                    {Array.from({ length: 10 }, (_, i) => selectedDate.getFullYear() - 5 + i).map((year, index) => (
                      <Dropdown.Item key={index} onClick={() => handleYearChange(year)}>{year}</Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              </Col>
            </Row>

            <Row className="days-of-week">
              {days.map(day => (
                <Col key={day} className="day-of-week">{day}</Col>
              ))}
            </Row>

            <div className="calendar-grid">
              {[...Array(Math.ceil(generateDaysArray(selectedDate).length / 7))]
                  .map((_, rowIndex) => (
                    <Row key={rowIndex}>
                    {generateDaysArray(selectedDate).slice(rowIndex * 7, (rowIndex + 1) * 7)
                      .map((dayObj, index) => (
                      <Col key={index} className="mb-3">
                        {dayObj !== null ? (
                          dayObj.isInEventDates ? (
                          <Card
                            className={`calendar-card-event`}
                            onClick={() => handleDateClick(new Date(
                                                            selectedDate.getFullYear(),
                                                            selectedDate.getMonth(),
                                                            dayObj.day))}
                          >
                            <Card.Body>
                              <div>
                                <div>{dayObj.day}</div>
                              </div>
                            </Card.Body>
                          </Card>
                          ) : (
                            <Card
                              className={`calendar-card`}
                              onClick={() => handleDateClick(new Date(
                                                              selectedDate.getFullYear(),
                                                              selectedDate.getMonth(),
                                                              dayObj.day))}
                            >
                              <Card.Body>
                                <div>
                                  <div>{dayObj.day}</div>
                                </div>
                              </Card.Body>
                            </Card>
                          )
                        ) : (
                          <Card
                            className={`calendar-card-null`}
                          >
                            <Card.Body>
                              <div>
                                <div>{dayObj}</div>
                              </div>
                            </Card.Body>
                          </Card>
                        )}
                      </Col>
                    ))}
                  </Row>
              ))}
            </div>
          </Container>
        </Row>
      </Col>
      <Modal
          show={showModal}
          onHide={handleCloseModal}
          backdrop="static"
          keyboard={false}
      >
          <Modal.Header closeButton>
          <Modal.Title>{clickedDay}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <div>
              {selectedDayOfEvents && selectedDayOfEvents.length > 0 ? (
                  selectedDayOfEvents.map((entry, index) => (
                  <Details key={index} entry={entry} organization={false} buttons={true}/>
              ))) : (<p> Nothing Found!</p>)}
          </div>
          </Modal.Body>
          <Modal.Footer>
          <Button variant="primary" onClick={handleCloseModal}>
              Close
          </Button>
          </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Calendar;