import axiosInstance from "../services/axiosInstance";

export const fetchBusDeatilsByName = async (busName) => {
  try {
    const response = await axiosInstance.post("/buses/seatselection", {busName});
    console.log(response.data)
    return response.data; 
  } catch (error) {
    console.log(error.response.data)
    throw error.response?.data || new Error("Login failed");
  }
};
