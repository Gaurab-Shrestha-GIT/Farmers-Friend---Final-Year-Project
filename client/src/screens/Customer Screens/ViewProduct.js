import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Row, Col, ListGroup, Card, Button, Form } from "react-bootstrap";
import { Image } from "cloudinary-react";
import Rating from "../../components/Rating.js";

const ViewProduct = () => {
  const [customerLoggedIn, setCustomerLoggedIn] = useState();
  const [review, setReview] = useState();
  const [rating, setRating] = useState(1);
  const [message, setMessage] = useState("");
  const [isRating, setIsRating] = useState();

  const [productDetails, setProductDetails] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  const [qty, setQty] = useState(1);

  const buy = async () => {
    const customer_email = localStorage.getItem("customerEmail");

    await axios
      .post(`https://farmersfriends.herokuapp.com/customer/placeorder/${id}`, {
        orderID: "O" + customer_email + productDetails[0].id + Date.now(),
        productName: productDetails[0].product_name,
        farmerEmail: productDetails[0].farmer_email,
        productPrice: productDetails[0].product_price,
        productImage: productDetails[0].product_image,
        productQty: qty,
        totalPrice: qty * productDetails[0].product_price,
        customerEmail: customer_email,
      })
      .then((response) => {
        alert("Product Successfully Ordered");
        navigate("/customerorders");
      });
  };

  useEffect(async () => {
    await axios
      .get(`https://farmersfriends.herokuapp.com/home/viewproduct/${id}`)
      .then((response) => {
        setProductDetails(response.data.result);
        setIsRating(response.data.rating);
      });

    if (localStorage.getItem("customerLoggedIn")) {
      setCustomerLoggedIn(true);
    }
  }, []);

  //avg Rating
  let avgRating = 0;

  productDetails.length !== 0 &&
    productDetails.map((product) => {
      avgRating = avgRating + product.rating;
    });

  const submitReview = async () => {
    await axios
      .post(`https://farmersfriends.herokuapp.com/customer/${id}/reviews`, {
        review: review,
        customerEmail: localStorage.getItem("customerEmail"),
        rating: Number(rating),
      })
      .then((res) => {
        if (res.data.review) {
          alert("Review Successfully Subitted");
          window.location.reload();
        } else {
          setMessage(res.data.message);
        }
      });
  };

  return (
    <>
      <title>Welcome to Farmer's Friend</title>

      <div className=" p-3">
        <Link className="btn btn-dark mt-3 " to="/">
          Back to Home
        </Link>
      </div>
      {productDetails[0] && (
        <Row key={productDetails[0].id}>
          <Col md={3}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <p>Name: {productDetails[0].product_name}</p>
                <p>Owned By: {productDetails[0].name}</p>
                <p>Price/Kgs: Rs. {productDetails[0].product_price}</p>

                <Rating value={avgRating / productDetails.length} />

                <p>{productDetails[0].product_description}</p>
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={5} className="mb-3 text-center">
            <Image
              cloudName="gaurabcloudinary"
              publicId={productDetails[0].product_image}
              variant="top"
              alt={productDetails[0].product_image}
            />
          </Col>
          <Col md={4}>
            <Card>
              <ListGroup>
                <ListGroup.Item>
                  <Row>
                    <Col>In Kgs:</Col>
                    <Col>
                      <select
                        style={{ width: "50px" }}
                        value={qty}
                        onChange={(event) => {
                          setQty(event.target.value);
                        }}
                      >
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                      </select>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Total Price:</Col>
                    <Col>
                      <strong>
                        Rs. {qty * productDetails[0].product_price}
                      </strong>
                    </Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item className="text-center ">
                  <Row>
                    <Col>
                      <Button
                        disabled={!customerLoggedIn}
                        onClick={buy}
                        type="button"
                      >
                        Buy
                      </Button>
                    </Col>
                  </Row>
                  <Row className="mt-2">
                    <Col>
                      <Button
                        type="button"
                        href={`/compareproduct/${productDetails[0].product_code}`}
                      >
                        Compare Similar Products
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
      <Col md={4}>
        <ListGroup variant="flush">
          <ListGroup.Item>
            <h2>Reviews</h2>

            {!isRating && (
              <>
                <p>No Reviews</p>
              </>
            )}

            {isRating &&
              productDetails.map((ratingIndividual) => {
                return (
                  <div>
                    {ratingIndividual && (
                      <>
                        <Rating value={ratingIndividual.rating} />
                        <p>{ratingIndividual.customer_name}</p>
                        <p> {ratingIndividual.review}</p>
                        <p>{ratingIndividual.date_time.substring(0, 10)}</p>
                      </>
                    )}
                  </div>
                );
              })}
          </ListGroup.Item>
          <ListGroup.Item>
            <h2>Write a Review</h2>
            {customerLoggedIn ? (
              <Form>
                <Form.Group>
                  <h4 className="p-2">{message}</h4>
                  <Form.Label>Rating</Form.Label>

                  <Form.Control
                    as="select"
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                  >
                    <option value="1">1 - Poor</option>
                    <option value="2">2 - Fair</option>
                    <option value="3">3 - Good</option>
                    <option value="4">4 - Very Good</option>
                    <option value="5">5 - Excellent</option>
                  </Form.Control>
                  <Form.Label>Review</Form.Label>
                  <Form.Control
                    as="textarea"
                    placeholder="Write a Review"
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                  ></Form.Control>
                  <Button className="mt-2" onClick={submitReview}>
                    Submit
                  </Button>
                </Form.Group>
              </Form>
            ) : (
              <>
                Please <Link to="/customerlogin">Login </Link>to write a review
              </>
            )}
          </ListGroup.Item>
        </ListGroup>
      </Col>
    </>
  );
};

export default ViewProduct;
