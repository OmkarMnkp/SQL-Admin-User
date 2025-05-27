import React, { useEffect, useState } from "react";
import { getAllProducts } from "../../API/api";
import { Badge, Table } from "react-bootstrap";
import AddProduct from "./AddProduct";
import DeleteProduct from "./DeleteProduct";
import UpdateProduct from "./UpdateProduct";
import product_img from '../../assets/product.png';

const Product = () => {
  const [products, setProducts] = useState([]);
  const [addProductModalShow, setAddProductModalShow] = useState(false);
  const [alert, setAlert] = useState({ show: false, variant: '', message: '' });
  const [deleteModalShow, setDeleteModalShow] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [editModalShow, setEditModalShow] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const fetchData = async () => {
    try {
      const response = await getAllProducts();
      if (response?.success && Array.isArray(response.products)) {
        setProducts(response.products);
      } else {
        setProducts([]);
        showAlert('danger', 'Failed to load products');
      }
    } catch (error) {
      console.error("Error fetching products", error);
      showAlert('danger', 'An error occurred while fetching products');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const showAlert = (variant, message) => {
    setAlert({ show: true, variant, message });
    setTimeout(() => {
      setAlert({ show: false, variant: '', message: '' });
    }, 3000);
  };

  return (
    <>
      {alert.show && (
        <div className={`alert alert-${alert.variant} alert-dismissible fade show`} role="alert">
          {alert.message}
          <button type="button" className="btn-close" onClick={() => setAlert({ show: false })}></button>
        </div>
      )}

      <div className='container p-3'>
        <div className="d-flex align-items-center mb-3">
          <h1 className="me-3 mb-0">Products</h1>
          <img
            src={product_img}
            alt="Products"
            style={{ width: '40px', height: '40px', objectFit: 'contain' }}
          />
        </div>

        <button className='btn btn-primary' onClick={() => setAddProductModalShow(true)}>Add Product</button>
        <hr />
        <div className='d-flex justify-content-between p-3'>
          <p>Products <Badge bg="secondary">{products.length}</Badge></p>
        </div>
      </div>

      <hr />
      <div className="container shadow p-3 rounded">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>In Stock</th>
              <th>Category ID</th>
              <th>Brand ID</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((product, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{product.name}</td>
                  <td>{product.description}</td>
                  <td>{product.price}</td>
                  <td>{product.quantity}</td>
                  <td>{product.instock ? "Yes" : "No"}</td>
                  <td>{product.category_id}</td>
                  <td>{product.brand_id}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-warning me-2"
                      onClick={() => {
                        setSelectedProduct(product);
                        setEditModalShow(true);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => {
                        setSelectedProductId(product.id);
                        setDeleteModalShow(true);
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr><td colSpan="9" className="text-center">No products available</td></tr>
            )}
          </tbody>
        </Table>
      </div>

      <AddProduct
        show={addProductModalShow}
        onHide={() => setAddProductModalShow(false)}
        onProductAdded={fetchData}
      />

      <DeleteProduct
        show={deleteModalShow}
        onHide={() => setDeleteModalShow(false)}
        productId={selectedProductId}
        onProductDelete={(success, message) => {
          if (success) {
            fetchData();
            showAlert('success', message);
          } else {
            showAlert('danger', message);
          }
        }}
      />

      <UpdateProduct
        show={editModalShow}
        onHide={() => setEditModalShow(false)}
        product={selectedProduct}
        onProductUpdated={(success, message) => {
          if (success) {
            fetchData();
            showAlert('success', message);
          } else {
            showAlert('danger', message);
          }
        }}
      />
    </>
  );
};

export default Product;
