import { FaChevronRight } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import "./ProductCategoryDetail.css";
import { useEffect, useState } from "react";

function ProductCategoryDetail() {
  const navigateToAdmin = useNavigate();
  const navigateToProductCategories = useNavigate();
  const location = useLocation();
  const currentCategory = location.state?.item;
  const [parentCategory, setParentCategory] = useState();
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const resParentCategory = await fetch(
        `http://localhost:3000/api/v1/products-category`
      );
      const parentCategoryJson = await resParentCategory.json();
      setParentCategory(parentCategoryJson.info);
    };
    fetchData();
  }, []);

  const handleAdminClick = () => {
    navigateToAdmin(`/`);
  };

  const handleProductCategoriesClick = () => {
    navigateToProductCategories(`/productcategories`);
  };

  return (
    <div className="product-category-detail-container">
      <div className="product-category-detail">
        <div className="product-category-detail__title">Category Detail</div>
        <div className="product-category-detail__breadcrumb">
          <span onClick={handleAdminClick}>Admin</span>
          <FaChevronRight />
          <span onClick={handleProductCategoriesClick}>Product Categories</span>
          <FaChevronRight />
          <span>{currentCategory.categoryName}</span>
        </div>
        <div className="product-category-detail__content">
          <label className="category__name">
            Name
            <input
              type="text"
              value={currentCategory.categoryName}
              disabled={isEdit}
            ></input>
          </label>
          <label className="category__parent-category">
            Parent Category
            <input
              type="text"
              value={
                parentCategory && parentCategory.length > 0
                  ? parentCategory.find(
                      (item) => item._id === currentCategory.categoryParentID
                    )?.categoryName || "No parent"
                  : null
              }
              disabled={isEdit}
            ></input>
          </label>
          <label className="category__image">
            Image
            <img
              alt=""
              src={currentCategory.categoryImage}
              style={{ width: "20rem", height: "12rem", objectFit: "contain" }}
            />
          </label>
          <label className="category__status">
            Status
            <div className="category__status--group">
              <label>
                <input
                  type="radio"
                  value="active"
                  checked={currentCategory.categoryStatus === "active"}
                  disabled={isEdit}
                ></input>
                Active
              </label>
              <label>
                <input
                  type="radio"
                  value="inactive"
                  checked={currentCategory.categoryStatus === "inactive"}
                  disabled={isEdit}
                ></input>
                InActive
              </label>
            </div>
          </label>
          <label className="category__position">
            Position
            <input
              type="number"
              value={currentCategory.categoryPosition}
              disabled={isEdit}
            ></input>
          </label>
          <label className="category__slug">
            Slug
            <input
              type="text"
              value={currentCategory.categorySlug}
              disabled={isEdit}
            ></input>
          </label>
          <label className="category__create-by">
            Create By
            <input
              type="text"
              value={currentCategory.createBy}
              disabled={isEdit}
            ></input>
          </label>
          <label className="category__update-by">
            Update By
            <input
              type="text"
              value={currentCategory.updateBy}
              disabled={isEdit}
            ></input>
          </label>
          <label className="category__delete-by">
            Delete By
            <input
              type="text"
              value={currentCategory.deleteBy}
              disabled={isEdit}
            ></input>
          </label>
          <label className="category__deleted">
            Deleted
            <div className="category__deleted--group">
              <label>
                <input
                  type="radio"
                  value={true}
                  checked={currentCategory.deleted === true}
                  disabled={isEdit}
                ></input>
                True
              </label>
              <label>
                <input
                  type="radio"
                  value={false}
                  checked={currentCategory.deleted === false}
                  disabled={isEdit}
                ></input>
                False
              </label>
            </div>
          </label>
          <label className="category__delete-at">
            Delete At
            <input
              type="text"
              value={
                currentCategory.deletedAt
                  ? new Date(currentCategory.deletedAt).toLocaleDateString(
                      "vi-VN"
                    )
                  : "Null"
              }
              disabled={isEdit}
            ></input>
          </label>
          <label className="category__create-at">
            Create At
            <input
              type="text"
              value={
                currentCategory.createdAt
                  ? new Date(currentCategory.createdAt).toLocaleDateString(
                      "vi-VN"
                    )
                  : "Null"
              }
              disabled={isEdit}
            ></input>
          </label>
          <label className="category__update-at">
            Update At
            <input
              type="text"
              value={
                currentCategory.updatedAt
                  ? new Date(currentCategory.updatedAt).toLocaleDateString(
                      "vi-VN"
                    )
                  : "Null"
              }
              disabled={isEdit}
            ></input>
          </label>
        </div>
      </div>
    </div>
  );
}

export default ProductCategoryDetail;
