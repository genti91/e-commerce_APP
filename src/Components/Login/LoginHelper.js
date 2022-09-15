import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
const {REACT_APP_URL} = process.env;
//const REACT_APP_URL = 'http://192.168.0.98:3001/'

export async function postUsers({username, password}){
    await AsyncStorage.setItem('password', password);
    await AsyncStorage.setItem('username', username);

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