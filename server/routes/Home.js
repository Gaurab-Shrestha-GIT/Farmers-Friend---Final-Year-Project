const express = require("express");
const router = express.Router();
const db = require("../database/db");

//get details to show in home
router.get("/", (req, res) => {
  db.query(
    "SELECT p.id, p.product_name, p.product_price, p.product_description, p.product_image, f.name FROM add_product p JOIN farmer_details f on f.farmer_email=p.farmer_email WHERE product_status = 'approved' AND product_hidden_status = 'view'",

    (err, result) => {
      if (err) {
        console.log(err);
      }
      res.send(result);
    }
  );
});

//get product details for add to cart
router.get("/products/:id", (req, res) => {
  const id = req.params.id;
  db.query(
    "SELECT p.id, p.product_name, p.product_price, p.product_description, p.product_image, p.farmer_email, f.name FROM add_product p JOIN farmer_details f on p.farmer_email=f.farmer_email WHERE id = ?",
    [id],
    (err, result) => {
      if (err) {
        console.log(err);
      }
      res.send(result);
    }
  );
});

//get individual product details with rating and review
router.get("/viewproduct/:id", (req, res) => {
  const id = req.params.id;

  db.query(
    "SELECT p.farmer_email, p.id, p.product_name, p.product_price, p.product_description, p.product_image,p.product_code, f.name, rr.customer_email, rr.review, rr.rating, rr.date_time, c.customer_name FROM add_product p JOIN farmer_details f on p.farmer_email = f.farmer_email JOIN rating_review rr on p.id = rr.product_id JOIN customer_details c on rr.customer_email = c.customer_email WHERE id = ?",
    [id],
    (error, result) => {
      if (result.length === 0) {
        db.query(
          "SELECT p.farmer_email, p.id, p.product_name, p.product_price, p.product_description, p.product_image,p.product_code, f.name FROM add_product p JOIN farmer_details f on f.farmer_email=p.farmer_email WHERE id = ?",
          [id],
          (err, result) => {
            res.send({ result: result, rating: false });
          }
        );
      } else {
        res.send({ result: result, rating: true });
      }
    }
  );
});

//compare similar products
router.get("/compareproduct/:id", (req, res) => {
  const id = req.params.id;

  db.query(
    "SELECT p.id, p.product_name, p.product_price, p.product_description, p.product_image, p.product_code, f.name FROM add_product p JOIN farmer_details f on f.farmer_email=p.farmer_email WHERE product_code = ?",
    [id],
    (error, result) => {
      if (error) {
        console.log(error);
      } else {
        res.send(result);
      }
    }
  );
});

//find product
router.get("/find/:keyword", (req, res) => {
  const keyword = req.params.keyword;

  if (req.params.keyword) {
    db.query(
      `SELECT p.id, p.product_name, p.product_price, p.product_description, p.product_image, p.product_code, f.name FROM add_product p JOIN farmer_details f on f.farmer_email=p.farmer_email WHERE product_name LIKE ?`,
      "%" + keyword + "%",
      (error, result) => {
        if (error) {
          console.log(error);
        } else {
          res.send(result);
        }
      }
    );
  }
});

module.exports = router;
