import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
const {REACT_APP_URL} = process.env;
/* const REACT_APP_URL = 'http://localhost:3001/' */

export async function loadUser(){
    
    const username = await AsyncStorage.getItem('username');
    const password = await AsyncStorage.getItem('password')

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