import { FaChevronRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./AddProductCategory.css";
import { useEffect, useState } from "react";
import { TbArrowBackUp } from "react-icons/tb";
import { LuSave } from "react-icons/lu";
import { FaCloudUploadAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import axiosInstanceStaff from "../../untils/axiosInstanceStaff";
import CreateSlug from "../../components/CreateSlug";
import OverlayLoading from "../../components/OverlayLoading/OverlayLoading";

function ProductCategoryDetail() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [currentParentCategory, setCurrentParentCategory] = useState();

  const [categoryData, setCategoryData] = useState({
    categoryName: "",
    categoryImage: null,
    categoryParentID: "",
    categoryStatus: "active",
    categorySlug: "",
    categoryPosition: 0,
  });

  const handleChange = (field) => (e) => {
    let value;

    if (e.target.type === "file") {
      value = e.target.files[0];
    } else if (e.target.type === "number") {
      value = Number(e.target.value);
    } else {
      value = e.target.value;
    }

    setCategoryData((prev) => ({ ...prev, [field]: value }));
  };

  useEffect(() => {
    const fetchData = async () => {
      const resCategoryList = await axiosInstanceStaff.get(
        `/api/v1/admin/products-category`
      );

      setCurrentParentCategory(resCategoryList.data.info);
    };
    fetchData();
  }, []);

  const handleAdminClick = () => {
    navigate(`/dashboard/overview`);
  };

  const handleProductCategoriesClick = () => {
    navigate(`/dashboard/productcategories`);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCategoryData((prev) => ({ ...prev, categoryImage: file }));
    }
  };

  const handleSave = async () => {
    if (!categoryData.categoryName.trim()) {
      Swal.fire({
        icon: "error",
        title: "Missing Information",
        text: "Please make sure all required fields are filled out correctly.",
      });
      return;
    }

    let tempCategoryData = { ...categoryData };

    if (!tempCategoryData.categorySlug.trim()) {
      tempCategoryData.categorySlug = CreateSlug(tempCategoryData.categoryName);
    }

    const formData = new FormData();
    formData.append("categoryName", tempCategoryData.categoryName);
    formData.append("categoryStatus", tempCategoryData.categoryStatus);
    formData.append("categoryPosition", tempCategoryData.categoryPosition);
    formData.append("categorySlug", tempCategoryData.categorySlug);
    if (tempCategoryData.categoryParentID !== "") {
      formData.append("categoryParentID", tempCategoryData.categoryParentID);
    }
    formData.append("categoryImage", tempCategoryData.categoryImage);

    console.log("formData:");
    for (let [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }

    const result = await Swal.fire({
      title: "Do you want to add this category?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Add",
      denyButtonText: `Don't add`,
    });

    if (result.isConfirmed) {
      try {
        setIsLoading(true);
        const res = await axiosInstanceStaff.post(
          "/api/v1/admin/products-category/add",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log(res.message);
        console.log("Success:", res.data);

        await Swal.fire("Added!", "", "success");
        navigate(`/dashboard/productcategories`);
      } catch (error) {
        console.error("Response error:", error.response.data.errors);
        Swal.fire({
          title: error.response.data.message,
          icon: "error",
        });
      } finally {
        setIsLoading(false);
      }
    } else if (result.isDenied) {
      Swal.fire("Changes are not saved", "", "info");
    }
  };

  return (
    <div className="add-category-container">
      <div className="add-category">
        <div className="add-category__title">
          <div className="add-category__title--name">Add New Category</div>
          <div className="add-category__title--button">
            <div className="save-button" onClick={handleSave}>
              <LuSave />
              Save
            </div>
            <div
              className="back-button"
              onClick={() => navigate(`/dashboard/productcategories`)}
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
              value={categoryData.categoryName}
              onChange={handleChange("categoryName")}
            ></input>
          </label>
          <label className="category__parent-category">
            Parent Category
            <select
              value={categoryData.categoryParentID}
              onChange={handleChange("categoryParentID")}
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
                src={
                  categoryData.categoryImage
                    ? typeof categoryData.categoryImage === "string"
                      ? categoryData.categoryImage
                      : URL.createObjectURL(categoryData.categoryImage)
                    : "/image/logoGM.png"
                }
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
                  checked={categoryData.categoryStatus === "active"}
                  onChange={handleChange("categoryStatus")}
                ></input>
                Active
              </label>
              <label>
                <input
                  type="radio"
                  value="inactive"
                  checked={categoryData.categoryStatus === "inactive"}
                  onChange={handleChange("categoryStatus")}
                ></input>
                InActive
              </label>
            </div>
          </label>
          <label className="category__position">
            Position
            <input
              type="number"
              value={categoryData.categoryPosition}
              onChange={handleChange("categoryPosition")}
            ></input>
          </label>
          <label className="category__slug">
            Slug
            <input
              type="text"
              value={categoryData.categorySlug}
              onChange={handleChange("categorySlug")}
            ></input>
          </label>
        </div>
      </div>
      {isLoading && <OverlayLoading />}
    </div>
  );
}

export default ProductCategoryDetail;
