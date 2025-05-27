
import React from "react";
import { deleteBrand } from "../../API/api";
import { Button, Modal } from "react-bootstrap";


function DeleteBrand({ show, onHide, brandId, onBrandDelete }) {
    
    const handleDeleteBrand = async () => {
        const response = await deleteBrand(brandId);
        if (response.success) {
            onBrandDelete(true, 'Brand deleted Successfully')
            onHide();

        }
        else {
            onBrandDelete(false, response.message);
            onHide();
        }
    }

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>Delete Brand</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Are you sure you want to delete this brand?
            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={handleDeleteBrand}>
                    Delete
                </Button>
                <Button variant="secondary" onClick={onHide}>
                    Cancel
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default DeleteBrand;