import React, { useEffect, useState } from "react";
import { Badge, Table } from "react-bootstrap";
import AddCategory from "./AddCategory";
import { getAllCategory } from "../../API/api";
import DeleteCategory from "./DeleteCategory";
import category_img from '../../assets/category.png'
import EditCategory from "./EditCategory";

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [addCategoryModalShow, setAddCategoryModalShow] = useState(false);
  const [deleteModalShow, setDeleteModalShow] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [alert, setAlert] = useState({ show: false, variant: '', message: '' });

  const [editModalShow, setEditModalShow] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);


  const fetchData = async () => {
    const response = await getAllCategory();
    if (response.success) {
      setCategories(response.categories);
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


  const handleCategoryUpdate = (success, message) => {
    showAlert(success ? 'success' : 'danger', message);
    if (success) {
      fetchData();
    }
  }

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
          <h1 className="me-3 mb-0">Category</h1>
          <img
            src={category_img}
            alt="Products"
            style={{ width: '40px', height: '40px', objectFit: 'contain' }}
          />
        </div>
        <button className='btn btn-primary' onClick={() => setAddCategoryModalShow(true)}>Add Category</button>
        <hr />
        <div className='d-flex justify-content-between p-3'>
          <p>Category <Badge bg="secondary">{categories.length}</Badge></p>
          <p><button className='btn btn-secondary'>Filter</button></p>
        </div>
      </div>

      <hr />
      <div className="container shadow p-3 rounded">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Category Name</th>
              <th>Image</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {categories.length > 0 ? (
              categories.map((category, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{category.name}</td>
                  <td><img src={category.imageUrl || ""} alt={category.name} width="50" /></td>
                  <td>
                    <button className="btn btn-sm btn-warning me-2"
                    onClick={()=>{
                      setSelectedCategory(category);
                      setEditModalShow(true);
                    }}
                    
                    
                    >Edit</button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => {
                        setSelectedCategoryId(category.id);
                        setDeleteModalShow(true);
                      }}
                    >
                      Delete
                    </button>

                    <DeleteCategory
                      show={deleteModalShow}
                      onHide={() => setDeleteModalShow(false)}
                      categoryId={selectedCategoryId}
                      onCategoryDelete={() => {
                        fetchData();
                        showAlert('success', 'Category deleted successfully!');
                      }}
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center">No categories available</td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>

      <AddCategory
        show={addCategoryModalShow}
        onHide={() => setAddCategoryModalShow(false)}
        onCategoryAdded={() => {
          fetchData();
          showAlert('success', 'Category added successfully!');
        }}

      />

      <EditCategory
      show={editModalShow}
      onHide={()=>setEditModalShow(false)}
      category={selectedCategory}
      onCategoryUpdated={handleCategoryUpdate}
      />
    </>
  );
};

export default Category;
