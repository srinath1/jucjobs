import axios from "axios";
import { message } from "antd";
export const registerUser = (values) => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });

  try {
    await axios.post("/api/users/register", values);
    message.success("User Registered Successfully");
    setTimeout(() => {
      window.location.href = "/login";
    }, 1000);
    dispatch({ type: "LOADING", payload: false });
  } catch (error) {
    message.error("something went wrong , please try later");
    dispatch({ type: "LOADING", payload: false });
  }
};
export const loginUser = (values) => async (dispatch) => {
    dispatch({ type: "LOADING", payload: true });
  
    try {
      const user = await axios.post("/api/users/login", values);
      message.success("Login success");
      localStorage.setItem("user", JSON.stringify(user.data));
      setTimeout(() => {
        window.location.href = "/";
      }, 1000);
      dispatch({ type: "LOADING", payload: false });
    } catch (error) {
      message.error("invalid credentials");
      dispatch({ type: "LOADING", payload: false });
    }
  };

  export const updatedUser = (values) => async (dispatch) => {
    const userId=JSON.parse(localStorage.getItem('user'))._id
    values._id=userId
    dispatch({ type: "LOADING", payload: true });
  
    try {
      const user = await axios.post("/api/users/update", values);
      message.success("Updates user successfully");
      localStorage.setItem("user", JSON.stringify(user.data));
      setTimeout(() => {
        window.location.reload ()
      }, 1000);
      dispatch({ type: "LOADING", payload: false });
    } catch (error) {
      message.error("something went wrong");
      dispatch({ type: "LOADING", payload: false });
    }
  };