
import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { getAllBrands, getAllCategory, updateProduct } from "../../API/api";

function UpdateProduct({ show, onHide, product, onProductUpdated }) {
    const [productName, setProductName] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productQuantity, setProductQuantity] = useState('');
    const [productInstock, setProductInStock] = useState(true);
    const [categoryId, setCategoryId] = useState('');
    const [brandId, setBrandId] = useState('');
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const categoryResponse = await getAllCategory();
                const brandResponse = await getAllBrands();

                setCategories(categoryResponse.categories || []);
                setBrands(brandResponse.brands || []);

            } catch (error) {
                console.error("Error fetching  data", err);
            }
        };
        fetchData();
    }, []);


    useEffect(() => {
        if (product) {
            setProductName(product.name || "");
            setProductDescription(product.description || '');
            setProductPrice(product.price || '');
            setProductQuantity(product.quantity || '');
            setProductInStock(product.instock);
            setCategoryId(product.category_id || '');
            setBrandId(product.brand_id || '');
        }
    }, [product])

    const handleUpdate = async () => {
        const payload = {
            name: productName,
            description: productDescription,
            price: Number(productPrice),
            quantity: Number(productQuantity),
            instock: Boolean(productInstock),
            category_id: categoryId,
            brand_id: brandId,
        }

        try {
           
            const response = await updateProduct(product.id, payload);

            if (response?.success) {
                onProductUpdated(true, 'Product updated successfully');
                onHide();
            }
            else {
                onProductUpdated(false, response.message || 'Failed to update product');
            }
        } catch (error) {
            console.error("Error updating product", error);
            onProductUpdated(false, 'An error occurred while updating the product');
        }
    }
    return (
        <Modal show={show} onHide={onHide} size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title>Update Product</Modal.Title>
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
                    {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                </select>
                <select
                    className="form-control mb-2"
                    value={brandId}
                    onChange={(e) => setBrandId(e.target.value)}
                >
                    <option value="">Select Brand</option>
                    {brands.map((brand) => (
                        <option key={brand.id} value={brand.id}>{brand.name}</option>
                    ))}
                </select>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="success" onClick={handleUpdate}>Update</Button>
                <Button variant="secondary" onClick={onHide}>Cancel</Button>
            </Modal.Footer>
        </Modal>
    );
}


export default UpdateProduct;