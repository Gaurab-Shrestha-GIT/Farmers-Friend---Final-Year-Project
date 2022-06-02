const express = require("express");
const router = express.Router();
const db = require("../database/db");
const bcrypt = require("bcryptjs");
const moment = require("moment");
// const jwt = require("jsonwebtoken");
// const isAuth = require("../middleware/authMiddleware");

//register customer here
router.post("/registerCustomer", (req, res) => {
  const customerName = req.body.customerName;
  const customerAddress = req.body.customerAddress;
  const customerPhoneNumber = req.body.customerPhoneNumber;
  const customerEmail = req.body.customerEmail;
  const customerPassword = req.body.customerPassword;
  const customerPasswordConfirm = req.body.customerPasswordConfirm;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s]{2,8}$/i;
  const phoneNumberRegex =
    /^\+?(?:977)?[ -]?(?:(?:(?:98|97)-?\d{8})|(?:01-?\d{7}))$/i;
  if (
    customerName.trim() == "" ||
    customerAddress.trim() == "" ||
    customerPhoneNumber.trim() == "" ||
    customerEmail.trim() == "" ||
    customerPassword.trim() == "" ||
    customerPasswordConfirm.trim() == ""
  ) {
    return res.json({
      register: false,
      message: "Please fill all the fields!",
    });
  } else if (!emailRegex.test(customerEmail)) {
    return res.json({
      register: false,
      message: "Email invalid!",
    });
  } else if (!phoneNumberRegex.test(customerPhoneNumber)) {
    return res.json({
      register: false,
      message: "Phone Number invalid!",
    });
  } else {
    db.query(
      "SELECT customer_email FROM customer_details WHERE customer_email = ?",
      [customerEmail],
      async (error, result) => {
        if (error) {
          console.log(error);
        }
        if (result.length > 0) {
          return res.json({
            register: false,
            message: "Email is already registered",
          });
        } else if (customerPassword !== customerPasswordConfirm) {
          return res.json({
            register: false,
            message: "Password do not match",
          });
        }
        const hashedPassword = await bcrypt.hash(customerPassword, 8);
        db.query(
          "INSERT INTO customer_details (customer_name, address, phone_number, customer_email, password) VALUES (?, ?, ?, ?, ?)",
          [
            customerName,
            customerAddress,
            customerPhoneNumber,
            customerEmail,
            hashedPassword,
          ],
          (error, result) => {
            if (error) {
              console.log(error);
            } else {
              res.json({
                register: true,
                message: "Customer sucessfully Registered",
              });
            }
          }
        );
      }
    );
  }
});

//customer login here
router.post("/customerlogin", (req, res) => {
  const customerEmail = req.body.customerEmail;
  const password = req.body.password;

  if (customerEmail.trim() == "" || password.trim() == "") {
    return res.json({
      register: false,
      message: "Please fill all the fields!",
    });
  }

  db.query(
    "SELECT * FROM customer_details WHERE customer_email = ?",
    [customerEmail],
    async (err, result) => {
      if (err) {
        console.log(err);
      }
      if (result.length > 0) {
        const validHashedPassword = await bcrypt.compare(
          password,
          result[0].password
        );

        if (validHashedPassword) {
          // const token = jwt.sign({ customerEmail }, "farmers friend", {
          //   expiresIn: 500,
          // });

          // // const token = jwt.sign({ customerEmail }, "farmers friend", {
          // //   expiresIn: 300,
          // // });
          // console.log(token);

          return res.json({
            // auth: true,
            // token: token,
            // result: result,
            customerEmail: customerEmail,
            customerLoggedIn: true,
          });
        } else {
          return res.json({
            customerLoggedIn: false,
            // auth: false,
            message: "Email or password incorrect",
          });
        }
      } else {
        return res.json({
          customerLoggedIn: false,
          // auth: false,
          message: "User do not exist",
        });
      }
    }
  );
});

//customer profile
router.post("/customerprofile", async (req, res) => {
  const customerEmail = req.body.customerEmail;

  db.query(
    "SELECT * FROM customer_details WHERE customer_email = ?",
    [customerEmail],
    (error, result) => {
      if (error) {
        console.log(error);
      }
      res.send(result);
    }
  );
});

