import axios from "axios";
import React, { useEffect, useState } from "react";

import { Link, useParams } from "react-router-dom";
import { Row, Col, Card } from "react-bootstrap";
import { Image } from "cloudinary-react";

const SearchScreen = () => {
  const { keyword } = useParams();
  console.log(keyword);

  const [productDetails, setProductDetails] = useState([]);

  useEffect(async () => {
    await axios
      .get(`https://farmersfriends.herokuapp.com/home/find/${keyword}`)
      .then((response) => {
        setProductDetails(response.data);
      });
  }, []);

  return (
    <div>
      <title>Welcome to Farmer's Friend</title>

      <Row className="m-2">
        {productDetails.length == 0 ? (
          <>
            <div>
              <span>Search Results on '{keyword}'</span> <br></br>
              <span>0 Products Found</span>
            </div>
          </>
        ) : (
          <>
            <span>Search Results on '{keyword}'</span>
            <span>{productDetails.length} Products Found</span>
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
                    <a
                      href="/viewproduct/:id"
                      style={{ textDecoration: "none" }}
                    >
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
                    <div className="d-flex py-2">
                      Rating:
                      <Card.Text className="ms-3">Here</Card.Text>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </>
        )}
      </Row>
    </div>
  );
};

export default SearchScreen;
