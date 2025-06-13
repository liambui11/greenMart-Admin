# 📘Frontend Admin - Website Siêu thị trực tuyến GreenMart

Đây là giao diện quản trị dành cho **quản trị viên** của hệ thống GreenMart, xây dựng bằng ReactJS (Create React App). Admin có thể quản lý sản phẩm, danh mục, người dùng, nhân viên và các đơn hàng.

## 🛠️Công nghệ sử dụng

Visual Studio Code: Môi trường phát triển tích hợp (IDE) được sử dụng để lập trình.<br>
Postman: Công cụ kiểm thử API RESTful.<br>
Git/GitHub: Quản lý mã nguồn và theo dõi phiên bản.<br>
Nodejs: Lập trình phía server.<br>
MongoDB: Quản lý cơ sở dữ liệu.<br>


### 📂 Cấu Trúc Dự Án
```
greenmart-admin/
├── public/                   # Các tài nguyên tĩnh được phục vụ trực tiếp
│   ├── image/                # Thư mục chứa hình ảnh
│   ├── index.html            # File HTML chính
│   ├── logo192.png           # Logo ứng dụng (192x192)
│   ├── logo512.png           # Logo ứng dụng (512x512)
│   ├── manifest.json         # Cấu hình PWA
│   └── robots.txt            # Cho phép/không cho phép trình thu thập web

├── src/                      # Mã nguồn frontend
│   ├── actions/              # Các action Redux (nếu dùng Redux thuần)
│   ├── components/           # Các component dùng lại như Button, Modal, Table
│   ├── context/              # React Context API (nếu không dùng Redux)
│   ├── layout/               # Layout giao diện chính (LayoutDefault, Header, Sidebar, etc.)
│   │   └── LayoutDefault/
│   ├── pages/                # Các trang chính như Dashboard, Product, User, Order
│   ├── reducers/             # Các reducer Redux (nếu dùng Redux)
│   ├── redux/                # Store cấu hình Redux Toolkit (nếu có)
│   ├── routes/               # Cấu hình route cho ứng dụng
│   ├── untils/               # Các hàm tiện ích, xử lý chung (utils)

│   ├── App.css               # Style tổng thể cho App
│   ├── App.js                # Component gốc App
│   ├── App.test.js           # Test file mẫu
│   ├── index.css             # Style nền mặc định
│   ├── index.js              # Điểm khởi đầu của ứng dụng React
│   ├── reportWebVitals.js    # Báo cáo hiệu năng (có thể bỏ)
│   └── setupTests.js         # Cấu hình cho testing

├── .gitignore                # File/directory bị Git bỏ qua
├── package.json              # Thông tin dự án & phụ thuộc npm
├── package-lock.json         # Khóa phiên bản phụ thuộc
└── README.md                 # Tài liệu giới thiệu dự án
```
## Cài đặt và chạy dự án 

### 1. Clone Repository
```bash
git clone https://github.com/liambui11/greenMart-Admin.git
cd GreenMartFrontEndAdmin
```
### 2. Cài đặt phụ thuộc
```bash
npm install
```

### 3. Khởi chạy dự án
```bash
npm start
```

## 👥 Nhóm Thực Hiện
- Nguyễn Ngọc Long - N22DCCN149
- Bùi Kinh Luân - N22DCCN151
- Bùi Minh Quân - N22DCCN163

## 📄 License
Dự án được thực hiện với mục đích học tập
