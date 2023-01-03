import axios from "axios";

const URL="http://localhost:8000"

export const registerUser=async(stateVarible)=>{
    try {
        return await axios.post(`${URL}/signup`,stateVarible)
    } catch (error) {
        console.log(error.message)
    }
}

