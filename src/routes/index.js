import LayoutDefault from "../layout/LayoutDefault/LayoutDefault";
import Customer from "../pages/AdminCustomer/Customer";
import CustomerDetail from "../pages/AdminCustomer/CustomerDetail";
import ProductCategories from "../pages/AdminPageMenu/ProductCategories";
import ProductCategoryDetail from "../pages/AdminPageMenu/ProductCategoryDetail";
import Products from "../pages/AdminPageMenu/Products";
import ErrorPage from "../pages/ErrorPage/ErrorPage";

export const routes = [
  {
    path: "/",
    element: <LayoutDefault />,
    children: [
      {
        path: "productcategories",
        element: <ProductCategories />,
      },
      {
        path: "productcategorydetail",
        element: <ProductCategoryDetail />,
      },
      {
        path: "products",
        element: <Products />,
      },
      {
        path: "customer",
        element: <Customer />,
      },
      {
        path: "customerdetail",
        element: <CustomerDetail />,
      },
    ],
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
];
