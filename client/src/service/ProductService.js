import $api from './http/api';

export const AddProduct = async (product) => {
    return $api
        .post(`${process.env.REACT_APP_SERVER_URL}/product/add`, product)
        .catch((err) => err);
};

export const UpdateProduct = async (product) => {
    return $api
        .put(`${process.env.REACT_APP_SERVER_URL}/product/update`, product)
        .catch((err) => err);
};

export const FindAllProducts = async () => {
    return $api
        .get(`${process.env.REACT_APP_SERVER_URL}/product`)
        .catch((err) => err);
}

export const BuyProducts = async (data) => {
    return $api
        .post(`${process.env.REACT_APP_SERVER_URL}/product/buy`, data)
        .catch((err) => err);
}

export const FindAllMyPurchases = async () => {
    return $api
        .get(`${process.env.REACT_APP_SERVER_URL}/product/my-purchases`)
        .catch((err) => err);
}

export const FindAllPurchases = async () => {
    return $api
        .get(`${process.env.REACT_APP_SERVER_URL}/product/find-all-purchases`)
        .catch((err) => err);
}