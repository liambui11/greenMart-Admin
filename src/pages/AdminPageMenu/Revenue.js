import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { TextField } from "@mui/material";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import "./Revenue.css";
import { createTheme, ThemeProvider } from "@mui/material";
import { FaCheck } from "react-icons/fa";
import axiosInstanceStaff from "../../untils/axiosInstanceStaff";
import Swal from "sweetalert2";

const theme = createTheme({
  typography: {
    htmlFontSize: 10,
  },
});

function Revenue() {
  const [startDay, setStartDay] = useState(dayjs());
  const [endDay, setEndDay] = useState(dayjs());
  const [revenue, setRevenue] = useState({ totalOrders: 0, totalRevenue: 0 });

  //   useEffect(() => {
  //     const fetchData = async () => {
  //       try {
  //         const resData = await axiosInstanceStaff.get(
  //           `/api/v1/admin/overview/statistics?from=2025-5-05&to=2025-05-20`
  //         );
  //         setRevenue(resData.data.info);
  //         console.log(resData.data.info);
  //         console.log(revenue);
  //       } catch (err) {
  //         console.log(err);
  //       }
  //     };
  //     fetchData();
  //   }, []);

  const checkRevenue = () => {
    if (startDay.isAfter(endDay)) {
      Swal.fire({
        title: "Start date must be before end date",
        icon: "error",
      });
      return;
    }

    const startDayFormat = startDay.format("YYYY-MM-DD");
    const endDayFormat = endDay.format("YYYY-MM-DD");
    const fetchData = async () => {
      try {
        const resData = await axiosInstanceStaff.get(
          `/api/v1/admin/overview/statistics?from=${startDayFormat}&to=${endDayFormat}`
        );
        setRevenue(resData.data.info);
        console.log(resData.data.info);
        console.log(revenue);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  };

  return (
    <div className="revenue-container">
      <div className="revenue">
        <div className="revenue__title">Sales Revenue Report</div>
        <div className="revenue__date">
          <ThemeProvider theme={theme}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopDatePicker
                label="Start Date"
                value={startDay}
                onChange={(newDate) => {
                  if (newDate && dayjs(newDate).isValid()) {
                    setStartDay(newDate);
                  } else {
                    setStartDay(null);
                  }
                }}
                format="DD/MM/YYYY"
                renderInput={(params) => (
                  <TextField
                    {...params}
                    sx={{
                      "& .MuiInputBase-root": {
                        fontSize: "1.6rem",
                      },
                    }}
                  />
                )}
              />
            </LocalizationProvider>
          </ThemeProvider>
          <ThemeProvider theme={theme}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopDatePicker
                label="End Date"
                value={endDay}
                onChange={(newDate) => {
                  if (newDate && dayjs(newDate).isValid()) {
                    setEndDay(newDate);
                  } else {
                    setEndDay(null);
                  }
                }}
                format="DD/MM/YYYY"
                renderInput={(params) => (
                  <TextField
                    {...params}
                    sx={{
                      "& .MuiInputBase-root": {
                        fontSize: "1.6rem",
                      },
                    }}
                  />
                )}
              />
            </LocalizationProvider>
          </ThemeProvider>
          <button className="check-revenue-button" onClick={checkRevenue}>
            <FaCheck style={{ marginRight: "1rem" }} />
            Check
          </button>
        </div>
        <div className="revenue__result">
          <div className="revenue__result--money">
            Total:{" "}
            <span style={{ color: "#0000009e", marginLeft: "1rem" }}>
              ${revenue.totalRevenue}
            </span>
          </div>
          <div className="revenue__result--order">
            Order:{" "}
            <span style={{ color: "#0000009e", marginLeft: "1rem" }}>
              {revenue.totalOrders}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Revenue;
