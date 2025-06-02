import axios from "axios";

export const loginStaff = (email, password) => {
  return async (dispatch) => {
    dispatch({ type: "STAFF_AUTH_LOADING" });
    try {
      const res = await axios.post(
        "/api/v1/admin/auth/login",
        {
          staffEmail: email,
          staffPassword: password,
        },
        {
          baseURL: "http://localhost:3000",
          withCredentials: true,
        }
      );

      if (res.data.code === 200) {
        dispatch({
          type: "STAFF_LOGIN_SUCCESS",
          payload: {
            accessToken: res.data.accessToken,
            staffInfo: res.data.info,
          },
        });
        return { success: true };
      } else {
        dispatch({ type: "STAFF_LOGIN_FAILURE", payload: res.data.message });
        // showAlert("error", res.data.message);
        return { success: false };
      }
    } catch (error) {
      const message =
        error.response?.data?.message || "Failed to connect to the server";
      dispatch({ type: "STAFF_LOGIN_FAILURE", payload: message });
      // showAlert("error", message);
      return { success: false };
    } finally {
      dispatch({ type: "STAFF_AUTH_DONE" });
    }
  };
};

export const logoutStaff = () => async (dispatch) => {
  try {
    dispatch({ type: "STAFF_LOGOUT" });
    await axios.post(
      "/api/v1/admin/auth/logout",
      {},
      { baseURL: "http://localhost:3000", withCredentials: true }
    );
  } catch (error) {
    console.error("Logout staff error:", error);
  } finally {
    dispatch({ type: "STAFF_LOGOUT" });
  }
};

export const checkAuthStaff = () => async (dispatch) => {
  dispatch({ type: "STAFF_AUTH_LOADING" });
  try {
    const res = await axios.get("/api/v1/admin/auth/refresh-token", {
      baseURL: "http://localhost:3000",
      withCredentials: true,
    });

    if (res.status === 200) {
      dispatch({
        type: "STAFF_SET_AUTH",
        payload: {
          accessToken: res.data.accessToken,
          staffInfo: res.data.info,
        },
      });
    } else {
      dispatch({ type: "STAFF_LOGOUT" });
    }
  } catch (error) {
    dispatch({ type: "STAFF_LOGOUT" });
  } finally {
    dispatch({ type: "STAFF_AUTH_DONE" });
  }
};
