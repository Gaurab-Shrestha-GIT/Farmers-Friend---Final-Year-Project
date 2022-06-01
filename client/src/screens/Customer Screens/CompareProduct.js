import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Row, Col, Card } from "react-bootstrap";
import { Image } from "cloudinary-react";

const CompareProduct = () => {
  //get id from url parameters with useParams
  const { id } = useParams();
  const [productDetails, setProductDetails] = useState([]);
  useEffect(async () => {
    await axios
      .get(`https://farmersfriends.herokuapp.com/home/compareproduct/${id}`)
      .then((response) => {
        setProductDetails(response.data);
      });
  }, []);
  return (
    <div>
      <title>Welcome to Farmer's Friend</title>
      <div className="text-center">
        <h1 className="mt-3 ">Comparing Products</h1>
      </div>

      <Row className="m-2">
        {productDetails.map((val) => (
          <Col sm={12} md={6} lg={4} xl={3}>
            <Card className="my-3 p-3 rounded">
              <a href={`/viewproduct/${val.id}`} className=" text-center">
                <Image
                  cloudName="gaurabcloudinary"
                  publicId={val.product_image}
                  variant="top"
                  width="50%"
                  height="220px"
                />
              </a>
            </Card>

            <Card className="my-3 p-3 rounded">
              <Card.Body>
                <a href="/viewproduct/:id" style={{ textDecoration: "none" }}>
                  <div className="d-flex">
                    Name:
                    <a>
                      <div>
                        <Card.Title className="ms-3">
                          <strong>{val.product_name}</strong>
                        </Card.Title>
                      </div>
                    </a>
                  </div>
                  <div className="d-flex py-2">
                    Farmer:
                    <Card.Text className="ms-3">{val.name}</Card.Text>
                  </div>

                  <div className="d-flex py-2">
                    Price:
                    <Card.Text className="ms-3">
                      Rs.{val.product_price}
                    </Card.Text>
                  </div>
                </a>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default CompareProduct;
