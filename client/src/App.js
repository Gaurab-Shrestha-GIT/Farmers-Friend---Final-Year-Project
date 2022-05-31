import React from "react";
import { BrowserRouter as Router, Link, Routes, Route } from "react-router-dom";
import Home from "./screens/Home";
import Admin from "./components/AdminLayout/Admin";
import Customer from "./components/CustomerLayout/Customer";
import Farmer from "./components/FarmerLayout/Farmer";
import CustomersDetails from "./screens/Admin Screens/CustomersDetails";
import FarmersDetails from "./screens/Admin Screens/FarmersDetails";
import CustomerSignUp from "./screens/Customer Screens/CustomerSignUp";
import FarmerDashboard from "./screens/Farmer Screens/FarmerDashboard";
import FarmerSignUp from "./screens/Farmer Screens/FarmerSignUp";
import AddProduct from "./screens/Farmer Screens/AddProduct";
import FarmerOrders from "./screens/Farmer Screens/FarmerOrders";
import CustomerLogin from "./screens/Customer Screens/CustomerLogin";
import CustomerProfile from "./screens/Customer Screens/CustomerProfile";
import ProductList from "./screens/Farmer Screens/ProductList";
import UpdateProduct from "./screens/Farmer Screens/UpdateProduct";
import ViewProduct from "./screens/Customer Screens/ViewProduct";
import CompareProduct from "./screens/Customer Screens/CompareProduct";
import CustomerOrderDetails from "./screens/Customer Screens/CustomerOrderDetails";
import SearchScreen from "./screens/Customer Screens/SearchScreen";
import AdminLogin from "./screens/Admin Screens/AdminLogin";
import PendingProducts from "./screens/Admin Screens/PendingProducts";
import FarmerLogin from "./screens/Farmer Screens/FarmerLogin";

const App = () => {
  const customerLoggedIn = localStorage.getItem("customerLoggedIn");

  return (
    <>
      <main>
        <>
          <Router>
            <Routes>
              <Route path="/" element={<Customer />}>
                <Route path="/" element={<Home />} />
                <Route path="/farmersignup" element={<FarmerSignUp />} />
                <Route path="/customersignup" element={<CustomerSignUp />} />

                <Route path="/customerlogin" element={<CustomerLogin />} />
                <Route path="/customerprofile" element={<CustomerProfile />} />

                <Route path="/customerorders">
                  <Route path=":id" element={<CustomerOrderDetails />} />
                  <Route path="" element={<CustomerOrderDetails />} />
                </Route>

                <Route path="/viewproduct/:id" element={<ViewProduct />} />
                <Route
                  path="/compareproduct/:id"
                  element={<CompareProduct />}
                />
                <Route path="/find/:keyword" element={<SearchScreen />} />
              </Route>

              <Route path="/admindashboard" element={<Admin />}>
                <Route
                  path="/admindashboard/adminlogin"
                  element={<AdminLogin />}
                />
                <Route
                  path="/admindashboard/pendingproducts"
                  element={<PendingProducts />}
                />

                <Route
                  path="/admindashboard/customersdetails"
                  element={<CustomersDetails />}
                />
                <Route
                  path="/admindashboard/farmersdetails"
                  element={<FarmersDetails />}
                />
              </Route>

              <Route path="/farmerdashboard" element={<Farmer />}>
                <Route path="/farmerdashboard" element={<FarmerDashboard />} />
                <Route
                  path="/farmerdashboard/addproduct"
                  element={<AddProduct />}
                />
                <Route
                  path="/farmerdashboard/farmerlogin"
                  element={<FarmerLogin />}
                />
                <Route
                  path="/farmerdashboard/farmerorders"
                  element={<FarmerOrders />}
                />

                <Route
                  path="/farmerdashboard/productlist"
                  element={<ProductList />}
                />
                <Route
                  path="/farmerdashboard/updateproduct/:id"
                  element={<UpdateProduct />}
                />
              </Route>
            </Routes>
          </Router>
        </>
      </main>
    </>
  );
};

export default App;

// import React from "react";
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Navigate,
// } from "react-router-dom";

