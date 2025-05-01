import { FaChevronRight } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import "./ProductCategoryDetail.css";
import { useEffect, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { TbArrowBackUp } from "react-icons/tb";
import { LuSave } from "react-icons/lu";
import { FaCloudUploadAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import axiosInstanceStaff from "../../untils/axiosInstanceStaff";
import OverlayLoading from "../../components/OverlayLoading/OverlayLoading";
import ErrorPage from "../ErrorPage/ErrorPage";
import CreateSlug from "../../components/CreateSlug";
import { LuSquareChevronDown, LuSquareChevronUp } from "react-icons/lu";

function ProductCategoryDetail() {
  const navigate = useNavigate();
  const { categoryslug } = useParams();

  const [isEdit, setIsEdit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [isImageChange, setIsImageChange] = useState(false);
  const [currentCategory, setCurrentCategory] = useState();
  const [index, setIndex] = useState(0);
  const [categoryList, setCategoryList] = useState([]);

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
    if (currentCategory) {
      setCategoryData({
        categoryName: currentCategory.categoryName || "",
        categoryImage: currentCategory.categoryImage || null,
        categoryParentID:
          currentCategory.categoryParentID?._id ||
          currentCategory.categoryParentID ||
          "",
        categoryStatus: currentCategory.categoryStatus || "active",
        categorySlug: currentCategory.categorySlug || "",
        categoryPosition: currentCategory.categoryPosition || 0,
      });
    }
    if (Array.isArray(currentCategory?.updateBy)) {
      setIndex(currentCategory.updateBy.length - 1);
    }
  }, [currentCategory]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [resProductCategory, resCategoryList] = await Promise.all([
          axiosInstanceStaff.get(
            `/api/v1/admin/products-category/detail/${categoryslug}`
          ),
          axiosInstanceStaff.get(`/api/v1/admin/products-category`),
        ]);
        setCurrentCategory(resProductCategory.data.info);
        setCategoryList(resCategoryList.data.info);
      } catch (err) {
        console.log(err);
        setNotFound(true);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [categoryslug, navigate]);

  const handleAdminClick = () => {
    navigate(`/dashboard/overview`);
  };

  const handleProductCategoriesClick = () => {
    navigate(`/dashboard/productcategories`);
  };

  const handleImageChange = (e) => {
    setIsImageChange(true);
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
    if (isImageChange) {
      formData.append("categoryImage", tempCategoryData.categoryImage);
    }

    console.log("formData:");
    for (let [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }

    const result = await Swal.fire({
      title: "Confirm Category Update",
      text: "Are you sure you want to update this category?",
      icon: "question",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Update",
      denyButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      try {
        setIsLoading(true);
        const res = await axiosInstanceStaff.put(
          `/api/v1/admin/products-category/update/${currentCategory._id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log(res.message);
        console.log("Success:", res.data);

        await Swal.fire(
          "Updated!",
          "The category has been successfully updated.",
          "success"
        );
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
      Swal.fire("No Changes Made", "", "info");
    }
  };

  console.log(currentCategory);

  const handleUp = () => {
    if (index > 0) {
      setIndex((prev) => prev - 1);
    }
  };

  const handleDown = () => {
    if (index < currentCategory?.updateBy.length - 1) {
      setIndex((prev) => prev + 1);
    }
  };

  if (notFound) return <ErrorPage />;
  return (
    <div className="product-category-detail-container">
      <div className="product-category-detail">
        <div className="product-category-detail__title">
          <div className="product-category-detail__title--name">
            Category Detail
          </div>
          <div className="product-category-detail__title--button">
            {isEdit && (
              <div className="save-button" onClick={handleSave}>
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
              onClick={() => navigate(`/dashboard/productcategories`)}
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
          <span>{categoryData.categoryName}</span>
        </div>
        <div className="product-category-detail__content">
          <label className="category__name">
            Name
            <input
              type="text"
              value={categoryData.categoryName}
              disabled={!isEdit}
              onChange={handleChange("categoryName")}
            ></input>
          </label>
          <label className="category__parent-category">
            Parent Category
            <select
              disabled={!isEdit}
              value={categoryData.categoryParentID}
              onChange={handleChange("categoryParentID")}
            >
              <option value="">No Parent</option>
              {categoryList?.map((item) => (
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
                  checked={categoryData.categoryStatus === "active"}
                  disabled={!isEdit}
                  onChange={handleChange("categoryStatus")}
                ></input>
                Active
              </label>
              <label>
                <input
                  type="radio"
                  value="inactive"
                  checked={categoryData.categoryStatus === "inactive"}
                  disabled={!isEdit}
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
              disabled={!isEdit}
              onChange={handleChange("categoryPosition")}
            ></input>
          </label>
          <label className="category__slug">
            Slug
            <input
              type="text"
              value={categoryData.categorySlug}
              disabled={!isEdit}
              onChange={handleChange("categorySlug")}
            ></input>
          </label>
          <label className="category__create-by">
            Create By
            <input
              type="text"
              value={currentCategory?.createBy?.staffID?.staffName}
              disabled={true}
            ></input>
          </label>
          <label className="category__update-by">
            Update By
            <input
              type="text"
              value={currentCategory?.updateBy[index]?.staffID?.staffName}
              disabled={true}
            ></input>
          </label>
          <div className="updown-button-category">
            <button type="button" onClick={handleUp}>
              <LuSquareChevronUp />
            </button>
            <button type="button" onClick={handleDown}>
              <LuSquareChevronDown />
            </button>
          </div>
          <label className="category__create-at">
            Create At
            <input
              type="text"
              value={
                currentCategory?.createdAt
                  ? new Date(currentCategory.createdAt).toLocaleDateString(
                      "vi-VN",
                      {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                      }
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
                currentCategory?.updateBy[index]?.date
                  ? new Date(
                      currentCategory?.updateBy[index]?.date
                    ).toLocaleDateString("vi-VN", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                    })
                  : "Null"
              }
              disabled={true}
            ></input>
          </label>
        </div>
      </div>
      {isLoading && <OverlayLoading />}
    </div>
  );
}

export default ProductCategoryDetail;
