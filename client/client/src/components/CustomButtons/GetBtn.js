import { useEffect, useState } from 'react';
import {Form, Button, Modal} from 'react-bootstrap';
import axios from 'axios';
import Details from '../Details';

export default function GetBtn({btnLabel, collection, queryKey='', buttons=true, isOrg=false, input=false}) {
    const [res, setRes] = useState(null);
    const [qKey, setQKey] = useState(queryKey);
    const [queryValue, setQueryValue] = useState('');
    const [showModal, setShowModal] = useState(false);
    const modalTitle = collection.toUpperCase();
    let link = "";

    if (collection == "notifications") {
        // uses known volunteer ID in the database
        link = `http://localhost:4000/api/${collection}/6630bee58763d8e65feee48f`;
    } else if (collection == "rsvp") {
        link = `http://localhost:4000/api/${collection}/6630bee58763d8e65feee48f`;
    } else {
        link = `http://localhost:4000/api/${collection}/`;
    }

    let url = link;

    useEffect(() => {
        // check for query and parse into the final url string
        if (queryValue !== '') {
            url += `?${qKey}=${queryValue}`;
        }
        
        const fetchData = async () => {
            try {
                const res = await axios.get(url);
            } catch (error) {
                console.log(error);
            }

        }
        fetchData();

        return () => {
            
        }

    },[queryValue])
  
    const handleClose = () => {
      setShowModal(false);
    };

    const handleShow = () => {
      setShowModal(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log("URL:", url, "Query Value:", queryValue);
            console.log("GETTING")
            const response = await axios.get(url);
            setRes(Array.isArray(response.data) ? response.data : [response.data]);
            handleShow();
        } catch(error) {
            console.log('error: ', error);
        };
    }

    const handleChange = async (e) => {
        e.preventDefault();
        await setQueryValue(e.target.value);
    };

    return (
        <>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="ID">
                    {input && <Form.Control
                    type="text"
                    placeholder={`Enter ${qKey}`}
                    value={queryValue}
                    onChange={handleChange}
                    />}
                </Form.Group>
                <Button style={{ width: "250px"}} type="submit"> { btnLabel } </Button>
            </Form>
            <div>
                <Modal
                    show={showModal}
                    onHide={handleClose}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                    <Modal.Title>{modalTitle}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <div>
                        {res && res.length > 0 ? (
                            collection != "notifications" ? (
                                res.map((entry, index) => (
                                <Details key={index} entry={entry} organization={isOrg} buttons={buttons}/>
                                ))
                            ) : (    
                                res.map((message, index) => (
                                    <h4 key={index}>{index+1}: {message}</h4>
                                ))
                            )
                        ) : (<p> Nothing Found!</p>)
                        }
                    </div>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>
                        Close
                    </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </>
    );
};