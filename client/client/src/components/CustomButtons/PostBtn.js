import { useEffect, useState } from 'react';
import {Form, Button, Modal} from 'react-bootstrap';
import axios from 'axios';
import Details from '../Details';

export default function PostBtn() {
    const [event, setEvent] = useState({
        title: "",
        organization: "",
        location: "",
        date: "",
        hosts: []
    });
    const [res, setRes] = useState(null);
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const [showPostedModal, setShowPostedModal] = useState(false);
    const link = "http://localhost:4000/api/events";
    const [id, setID] = useState("");
    const [url, setURL] = useState(link);
  
    const handleCloseConfirmationModal = (e, confirmed) => {
        e.preventDefault();
        if (confirmed) {
            try {
                postEvent(e);
            } catch (error) {
                console.log(error);
            }
        }
        setShowConfirmationModal(false);
    };
  
    const handleShowConfirmationModal = () => {
        setShowConfirmationModal(true);
    };

    const handleClosePostedModal = () => {
        setShowPostedModal(false);
        window.location.reload();
    };
  
    const handleShowPostedModal = async (e) => {
        setShowPostedModal(true);
    };
    
    const postEvent = async () => {
        try {
            setURL(link+id);
            console.log("Posting:", event);
            const response = await axios.post(link, event);
            console.log("Post Res:", response);
            setRes(response.data);
            handleShowPostedModal();
        } catch (error) {
            console.log(error);
        }
    }

    const formatDate = (dateString) => {
        let day = "";
        let month = "";
        let year = "";
        let count = 0;

        let isLeadingZero = true;
        for (let i = 0; i < dateString.length; i++){
            if (isLeadingZero && dateString[i] == "0") {
                continue;
            } else {
                isLeadingZero = false;
            }
            if (dateString[i] == "/" && count == 0) {
                count += 1;
                break;
            } else {
                month += dateString[i];
            }
        }

        isLeadingZero = true;
        for (let i = dateString.indexOf(month[month.length-1])+2; i < dateString.length; i++) {
            if (isLeadingZero && dateString[i] == "0") {
                continue;
            } else {
                isLeadingZero = false;
            }

            if (dateString[i] == "/" && count == 1) {
                count += 1;
                break;
            } else {
                day += dateString[i]
            }
        }
        
        isLeadingZero = true;
        for (let i = dateString.indexOf(day[day.length-1])+2; i < dateString.length; i++){
            if (isLeadingZero && dateString[i] == "0") {
                continue;
            } else {
                isLeadingZero = false;
            }
            if (dateString[i] == "/" && count == 2) {
                count += 1;
                break;
            } else {
                year += dateString[i];
            }
        }

        return `${month}/${day}/${year}`;
    }

    const handleChange = (e) => {
        let { name, value } = e.target;

        setEvent(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleCollabChange = (e) => {
        let { value } = e.target;

        setEvent(prevState => ({
            ...prevState,
            hosts: [...prevState.hosts, value]
        }));
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        if (event.date.length > 8) {    
            setEvent(prevState => ({
                ...prevState,
                date: formatDate(event.date)
            }));
        }
        handleShowConfirmationModal();
    };

    return (
        <>
            <Form onSubmit={handleSubmit}>
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
                <Button className="btnForm" type="submit">
                    Post Event
                </Button>
            </Form>
            <div>
                {/* Confirmation Modal */}
                <Modal
                    show={showConfirmationModal}
                    onHide={handleCloseConfirmationModal}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header>
                    <Modal.Title>Post this event?</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <div>
                        {event && (
                            <Details entry={event} organization={true} buttons={false}/>
                        )}
                        
                    </div>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button className="btnForm" variant="success" onClick={(e) => handleCloseConfirmationModal(e, true)}>
                        Post!
                    </Button>
                    <Button className="btnForm" variant="danger" onClick={(e) => handleCloseConfirmationModal(e, false)}>
                        Cancel
                    </Button>
                    </Modal.Footer>
                </Modal>
                
                {/* Event Posted Modal */}
                <Modal
                    show={showPostedModal}
                    onHide={handleClosePostedModal}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header>
                    <Modal.Title>Event Posted!</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <div>
                        {res && (
                            <Details key={res._id} entry={res} buttons={false} />
                        )}
                        
                    </div>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="primary" onClick={handleClosePostedModal}>
                        Close
                    </Button>
                    </Modal.Footer>
                </Modal>
            </div>            
        </>
    );
};