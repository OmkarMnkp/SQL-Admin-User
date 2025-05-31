import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { addNewBrand } from "../../API/api";

function AddBrand(props) {
  const [brandName, setBrandName] = useState('');
  const [brandImage, setBrandImage] = useState(null);

  const handleNewBrand = async () => {
    const formData = new FormData();
    formData.append("name", brandName);
    formData.append("image", brandImage); // key must match multer

    try {
      const response = await addNewBrand(formData, true);
      if (response.success) {
        props.onBrandAdded();
        props.onHide();
      } else {
        alert(response.message || "Failed to add brand");
      }
    } catch (err) {
      console.error("Error uploading brand:", err);
      alert("Upload failed");
    }
  };

  return (
    <Modal {...props} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Add New Brand</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Enter brand name"
          value={brandName}
          onChange={(e) => setBrandName(e.target.value)}
        />
        <input
          type="file"
          className="form-control"
          accept="image/*"
          onChange={(e) => setBrandImage(e.target.files[0])}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="success" onClick={handleNewBrand}>Create</Button>
        <Button variant="secondary" onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AddBrand;
