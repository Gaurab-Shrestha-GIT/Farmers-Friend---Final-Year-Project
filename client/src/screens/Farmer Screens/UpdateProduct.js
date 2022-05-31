import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

import FormContainer from "../../components/FormContainer";

const UpdateProduct = () => {
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productCode, setProductCode] = useState("");

  const [message, setMessage] = useState("");

  const { id } = useParams();

  const navigate = useNavigate();

  useEffect(async () => {
    await axios
      .get(`https://farmersfriends.herokuapp.com/farmer/updateproduct/${id}`)
      .then((response) => {
        setProductName(response.data[0].product_name);
        setProductPrice(response.data[0].product_price);
        setProductDescription(response.data[0].product_description);
        setProductCode(response.data[0].product_code);
      });
  }, []);

  const update = async () => {
    await axios
      .put(`https://farmersfriends.herokuapp.com/farmer/updateproduct/${id}`, {
        updatedProductName: productName,
        updatedProductPrice: productPrice,
        updatedProductDescription: productDescription,
        updatedProductCode: productCode,
      })
      .then((response) => {
        if (response.data.update) {
          setMessage(response.data.message);
        } else {
          setMessage(response.data.message);
        }
      });
  };
  return (
    <>
      <div>
        <FormContainer>
          <Form className="py-4" encType="multipart/form-data">
            <Form.Group>
              <Form.Label>Product Name</Form.Label>

              <Form.Control
                type="text"
                placeholder="Enter Product Name"
                value={productName}
                onChange={(event) => {
                  setProductName(event.target.value);
                }}
              ></Form.Control>
            </Form.Group>

            <Form.Group>
              <Form.Label>Product Price</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Address"
                value={productPrice}
                onChange={(event) => {
                  setProductPrice(event.target.value);
                }}
              ></Form.Control>
            </Form.Group>

            <Form.Group>
              <Form.Label>Product Description</Form.Label>
              <textarea
                className="form-control"
                placeholder="Enter Description"
                rows="3"
                value={productDescription}
                onChange={(event) => {
                  setProductDescription(event.target.value);
                }}
              ></textarea>
            </Form.Group>
            <Form.Group>
              <Form.Label>Product Code</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter First and Last letter of product name"
                value={productCode}
                onChange={(event) => {
                  setProductCode(event.target.value);
                }}
              ></Form.Control>
              <div className="text-center">
                <h5 className="pt-4">{message}</h5>
              </div>
            </Form.Group>
            <div className="text-center">
              <Button className="me-5" onClick={update}>
                Update Product
              </Button>
            </div>
          </Form>
        </FormContainer>
      </div>
    </>
  );
};

export default UpdateProduct;
