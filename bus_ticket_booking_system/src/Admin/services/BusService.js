import axios from 'axios';

const BASE_URL = 'http://localhost:9090/buses';

export const addNewBus = (bus,token) => {
  return axios.post(BASE_URL+"/addbus", bus, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};


export const fetchAllBuses = async (token) => {
  const response = await axios.get(BASE_URL+"/getall")
  return response.data;
};

export const deleteBusById = async (busId,token) => {
  const response = await axios.get(BASE_URL + "/getall");
  return response.data;
};
