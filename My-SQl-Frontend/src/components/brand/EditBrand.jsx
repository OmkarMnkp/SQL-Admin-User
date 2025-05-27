
import React, { useEffect, useState } from "react";
import { Button, Modal } from 'react-bootstrap';
import { updateBrand } from "../../API/api";


function EditBrand({ show, onHide, brand, onBrandUpdated }) {
  const [brandName, setBrandName] = useState('');

  useEffect(() => {
    if (brand) {
      setBrandName(brand.name);
    }
  }, [brand])

  const handleUpdate = async () => {
    const payload = { name: brandName };
    const response = await updateBrand(brand.id, payload);
    if (response.success) {
      onBrandUpdated(true, 'Brand updated successfully');
      onHide();
    } else {
      onBrandUpdated(false, response.message || 'Failed to update brand');
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit Brand</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <input
          type="text"
          className="form-control"
          value={brandName}
          onChange={(e) => setBrandName(e.target.value)}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="success" onClick={handleUpdate}>Update</Button>
        <Button variant="secondary" onClick={onHide}>Cancel</Button>
      </Modal.Footer>
    </Modal>
  )

}
export default EditBrand;
