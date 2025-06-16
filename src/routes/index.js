import { Navigate } from "react-router-dom";
import LayoutDefault from "../layout/LayoutDefault/LayoutDefault";
import Customer from "../pages/AdminCustomer/User";
import CustomerDetail from "../pages/AdminCustomer/UserDetail";
import ProductCategories from "../pages/AdminProductCategory/ProductCategories";
import ProductCategoryDetail from "../pages/AdminProductCategory/ProductCategoryDetail";
import Products from "../pages/AdminProduct/Products";
import ProductDetail from "../pages/AdminProduct/ProductDetail";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import AdminSignIn from "../pages/SignInPage/AdminSignIn";
import Overview from "../pages/AdminOverview/Overview";
import AddProduct from "../pages/AdminProduct/AddProduct";
import AddProductCategory from "../pages/AdminProductCategory/AddProductCategory";
import PrivateRoute from "./PrivateRoute";
import StaffDetail from "../pages/AdminStaff/StaffDetail/StaffDetail";
import Staff from "../pages/AdminStaff/Staff";
import AddStaff from "../pages/AdminStaff/AddStaff/AddStaff";
import AuthDetail from "../pages/AuthDetail/AuthDetail";
import Orders from "../pages/AdminOrder/Orders";
import OrderDetail from "../pages/AdminOrder/OrderDetail";
import ProtectedRoute from "./ProtectedRoute";

export const routes = [
  {
    path: "/",
    element: <Navigate to="/dashboard/signin" />,
  },
  {
    path: "/dashboard/signin",
    element: <AdminSignIn />,
  },
  {
    path: "/dashboard/unauthorized",
    element: <ErrorPage />,
  },
  {
    path: "/dashboard",
    element: <PrivateRoute />,
    children: [
      {
        path: "",
        element: <LayoutDefault />,
        children: [
          { path: "overview", element: <Overview /> },
          {
            element: <ProtectedRoute model="category" />,
            children: [
              { path: "productcategories", element: <ProductCategories /> },
              {
                path: "productcategories/addproductcategory",
                element: <AddProductCategory />,
              },
              {
                path: "productcategories/productcategorydetail/:categoryslug",
                element: <ProductCategoryDetail />,
              },
            ],
          },
          {
            element: <ProtectedRoute model="user" />,
            children: [
              { path: "user", element: <Customer /> },
              { path: "user/userdetail/:id", element: <CustomerDetail /> },
            ],
          },
          {
            element: <ProtectedRoute model="product" />,
            children: [
              { path: "products", element: <Products /> },
              {
                path: "products/productdetail/:productslug",
                element: <ProductDetail />,
              },
              { path: "products/addproduct", element: <AddProduct /> },
            ],
          },
          { path: "authdetail", element: <AuthDetail /> },
          {
            element: <ProtectedRoute model="order" />,
            children: [
              { path: "orders", element: <Orders /> },
              { path: "orders/orderdetail/:orderId", element: <OrderDetail /> },
            ],
          },
          {
            element: <ProtectedRoute model="staff" />,
            children: [
              { path: "staff", element: <Staff /> },
              { path: "staff/staffdetail/:id", element: <StaffDetail /> },
              { path: "staff/addstaff", element: <AddStaff /> },
            ],
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
];
