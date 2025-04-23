import { FaChevronRight } from "react-icons/fa";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import "./ProductCategoryDetail.css";
import { useEffect, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { TbArrowBackUp } from "react-icons/tb";
import { LuSave } from "react-icons/lu";
import { FaCloudUploadAlt } from "react-icons/fa";
import "./ProductDetail.css";
import Swal from "sweetalert2";
// import { faL } from "@fortawesome/free-solid-svg-icons";
import axiosInstanceStaff from "../../untils/axiosInstanceStaff";
import OverlayLoading from "../../components/OverlayLoading/OverlayLoading";
import ErrorPage from "../ErrorPage/ErrorPage";

function ProductDetail() {
  const navigate = useNavigate();
  const { productslug } = useParams();

  const [isEdit, setIsEdit] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentProduct, setCurrentProduct] = useState();
  const [categoryList, setCategoryList] = useState([]);

  const [productName, setProductName] = useState("");
  const [productCategory, setProductCategory] = useState("No Category");
  const [productImage, setProductImage] = useState("/image/logoGM.png");
  const [productStock, setProductStock] = useState(0);
  const [productPrice, setProductPrice] = useState(0);
  const [productDescription, setProductDescription] = useState("");
  const [productStatus, setProductStatus] = useState("inactive");
  const [productPosition, setProductPosition] = useState(0);
  const [productDiscountPercentage, setProductDiscountPercentage] = useState(0);
  const [productSlug, setProductSlug] = useState("");
  const [productDeleted, setProductDeleted] = useState(false);

  useEffect(() => {
    if (currentProduct) {
      setProductName(currentProduct.productName);
      setProductCategory(currentProduct.categoryID);
      setProductImage(currentProduct.productImage);
      setProductStock(currentProduct.productStock);
      setProductPrice(currentProduct.productPrice);
      setProductDescription(currentProduct.productDescription);
      setProductStatus(currentProduct.productStatus);
      setProductPosition(currentProduct.productPosition);
      setProductDiscountPercentage(currentProduct.productDiscountPercentage);
      setProductSlug(currentProduct.productSlug);
      setProductDeleted(currentProduct.deleted);
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
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProductImage(reader.result);
      };
      reader.readAsDataURL(file);
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
          <span>{productName}</span>
        </div>
        <div className="product-detail__content">
          <label className="product__name">
            Name
            <input
              type="text"
              value={productName}
              disabled={!isEdit}
              onChange={(e) => setProductName(e.target.value)}
            ></input>
          </label>
          <label className="product__category">
            Category
            <select
              disabled={!isEdit}
              value={productCategory}
              onChange={(e) => setProductCategory(e.target.value)}
            >
              <option value="">No Category</option>
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
                src={productImage}
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
          <label className="product__stock">
            Stock
            <input
              type="number"
              value={productStock}
              min={0}
              disabled={!isEdit}
              onChange={(e) => setProductStock(Number(e.target.value))}
            ></input>
          </label>
          <label className="product__description">
            Description
            <textarea
              value={productDescription}
              disabled={!isEdit}
              style={{ width: "70rem", height: "10rem", resize: "none" }}
              onChange={(e) => setProductDescription(e.target.value)}
            ></textarea>
          </label>
          <label className="product__status">
            Status
            <div className="product__status--group">
              <label>
                <input
                  type="radio"
                  value="active"
                  checked={productStatus === "active"}
                  disabled={!isEdit}
                  onChange={(e) => setProductStatus(e.target.value)}
                ></input>
                Active
              </label>
              <label>
                <input
                  type="radio"
                  value="inactive"
                  checked={productStatus === "inactive"}
                  disabled={!isEdit}
                  onChange={(e) => setProductStatus(e.target.value)}
                ></input>
                InActive
              </label>
            </div>
          </label>
          <label className="product__position">
            Position
            <input
              type="number"
              value={productPosition}
              disabled={!isEdit}
              onChange={(e) => setProductPosition(Number(e.target.value))}
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
                value={productPrice}
                min={0}
                disabled={!isEdit}
                onChange={(e) => setProductPrice(Number(e.target.value))}
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
              value={productDiscountPercentage}
              min={0}
              max={100}
              disabled={!isEdit}
              onChange={(e) =>
                setProductDiscountPercentage(Number(e.target.value))
              }
            ></input>
          </label>
          <label className="product__slug">
            Slug
            <input
              type="text"
              value={productSlug}
              disabled={!isEdit}
              onChange={(e) => setProductSlug(e.target.value)}
            ></input>
          </label>
          <label className="product__create-by">
            Create By
            <input
              type="text"
              value={currentProduct?.createBy}
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
          <label className="product__delete-by">
            Delete By
            <input
              type="text"
              value={currentProduct?.deleteBy}
              disabled={true}
            ></input>
          </label>
          <label className="product__deleted">
            Deleted
            <div className="product__deleted--group">
              <label>
                <input
                  type="radio"
                  value="true"
                  checked={productDeleted.toString() === "true"}
                  disabled={!isEdit}
                  onChange={(e) => setProductDeleted(true)}
                ></input>
                True
              </label>
              <label>
                <input
                  type="radio"
                  value="false"
                  checked={productDeleted.toString() === "false"}
                  disabled={!isEdit}
                  onChange={(e) => setProductDeleted(false)}
                ></input>
                False
              </label>
            </div>
          </label>
          <label className="product__delete-at">
            Delete At
            <input
              type="text"
              value={
                currentProduct?.deletedAt
                  ? new Date(currentProduct?.deletedAt).toLocaleDateString(
                      "vi-VN"
                    )
                  : "Null"
              }
              disabled={true}
            ></input>
          </label>
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
