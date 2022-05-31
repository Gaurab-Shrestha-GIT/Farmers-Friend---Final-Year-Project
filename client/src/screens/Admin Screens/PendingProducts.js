import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Button, Table } from "react-bootstrap";
import { Image } from "cloudinary-react";

const PendingProducts = () => {
  const [pendingProducts, setPendingProducts] = useState([]);

  useEffect(async () => {
    await axios
      .get("http://localhost:5000/admin/pendingproducts")
      .then((response) => {
        setPendingProducts(response.data);
      });
  }, []);

  const approvedProduct = async (id) => {
    // let approveProduct = confirm("Are you sure you want to approve?");
    // if (approveProduct === true) {
    //   alert("Product Successfully Approved");
    //   await axios.put(`http://localhost:5000/admin/pendingproducts/${id}`);
    //   window.location.reload();
    // }
  };

  const deleteProduct = async (id) => {
    // let deleteProduct = confirm("Are you sure you want to delete?");
    // if (deleteProduct === true) {
    //   await axios.delete(`http://localhost:5000/admin/pendingproducts/${id}`);
    //   window.location.reload();
    // }
  };
  return (
    <Container className="mt-4">
      <div>
        <nav aria-label="breadcrumb" className=" mt-2">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a
                href="/admindashboard/pendingproducts"
                style={{ textDecoration: "none" }}
              >
                Admin Dashboard
              </a>
            </li>

            <li className="breadcrumb-item active" aria-current="page">
              Pending Products
            </li>
          </ol>
        </nav>
      </div>

      <div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Price</th>
              <th>Image</th>
              <th>Farmer</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          {pendingProducts.map((val) => {
            return (
              <>
                <tbody key={val.id}>
                  <tr>
                    <td>{val.product_name}</td>
                    <td>{val.product_price}</td>
                    <td>
                      <Image
                        cloudName="gaurabcloudinary"
                        publicId={val.product_image}
                        variant="top"
                        width="50%"
                        height="100px"
                      />
                    </td>
                    <td>{val.name}</td>
                    <td>{val.product_status}</td>
                    <td>
                      <Button
                        title="Approve Button"
                        className="me-2"
                        variant="info"
                        onClick={() => {
                          approvedProduct(val.id);
                        }}
                      >
                        <i className="fa-solid fa-check"></i>
                      </Button>

                      <Button
                        title="Delete Button"
                        variant="danger"
                        onClick={() => {
                          deleteProduct(val.id);
                        }}
                      >
                        <i className="fas fa-trash"></i>
                      </Button>
                    </td>
                  </tr>
                </tbody>
              </>
            );
          })}
        </Table>
      </div>
    </Container>
  );
};

export default PendingProducts;
