import { Container, Col, Row, Button, Modal, Form } from 'react-bootstrap';
import axios from 'axios';
import { useEffect, useState } from 'react';

function Details({id, entry, buttons=true, organization=false}) {
    const url = "http://localhost:4000/api/events/";
    const keys = Object.keys(entry);
    const ignoredKeys = ['_id', '__v','createdAt', 'updatedAt',
                        'notifications', 'hosted', 'hosts', 'rsvp', 'attended', 'attendees'];
    const userID = "6630bee58763d8e65feee48f";
    //"_id", "attendees", "hosts", "createdAt", "updatedAt", "__v"
    const [showJoinModal, setShowJoinModal] = useState(false);
    const [showLeaveModal, setShowLeaveModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showAttendanceModal, setShowAttendanceModal] = useState(false);
    const [showFinishModal, setShowFinishModal] = useState(false);
    const [event, setEvent] = useState({
        title: "",
        organization: "",
        location: "",
        date: "",
        attendees: [],
        hosts: [],
        attended: []
    });

    // this represents an entry pre-database formatting (no id or timestamps)
    const postedEvent = {
        title: entry.title,
        organization: entry.organization,
        location: entry.location,
        date: entry.date
    }


    // Join Event Modal
    const handleShowJoinModal = () => {
        setShowJoinModal(true);
    }
    const handleCloseJoinModal = (e, input) => {
        e.preventDefault();
        if (input) joinEvent();
        setShowJoinModal(false);
    }
    
    const joinEvent = async () => {
        try {
            // get event
            const eventRes = await axios.get(`${url}${entry._id}`);
            const event = eventRes.data;
    
            try {
                // check if joined already
                if (event.rsvp.includes(userID)) {
                    return; // Exit the function if user is already attending
                }
            } catch (error) {
                console.log(error,": No attendees found")
            }

            // if not, join it now
            const res = await axios.patch(`${url}${entry._id}`,{ $push: { attendees: userID } });
            window.location.reload();
        } catch (error) {
            console.log(error)
        }
    }



    // Leave Event Modal
    const handleShowLeaveModal = () => {
        setShowLeaveModal(true);
    }
    const handleCloseLeaveModal = (e, input) => {
        e.preventDefault();
        if (input) leaveEvent();
        setShowLeaveModal(false);
    }

    const leaveEvent = async () => {
        try {
            // get event
            const eventRes = await axios.get(`${url}${entry._id}`);
            const event = eventRes.data;
    
            try {
                // check if joined already
                if (event.rsvp.includes(userID)) {
                    return; // Exit the function if user is already attending
                }
            } catch (error) {
                console.log(error,": User not in attendees")
            }
            const res = await axios.patch(`${url}${entry._id}`,{ $pull: { attendees: userID } });
            window.location.reload();
        } catch (error) {
            console.log(error)
        }    
    }



    // Edit Event Modal
    const handleShowEditModal = () => {
        setShowEditModal(true);
    }
    const handleCloseEditModal = (e, input) => {
        e.preventDefault();
        if (input) handleSubmitEdit(e);
        setShowEditModal(false);
    }

    const editEvent = async (data) => {
        try {
            const response = await axios.patch(`${url}${entry._id}`, data);
            window.location.reload();
        } catch (error) {
            console.log('error: ', error);
        };
    }



    // Delete Event Modal
    const handleShowDeleteModal = () => {
        setShowDeleteModal(true);
    }
    const handleCloseDeleteModal = (e, input) => {
        e.preventDefault();
        handleNotifyChanges(true);
        if (input == true) deleteEvent(e);
        setShowDeleteModal(false);
    }
    
    const deleteEvent = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.delete(`${url}${entry._id}`, entry._id);
            window.location.reload();
        } catch (error) {
            console.log('error: ', error);
        };
    }



    // Finish Event Modal
    const handleShowFinishModal = () => {
        setShowFinishModal(true);
    }
    const handleCloseFinishModal = (e, input) => {
        e.preventDefault();
        if (input == true) finishEvent(e);
        setShowFinishModal(false);
    }

    // submits volunteer attendance
    const finishEvent = async (e) => {
        e.preventDefault();
        
        // GET all attended
        try {
            const response = await axios.get(`${url}${entry._id}`);
            if (!response) return;

            const attendedData = response.data.attended;
            const eventID = response.data._id;

            // update karma for each
            for (const attendee of attendedData) {
                await handleUpdateKarma(e, attendee, eventID);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleUpdateKarma = async (e, attendee, eventID) => {
        e.preventDefault();
        const data = {
            attended: eventID
        }
        // get the volunteer data, combine, then patch
        try {
            const getRes = await axios.get(`http://localhost:4000/api/VolunteerData/${attendee}`);
            if (!getRes) return;
            const volunteer = getRes.data[0];

            // static +10 per event for now
            // default "first event attended" payload
            let payload = {
                attendedEvents: [eventID],
                karma: 10
            };

            // error handling with null values
            if (volunteer.attendedEvents) {

                if (!volunteer.attendedEvents.includes(eventID)){
                    payload.attendedEvents = [...volunteer.attendedEvents, eventID];
                } else {
                    delete payload.attendedEvents;
                }
            }
            if (volunteer.karma) {
                payload.karma = volunteer.karma + 10;
            }
            const res = await axios.patch(`http://localhost:4000/api/VolunteerData/${attendee}`, payload);
        } catch (error) {
            console.log(error);
        }
    }
    

    // Attendance Modal
    const handleShowAttendanceModal = () => {
        setShowAttendanceModal(true);
    }
    const handleCloseAttendanceModal = (e, input) => {
        e.preventDefault();
        if (input == true) handleSubmitAttendance(e);
        setShowAttendanceModal(false);
    }
    const handleChangeAttendance = async (e) => {
        let { name, value } = e.target;

        await setEvent(prevState => ({
            ...prevState,
            [name]: [...prevState[name], value]
        }));
    };

    const handleSubmitAttendance = async (e) =>{
        e.preventDefault();

        // get current attendance to combine with new attendance
        try {
            const getRes = await axios.get(url+entry._id);

            if (!getRes) return;

            // combine here
            const data = { attended: [...getRes.data.attended, ...event.attended]};

            const patchRes = await axios.patch(url+entry._id, data);

            if (!patchRes.data) return;
            await setEvent(patchRes.data);
            
        } catch (error) {
            console.log(error);
        }
    }

    
    const handleChange = (e) => {
        let { name, value } = e.target;

        setEvent(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmitEdit = (e) => {
        e.preventDefault();
        let newData = {};

        // iterate through given form data
        // then add non-empty fields to newEventData
        // this matches newEventData to the PATCH request format
        Object.keys(event).forEach(key => {
            if (event[key] !== "" && event[key] !== null) {
                newData[key] = event[key];
            }
        });

        handleNotifyChanges(false, newData);
        editEvent(newData);
    }

    const handleNotifyChanges = async (isDelete, data) => {
        let message = "";
        
        // Format a notification message for delete or changes to existing event
        if (isDelete) {
            message = `Event ${entry.title} on ${entry.date} has been cancelled!`;
        } else {
            message = formatMessage(data)
        }
        
        // GET all attendees of an event
        // then PATCH notification to VolunteerData for each
        // This is potentially many requests
        try {
            const response = await axios.get(`${url}${entry._id}`);
            const attendeeList = response.data.rsvp;

            for (const attendee of attendeeList) {
                await sendNotificationTo(attendee, message);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const formatMessage = (data) => {
        let newMessage = "An event you're attending has been changed:";
        Object.keys(data).forEach(key => {
            if (event[key] !== "" && event[key] !== null ) {
                newMessage += `\nEvent ${key} has been changed to ${event[key]}\n`;
            }
        });
        return newMessage;
    }

    const sendNotificationTo = async (attendeeID, message) => {

        if (attendeeID) {
            try {
                const response = await axios.patch(
                    `http://localhost:4000/api/notify/${attendeeID}`,
                    { $push: { notifications: message } }
                );
            } catch (error) {
                console.log(error);
            }
        }
    }

    const handleCollabChange = (e) => {
        let { value } = e.target;

        setEvent(prevState => ({
            ...prevState,
            hosts: [...prevState.hosts, value]
        }));
    };

    return(
        <div style={{margin: "10px"}}>
            <Container style={{ backgroundColor: id == "eventListDetails" ? '#5271ff' : "#38b6ff",
                                boxShadow: id == "eventListDetails" ? '0px 5px 7px rgb(27, 27, 27)' : "0px 0px 0px",
                                margin: id == "eventListDetails" ? '20px' : "0px",
                                width: id == "eventListDetails" ? '800px' : "auto" }}>
                <Row>
                    {keys.length > 4 && keys.map((key,index) => (
                        !ignoredKeys.includes(key) && (
                            <div key={index}>
                                {key == "title" ?
                                    <h5 style={{ marginBottom: '0' }}><b>{entry.title}</b></h5>
                                :
                                    <p style={{ marginBottom: '0' }}>{key.toUpperCase()}: {entry[key]}</p>
                                }
                            </div>
                        )
                    ))}
                    {keys.length == 4 && Object.keys(postedEvent).map((key,index) => (
                        !ignoredKeys.includes(key) && (
                            <div key={index}>
                                <p style={{ marginBottom: '0' }}>{key.toUpperCase()}: {postedEvent[key]}</p>
                            </div>
                        )
                    ))}
                    { entry._id && !organization && buttons && (
                        <>
                            <Button onClick={handleShowJoinModal}
                                className='btnLeave'
                                variant='primary'
                                > Join Event
                            </Button>

                            <Button onClick={handleShowLeaveModal}
                                className='btnLeave'
                                variant='primary'
                                > Leave Event
                            </Button>
                        </>
                    )}
                    { entry._id && organization && buttons && (
                        <>
                            <Button onClick={handleShowEditModal}
                                className='btnLeave'
                                variant='primary'
                                > Edit Event
                            </Button>

                            <Button onClick={handleShowDeleteModal}
                                className='btnLeave'
                                variant='primary'
                                > Delete Event
                            </Button>

                            <Button onClick={handleShowAttendanceModal}
                                className='btnLeave'
                                variant='primary'
                                > Attendance
                            </Button>
                            
                            <Button onClick={handleShowFinishModal}
                                className='btnLeave'
                                variant='primary'
                                > Finish Event
                            </Button>
                        </>
                    )}
                </Row>
            </Container>
            
            {/* Join Modal */}
            <Modal
                show={showJoinModal}
                onHide={handleCloseJoinModal}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header>
                <Modal.Title>Join this event?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <div>
                    {entry && (
                        <Details entry={entry} organization={false} buttons={false}/>
                    )}
                    
                </div>
                </Modal.Body>
                <Modal.Footer>
                <Button className="btnForm" variant="success" onClick={(e) => handleCloseJoinModal(e, true)}>
                    RSVP!
                </Button>
                <Button className="btnForm" variant="danger" onClick={(e) => handleCloseJoinModal(e, false)}>
                    Cancel
                </Button>
                </Modal.Footer>
            </Modal>
            
            {/* Leave Modal */}
            <Modal
                show={showLeaveModal}
                onHide={handleCloseLeaveModal}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header>
                <Modal.Title>Leave this event?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <div>
                    {entry && (
                        <Details entry={entry} buttons={false} organization={false}/>
                    )}
                </div>
                </Modal.Body>
                <Modal.Footer>
                <Button className="btnForm" variant="success" onClick={(e) => handleCloseLeaveModal(e, true)}>
                    Leave
                </Button>
                <Button className="btnForm" variant="danger" onClick={(e) => handleCloseLeaveModal(e, false)}>
                    Cancel
                </Button>
                </Modal.Footer>
            </Modal>

            {/* Edit Modal */}
            <Modal
                show={showEditModal}
                onHide={handleShowEditModal}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header>
                <Modal.Title>Edit this event?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <div>
                    {entry && (
                        <Details entry={entry} organization={true} buttons={false}/>
                    )}
                </div>
                <Form>   
                    <Form.Group controlId="ID">
                        <Form.Control
                        type="text"
                        placeholder={"Enter Event Name"}
                        name="title"
                        value={event.title}
                        onChange={handleChange}
                        />
                        <Form.Control
                        type="text"
                        placeholder={"Enter Host Organization"}
                        name="organization"
                        value={event.organization}
                        onChange={handleChange}
                        />
                        <Form.Control
                        type="text"
                        placeholder={"Enter Event Location"}
                        name="location"
                        value={event.location}
                        onChange={handleChange}
                        />
                        <Form.Control
                        type="text"
                        placeholder={"Enter Event Date"}
                        name="date"
                        value={event.date}
                        onChange={handleChange}
                        />
                        <Form.Control
                        type="text"
                        placeholder={"Enter Collaborator ID"}
                        name="hosts"
                        value={event.hosts}
                        onChange={handleCollabChange}
                        />
                    </Form.Group>
                    <Button className="btnForm"variant="success" onClick={(e) => handleCloseEditModal(e, true)}>
                        Apply
                    </Button>
                    <Button className="btnForm" variant="danger" onClick={(e) => handleCloseEditModal(e, false)}>
                        Cancel
                    </Button>
                </Form>
                </Modal.Body>
            </Modal>
            
            {/* Delete Modal */}
            <Modal
                show={showDeleteModal}
                onHide={handleCloseDeleteModal}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header>
                <Modal.Title>Delete this event?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <div>
                    {entry && (
                        <Details entry={entry} buttons={false} organization={true}/>
                    )}
                </div>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="success" onClick={(e) => handleCloseDeleteModal(e, true)}>
                    Delete
                </Button>
                <Button variant="danger" onClick={(e) => handleCloseDeleteModal(e, false)}>
                    Cancel
                </Button>
                </Modal.Footer>
            </Modal>
            
            {/* Attendance Modal */}
            <Modal
                show={showAttendanceModal}
                onHide={handleShowAttendanceModal}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header>
                <Modal.Title>Submit attendance?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <div>
                    {entry && (
                        <Details entry={entry} organization={true} buttons={false}/>
                    )}
                </div>
                <Form>   
                    <Form.Group controlId="ID">
                        <Form.Control
                        type="text"
                        placeholder={"Enter Volunteer ID"}
                        name="attended"
                        value={event.attended}
                        onChange={handleChangeAttendance}
                        />
                    </Form.Group>
                    <Button className="btnForm" variant="success" onClick={(e) => handleCloseAttendanceModal(e, true)}>
                        Submit
                    </Button>
                    <Button className="btnForm" variant="danger" onClick={(e) => handleCloseAttendanceModal(e, false)}>
                        Cancel
                    </Button>
                </Form>
                </Modal.Body>
            </Modal>
            
            {/* Finish Event Modal */}
            <Modal
                show={showFinishModal}
                onHide={handleShowFinishModal}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header>
                <Modal.Title>Finish the event<br/>and finalize attendance?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <div>
                    {entry && (
                        <Details entry={entry} organization={true} buttons={false}/>
                    )}
                </div>
                    <Button className="btnForm" variant="success" onClick={(e) => handleCloseFinishModal(e, true)}>
                        Finish!
                    </Button>
                    <Button className="btnForm" variant="danger" onClick={(e) => handleCloseFinishModal(e, false)}>
                        Cancel
                    </Button>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default Details;