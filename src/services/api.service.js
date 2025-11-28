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
        delay: 5000,
    }
    return axios.post(BACKEND_URL, data);
}
export {
    createUserAPI, updateUserAPI, fetchAllUserAPI, deleteUserAPI, handleUploadFile, updateUserAvatarAPI, registerUserAPI, logInAPI
}