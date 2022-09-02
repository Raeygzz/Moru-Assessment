import axios from "axios";

// usersList
export const usersList = () => {
  const options = {
    url: `${process.env.REACT_APP_BASE_URL}`,
    data: null,
    method: "get",
  };

  return axios(options);
};
