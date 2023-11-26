import $api from './http/api';

export const getMe = async () => {
    return $api
        .get(`${process.env.REACT_APP_SERVER_URL}/user/getMe`)
        .catch((err) => err);
};
