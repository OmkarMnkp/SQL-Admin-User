import React from "react";
import { deleteCategory } from "../../API/api";
import { Button, Modal } from "react-bootstrap";

function DeleteCategory({ show, onHide, categoryId, onCategoryDelete }) {

    const handleDeleteCategory = async () => {
        const response = await deleteCategory(categoryId);
        if (response.success) {
            onCategoryDelete(true, 'Category deleted successfully');
            onHide();
        } else {
            onCategoryDelete(false, response.message);
            onHide();
        }
    };

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>Delete Category</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Are you sure you want to delete this Category?
            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={handleDeleteCategory}>
                    Delete
                </Button>
                <Button variant="secondary" onClick={onHide}>
                    Cancel
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
export default DeleteCategory;
