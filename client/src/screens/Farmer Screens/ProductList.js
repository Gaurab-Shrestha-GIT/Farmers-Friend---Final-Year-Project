import React, { useEffect, useState } from "react";
import Axios from "axios";
import {
  Container,
  Button,
  Table,
  Row,
  Col,
  Card,
  ListGroup,
} from "react-bootstrap";
import { Image } from "cloudinary-react";
import { Link } from "react-router-dom";
import axios from "axios";

const ProductList = () => {
  const [productDetails, setProductDetails] = useState([]);

  useEffect(async () => {
    await Axios.post(
      "https://farmersfriends.herokuapp.com/farmer/productlist",
      {
        farmerEmail: localStorage.getItem("farmerEmail"),
      }
    ).then((response) => {
      setProductDetails(response.data);
    });
  }, []);

  //button to display product
  const productView = async (id) => {
    alert("Product Successfully Set to View!");
    await axios.put(`https://farmersfriends.herokuapp.com/farmer/view/${id}`);
    window.location.reload();
  };

  //button to hide product
  const productHidden = async (id) => {
    alert("Product Successfully Set to Hidden!");
    await axios.put(`https://farmersfriends.herokuapp.com/farmer/hidden/${id}`);
    window.location.reload();
  };

  return (
    <Container className="">
      <div>
        <nav aria-label="breadcrumb" className=" mt-2">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="/farmerdashboard" style={{ textDecoration: "none" }}>
                Farmer Dashboard
              </a>
            </li>

            <li className="breadcrumb-item active" aria-current="page">
              Order Details
            </li>
          </ol>
        </nav>
      </div>
      <Row>
        <Col>
          <Card className="">
            <ListGroup className="text-center">
              <ListGroup.Item>
                <h4>Total Products: {productDetails.length} </h4>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>

      <div style={{ overflowX: "scroll" }}>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Price</th>
              <th>Image</th>
              <th>Status</th>
              <th>Display</th>
              <th style={{ width: "260px" }}>Action</th>
            </tr>
          </thead>
          {productDetails.map((val) => {
            return (
              <>
                <tbody>
                  <tr key={val.id}>
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
                    <td>{val.product_status}</td>
                    <td>{val.product_hidden_status}</td>
                    <td>
                      <Link to={`/farmerdashboard/updateproduct/${val.id}`}>
                        <Button
                          title="Edit Button"
                          className="me-2"
                          variant="info"
                        >
                          <i className="fas fa-edit"></i>
                        </Button>
                      </Link>

                      <Button
                        title="View Button"
                        className="me-2"
                        onClick={() => {
                          productView(val.id);
                        }}
                        disabled={val.product_hidden_status === "view"}
                      >
                        <i className="fa-solid fa-eye"></i>
                      </Button>
                      <Button
                        title="Hide Button"
                        disabled={val.product_hidden_status === "hidden"}
                        onClick={() => {
                          productHidden(val.id);
                        }}
                      >
                        <i className="fa-solid fa-eye-slash"></i>
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

export default ProductList;
