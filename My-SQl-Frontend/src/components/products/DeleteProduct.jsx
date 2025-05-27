import React from "react";
import { deleteProduct } from "../../API/api";
import { Button, Modal } from "react-bootstrap";

function DeleteProduct({ show, onHide, productId, onProductDelete }) {

    const handleDeleteProduct = async () => {
        try {
            const response = await deleteProduct(productId);
            if (response.success) {
                onProductDelete(true, 'Product deleted successfully');
            } else {
                onProductDelete(false, response.message || 'Failed to delete product');
            }
        } catch (error) {
            onProductDelete(false, error.message || 'Error deleting product');
        } finally {
            onHide();
        }
    };

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>Delete Product</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Are you sure you want to delete this product?
            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={handleDeleteProduct}>
                    Delete
                </Button>
                <Button variant="secondary" onClick={onHide}>
                    Cancel
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default DeleteProduct;
