import { Navigate } from "react-router-dom";
import LayoutDefault from "../layout/LayoutDefault/LayoutDefault";
import Customer from "../pages/AdminCustomer/User";
import CustomerDetail from "../pages/AdminCustomer/UserDetail";
import ProductCategories from "../pages/AdminPageMenu/ProductCategories";
import ProductCategoryDetail from "../pages/AdminPageMenu/ProductCategoryDetail";
import Products from "../pages/AdminPageMenu/Products";
import ProductDetail from "../pages/AdminPageMenu/ProductDetail";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import AdminSignIn from "../pages/AdminPage/AdminSignIn";
import Overview from "../pages/AdminPageMenu/Overview";
import AddProduct from "../pages/AdminPageMenu/AddProduct";
import AddProductCategory from "../pages/AdminPageMenu/AddProductCategory";
import PrivateRoute from "./PrivateRoute";
import StaffDetail from "../pages/AdminStaff/StaffDetail/StaffDetail";
import Staff from "../pages/AdminStaff/Staff";
import AddStaff from "../pages/AdminStaff/AddStaff/AddStaff";
import AuthDetail from "../pages/AuthDetail/AuthDetail";
import Orders from "../pages/AdminPageMenu/Orders";
import OrderDetail from "../pages/AdminPageMenu/OrderDetail";

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
    path: "/dashboard",
    element: <PrivateRoute />,
    children: [
      {
        path: "",
        element: <LayoutDefault />,
        children: [
          { path: "overview", element: <Overview /> },
          { path: "productcategories", element: <ProductCategories /> },
          {
            path: "productcategories/productcategorydetail/:categoryslug",
            element: <ProductCategoryDetail />,
          },
          { path: "products", element: <Products /> },
          { path: "user", element: <Customer /> },
          { path: "user/userdetail/:id", element: <CustomerDetail /> },
          {
            path: "products/productdetail/:productslug",
            element: <ProductDetail />,
          },
          { path: "products/addproduct", element: <AddProduct /> },
          {
            path: "productcategories/addproductcategory",
            element: <AddProductCategory />,
          },
          { path: "staff/staffdetail/:id", element: <StaffDetail /> },
          { path: "staff", element: <Staff /> },
          { path: "staff/addstaff", element: <AddStaff /> },
          { path: "authdetail", element: <AuthDetail /> },
          { path: "orders", element: <Orders /> },
          { path: "orders/orderdetail/:orderId", element: <OrderDetail /> },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
];
