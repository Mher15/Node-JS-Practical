import axios from "axios";
import $api from './http/api';

export const Sign_In = async (user) => {
  return axios
    .post(`${process.env.REACT_APP_SERVER_URL}/auth/login`, user)
    .catch((err) => err);
};

export const Sign_Up = async (user) => {
  return axios
    .post(`${process.env.REACT_APP_SERVER_URL}/auth/registration`, user)
    .catch((err) => err);
};

export const Log_Out = async () => {
  return $api
    .get(`${process.env.REACT_APP_SERVER_URL}/auth/log-out`)
    .catch((err) => err);
};
