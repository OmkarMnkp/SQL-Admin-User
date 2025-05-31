import React, { useState, useEffect } from "react";
import { addNewProduct, getAllCategory, getAllBrands } from "../../API/api";
import { Modal, Button } from "react-bootstrap";

function AddProduct(props) {
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productQuantity, setProductQuantity] = useState('');
  const [productInstock, setProductInStock] = useState(true);
  const [categoryId, setCategoryId] = useState('');
  const [brandId, setBrandId] = useState('');
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoryResponse = await getAllCategory();
        const brandResponse = await getAllBrands();
        setCategories(categoryResponse.categories || []);
        setBrands(brandResponse.brands || []);
      } catch (error) {
        console.log("Error fetching categories/brands", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleNewProduct = async () => {
    if (!categoryId || !brandId) {
      alert("Please select a valid category and brand.");
      return;
    }
    
    const payload = {
      name: productName,
      description: productDescription,
      price: Number(productPrice),
      quantity: Number(productQuantity),
      instock: Boolean(productInstock),
      category_id: categoryId,
      brand_id: brandId,
    };

    try {
      const response = await addNewProduct(payload);
      if (response?.success) {
        props.onProductAdded();
        props.onHide();
        alert('Product added successfully');
      } else {
        alert('Failed to add product');
      }
    } catch (error) {
      console.log("Error adding product", error);
      alert("An error occurred while adding the product.");
    }
  };

  return (
    <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Add New Product</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Enter product name"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Enter product description"
          value={productDescription}
          onChange={(e) => setProductDescription(e.target.value)}
        />
        <input
          type="number"
          className="form-control mb-2"
          placeholder="Enter product price"
          value={productPrice}
          onChange={(e) => setProductPrice(e.target.value)}
        />
        <select
          className="form-control mb-2"
          value={productInstock}
          onChange={(e) => setProductInStock(e.target.value === "true")}
        >
          <option value="true">In Stock</option>
          <option value="false">Out Of Stock</option>
        </select>
        <input
          type="number"
          className="form-control mb-2"
          placeholder="Quantity"
          value={productQuantity}
          onChange={(e) => setProductQuantity(e.target.value)}
        />
        <select
          className="form-control mb-2"
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
        >
          <option value="">Select Category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        <select
          className="form-control mb-2"
          value={brandId}
          onChange={(e) => setBrandId(e.target.value)}
        >
          <option value="">Select Brand</option>
          {brands.map((brand) => (
            <option key={brand.id} value={brand.id}>
              {brand.name}
            </option>
          ))}
        </select>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="success" onClick={handleNewProduct}>Create</Button>
        <Button variant="secondary" onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AddProduct;
