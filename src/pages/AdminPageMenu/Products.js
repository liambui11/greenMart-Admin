import { useEffect, useState } from "react";
import "./Products.css";
import { CiEdit } from "react-icons/ci";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { FaChevronRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axiosInstanceStaff from "../../untils/axiosInstanceStaff";
import OverlayLoading from "../../components/OverlayLoading/OverlayLoading";
import Swal from "sweetalert2";
import CheckRole from "../../components/CheckRole";

function Products() {
  const [categoriesData, setCategoriesData] = useState([]);
  const [productsData, setProductsData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const canDelete = CheckRole("product", "delete");
  const canAdd = CheckRole("product", "add");
  const navigate = useNavigate();

  const handleAdminClick = () => {
    navigate(`/dashboard/overview`);
  };
  const handleProductDetailClick = (itemSlug) => {
    navigate(`/dashboard/products/productdetail/${itemSlug}`);
  };

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const [resProducts, resCategories] = await Promise.all([
        axiosInstanceStaff.get(
          `/api/v1/admin/products?currentPage=1&limitItems=1000`
        ),
        axiosInstanceStaff.get(`/api/v1/admin/products-category`),
      ]);

      setProductsData(resProducts.data.info);
      setCategoriesData(resCategories.data.info);
    } catch (err) {
      console.error("Lỗi: ", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const [searchQuery, setSearchQuery] = useState("");
  const filteredProduct = productsData.filter((item) =>
    item.productName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = async (itemID) => {
    const result = await Swal.fire({
      title: "Do you want to delete this product?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Delete",
      denyButtonText: `Don't delete`,
    });

    if (result.isConfirmed) {
      try {
        setIsLoading(true);
        const res = await axiosInstanceStaff.delete(
          `/api/v1/admin/products/delete/${itemID}`
        );

        console.log(res.message);
        console.log("Success:", res.data);

        await Swal.fire("Deleted!", "", "success");
        window.scrollTo(0, 0);
        await fetchData();
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
    <div className="products-container">
      <div className="products">
        <div className="products__title">
          <div className="products__title--name">Products</div>
          <div className="products__title--button">
            {canAdd && (
              <div
                className="add-button"
                onClick={() => navigate(`/dashboard/products/addproduct`)}
              >
                Add Product
              </div>
            )}
          </div>
        </div>
        <div className="products__breadcrumb">
          <span onClick={handleAdminClick}>Admin</span>
          <FaChevronRight />
          <span>Products</span>
        </div>
        <div className="products__content">
          <input
            className="products__content--search"
            type="text"
            placeholder="Search Product"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          ></input>
          <table className="products__content--table">
            <thead>
              <tr>
                <th>
                  <input type="checkbox"></input>
                </th>
                <th>Image</th>
                <th>Name</th>
                <th>Category</th>
                <th>Status</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Create At</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filteredProduct.map((item) => (
                <tr key={item._id}>
                  <td>
                    <input type="checkbox"></input>
                  </td>
                  <td>
                    <img
                      alt=""
                      src={
                        item.productImage === ""
                          ? "/image/logoGM.png"
                          : item.productImage
                      }
                      style={{
                        height: "4rem",
                        objectFit: "contain",
                      }}
                    />
                  </td>
                  <td>{item.productName}</td>
                  <td>
                    {categoriesData.map((itemCate) =>
                      itemCate._id === item.categoryID
                        ? itemCate.categoryName
                        : null
                    )}
                  </td>
                  <td>
                    <span
                      className={`products-status ${
                        item.productStatus === "active" ? "" : "inactive"
                      }`}
                    >
                      {item.productStatus === "active" ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td>${item.productPrice}</td>
                  <td>{item.productStock}</td>
                  <td>
                    {item.createdAt
                      ? new Date(item.createdAt).toLocaleDateString("vi-VN")
                      : null}
                  </td>
                  <td>
                    <CiEdit
                      className="edit-icon"
                      onClick={() => handleProductDetailClick(item.productSlug)}
                    />
                  </td>
                  {canDelete && (
                    <td>
                      <MdOutlineDeleteOutline
                        className="delete-icon"
                        onClick={() => handleDelete(item._id)}
                      />
                    </td>
                  )}
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

export default Products;
