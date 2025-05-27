
import React from "react";

import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { addNewBrand } from "../../API/api";

function AddBrand(props) {
  
    const [brandName,setBrandName] = useState('');

    const handleNewBrand = async ()=>{
        const payload = {name:brandName};
        const response = await addNewBrand(payload);
        if(response.success){
            props.onBrandAdded();
            props.onHide();
        }
        else{
            alert('failed to add brand')
        }
    }



  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Add New Brand
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <input
          type="text"
          className="form-control"
          placeholder="Enter brand name"
          value={brandName}
          onChange={(e) => setBrandName(e.target.value)}
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