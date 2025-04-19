import LayoutDefault from "../layout/LayoutDefault/LayoutDefault";
import ProductCategories from "../pages/AdminPageMenu/ProductCategories";
import ProductCategoryDetail from "../pages/AdminPageMenu/ProductCategoryDetail";
import Products from "../pages/AdminPageMenu/Products";
import ProductDetail from "../pages/AdminPageMenu/ProductDetail";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import AdminSignIn from "../pages/AdminPage/AdminSignIn";

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
        path: "productdetail",
        element: <ProductDetail />,
      },
    ],
  },
  {
    path: "/signin",
    element: <AdminSignIn />,
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
];
