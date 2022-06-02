const express = require("express");
const router = express.Router();
const db = require("../database/db");
const jwt = require("jsonwebtoken");

//login admin
router.post("/adminlogin", (req, res) => {
  const adminEmail = req.body.adminEmail;
  const adminPassword = req.body.adminPassword;

  db.query(
    "SELECT * FROM admin_details WHERE admin_email = ?",
    [adminEmail],
    (err, result) => {
      if (err) {
        console.log(err);
      }
      if (result.length > 0) {
        if (adminPassword == result[0].admin_password) {
          const adminEmail = result[0].admin_email;
          const token = jwt.sign({ adminEmail }, "farmers friend", {
            expiresIn: 300,
          });

          return res.json({
            auth: true,
            token: token,
            adminLoggedIn: true,
            adminEmail: adminEmail,
          });
        } else {
          return res.json({
            auth: false,
            adminLoggedIn: false,
            message: "Email or password incorrect",
          });
        }
      } else {
        return res.json({
          auth: false,
          adminLoggedIn: false,
          message: "User do not exist",
        });
      }

      res.send(result);
    }
  );
});

//get all customers details
router.get("/customerdetails", (req, res) => {
  db.query(
    "SELECT * FROM customer_details",

    (err, result) => {
      if (err) {
        console.log(err);
      }
      res.send(result);
    }
  );
});

//get all farmers details
router.get("/farmerdetails", (req, res) => {
  db.query(
    "SELECT * FROM farmer_details",

    (err, result) => {
      if (err) {
        console.log(err);
      }
      res.send(result);
    }
  );
});

//get all pending products
router.get("/pendingproducts", (req, res) => {
  db.query(
    "SELECT *  FROM add_product p JOIN farmer_details f ON p.farmer_email = f.farmer_email",

    (err, result) => {
      if (err) {
        console.log(err);
      }
      res.send(result);
    }
  );
});

router.put("/pendingproducts/:id", (req, res) => {
  const productId = req.params.id;
  db.query(
    "UPDATE add_product SET product_status = 'approved' WHERE id = ?",
    [productId],

    (err, result) => {
      if (err) {
        console.log(err);
      }
      res.send(result);
    }
  );
});

//delete farmer product
router.delete("/pendingproducts/:id", (req, res) => {
  const id = req.params.id;

  db.query("DELETE FROM add_product WHERE id = ?", [id], (error, result) => {
    if (error) {
      console.log(error);
    } else {
      res.send("Deleted");
    }
  });
});

module.exports = router;
