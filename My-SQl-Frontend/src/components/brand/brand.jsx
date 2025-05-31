import React, { useEffect, useState } from "react";
import { Badge, Table } from "react-bootstrap";
import AddBrand from "./AddBrand";
import { getAllBrands } from "../../API/api";
import DeleteBrand from "./DeleteBrand";
import Brand_img from '../../assets/brand.png';
import EditBrand from "./EditBrand";


const Brand = () => {
  const [brands, setBrands] = useState([]);
  const [addBrandModalShow, setAddBrandModalShow] = useState(false);
  const [deleteModalShow, setDeleteModalShow] = useState(false);
  const [selectedBrandId, setSelectedBrandId] = useState(null);
  const [alert, setAlert] = useState({ show: false, variant: '', message: '' });

  const [editModalShow, setEditModalShow] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState(null);


  const fetchData = async () => {
    const response = await getAllBrands();
    if (response.success) {
      setBrands(response.brands)
    }
  }

  useEffect(() => {
    fetchData();
  }, [])

  const showAlert = (variant, message) => {
    setAlert({ show: true, variant, message });
    setTimeout(() => {
      setAlert({ show: false, variant: '', message: '' });
    }, 3000); // Hide alert after 3 seconds
  };

  const handleBrandUpdate = (success,message)=>{
    showAlert(success ? 'success':'danger',message);
    if(success) {
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
          <h1 className="me-3 mb-0">Brand</h1>
          <img
            src={Brand_img}
            alt="Products"
            style={{ width: '40px', height: '40px', objectFit: 'contain' }}
          />
        </div>
        <button className='btn btn-primary' onClick={() => setAddBrandModalShow(true)}>Add Brand</button>
        <hr />
        <div className='d-flex justify-content-between p-3'>
          <p>Brand <Badge bg="secondary">{brands.length}</Badge></p>
          <p><button className='btn btn-secondary'>Filter</button></p>
        </div>
      </div>

      <hr />
      <div className="container shadow p-3 rounded">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Brand Name</th>
              <th>Image</th>
              <th>Action</th>

            </tr>
          </thead>
          <tbody>
            {
              brands.length > 0 ? (
                brands.map((brand, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{brand.name}</td>
                    {/* <td><img src={brand.imageUrl} alt={brand.name} width="50" /></td> */}
                    <img src={brand.image} alt={brand.name} width="130" height="100" />


                    <td>
                      <button className="btn btn-sm btn-warning me-2"
                      onClick={()=>{
                        setSelectedBrand(brand);
                        setEditModalShow(true)
                      }}
                      
                      >Edit</button>
                      <button className="btn btn-sm btn-danger"
                        onClick={() => {
                          setSelectedBrandId(brand.id);
                          setDeleteModalShow(true);
                          showAlert(success ? 'success' : 'danger', message);
                        }}
                      >Delete</button>

                      <DeleteBrand
                        show={deleteModalShow}
                        onHide={() => setDeleteModalShow(false)}
                        brandId={selectedBrandId}
                        onBrandDelete={fetchData}
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center">No brands available</td>

                </tr>
              )
            }
          </tbody>
        </Table>

      </div>
      <AddBrand show={addBrandModalShow}
        onHide={() => setAddBrandModalShow(false)}
        onBrandAdded={fetchData} />

      <EditBrand
      show={editModalShow}
      onHide={()=>setEditModalShow(false)}
      brand={selectedBrand}
      onBrandUpdated={handleBrandUpdate}
      />
    </>

  );
};

export default Brand;