// import Home from "./screens/Home";
// import Admin from "./components/AdminLayout/Admin";
// import Customer from "./components/CustomerLayout/Customer";
// import Farmer from "./components/FarmerLayout/Farmer";
// import CustomersDetails from "./screens/Admin Screens/CustomersDetails";
// import FarmersDetails from "./screens/Admin Screens/FarmersDetails";
// import CustomerSignUp from "./screens/Customer Screens/CustomerSignUp";
// import FarmerDashboard from "./screens/Farmer Screens/FarmerDashboard";
// import FarmerSignUp from "./screens/Farmer Screens/FarmerSignUp";
// import AddProduct from "./screens/Farmer Screens/AddProduct";
// import FarmerOrders from "./screens/Farmer Screens/FarmerOrders";
// import CustomerLogin from "./screens/Customer Screens/CustomerLogin";
// import CustomerProfile from "./screens/Customer Screens/CustomerProfile";
// import ProductList from "./screens/Farmer Screens/ProductList";
// import UpdateProduct from "./screens/Farmer Screens/UpdateProduct";
// import ViewProduct from "./screens/Customer Screens/ViewProduct";
// import CompareProduct from "./screens/Customer Screens/CompareProduct";
// import CustomerOrderDetails from "./screens/Customer Screens/CustomerOrderDetails";
// import SearchScreen from "./screens/Customer Screens/SearchScreen";

// import AdminLogin from "./screens/Admin Screens/AdminLogin";
// import PendingProducts from "./screens/Admin Screens/PendingProducts";
// import FarmerLogin from "./screens/Farmer Screens/FarmerLogin";

// const App = () => {
//   const customerLoggedIn = localStorage.getItem("customerLoggedIn");
//   const farmerLoggedIn = localStorage.getItem("farmerLoggedIn");
//   const adminLoggedIn = localStorage.getItem("adminLoggedIn");
//   return (
//     <>
//       <main>
//         <>
//           <Router>
//             <Routes>
//               <Route path="/" element={<Customer />}>
//                 <Route path="/" element={<Home />} />
//                 <Route path="/farmersignup" element={<FarmerSignUp />} />
//                 <Route path="/customersignup" element={<CustomerSignUp />} />

//                 <Route path="/customerlogin" element={<CustomerLogin />} />
//                 <Route path="/viewproduct/:id" element={<ViewProduct />} />
//                 <Route
//                   path="/compareproduct/:id"
//                   element={<CompareProduct />}
//                 />
//                 <Route path="/find/:keyword" element={<SearchScreen />} />
//                 <Route path="/customerprofile" element={<CustomerProfile />} />

//                 <Route
//                   path="/customerorders"
//                   element={<CustomerOrderDetails />}
//                 />

//                 {/* {customerLoggedIn && (
//                   <>

//                   </>
//                 )} */}

//                 {/* <Route
//                   path="/*"
//                   element={
//                     <Navigate to={!customerLoggedIn && "/customerlogin"} />
//                   }
//                 /> */}
//               </Route>

//               <Route path="/farmerdashboard" element={<Farmer />}>
//                 <Route
//                   path="/farmerdashboard/farmerlogin"
//                   element={<FarmerLogin />}
//                 />
//                 {/* <Route
//                   path="/farmerdashboard/*"
//                   element={
//                     <Navigate
//                       to={!farmerLoggedIn && "/farmerdashboard/farmerlogin"}
//                     />
//                   }
//                 /> */}
//                 <Route path="/farmerdashboard" element={<FarmerDashboard />} />
//                 <Route
//                   path="/farmerdashboard/addproduct"
//                   element={<AddProduct />}
//                 />
//                 <Route
//                   path="/farmerdashboard/farmerorders"
//                   element={<FarmerOrders />}
//                 />

//                 <Route
//                   path="/farmerdashboard/productlist"
//                   element={<ProductList />}
//                 />
//                 <Route
//                   path="/farmerdashboard/updateproduct/:id"
//                   element={<UpdateProduct />}
//                 />

//                 {farmerLoggedIn && <></>}
//               </Route>

//               <Route path="/admindashboard" element={<Admin />}>
//                 <Route
//                   path="/admindashboard/adminlogin"
//                   element={<AdminLogin />}
//                 />

//                 <Route
//                   path="/admindashboard/pendingproducts"
//                   element={<PendingProducts />}
//                 />

//                 <Route
//                   path="/admindashboard/customersdetails"
//                   element={<CustomersDetails />}
//                 />
//                 <Route
//                   path="/admindashboard/farmersdetails"
//                   element={<FarmersDetails />}
//                 />

//                 {/* <Route
//                   path="/admindashboard/*"
//                   element={
//                     <Navigate
//                       to={!adminLoggedIn && "/admindashboard/adminlogin"}
//                     />
//                   }
//                 /> */}
//               </Route>
//             </Routes>
//           </Router>
//         </>
//       </main>
//     </>
//   );
// };

// export default App;
