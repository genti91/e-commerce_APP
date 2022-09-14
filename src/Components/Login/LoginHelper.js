import axios from "axios";
//const {REACT_APP_URL} = process.env;
const REACT_APP_URL = 'http://10.0.2.2:3001/'
export async function postUsers({username, password}){
    var options = {
        method: 'POST',
        url: `${REACT_APP_URL}login`,
        withCredentials: true,
        data: {username, password}
      };
    try {     
        const response = await axios.request(options)
        return response.data
    }catch(error){
        console.log(error);
    }
};