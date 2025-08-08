import axiosInstance from "../services/axiosInstance";

export const loginUser = async (email, password) => {
  try {
    const response = await axiosInstance.post("/users/signin", {
      email,
      password,
    });

    return response.data; // contains jwt, email, role
  } catch (error) {
    throw error.response?.data || new Error("Login failed");
  }
};

export const signupUser = async (data) => {
  console.log("inside signup")
  try {
    const response = await axiosInstance.post("/users/signup", data);

    return response.data; 
  } catch (error) {
    throw error.response?.data || new Error("Login failed");
  }
};
