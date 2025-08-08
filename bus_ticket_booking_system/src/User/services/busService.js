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
export const getBusDetailsById = async (busId) => {
  try {
    const response = await axiosInstance.get(`/buses/getbus/${busId}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error.response?.data || error.message);
    throw error.response?.data || new Error("Failed to fetch bus details");
  }
};
