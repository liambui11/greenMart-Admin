import { Navigate } from "react-router-dom";
import LayoutDefault from "../layout/LayoutDefault/LayoutDefault";
import Customer from "../pages/AdminCustomer/Customer";
import CustomerDetail from "../pages/AdminCustomer/CustomerDetail";
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
          { path: "productcategorydetail", element: <ProductCategoryDetail /> },
          { path: "products", element: <Products /> },
          { path: "customer", element: <Customer /> },
          { path: "customerdetail", element: <CustomerDetail /> },
          { path: "productdetail", element: <ProductDetail /> },
          { path: "addproduct", element: <AddProduct /> },
          { path: "addproductcategory", element: <AddProductCategory /> },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
];
