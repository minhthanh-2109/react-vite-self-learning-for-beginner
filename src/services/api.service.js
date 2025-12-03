import axios from "./axios.customize";
// Create user
const createUserAPI = (fullName, email, password, phone) => {
    const BACKEND_URL = "/api/v1/user";
    const data = {
        fullName: fullName,
        email: email,
        password: password,
        phone: phone
    }
    return axios.post(BACKEND_URL, data);
}
//Update user
const updateUserAPI = (_id, fullName, phone) => {
    const BACKEND_URL = "/api/v1/user"
    const data = {
        _id: _id,
        fullName: fullName,
        phone: phone
    }
    return axios.put(BACKEND_URL, data);

}
//Get all user
const fetchAllUserAPI = (current, pageSize) => {
    const BACKEND_URL = `/api/v1/user?current=${current}&pageSize=${pageSize}`;
    return axios.get(BACKEND_URL);
}
//Delete user by ID
const deleteUserAPI = (_id) => {
    const BACKEND_URL = `/api/v1/user/${_id}`
    return axios.delete(BACKEND_URL);
}
//Handle upload file
const handleUploadFile = (file, folder) => {
    const URL_BACKEND = `/api/v1/file/upload`;
    let config = {
        headers: {
            "upload-type": folder,
            "Content-Type": "multipart/form-data"
        }
    }
    const bodyFormData = new FormData();
    bodyFormData.append("fileImg", file)
    return axios.post(URL_BACKEND, bodyFormData, config);
}
//Update user Avatar
const updateUserAvatarAPI = (avatar, _id, fullName, phone) => {
    const BACKEND_URL = "/api/v1/user"
    const data = {
        _id: _id,
        avatar: avatar,
        fullName: fullName,
        phone: phone
    }
    return axios.put(BACKEND_URL, data);

}
// register user
const registerUserAPI = (fullName, email, password, phone) => {
    const BACKEND_URL = "/api/v1/user/register";
    const data = {
        fullName: fullName,
        email: email,
        password: password,
        phone: phone
    }
    return axios.post(BACKEND_URL, data);
}

// Login API
const logInAPI = (email, password) => {
    const BACKEND_URL = "/api/v1/auth/login";
    const data = {
        username: email,
        password: password,
        delay: 3000,
    }
    return axios.post(BACKEND_URL, data);
}
// get user info
const getUserInfoAPI = () => {
    const BACKEND_URL = "/api/v1/auth/account";
    return axios.get(BACKEND_URL);
}
//log out
const logOutAPI = () => {
    const BACKEND_URL = "/api/v1/auth/logout";
    return axios.post(BACKEND_URL);
}
//Get all books
const fetchAllBookAPI = (current, pageSize) => {
    const BACKEND_URL = `/api/v1/book?current=${current}&pageSize=${pageSize}`;
    return axios.get(BACKEND_URL);
}
//Create Book API
const createBookAPI = (newThumbnail, mainText, author, price, quantity, category) => {
    const BACKEND_URL = '/api/v1/book';
    const data = {
        thumbnail: newThumbnail,
        mainText: mainText,
        author: author,
        price: price,
        quantity: quantity,
        category: category
    }
    return axios.post(BACKEND_URL, data);
}

//Update book
const updateBookAPI = (_id, thumbnail, mainText, author, price, quantity, category) => {
    const BACKEND_URL = "/api/v1/book"
    const data = {
        _id: _id,
        thumbnail: thumbnail,
        mainText: mainText,
        author: author,
        price: price,
        quantity: quantity,
        category: category
    }
    return axios.put(BACKEND_URL, data);

}

//Delete Book API
const deleteBookAPI = (_id) => {
    const BACKEND_URL = `/api/v1/book/${_id}`
    return axios.delete(BACKEND_URL);
}

export {
    createUserAPI, updateUserAPI, fetchAllUserAPI, deleteUserAPI, handleUploadFile,
    updateUserAvatarAPI, registerUserAPI, logInAPI, getUserInfoAPI, logOutAPI,
    fetchAllBookAPI, createBookAPI, updateBookAPI, deleteBookAPI
}