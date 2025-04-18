import { FaChevronRight } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import "./ProductCategoryDetail.css";
import { useEffect, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { TbArrowBackUp } from "react-icons/tb";
import { LuSave } from "react-icons/lu";
import { FaCloudUploadAlt } from "react-icons/fa";
import Swal from "sweetalert2";

function ProductCategoryDetail() {
  const navigateToAdmin = useNavigate();
  const navigateToProductCategories = useNavigate();
  const [currentParentCategory, setCurrentParentCategory] = useState();
  const [isEdit, setIsEdit] = useState(false);

  const location = useLocation();
  const currentCategory = location.state?.item;
  const [categoryName, setCategoryName] = useState(
    currentCategory.categoryName
  );
  const [categoryImage, setCategoryImage] = useState(
    currentCategory.categoryImage
  );
  const [parentCategory, setParentCategory] = useState(
    currentCategory.categoryParentID
  );

  const [categoryStatus, setCategoryStatus] = useState(
    currentCategory.categoryStatus
  );
  const [categorySlug, setCategorySlug] = useState(
    currentCategory.categorySlug
  );
  const [categoryDeleted, setCategoryDeleted] = useState(
    currentCategory.deleted
  );
  const [categoryPosition, setCategoryPosition] = useState(
    currentCategory.categoryPosition
  );

  useEffect(() => {
    const fetchData = async () => {
      const resParentCategory = await fetch(
        `http://localhost:3000/api/v1/products-category`
      );
      const parentCategoryJson = await resParentCategory.json();
      setCurrentParentCategory(parentCategoryJson.info);
    };
    fetchData();
  }, []);

  const handleAdminClick = () => {
    navigateToAdmin(`/`);
  };

  const handleProductCategoriesClick = () => {
    navigateToProductCategories(`/productcategories`);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCategoryImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="product-category-detail-container">
      <div className="product-category-detail">
        <div className="product-category-detail__title">
          <div className="product-category-detail__title--name">
            Category Detail
          </div>
          <div className="product-category-detail__title--button">
            {isEdit && (
              <div
                className="save-button"
                onClick={() => handleSave(setIsEdit)}
              >
                <LuSave />
                Save
              </div>
            )}

            <div className="edit-button" onClick={() => setIsEdit(true)}>
              <CiEdit />
              Edit
            </div>
            <div
              className="back-button"
              onClick={() => navigateToProductCategories(`/productcategories`)}
            >
              <TbArrowBackUp />
              Back
            </div>
          </div>
        </div>
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
              value={categoryName}
              disabled={!isEdit}
              onChange={(e) => setCategoryName(e.target.value)}
            ></input>
          </label>
          <label className="category__parent-category">
            Parent Category
            <select
              disabled={!isEdit}
              value={parentCategory}
              onChange={(e) => setParentCategory(e.target.value)}
            >
              <option value="">No Parent</option>
              {currentParentCategory?.map((item) => (
                <option key={item._id} value={item._id}>
                  {item.categoryName}
                </option>
              ))}
            </select>
          </label>
          <label className="category__image">
            Image
            <div className="category__image--content">
              <img
                alt=""
                src={categoryImage}
                style={{
                  width: "20rem",
                  height: "12rem",
                  objectFit: "contain",
                }}
              />
              {isEdit && (
                <>
                  <input
                    type="file"
                    accept="image/*"
                    id="imageUpload"
                    style={{ display: "none" }}
                    onChange={handleImageChange}
                  />
                  <label className="upload-icon" htmlFor="imageUpload">
                    <FaCloudUploadAlt size="3rem" />
                  </label>
                </>
              )}
            </div>
          </label>
          <label className="category__status">
            Status
            <div className="category__status--group">
              <label>
                <input
                  type="radio"
                  value="active"
                  checked={categoryStatus === "active"}
                  disabled={!isEdit}
                  onChange={(e) => setCategoryStatus(e.target.value)}
                ></input>
                Active
              </label>
              <label>
                <input
                  type="radio"
                  value="inactive"
                  checked={categoryStatus === "inactive"}
                  disabled={!isEdit}
                  onChange={(e) => setCategoryStatus(e.target.value)}
                ></input>
                InActive
              </label>
            </div>
          </label>
          <label className="category__position">
            Position
            <input
              type="number"
              value={categoryPosition}
              disabled={!isEdit}
              onChange={(e) => setCategoryPosition(Number(e.target.value))}
            ></input>
          </label>
          <label className="category__slug">
            Slug
            <input
              type="text"
              value={categorySlug}
              disabled={!isEdit}
              onChange={(e) => setCategorySlug(e.target.value)}
            ></input>
          </label>
          <label className="category__create-by">
            Create By
            <input
              type="text"
              value={currentCategory.createBy}
              disabled={true}
            ></input>
          </label>
          <label className="category__update-by">
            Update By
            <input
              type="text"
              value={currentCategory.updateBy}
              disabled={true}
            ></input>
          </label>
          <label className="category__delete-by">
            Delete By
            <input
              type="text"
              value={currentCategory.deleteBy}
              disabled={true}
            ></input>
          </label>
          <label className="category__deleted">
            Deleted
            <div className="category__deleted--group">
              <label>
                <input
                  type="radio"
                  value="true"
                  checked={categoryDeleted.toString() === "true"}
                  disabled={!isEdit}
                  onChange={(e) => setCategoryDeleted(true)}
                ></input>
                True
              </label>
              <label>
                <input
                  type="radio"
                  value="false"
                  checked={categoryDeleted.toString() === "false"}
                  disabled={!isEdit}
                  onChange={(e) => setCategoryDeleted(false)}
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
              disabled={true}
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
              disabled={true}
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
              disabled={true}
            ></input>
          </label>
        </div>
      </div>
    </div>
  );
}

export default ProductCategoryDetail;

function handleSave(setIsEdit) {
  Swal.fire({
    title: "Do you want to save the changes?",
    showDenyButton: true,
    showCancelButton: true,
    confirmButtonText: "Save",
    denyButtonText: `Don't save`,
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire("Saved!", "", "success");
      setIsEdit(false);
    } else if (result.isDenied) {
      Swal.fire("Changes are not saved", "", "info");
      // Thực hiện hành động khi không lưu
    }
    // Không cần xử lý gì nếu người dùng nhấp vào "Cancel"
  });
}
