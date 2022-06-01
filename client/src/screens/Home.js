import React, { useEffect, useState } from "react";
import { Row, Col, Card, Carousel, Button } from "react-bootstrap";

import { Image } from "cloudinary-react";
import { Link } from "react-router-dom";
import axios from "axios";
import picture2 from "../image/picture2.jpg";
import picture66 from "../image/picture66.png";
import logo from "../image/favicon.jpg";

const HomeScreen = () => {
  const [product, setProduct] = useState([]);

  useEffect(async () => {
    await axios
      .get(`https://farmersfriends.herokuapp.com/home/allproducts`)
      .then((response) => {
        setProduct(response.data);
      });
  }, []);

  return (
    <>
      <title>Welcome to Farmer's Friend</title>
      <Row className="m-2">
        <Carousel>
          <Carousel.Item className="text-center">
            <img className="d-block w-100" src={picture66} alt="First slide" />
          </Carousel.Item>

          <Carousel.Item className="text-center">
            <img className="d-block w-100" src={picture2} alt="Second slide" />
          </Carousel.Item>
        </Carousel>
        <Row className=" mt-3">
          <Col lg={4} className="text-center">
            <Image src={logo} />
          </Col>
          <Col lg={8}>
            <Row>
              <h3 style={{ textTransform: "none" }}>
                Welcome to Farmer's Friend
              </h3>
            </Row>
            <Row>
              Farmers Friend is an online platform for our farmers to put their
              grown products online to sell. Customer can order the products and
              either receive the product by themselves visiting the farmers
              field or receive the product the farmer deliver right to your
              home.
            </Row>
            <Row className="mt-2">
              <Col>
                <Button
                  style={{
                    backgroundColor: "#5870a1",
                    cursor: "default",
                  }}
                >
                  Here to Help Farmers
                </Button>
              </Col>

              <Col>
                <Button
                  style={{
                    backgroundColor: "#003153",
                    cursor: "default",
                  }}
                >
                  Easy Shopping
                </Button>
              </Col>
              <Col>
                <Button
                  style={{
                    backgroundColor: "#587246",
                    cursor: "default",
                  }}
                >
                  Friendly Platform
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Row>
      <Row className="m-2">
        <h1 style={{ textTransform: "none" }}> Featured Products</h1>
        <h2>{product.length === 0 && <>NO Products</>}</h2>
        {product.map((val) => (
          <Col key={val.id} sm={12} md={6} lg={4} xl={3}>
            <Card className="my-3 p-3 rounded text-center">
              <Link to={`/viewproduct/${val.id}`}>
                <Image
                  cloudName="gaurabcloudinary"
                  publicId={val.product_image}
                  variant="top"
                  width="50%"
                  height="220px"
                />
              </Link>
            </Card>

            <Card className="my-3 p-2 rounded">
              <Card.Body>
                <Link
                  to={`/viewproduct/${val.id}`}
                  style={{ textDecoration: "none" }}
                >
                  <div className="d-flex py-1">
                    Name:
                    <Card.Text className="ms-3">{val.product_name}</Card.Text>
                  </div>

                  <div className="d-flex py-1">
                    Farmer:
                    <Card.Text className="ms-3">{val.name}</Card.Text>
                  </div>

                  <div className="d-flex py-1">
                    Price/Kgs:
                    <Card.Text className="ms-3">
                      Rs.{val.product_price}
                    </Card.Text>
                  </div>
                </Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default HomeScreen;