//update customer details
router.put("/customerprofile", async (req, res) => {
  const customerEmail = req.body.customerEmail;
  const customerName = req.body.updatedName;
  const address = req.body.updatedAddress;
  const password = req.body.updatedPassword;
  const phoneNumber = req.body.updatedPhoneNumber;
  const phoneNumberRegex =
    /^\+?(?:977)?[ -]?(?:(?:(?:98|97)-?\d{8})|(?:01-?\d{7}))$/i;

  if (
    customerName.trim() == "" ||
    address.trim() == "" ||
    password.trim() == ""
  ) {
    return res.json({
      update: false,
      message: "Please fill all the fields!",
    });
  } else if (!phoneNumberRegex.test(phoneNumber)) {
    return res.json({
      update: false,
      message: "Phone Number invalid!",
    });
  } else {
    const hashedPassword = await bcrypt.hash(password, 8);

    db.query(
      "UPDATE customer_details SET customer_name = ?, address = ?, password = ?, phone_number=? WHERE customer_email = ?",
      [customerName, address, hashedPassword, phoneNumber, customerEmail],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          return res.json({
            update: true,
            message: "Updated Successfully",
          });
        }
      }
    );
  }
});

//rating and review
router.post("/:id/reviews", (req, res) => {
  const rating = req.body.rating;
  const review = req.body.review;
  const customerEmail = req.body.customerEmail;

  const id = req.params.id;
  const timestamp = moment(Date.now()).format("YYYY-MM-DD HH:mm:ss");

  console.log(review);
  console.log(rating);
  if (review == null) {
    return res.json({
      review: false,
      message: "Review field empty!",
    });
  }

  db.query(
    "SELECT customer_email, product_id FROM rating_review WHERE customer_email = ? AND product_id = ? ",
    [customerEmail, id],
    async (error, result) => {
      if (error) {
        console.log(error);
      }
      if (result.length > 0) {
        return res.json({
          review: false,
          message: "Product reviewed already",
        });
      }

      db.query(
        "INSERT INTO rating_review (product_id, review, rating, customer_email, date_time) VALUES (?, ?, ?, ?, ?)",
        [id, review, rating, customerEmail, timestamp],
        (err, result) => {
          if (err) {
            console.log(err);
          } else {
            res.json({
              review: true,
              message: "Review Submitted",
            });
          }
        }
      );
    }
  );
});

// place order page route
// router.post("/placeorder", (req, res) => {
//   const orders = req.body.orders;
//   console.log(orders);
//   console.log(orders.length);
//   console.log(orders[0].order_id);
//   let sql = "";

//   //final
//   orders.map((order) => {
//     sql =
//       sql +
//       `INSERT INTO cust_orders VALUES ('${order.order_id}', ${order.product_id},'${order.farmer_email}', '${order.customer_email}', ${order.order_qty}),`;
//   });
//   // orders.map((order) => {
//   //   sql =
//   //     `INSERT INTO cust_orders (order_id, product_id, farmer_email, customer_email, qty) VALUES ('${order.order_id}', ${order.product_id},'${order.farmer_email}', '${order.customer_email}', '${order.order_qty}') ` +
//   //     sql;
//   // });

//   db.query(sql, (error, result) => {
//     if (error) {
//       console.log(error);
//     } else {
//       res.send(result);
//     }
//   });
// });

router.post("/placeorder/:id", (req, res) => {
  const productId = req.params.id;
  const orderId = req.body.orderID;
  const productName = req.body.productName;
  const farmerEmail = req.body.farmerEmail;
  const productPrice = req.body.productPrice;
  const productImage = req.body.productImage;
  const totalPrice = req.body.totalPrice;
  const qty = req.body.productQty;
  const customerEmail = req.body.customerEmail;
  const productDelivery = "pending";

  db.query(
    "INSERT INTO customer_orders (order_id, product_id, product_name, farmer_email, product_price, product_image, product_qty, total_price, customer_email, product_delivery) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
    [
      orderId,
      productId,
      productName,
      farmerEmail,
      productPrice,
      productImage,
      qty,
      totalPrice,

      customerEmail,
      productDelivery,
    ],
    (error, result) => {
      if (error) {
        console.log(error);
      }
      res.send(result);
    }
  );
});

//customer details for order screen
router.post("/customerorders", (req, res) => {
  const customer_email = req.body.customerEmail;
  db.query(
    "SELECT * FROM customer_orders co JOIN add_product p ON co.product_id = p.id JOIN farmer_details f ON co.farmer_email = f.farmer_email WHERE customer_email = ?",
    [customer_email],
    (error, result) => {
      if (error) {
        console.log(error);
      } else {
        res.send(result);
      }
    }
  );
});

module.exports = router;
