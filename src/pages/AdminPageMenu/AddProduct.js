import { FaChevronRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./ProductCategoryDetail.css";
import { useEffect, useState } from "react";
import { TbArrowBackUp } from "react-icons/tb";
import { LuSave } from "react-icons/lu";
import { FaCloudUploadAlt } from "react-icons/fa";
import "./AddProduct.css";
import Swal from "sweetalert2";
import axiosInstanceStaff from "../../untils/axiosInstanceStaff";
import CreateSlug from "../../components/CreateSlug";
import OverlayLoading from "../../components/OverlayLoading/OverlayLoading";

function AddProduct() {
  const navigate = useNavigate();
  const [categoryList, setCategoryList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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

    setProductData((prev) => ({ ...prev, [field]: value }));
  };

  useEffect(() => {
    if (categoryList.length > 0) {
      setProductData((prev) => ({
        ...prev,
        productCategory: categoryList[0]._id,
      }));
    }
  }, [categoryList]);

  useEffect(() => {
    const fetchData = async () => {
      const resCategoryList = await axiosInstanceStaff.get(
        `/api/v1/admin/products-category`
      );
      setCategoryList(resCategoryList.data.info);
    };
    fetchData();
  }, []);

  const handleImageChange = (e) => {
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
    formData.append("productImage", productData.productImage);

    const result = await Swal.fire({
      title: "Do you want to add this product?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Add",
      denyButtonText: `Don't add`,
    });

    if (result.isConfirmed) {
      try {
        setIsLoading(true);
        const res = await axiosInstanceStaff.post(
          "/api/v1/admin/products/add",
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
        navigate(`/dashboard/products`)
      } catch (err) {
        console.error("Error:", err);
        Swal.fire("Error!", "Something went wrong.", "error");
      } finally {
        setIsLoading(false);
      }
    } else if (result.isDenied) {
      Swal.fire("Changes are not saved", "", "info");
    }
  };

  return (
    <div className="add-product-container">
      <div className="add-product">
        <div className="add-product__title">
          <div className="add-product__title--name">Add New Product</div>
          <div className="add-product__title--button">
            <div className="save-button" onClick={() => handleSave()}>
              <LuSave />
              Save
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
        <div className="add-product__breadcrumb">
          <span onClick={() => navigate(`/dashboard/overview`)}>Admin</span>
          <FaChevronRight />
          <span onClick={() => navigate(`/dashboard/products`)}>Products</span>
          <FaChevronRight />
          <span>Add New Product</span>
        </div>
        <div className="add-product__content">
          <label className="product__name">
            <span>
              Name<span style={{ color: "red" }}>*</span>
            </span>
            <input
              type="text"
              value={productData.productName}
              onChange={handleChange("productName")}
            ></input>
          </label>
          <label className="product__category">
            <span>
              Category<span style={{ color: "red" }}>*</span>
            </span>
            <select
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
                    ? URL.createObjectURL(productData.productImage)
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
                  accept="image/png, image/jpeg, image/jpg, image/webp"
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
          <label className="product__stock">
            Stock
            <input
              type="number"
              value={productData.productStock}
              min={0}
              onChange={handleChange("productStock")}
            ></input>
          </label>
          <label className="product__description">
            Description
            <textarea
              value={productData.productDescription}
              style={{ width: "100rem", height: "28rem", resize: "none" }}
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
                  onChange={handleChange("productStatus")}
                ></input>
                Active
              </label>
              <label>
                <input
                  type="radio"
                  value="inactive"
                  checked={productData.productStatus === "inactive"}
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
              onChange={handleChange("productPosition")}
            ></input>
          </label>
          <label className="product__price">
            <span>
              Price<span style={{ color: "red" }}>*</span>
            </span>
            <div
              style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
            >
              <span>$</span>
              <input
                type="number"
                value={productData.productPrice}
                min={0}
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
              onChange={handleChange("productDiscountPercentage")}
            ></input>
          </label>
          <label className="product__slug">
            Slug
            <input
              type="text"
              value={productData.productSlug}
              onChange={handleChange("productSlug")}
            ></input>
          </label>
        </div>
      </div>
      {isLoading && <OverlayLoading />}
    </div>
  );
}

export default AddProduct;
