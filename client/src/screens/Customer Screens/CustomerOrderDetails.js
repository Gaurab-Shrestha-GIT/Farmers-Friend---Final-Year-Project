import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Button, Table } from "react-bootstrap";
import { Image } from "cloudinary-react";

const CustomerOrderDetails = () => {
  const [productDetails, setProductDetails] = useState([]);
  useEffect(async () => {
    await axios
      .post("http://localhost:5000/customer/customerorders", {
        customerEmail: localStorage.getItem("customerEmail"),
      })
      .then((response) => {
        setProductDetails(response.data);
        console.log(response.data);
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
                <a href="/farmerdashboard" style={{ textDecoration: "none" }}>
                  Customer Dashboard
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
                <th>Delivery</th>
                <th>Farmer</th>
                <th>Phone Number</th>
              </tr>
            </thead>
            {productDetails.map((val) => {
              return (
                <>
                  <tbody>
                    <tr>
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
                      <td>{val.product_delivery}</td>
                      <td>{val.name}</td>
                      <td>{val.farmer_phone_number}</td>
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
