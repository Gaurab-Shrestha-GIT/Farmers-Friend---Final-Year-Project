const jwt = require("jsonwebtoken");

/**
 * If the token is not present, send a response with a message saying "No Token". If the token is
 * present, verify the token and if it is not verified, send a response with a message saying "failed
 * to authenticate". If the token is verified, set the userEmail to the decoded email and call the next
 * function.
 */
// const auth = (req, res) => {
//   /* Getting the token from the header. */
//   const token = req.headers["x-access-token"];

//   if (!token) {
//     res.json({
//       auth: false,
//       message: "No Token",
//     });
//   } else {
//     jwt.verify(token, "farmers friend", (error) => {
//       if (error) {
//         res.json({
//           auth: false,
//           message: "Not Authenticated",
//         });
//       } else {
//         res.json({
//           auth: true,
//           message: "Authenticated",
//         });
//         next();
//       }
//     });
//   }
// };

module.exports = auth;
