import Axios from "axios";
import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

import FormContainer from "../../components/FormContainer";

const AddProduct = () => {
  const [productName, setProductName] = useState("");
  const [productCode, setProductCode] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productImage, setProductImage] = useState([]);
  const [productDescription, setProductDescription] = useState("");

  const [message, setMessage] = useState("");

  //save new product
  const save = async () => {
    const formData = new FormData();
    formData.append("file", productImage[0]);
    formData.append("upload_preset", "farmersfrienduploadpreset");

    //post photo in cloudinary
    await Axios.post(
      "https://api.cloudinary.com/v1_1/gaurabcloudinary/image/upload",
      formData
    ).then((response) => {
      const filename = response.data.public_id;

      //post new product
      Axios.post("https://farmersfriends.herokuapp.com/farmer/addproduct", {
        productName: productName,
        productPrice: productPrice,
        productImage: filename,
        productDescription: productDescription,
        productCode: productCode,
        farmerEmail: localStorage.getItem("farmerEmail"),
      }).then((res) => {
        if (res.data.product) {
          setMessage(res.data.message);
        } else {
          setMessage(res.data.message);
        }
      });
    });
  };

  return (
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
            placeholder="Enter Product Price"
            value={productPrice}
            onChange={(event) => {
              setProductPrice(event.target.value);
            }}
          ></Form.Control>
        </Form.Group>

        <Form.Group>
          <Form.Label>Product Photo</Form.Label>
          <Form.Control
            type="file"
            onChange={(event) => {
              setProductImage(event.target.files);
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
          <div className=" text-center mt-3">
            <h4 className="p-3">{message}</h4>
          </div>
        </Form.Group>

        <div className="text-center">
          <Button className="me-5" onClick={save}>
            Add Product
          </Button>
        </div>
      </Form>
    </FormContainer>
  );
};

export default AddProduct;
