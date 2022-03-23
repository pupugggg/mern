import axios from 'axios'

const API_URL = `http://localhost:${process.env.PORT}/api/users/`

const register = async (userData) => {
    const response = await axios.post(API_URL, userData)
    if (response.data) {
        localStorage.setItem('user',JSON.stringify(response.data))
    }
    console.log(API_URL)
    return response.data
}

const logout = () => {
    localStorage.removeItem('user')
}

const login = async (userData) => {
    const response = await axios.post(API_URL+'login', userData)
    if (response.data) {
        localStorage.setItem('user',JSON.stringify(response.data))
    }
    console.log(API_URL)
    return response.data
}

const authService = { register ,logout,login}

export default authService
