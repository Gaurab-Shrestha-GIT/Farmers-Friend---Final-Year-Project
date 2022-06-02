import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Button, Table } from "react-bootstrap";
import { Image } from "cloudinary-react";
import { useNavigate } from "react-router-dom";

const CustomerOrderDetails = () => {
  const [productDetails, setProductDetails] = useState([]);
  const navigate = useNavigate();

  useEffect(async () => {
    await axios
      .post("https://farmersfriends.herokuapp.com/customer/customerorders", {
        customerEmail: localStorage.getItem("customerEmail"),
      })
      .then((response) => {
        setProductDetails(response.data);
      });
  }, []);

  return (
    <>
      <title>Welcome to Farmer's Friend</title>
      <Container className="">
        <div>
          <nav aria-label="breadcrumb" className=" mt-2">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="/customerprofile" style={{ textDecoration: "none" }}>
                  Customer
                </a>
              </li>

              <li className="breadcrumb-item active" aria-current="page">
                Order Details
              </li>
            </ol>
          </nav>
        </div>
        <div> {productDetails.length === 0 && <p>No Orders</p>}</div>

        <div>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Price</th>
                <th>Qty</th>
                <th>Total Price</th>
                <th>Image</th>

                <th>Farmer</th>
                <th>Phn Number</th>
                <th>Delivery</th>
              </tr>
            </thead>
            {productDetails.map((val) => {
              return (
                <>
                  <tbody>
                    <tr key={val.id}>
                      <td>{val.product_name}</td>
                      <td>{val.product_price}</td>
                      <td>{val.product_qty}</td>
                      <td>{val.total_price}</td>
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
                      <td>{val.farmer_phone_number}</td>
                      <td>{val.product_delivery}</td>
                    </tr>
                  </tbody>
                </>
              );
            })}
          </Table>
        </div>
      </Container>
    </>
  );
};

export default CustomerOrderDetails;
