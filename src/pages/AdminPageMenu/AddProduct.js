import { FaChevronRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./ProductCategoryDetail.css";
import { useEffect, useState } from "react";
import { TbArrowBackUp } from "react-icons/tb";
import { LuSave } from "react-icons/lu";
import { FaCloudUploadAlt } from "react-icons/fa";
import "./AddProduct.css";
import Swal from "sweetalert2";

function AddProduct() {
  const navigate = useNavigate();
  const [productName, setProductName] = useState("");
  const [productCategory, setProductCategory] = useState("No Category");
  const [categoryList, setCategoryList] = useState([]);
  const [productImage, setProductImage] = useState("/image/logoGM.png");
  const [productStock, setProductStock] = useState(0);
  const [productPrice, setProductPrice] = useState(0);
  const [productDescription, setProductDescription] = useState("");
  const [productStatus, setProductStatus] = useState("active");
  const [productPosition, setProductPosition] = useState(0);
  const [productDiscountPercentage, setProductDiscountPercentage] = useState(0);
  const [productSlug, setProductSlug] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const resParentCategory = await fetch(
        `http://localhost:3000/api/v1/products-category`
      );
      const parentCategoryJson = await resParentCategory.json();
      setCategoryList(parentCategoryJson.info);
    };
    fetchData();
  }, []);

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
            <div className="back-button" onClick={() => navigate(`/products`)}>
              <TbArrowBackUp />
              Back
            </div>
          </div>
        </div>
        <div className="add-product__breadcrumb">
          <span onClick={() => navigate(`/`)}>Admin</span>
          <FaChevronRight />
          <span onClick={() => navigate(`/products`)}>Products</span>
          <FaChevronRight />
          <span>Add New Product</span>
        </div>
        <div className="add-product__content">
          <label className="product__name">
            Name
            <input
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
            ></input>
          </label>
          <label className="product__category">
            Category
            <select
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
          <label className="product__stock">
            Stock
            <input
              type="number"
              value={productStock}
              min={0}
              onChange={(e) => setProductStock(Number(e.target.value))}
            ></input>
          </label>
          <label className="product__description">
            Description
            <textarea
              value={productDescription}
              style={{ width: "100rem", height: "15rem", resize: "none" }}
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
                  onChange={(e) => setProductStatus(e.target.value)}
                ></input>
                Active
              </label>
              <label>
                <input
                  type="radio"
                  value="inactive"
                  checked={productStatus === "inactive"}
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
              onChange={(e) => setProductSlug(e.target.value)}
            ></input>
          </label>
        </div>
      </div>
    </div>
  );
}

export default AddProduct;

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
