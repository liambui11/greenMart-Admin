import { useEffect, useState } from "react";
import "./ProductCategories.css";
import { CiEdit } from "react-icons/ci";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { FaChevronRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axiosInstanceStaff from "../../untils/axiosInstanceStaff";
import OverlayLoading from "../../components/OverlayLoading/OverlayLoading";

function ProductCategories() {
  const [categoriesData, setCategoriesData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleAdminClick = () => {
    navigate(`/dashboard/overview`);
  };
  const handleCategoryProductDetailClick = (categorySlug) => {
    navigate(
      `/dashboard/productcategories/productcategorydetail/${categorySlug}`
    );
  };

  const handleCategoryProductDeleteClick = () => {
    console.log("deleted");
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const resProductCategory = await axiosInstanceStaff.get(
          `/api/v1/admin/products-category`
        );
        setCategoriesData(resProductCategory.data.info);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const [searchQuery, setSearchQuery] = useState("");
  const filteredCategory = categoriesData.filter((item) =>
    item.categoryName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="product-categories-container">
      <div className="product-categories">
        <div className="product-categories__title">
          <div className="product-categories__title--name">
            Product Categories
          </div>
          <div className="product-categories__title--button">
            <div
              className="add-button"
              onClick={() => navigate(`/dashboard/productcategories/addproductcategory`)}
            >
              Add Category
            </div>
          </div>
        </div>
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
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
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
              {filteredCategory.map((item) => (
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
                    <span
                      className={`categories-status ${
                        item.categoryStatus === "active" ? "" : "inactive"
                      }`}
                    >
                      {item.categoryStatus === "active" ? "Active" : "Inactive"}
                    </span>
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
                      onClick={() =>
                        handleCategoryProductDetailClick(item.categorySlug)
                      }
                    />
                  </td>
                  <td>
                    <MdOutlineDeleteOutline
                      className="delete-icon"
                      onClick={handleCategoryProductDeleteClick}
                    />
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

export default ProductCategories;
