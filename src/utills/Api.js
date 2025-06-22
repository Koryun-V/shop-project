import axios from "axios";

const api = axios.create({
    baseURL: "https://world-of-construction.onrender.com",
    headers: {
        "Content-Type": "application/json",
    }
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = token;
    }
    return config;
});

export default class Api {
    static getPopularProducts() {
        return api.get("/products/popular");
    }

    static getRandomReviews() {
        return api.get("/reviews/random");
    }

    static sendReview({productId, review, rating}) {
        return api.post(`/reviews/create/${productId}`, {review, rating});
    }

    static getSharesProducts() {
        return api.get("/products/discounts",);
    }

    static getReview({paymentId}) {
        return api.get(`/reviews/${paymentId}`);
    }

    static getReviewList({productId}) {
        return api.get(`/reviews/list/${productId}`);
    }

    static loginUser({email, password}) {
        return api.post("/users/login", {email, password});
    }

    static getAllCategories(params) {
        return api.get("/categories/list", {params});
    }

    static forgotPasswordUser({email}) {
        return api.post("/users/forgot/password", {email});
    }

    static changePasswordUser({newPassword, key}) {
        return api.put("/users/update/password", {newPassword, key});
    }

    static registrationUser({firstName, lastName, gender, dateOfBirth, email, password}) {
        return api.post("/users/registration", {
            firstName,
            lastName,
            gender,
            dateOfBirth,
            email,
            password
        }, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
    }

    static activateUser({key}) {
        return api.post("/users/activate", {key});
    }

    static resendActivateUser({email}) {
        return api.post("/users/resend-activation-key", {email});
    }

    static resendCode({email}) {
        return api.post("/users/resend-code", {email});
    }

    static getOrder({limit}) {
        return api.get("/payment/history/", {
            params: {limit}
        });
    }

    static getOrderReceived() {
        return api.get("/payment/received");
    }

    static orderRetry({paymentId}) {
        return api.post("/payment/retry", {paymentId});
    }

    static orderConfirm({paymentId}) {
        return api.post("/payment/confirm-receipt", {paymentId});
    }

    static getUser() {
        return api.get("/users/profile");
    }

    static userDelete({email}) {
        return api.delete("/users/delete-user", {
            data: {email}
        });
    }

    static getProfile() {
        return api.get("/users/profile");
    }

    static updateUser({data}) {
        return api.put("/users/update", data, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
    }

    static updateUserPassword({newPassword}) {
        return api.put("/users/password", {newPassword});
    }

    static getCardList({page, limit}) {
        return api.get("/cards/list", {
            params: {page, limit}
        });
    }

    static deleteCart({cardId}) {
        return api.delete(`/cards/delete/${cardId}`);
    }

    static deleteAllCart() {
        return api.delete("/cards/all");
    }

    static payment({products}) {
        return api.post("/payment/place", {products});
    }

    static updatedCard({cardId, quantity}) {
        return api.put(`/cards/update/${cardId}`, quantity);
    }

    static getStores() {
        return api.get("/products/stores");
    }

    static getStore({id}) {
        return api.get(`/products/store/information/${id}`);
    }

    static getOneProduct({id, userId}) {
        return api.get(`/products/${id}`, {
            params: {userId}
        });
    }

    static updateCard({cardId, add, remove}) {
        return api.put(`/cards/update/${cardId}`, {add, remove});
    }

    static createCard({productId, quantity}) {
        return api.post("/cards/create", {productId, quantity});
    }

    static getAllProducts({categoryIds, limit, page, minPrice, maxPrice, storeId, s}) {
        return api.get("/products/list", {
            params: {
                categoryIds,
                limit,
                page,
                minPrice,
                maxPrice,
                storeId,
                s,
            }
        });
    }
}
