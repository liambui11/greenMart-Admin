import { FaChevronRight } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import "./ProductCategoryDetail.css";
import { useEffect, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { TbArrowBackUp } from "react-icons/tb";
import { LuSave } from "react-icons/lu";
import { FaCloudUploadAlt } from "react-icons/fa";
import "./ProductDetail.css";
import Swal from "sweetalert2";
import axiosInstanceStaff from "../../untils/axiosInstanceStaff";
import OverlayLoading from "../../components/OverlayLoading/OverlayLoading";
import ErrorPage from "../ErrorPage/ErrorPage";
import CreateSlug from "../../components/CreateSlug";
import CheckRole from "../../components/CheckRole";

function ProductDetail() {
  const navigate = useNavigate();
  const { productslug } = useParams();
  const canEdit = CheckRole("product", "edit");
  const [isImageChange, setIsImageChange] = useState(false);

  const [isEdit, setIsEdit] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentProduct, setCurrentProduct] = useState();
  const [categoryList, setCategoryList] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  const [productData, setProductData] = useState({
    productName: "",
    productCategory: "",
    productImage: null,
    productStock: 0,
    productPrice: 0,
    productDescription: "",
    productStatus: "active",
    productPosition: 0,
    productDiscountPercentage: 0,
    productSlug: "",
    // deleted: false,
  });

  const handleChange = (field) => (e) => {
    let value;

    if (e.target.type === "file") {
      value = e.target.files[0];
    } else if (e.target.type === "number") {
      value = Number(e.target.value);
    } else if (e.target.value === "true" || e.target.value === "false") {
      value = e.target.value === "true";
    } else {
      value = e.target.value;
    }

    setProductData((prev) => ({ ...prev, [field]: value }));
  };

  useEffect(() => {
    if (currentProduct) {
      setProductData({
        _id: currentProduct._id || "",
        productName: currentProduct.productName || "",
        productCategory: currentProduct.categoryID || "",
        productImage: currentProduct.productImage || null,
        productStock: currentProduct.productStock ?? 0,
        productPrice: currentProduct.productPrice ?? 0,
        productDescription: currentProduct.productDescription || "",
        productStatus: currentProduct.productStatus || "active",
        productPosition: currentProduct.productPosition ?? 0,
        productDiscountPercentage:
          currentProduct.productDiscountPercentage ?? 0,
        productSlug: currentProduct.productSlug || "",
      });
    }
  }, [currentProduct]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [resProduct, resCategoryList] = await Promise.all([
          axiosInstanceStaff.get(
            `/api/v1/admin/products/detail/${productslug}`
          ),
          axiosInstanceStaff.get(`/api/v1/admin/products-category`),
        ]);
        setCurrentProduct(resProduct.data.info);
        setCategoryList(resCategoryList.data.info);
        console.log(resProduct.data.info);
      } catch (err) {
        console.log(err);
        setNotFound(true);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [productslug]);

  const handleImageChange = (e) => {
    setIsImageChange(true);
    const file = e.target.files[0];
    if (file) {
      setProductData((prev) => ({ ...prev, productImage: file }));
    }
  };

  const handleSave = async () => {
    if (
      !productData.productName.trim() ||
      !productData.productCategory ||
      productData.productPrice <= 0
    ) {
      Swal.fire({
        icon: "error",
        title: "Missing Information",
        text: "Please make sure all required fields are filled out correctly.",
      });
      return;
    }

    if (!productData.productSlug.trim()) {
      setProductData((prev) => ({
        ...prev,
        productSlug: CreateSlug(productData.productName),
      }));
    }

    const formData = new FormData();
    formData.append("productName", productData.productName);
    formData.append("productPrice", productData.productPrice);
    formData.append("productStock", productData.productStock);
    formData.append("productDescription", productData.productDescription);
    formData.append("productStatus", productData.productStatus);
    formData.append("productPosition", productData.productPosition);
    formData.append(
      "productDiscountPercentage",
      productData.productDiscountPercentage
    );
    formData.append("categoryID", productData.productCategory);
    formData.append("productSlug", productData.productSlug);
    if (isImageChange) {
      formData.append("productImage", productData.productImage);
    }

    for (var value of formData.values()) {
      console.log(value);
    }
    for (var key of formData.keys()) {
      console.log(key);
    }

    const result = await Swal.fire({
      title: "Confirm Product Update",
      text: "Are you sure you want to update this product?",
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
          `/api/v1/admin/products/update/${productData._id}`,
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
          "The product has been successfully updated.",
          "success"
        );
        navigate(`/dashboard/products`);
      } catch (err) {
        console.error("Error:", err);
        Swal.fire("Error!", "Something went wrong.", "error");
      } finally {
        setIsLoading(false);
      }
    } else if (result.isDenied) {
      Swal.fire("No Changes Made", "", "info");
    }
  };

  if (notFound) return <ErrorPage />;
  return (
    <div className="product-detail-container">
      <div className="product-detail">
        <div className="product-detail__title">
          <div className="product-detail__title--name">Product Detail</div>
          <div className="product-detail__title--button">
            {isEdit && (
              <div className="save-button" onClick={handleSave}>
                <LuSave />
                Save
              </div>
            )}

            {canEdit && (
              <div className="edit-button" onClick={() => setIsEdit(true)}>
                <CiEdit />
                Edit
              </div>
            )}
            <div
              className="back-button"
              onClick={() => navigate(`/dashboard/products`)}
            >
              <TbArrowBackUp />
              Back
            </div>
          </div>
        </div>
        <div className="product-detail__breadcrumb">
          <span onClick={() => navigate(`/dashboard/overview`)}>Admin</span>
          <FaChevronRight />
          <span onClick={() => navigate(`/dashboard/products`)}>Products</span>
          <FaChevronRight />
          <span>{currentProduct?.productName}</span>
        </div>
        <div className="product-detail__content">
          <label className="product__name">
            Name
            <input
              type="text"
              value={productData.productName}
              disabled={!isEdit}
              onChange={handleChange("productName")}
            ></input>
          </label>
          <label className="product__category">
            Category
            <select
              disabled={!isEdit}
              value={productData.productCategory}
              onChange={handleChange("productCategory")}
            >
              {categoryList?.map((item) => (
                <option key={item._id} value={item._id}>
                  {item.categoryName}
                </option>
              ))}
            </select>
          </label>
          <label className="product__image">
            Image
            <div className="product__image--content">
              <img
                alt=""
                src={
                  productData.productImage
                    ? typeof productData.productImage === "string"
                      ? productData.productImage
                      : URL.createObjectURL(productData.productImage)
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
                    accept="image/png, image/jpeg, image/jpg, image/webp"
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
          <label className="product__stock">
            Stock
            <input
              type="number"
              value={productData.productStock}
              min={0}
              disabled={!isEdit}
              onChange={handleChange("productStock")}
            ></input>
          </label>
          <label className="product__description">
            Description
            <textarea
              value={productData.productDescription}
              disabled={!isEdit}
              style={{ width: "70rem", height: "28rem", resize: "none" }}
              onChange={handleChange("productDescription")}
            ></textarea>
          </label>
          <label className="product__status">
            Status
            <div className="product__status--group">
              <label>
                <input
                  type="radio"
                  value="active"
                  checked={productData.productStatus === "active"}
                  disabled={!isEdit}
                  onChange={handleChange("productStatus")}
                ></input>
                Active
              </label>
              <label>
                <input
                  type="radio"
                  value="inactive"
                  checked={productData.productStatus === "inactive"}
                  disabled={!isEdit}
                  onChange={handleChange("productStatus")}
                ></input>
                InActive
              </label>
            </div>
          </label>
          <label className="product__position">
            Position
            <input
              type="number"
              value={productData.productPosition}
              disabled={!isEdit}
              onChange={handleChange("productPosition")}
            ></input>
          </label>
          <label className="product__price">
            Price
            <div
              style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
            >
              <span>$</span>
              <input
                type="number"
                value={productData.productPrice}
                min={0}
                disabled={!isEdit}
                onChange={handleChange("productPrice")}
                style={{
                  padding: "1rem",
                  borderRadius: "0.7rem",
                  border: " 0.1rem solid #00000056",
                  width: "7rem",
                }}
              />
            </div>
          </label>
          <label className="product__discount-percentage">
            Discount Percentage
            <input
              type="number"
              value={productData.productDiscountPercentage}
              min={0}
              max={100}
              disabled={!isEdit}
              onChange={handleChange("productDiscountPercentage")}
            ></input>
          </label>
          <label className="product__slug">
            Slug
            <input
              type="text"
              value={productData.productSlug}
              disabled={!isEdit}
              onChange={handleChange("productSlug")}
            ></input>
          </label>
          <label className="product__create-by">
            Create By
            <input
              type="text"
              value={currentProduct?.createBy?.staffID?.staffName}
              disabled={true}
            ></input>
          </label>
          <label className="product__update-by">
            Update By
            <input
              type="text"
              value={currentProduct?.updateBy}
              disabled={true}
            ></input>
          </label>

          {/* <label className="product__deleted">
            Deleted
            <div className="product__deleted--group">
              <label>
                <input
                  type="radio"
                  value="true"
                  checked={productData.deleted === true}
                  disabled={!isEdit}
                  onChange={handleChange("deleted")}
                ></input>
                True
              </label>
              <label>
                <input
                  type="radio"
                  value="false"
                  checked={productData.deleted === false}
                  disabled={!isEdit}
                  onChange={handleChange("deleted")}
                ></input>
                False
              </label>
            </div>
          </label> */}

          <label className="product__create-at">
            Create At
            <input
              type="text"
              value={
                currentProduct?.createdAt
                  ? new Date(currentProduct?.createdAt).toLocaleDateString(
                      "vi-VN"
                    )
                  : "Null"
              }
              disabled={true}
            ></input>
          </label>
          <label className="product__update-at">
            Update At
            <input
              type="text"
              value={
                currentProduct?.updatedAt
                  ? new Date(currentProduct?.updatedAt).toLocaleDateString(
                      "vi-VN"
                    )
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

export default ProductDetail;
