import axios from "axios";

const API_URL = 'http://localhost:5000/api/goals/'

const  createGoal = async (goalData,token) =>{
    const config = {
        headers:{
            Authorization: `Bearer ${token}`
        }
    }
    console.log(goalData)
    const response = await axios.post(API_URL,goalData,config)
    return response.data
}

const goalService = {
    createGoal,
}

export default goalService