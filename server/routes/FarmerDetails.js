const express = require("express");
const router = express.Router();
const db = require("../database/db");
const bcrypt = require("bcryptjs");
const multer = require("multer");

var storage = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, "public/photo/");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

var upload = multer({
  storage: storage,
});

//register a farmer
router.post("/registerFarmer", (req, res) => {
  const farmerName = req.body.farmerName;
  const farmerAddress = req.body.farmerAddress;
  const farmerEmail = req.body.farmerEmail;
  const farmerPhoneNumber = req.body.farmerPhoneNumber;
  const farmerPassword = req.body.farmerPassword;
  const farmerPasswordConfirm = req.body.farmerPasswordConfirm;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s]{2,8}$/i;
  const phoneNumberRegex =
    /^\+?(?:977)?[ -]?(?:(?:(?:98|97)-?\d{8})|(?:01-?\d{7}))$/i;

  if (
    farmerName.trim() == "" ||
    farmerAddress.trim() == "" ||
    farmerEmail.trim() == "" ||
    farmerPhoneNumber.trim() == "" ||
    farmerPassword.trim() == "" ||
    farmerPasswordConfirm.trim() == ""
  ) {
    return res.json({
      register: false,
      message: "Please fill all the fields!",
    });
  } else if (!emailRegex.test(farmerEmail)) {
    return res.json({
      register: false,
      message: "Email invalid!",
    });
  } else if (!phoneNumberRegex.test(farmerPhoneNumber)) {
    return res.json({
      register: false,
      message: "Phone Number invalid!",
    });
  } else {
    db.query(
      "SELECT farmer_email FROM farmer_details WHERE farmer_email = ?",
      [farmerEmail],
      async (error, result) => {
        if (error) {
          console.log(error);
        }
        if (result.length > 0) {
          return res.json({
            register: false,
            message: "Email is already registered",
          });
        } else if (farmerPassword !== farmerPasswordConfirm) {
          return res.json({
            register: false,
            message: "Password do not match",
          });
        }

        const hashedPassword = await bcrypt.hash(farmerPassword, 8);
        db.query(
          "INSERT INTO farmer_details (name, address, farmer_email, password, farmer_phone_number) VALUES (?, ?, ?, ?, ?)",
          [
            farmerName,
            farmerAddress,
            farmerEmail,
            hashedPassword,
            farmerPhoneNumber,
          ],
          (error, result) => {
            if (error) {
              console.log(error);
            } else {
              res.json({
                register: true,
                message: "Farmer Successfully Registered",
              });
            }
          }
        );
      }
    );
  }
});

//login farmer
router.post("/farmerlogin", (req, res) => {
  const farmerEmail = req.body.farmerEmail;
  const password = req.body.password;
  if (farmerEmail.trim() === "" || password.trim() === "") {
    return res.json({
      farmerLoggedIn: false,
      message: "Please fill empty fields!",
    });
  } else {
    db.query(
      "SELECT * FROM farmer_details WHERE farmer_email = ?",
      [farmerEmail],
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
            return res.json({
              farmerLoggedIn: true,
              farmerEmail: farmerEmail,
            });
          } else {
            return res.json({
              farmerLoggedIn: false,
              message: "Email or password incorrect",
            });
          }
        } else {
          return res.json({
            farmerLoggedIn: false,
            message: "User do not exist",
          });
        }
      }
    );
  }
});

//add product
router.post("/addproduct", (req, res) => {
  const productName = req.body.productName;
  const productPrice = req.body.productPrice;
  const productCode = req.body.productCode;
  const productDescription = req.body.productDescription;
  const farmerEmail = req.body.farmerEmail;
  const productImage = req.body.productImage;
  const productStatus = "pending";
  const productHiddenStatus = "view";
  const priceRegex = /^[0-9\b]+$/;

  if (
    productName.trim() === "" ||
    productPrice.trim() === "" ||
    productCode.trim() === "" ||
    productDescription.trim() === ""
  ) {
    return res.json({
      product: false,
      message: "Please fill all fields!",
    });
  } else if (!priceRegex.test(productPrice)) {
    return res.json({
      product: false,
      message: "Product price fields accepts number only!",
    });
  } else {
    db.query(
      "INSERT INTO add_product (product_name, product_price, product_description, product_image, farmer_email, product_code, product_status, product_hidden_status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [
        productName,
        productPrice,
        productDescription,
        productImage,
        farmerEmail,
        productCode,
        productStatus,
        productHiddenStatus,
      ],
      (error, result) => {
        if (error) {
          console.log(error);
        } else {
          return res.json({
            product: true,
            message: "Product Added Successfully",
          });
        }
      }
    );
  }
});

