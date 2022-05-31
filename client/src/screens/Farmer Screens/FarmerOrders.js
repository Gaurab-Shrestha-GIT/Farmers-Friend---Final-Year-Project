import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Button, Table } from "react-bootstrap";
import { Image } from "cloudinary-react";

const FarmerOrders = () => {
  const [productDetails, setProductDetails] = useState([]);
  useEffect(async () => {
    await axios
      .post("https://farmersfriends.herokuapp.com/farmer/farmerorders", {
        farmerEmail: localStorage.getItem("farmerEmail"),
      })
      .then((response) => {
        setProductDetails(response.data);
      });
  }, []);

  const deliveryButton = async (order_id) => {
    // alert(order_id);
    alert("Product Successfully Delivered");
    await axios.put(
      `https://farmersfriends.herokuapp.com/farmer/farmerorders/${order_id}`
    );
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
      <div>{productDetails.length === 0 && <h5>No Orders</h5>}</div>

      <div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Price</th>
              <th>Qty</th>
              <th>Total Price</th>
              <th>Image</th>
              <th>Customer</th>
              <th>Phone Number</th>
              <th>Delivery</th>
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
                    <td>{val.product_price * val.product_qty}</td>
                    <td>
                      <Image
                        cloudName="gaurabcloudinary"
                        publicId={val.product_image}
                        variant="top"
                        width="50%"
                        height="100px"
                      />
                    </td>
                    <td>{val.customer_name}</td>
                    <td>{val.phone_number}</td>
                    <td>
                      <Button
                        className="bg-success"
                        disabled={val.product_delivery === "delivered"}
                        onClick={() => {
                          deliveryButton(val.order_id);
                        }}
                      >
                        {val.product_delivery}
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

export default FarmerOrders;
