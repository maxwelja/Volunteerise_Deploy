import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

function SingleFieldForm({onSubmit, collection}) {
    const [id, setID] = useState('');

    const handleChange = (e) => {
        setID(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (id) {
            console.log('Form submitted with value:', id);
            onSubmit(id);
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formSingleEntry">
                <Form.Control
                    type="text"
                    placeholder={`Enter ${collection} ID`}
                    value={id}
                    onChange={handleChange}
                />
            </Form.Group>
            <Button variant="primary" type="submit">
                Delete
            </Button>
        </Form>
    );
}

export default SingleFieldForm;