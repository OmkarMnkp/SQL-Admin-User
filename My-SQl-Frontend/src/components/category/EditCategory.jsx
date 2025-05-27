import React, { useEffect, useState } from "react";
import { Button, Modal } from 'react-bootstrap';
import { updateCategory } from "../../API/api";

function EditCategory({ show, onHide, category, onCategoryUpdated }) {
    const [categoryName, setCategoryName] = useState('');

    useEffect(() => {
        if (category) {
            setCategoryName(category.name);
        }
    }, [category]);

    const handleUpdate = async () => {
        const payload = { name: categoryName };
        const response = await updateCategory(category.id, payload);
        if (response.success) {
            onCategoryUpdated(true, 'Category updated successfully');
            onHide();
        } else {
            onCategoryUpdated(false, response.message || 'Failed to update category');
        }
    };

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>Edit Category</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <input
                    type="text"
                    className="form-control"
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="success" onClick={handleUpdate}>Update</Button>
                <Button variant="secondary" onClick={onHide}>Cancel</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default EditCategory;
