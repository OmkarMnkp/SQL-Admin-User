import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { addNewCategory } from "../../API/api";

function AddCategory(props){
    const [categoryName, setCategoryName] = useState('');

    const handleNewCategory = async () => {
        try {
            const payload = { name: categoryName };
            const response = await addNewCategory(payload);
            if (response.success) {
                props.onCategoryAdded();
                props.onHide();
            } else {
                alert('Failed to add category');
            }
        } catch (error) {
            alert('Error: ' + error.message);
        }
    };

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Add New Category
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Category name"
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="success" onClick={handleNewCategory}>Create</Button>
                <Button variant="secondary" onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default AddCategory;
