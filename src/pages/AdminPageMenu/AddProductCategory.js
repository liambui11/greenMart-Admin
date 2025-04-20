import { FaChevronRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./AddProductCategory.css";
import { useEffect, useState } from "react";
import { TbArrowBackUp } from "react-icons/tb";
import { LuSave } from "react-icons/lu";
import { FaCloudUploadAlt } from "react-icons/fa";
import Swal from "sweetalert2";

function ProductCategoryDetail() {
  const navigate = useNavigate();
  const [currentParentCategory, setCurrentParentCategory] = useState();
  const [categoryName, setCategoryName] = useState("");
  const [categoryImage, setCategoryImage] = useState("/image/logoGM.png");
  const [parentCategory, setParentCategory] = useState("No Parent");
  const [categoryStatus, setCategoryStatus] = useState("active");
  const [categorySlug, setCategorySlug] = useState("");
  const [categoryPosition, setCategoryPosition] = useState(0);

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
    navigate(`/`);
  };

  const handleProductCategoriesClick = () => {
    navigate(`/productcategories`);
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
    <div className="add-category-container">
      <div className="add-category">
        <div className="add-category__title">
          <div className="add-category__title--name">Add New Category</div>
          <div className="add-category__title--button">
            <div className="save-button" onClick={() => handleSave()}>
              <LuSave />
              Save
            </div>
            <div
              className="back-button"
              onClick={() => navigate(`/productcategories`)}
            >
              <TbArrowBackUp />
              Back
            </div>
          </div>
        </div>
        <div className="add-category__breadcrumb">
          <span onClick={handleAdminClick}>Admin</span>
          <FaChevronRight />
          <span onClick={handleProductCategoriesClick}>Product Categories</span>
          <FaChevronRight />
          <span>Add New Category</span>
        </div>
        <div className="add-category__content">
          <label className="category__name">
            Name
            <input
              type="text"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
            ></input>
          </label>
          <label className="category__parent-category">
            Parent Category
            <select
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
                  onChange={(e) => setCategoryStatus(e.target.value)}
                ></input>
                Active
              </label>
              <label>
                <input
                  type="radio"
                  value="inactive"
                  checked={categoryStatus === "inactive"}
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
              onChange={(e) => setCategoryPosition(Number(e.target.value))}
            ></input>
          </label>
          <label className="category__slug">
            Slug
            <input
              type="text"
              value={categorySlug}
              onChange={(e) => setCategorySlug(e.target.value)}
            ></input>
          </label>
        </div>
      </div>
    </div>
  );
}

export default ProductCategoryDetail;

function handleSave() {
  Swal.fire({
    title: "Do you want to save the changes?",
    showDenyButton: true,
    showCancelButton: true,
    confirmButtonText: "Save",
    denyButtonText: `Don't save`,
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire("Saved!", "", "success");
    } else if (result.isDenied) {
      Swal.fire("Changes are not saved", "", "info");
      // Thực hiện hành động khi không lưu
    }
    // Không cần xử lý gì nếu người dùng nhấp vào "Cancel"
  });
}