//get farmer details
router.post("/farmerdashboard", async (req, res) => {
  const farmerEmail = req.body.farmerEmail;

  await db.query(
    "SELECT * FROM farmer_details WHERE farmer_email = ?",
    [farmerEmail],
    (err, result) => {
      if (err) {
        console.log(err);
      }
      res.send(result);
    }
  );
});

//update farmer details
router.put("/farmerdashboard", async (req, res) => {
  const farmerEmail = req.body.farmerEmail;
  const name = req.body.updatedName;
  const address = req.body.updatedAddress;
  const password = req.body.updatedPassword;
  const phoneNumber = req.body.updatedPhoneNumber;
  const phoneNumberRegex =
    /^\+?(?:977)?[ -]?(?:(?:(?:98|97)-?\d{8})|(?:01-?\d{7}))$/i;

  if (name.trim() === "" || address.trim() === "" || password.trim() === "") {
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
      "UPDATE farmer_details SET name = ?, address = ?, password = ?, farmer_phone_number = ? WHERE farmer_email = ?",
      [name, address, hashedPassword, phoneNumber, farmerEmail],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          // res.send(result);
          return res.json({
            update: true,
            message: "Details Successfully Updated",
          });
        }
      }
    );
  }
});

//getfarmer product
router.post("/productlist", (req, res) => {
  const farmerEmail = req.body.farmerEmail;
  // console.log(req.body);
  db.query(
    "SELECT * FROM add_product WHERE farmer_email = ?",
    [farmerEmail],
    (err, result) => {
      if (err) {
        console.log(err);
      }
      res.send(result);
    }
  );
});

//delete farmer product
router.delete("/productlist/:id", (req, res) => {
  const id = req.params.id;

  db.query("DELETE FROM add_product WHERE id = ?", [id], (error, result) => {
    if (error) {
      console.log(error);
    } else {
      res.send("Deleted");
    }
  });
});

//get individual product details
router.get("/updateproduct/:id", (req, res) => {
  const id = req.params.id;
  db.query("SELECT * FROM add_product WHERE id = ?", [id], (error, result) => {
    if (error) {
      console.log(error);
    } else {
      res.send(result);
    }
  });
});

//update product
router.put("/updateproduct/:id", (req, res) => {
  const id = req.params.id;

  const updateProductName = req.body.updatedProductName;
  const updateProductPrice = req.body.updatedProductPrice;
  const updatedProductDescription = req.body.updatedProductDescription;
  const updatedProductCode = req.body.updatedProductCode;
  const priceRegex = /^[0-9\b]+$/;

  if (
    updateProductName.trim() === "" ||
    updateProductPrice.trim() === "" ||
    updatedProductDescription.trim() === "" ||
    updatedProductCode.trim() === ""
  ) {
    return res.json({
      update: false,
      message: "Please fill all the fields!",
    });
  } else if (!priceRegex.test(updateProductPrice)) {
    return res.json({
      update: false,
      message: "Product price fields accepts number only!",
    });
  } else {
    db.query(
      "UPDATE add_product SET product_name = ?, product_price = ?, product_description = ?, product_code = ? WHERE id = ?",
      [
        updateProductName,
        updateProductPrice,
        updatedProductDescription,
        updatedProductCode,
        id,
      ],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          return res.json({
            update: true,
            message: "Product Details Successfully Updated!",
          });
        }
      }
    );
  }
});

//view or hidden
router.put("/view/:id", (req, res) => {
  const productId = req.params.id;

  db.query(
    "UPDATE add_product SET product_hidden_status = 'view' WHERE id = ?",
    [productId],

    (err, result) => {
      if (err) {
        console.log(err);
      }
      res.send(result);
    }
  );
});
//view or hidden
router.put("/hidden/:id", (req, res) => {
  const productId = req.params.id;

  db.query(
    "UPDATE add_product SET product_hidden_status = 'hidden' WHERE id = ?",
    [productId],

    (err, result) => {
      if (err) {
        console.log(err);
      }
      res.send(result);
    }
  );
});

//get orders list table
router.post("/farmerorders", (req, res) => {
  const farmerEmail = req.body.farmerEmail;

  db.query(
    "SELECT * FROM customer_orders co JOIN add_product p ON co.product_id = p.id JOIN customer_details c ON co.customer_email = c.customer_email WHERE co.farmer_email = ?",
    [farmerEmail],
    (error, result) => {
      if (error) {
        console.log(error);
      } else {
        res.send(result);
      }
    }
  );
});

//update delivery status
router.put("/farmerorders/:order_id", (req, res) => {
  const orderId = req.params.order_id;

  db.query(
    "UPDATE customer_orders SET product_delivery = 'delivered' WHERE order_id = ?",
    [orderId],
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
