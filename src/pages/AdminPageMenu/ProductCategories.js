import { useEffect, useState } from "react";
import "./ProductCategories.css";
import { CiEdit } from "react-icons/ci";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { FaChevronRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function ProductCategories() {
  const [categoriesData, setCategoriesData] = useState([]);
  const navigateToAdmin = useNavigate();
  const navigateToProductCategoryDetail = useNavigate();

  const handleAdminClick = () => {
    navigateToAdmin(`/`);
  };
  const handleProductDetailClick = (item) => {
    navigateToProductCategoryDetail(`/productcategorydetail`, {
      state: { item },
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      const resProducts = await fetch(
        `http://localhost:3000/api/v1/products-category`
      );
      const productJson = await resProducts.json();
      setCategoriesData(productJson.info);
    };
    fetchData();
  }, []);

  return (
    <div className="product-categories-container">
      <div className="product-categories">
        <div className="product-categories__title">Product Categories</div>
        <div className="product-categories__breadcrumb">
          <span onClick={handleAdminClick}>Admin</span>
          <FaChevronRight />
          <span>Product Categories</span>
        </div>
        <div className="product-categories__content">
          <input
            className="product-categories__content--search"
            type="text"
            placeholder="Search Product Category"
          ></input>
          <table className="product-categories__content--table">
            <thead>
              <tr>
                <th>
                  <input type="checkbox"></input>
                </th>
                <th>Image</th>
                <th>Name</th>
                <th>Status</th>
                <th>Create At</th>
                <th>Update At</th>
                <th>Delete At</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {categoriesData.map((item) => (
                <tr key={item._id}>
                  <td>
                    <input type="checkbox"></input>
                  </td>
                  <td>
                    <img
                      alt=""
                      src={item.categoryImage}
                      style={{
                        height: "4rem",
                        objectFit: "contain",
                      }}
                    />
                  </td>
                  <td>{item.categoryName}</td>
                  <td>
                    <span className="categories-status">Active</span>
                  </td>
                  <td>
                    {item.createdAt
                      ? new Date(item.createdAt).toLocaleDateString("vi-VN")
                      : ""}
                  </td>
                  <td>
                    {item.updatedAt
                      ? new Date(item.updatedAt).toLocaleDateString("vi-VN")
                      : ""}
                  </td>
                  <td>
                    {item.deletedAt
                      ? new Date(item.deletedAt).toLocaleDateString("vi-VN")
                      : "Null"}
                  </td>

                  <td>
                    <CiEdit
                      className="edit-icon"
                      onClick={() => handleProductDetailClick(item)}
                    />
                  </td>
                  <td>
                    <MdOutlineDeleteOutline />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ProductCategories;
