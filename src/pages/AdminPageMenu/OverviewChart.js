import { BarChart } from "@mui/x-charts/BarChart";
import { ChartsYAxis } from "@mui/x-charts";

const data = [400, 300, 200, 278, 189];

const labels = [
  "Sản phẩm cực kỳ dài và khó chịu",
  "Sản phẩm thứ hai siêu ngon bổ rẻ",
  "Món đỉnh cao đặc sản vùng miền",
  "Bí kíp sống ảo ăn là ghiền",
  "Sản phẩm mới ra lò cực hot",
];

const icons = [
  "https://i.pinimg.com/736x/45/f8/ba/45f8ba2e1b0cfc32cbcbe0855c4313ec.jpg",
  "https://i.pinimg.com/736x/45/f8/ba/45f8ba2e1b0cfc32cbcbe0855c4313ec.jpg",
  "https://i.pinimg.com/736x/45/f8/ba/45f8ba2e1b0cfc32cbcbe0855c4313ec.jpg",
  "https://i.pinimg.com/736x/45/f8/ba/45f8ba2e1b0cfc32cbcbe0855c4313ec.jpg",
  "https://i.pinimg.com/736x/45/f8/ba/45f8ba2e1b0cfc32cbcbe0855c4313ec.jpg",
];

const CustomYAxis = (props) => {
  return (
    <ChartsYAxis
      {...props}
      tickLabel={(params) => {
        const iconUrl = icons[params.index];
        return (
          <image
            href={iconUrl}
            x={params.x - 28} // canh sang trái cho ảnh
            y={params.y - 12} // canh ảnh lên một chút
            width={24} // kích thước ảnh
            height={24}
          />
        );
      }}
    />
  );
};

export default function MyChart() {
  return (
    <BarChart
      width={900}
      height={400}
      layout="horizontal"
      series={[{ data, label: "Doanh số", type: "bar" }]}
      xAxis={[{ scaleType: "linear" }]}
      yAxis={[{ scaleType: "band", data: labels }]}
      margin={{ left: 80 }} // Tăng margin để có không gian cho ảnh bên trái
      slots={{ yAxis: CustomYAxis }} // Dùng custom Y axis
    />
  );
}
