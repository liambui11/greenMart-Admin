import { useEffect, useState } from "react";
import "./Products.css";
import { CiEdit } from "react-icons/ci";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { FaChevronRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axiosInstanceStaff from "../../untils/axiosInstanceStaff";
import OverlayLoading from "../../components/OverlayLoading/OverlayLoading";
import { faL } from "@fortawesome/free-solid-svg-icons";

function Products() {
  const [categoriesData, setCategoriesData] = useState([]);
  const [productsData, setProductsData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleAdminClick = () => {
    navigate(`/dashboard/overview`);
  };
  const handleProductDetailClick = (itemSlug) => {
    navigate(`/dashboard/products/productdetail/${itemSlug}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [resProducts, resCategories] = await Promise.all([
          axiosInstanceStaff.get(
            `/api/v1/admin/products?currentPage=1&limitItems=1000`
          ),
          axiosInstanceStaff.get(`/api/v1/admin/products-category`),
        ]);

        setProductsData(resProducts.data.info);
        setCategoriesData(resCategories.data.info);
      } catch (err) {
        console.error("Lỗi: ", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  console.log(productsData);

  const [searchQuery, setSearchQuery] = useState("");
  const filteredProduct = productsData.filter((item) =>
    item.productName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="products-container">
      <div className="products">
        <div className="products__title">
          <div className="products__title--name">Products</div>
          <div className="products__title--button">
            <div
              className="add-button"
              onClick={() => navigate(`/dashboard/products/addproduct`)}
            >
              Add Product
            </div>
          </div>
        </div>
        <div className="products__breadcrumb">
          <span onClick={handleAdminClick}>Admin</span>
          <FaChevronRight />
          <span>Products</span>
        </div>
        <div className="products__content">
          <input
            className="products__content--search"
            type="text"
            placeholder="Search Product"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          ></input>
          <table className="products__content--table">
            <thead>
              <tr>
                <th>
                  <input type="checkbox"></input>
                </th>
                <th>Image</th>
                <th>Name</th>
                <th>Category</th>
                <th>Status</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Create At</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filteredProduct.map((item) => (
                <tr key={item._id}>
                  <td>
                    <input type="checkbox"></input>
                  </td>
                  <td>
                    <img
                      alt=""
                      src={item.productImage}
                      style={{
                        height: "4rem",
                        objectFit: "contain",
                      }}
                    />
                  </td>
                  <td>{item.productName}</td>
                  <td>
                    {categoriesData.map((itemCate) =>
                      itemCate._id === item.categoryID
                        ? itemCate.categoryName
                        : null
                    )}
                  </td>
                  <td>
                    <span
                      className={`products-status ${
                        item.productStatus === "active" ? "" : "inactive"
                      }`}
                    >
                      {item.productStatus === "active" ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td>${item.productPrice}</td>
                  <td>{item.productStock}</td>
                  <td>01/01/2025</td>
                  <td>
                    <CiEdit
                      className="edit-icon"
                      onClick={() => handleProductDetailClick(item.productSlug)}
                    />
                  </td>
                  <td>
                    <MdOutlineDeleteOutline className="delete-icon" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {isLoading && <OverlayLoading />}
    </div>
  );
}

export default Products;
