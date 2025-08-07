import axios from 'axios';

const BASE_URL = 'http://localhost:9090/buses';

export const addNewBus = (bus,token) => {
  return axios.post(BASE_URL, bus, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
