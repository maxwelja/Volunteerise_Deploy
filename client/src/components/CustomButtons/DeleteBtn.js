import { useEffect, useState } from 'react';
import {Form, Button, Modal} from 'react-bootstrap';
import axios from 'axios';
import Details from '../Details';
import SingleFieldForm from '../SingleFieldForm';

export default function DeleteBtn({ collection="event", form=false, idToDelete=""}) {
    
    const [link, setLink] = useState(`http://localhost:4000/api/${collection}/`);
    
    const [id, setID] = useState(idToDelete);
    const [url, setURL] = useState("");
    const [res, setRes] = useState(null);
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const [showDeletedModal, setShowDeletedModal] = useState(false);
    const deleteEvent = async () => {
        try {
            console.log(link+id);
            console.log("Delete:", id);
            const response = await axios.delete(link+id);
            console.log("Delete Res:", response);
            setRes(response.data);
            handleShowDeletedModal();
        } catch (error) {
            console.log(error)
        }
    }
    
    const handleSubmit = async (input) => {
        await setID(input);
        handleShowConfirmationModal();
    };
  
    const handleCloseConfirmationModal = (e, confirmed) => {
        e.preventDefault();
        if (confirmed) {
            try {
                deleteEvent(e);
            } catch (error) {
                console.log(error);
            }
        }
        setShowConfirmationModal(false);
    };
  
    const handleShowConfirmationModal = () => {
        setShowConfirmationModal(true);

    };

    const handleCloseDeletedModal = () => {
        setShowDeletedModal(false);
    };
  
    const handleShowDeletedModal = async (e) => {
        setShowDeletedModal(true);
    };

    return (
        <>
            <div>
                {form ? (
                    <SingleFieldForm onSubmit={handleSubmit} collection={collection} field={false} />
                ) : (
                    <Button onClick={handleSubmit}>
                        Delete {collection}
                    </Button>
                )}

                {/* Confirmation Modal */}
                <Modal
                    show={showConfirmationModal}
                    onHide={handleCloseConfirmationModal}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header>
                    <Modal.Title>Are you Sure?</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <div>
                        <h4>
                            This change is irreversible!<br />
                            You'll need to make another<br />
                            account to use our service again!
                        </h4>
                    </div>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button className="btnForm" variant="danger" onClick={(e) => handleCloseConfirmationModal(e, true)}>
                        Yes, I'm sure
                    </Button>
                    <Button className="btnForm" variant="secondary" onClick={(e) => handleCloseConfirmationModal(e, false)}>
                        Cancel
                    </Button>
                    </Modal.Footer>
                </Modal>
                
                {/* Event Posted Modal */}
                <Modal
                    show={showDeletedModal}
                    onHide={handleCloseDeletedModal}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header>
                    <Modal.Title>Event Posted!</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <div>
                        <h4>
                            Hope to see you again soon!<br />
                        </h4>                        
                    </div>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="primary" onClick={handleCloseDeletedModal}>
                        Goodbye
                    </Button>
                    </Modal.Footer>
                </Modal>
            </div>            
        </>
    );
};