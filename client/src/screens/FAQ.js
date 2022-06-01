import React from "react";
import { Row, Col, Container } from "react-bootstrap";

const FAQ = () => {
  return (
    <div>
      <title>FAQ | Farmer's Friend</title>
      <Container className="mt-5">
        <Row className="text-center">
          <div>
            <h3>FREQUENTLY ASKED QUESTIONS</h3>
          </div>
        </Row>

        <Row className="mt-3">
          <Col>
            <div class="accordion" id="accordionExample">
              <div class="accordion-item">
                <h2 class="accordion-header" id="headingOne">
                  <button
                    class="accordion-button"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseOne"
                    aria-expanded="true"
                    aria-controls="collapseOne"
                  >
                    How to register yourself as Farmer ?
                  </button>
                </h2>
                <div
                  id="collapseOne"
                  class="accordion-collapse collapse hide"
                  aria-labelledby="headingOne"
                  data-bs-parent="#accordionExample"
                >
                  <div class="accordion-body">
                    Fill out the form by clicking the "Join As Farmer" option at
                    the top of the page.
                  </div>
                </div>
              </div>
            </div>
          </Col>
          <Col>
            <div class="accordion" id="accordionExample">
              <div class="accordion-item">
                <h2 class="accordion-header" id="headingTwo">
                  <button
                    class="accordion-button"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseTwo"
                    aria-expanded="true"
                    aria-controls="collapseTwo"
                  >
                    How to buy vegetables/fruits ?
                  </button>
                </h2>
                <div
                  id="collapseTwo"
                  class="accordion-collapse collapse hide"
                  aria-labelledby="headingTwo"
                  data-bs-parent="#accordionExample"
                >
                  <div class="accordion-body">
                    On the home page, click on the product you wish, and you'll
                    be taken to the product screen, where you can buy it by
                    clicking the "BUY" button, but you must be logged in as
                    customer in order to place an order for a product
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
        <Row className="mt-5">
          <Col>
            <div class="accordion" id="accordionExample">
              <div class="accordion-item">
                <h2 class="accordion-header" id="headingThree">
                  <button
                    class="accordion-button"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseThree"
                    aria-expanded="true"
                    aria-controls="collapseThree"
                  >
                    How to check your orders ?
                  </button>
                </h2>
                <div
                  id="collapseThree"
                  class="accordion-collapse collapse hide"
                  aria-labelledby="headingThree"
                  data-bs-parent="#accordionExample"
                >
                  <div class="accordion-body">
                    After logging into your customer account, select the
                    "Orders" link at the top to see your products.
                  </div>
                </div>
              </div>
            </div>
          </Col>
          <Col>
            <div class="accordion" id="accordionExample">
              <div class="accordion-item">
                <h2 class="accordion-header" id="headingFour">
                  <button
                    class="accordion-button"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseFour"
                    aria-expanded="true"
                    aria-controls="collapseFour"
                  >
                    How to sell your product ?
                  </button>
                </h2>
                <div
                  id="collapseFour"
                  class="accordion-collapse collapse hide"
                  aria-labelledby="headingFour"
                  data-bs-parent="#accordionExample"
                >
                  <div class="accordion-body">
                    You must register as a farmer in order to sell your product.
                    After you've registered as a farmer, you can log in and add
                    products using the "Add Product" form.
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
        <Row className="mt-5">
          <Col>
            <div class="accordion" id="accordionExample">
              <div class="accordion-item">
                <h2 class="accordion-header" id="headingFive">
                  <button
                    class="accordion-button"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseFive"
                    aria-expanded="true"
                    aria-controls="collapseFive"
                  >
                    Where to find the product you added ?
                  </button>
                </h2>
                <div
                  id="collapseFive"
                  class="accordion-collapse collapse hide"
                  aria-labelledby="headingFive"
                  data-bs-parent="#accordionExample"
                >
                  <div class="accordion-body">
                    After you've logged in to your farmer's account, go to the
                    "Product List" tab to see all of the products you've added.
                  </div>
                </div>
              </div>
            </div>
          </Col>
          <Col>
            <div class="accordion" id="accordionExample">
              <div class="accordion-item">
                <h2 class="accordion-header" id="headingSix">
                  <button
                    class="accordion-button"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseSix"
                    aria-expanded="true"
                    aria-controls="collapseSix"
                  >
                    How do you like to receive your order ?
                  </button>
                </h2>
                <div
                  id="collapseSix"
                  class="accordion-collapse collapse hide"
                  aria-labelledby="headingSix"
                  data-bs-parent="#accordionExample"
                >
                  <div class="accordion-body">
                    You can contact the farmer through their phone number after
                    placing the order the product and request delivery, or
                    customers can go to the farmer's field and get fresh
                    vegetables.
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default FAQ;
