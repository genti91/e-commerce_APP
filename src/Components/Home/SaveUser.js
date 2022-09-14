import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector} from 'react-redux';

export default async function saveUser() {
    try{
        const {user} = useSelector((state) => state.users)
        const value = await AsyncStorage.getItem('id')
        if(!value){
            await AsyncStorage.setItem('id', user.id);
            await AsyncStorage.setItem('username', user.username);
            await AsyncStorage.setItem('name', user.name);
            await AsyncStorage.setItem('email', user.email);
            await AsyncStorage.setItem('password', user.password);
            await AsyncStorage.setItem('profile_pic', user.profile_pic);
            await AsyncStorage.setItem('isBanned', user.isBanned);
            await AsyncStorage.setItem('isAdmin', user.isAdmin);
            await AsyncStorage.setItem('isVerified', user.isVerified);
            await AsyncStorage.setItem('createdAt', user.createdAt);
        }
    }catch(err){
        console.log(err);
    }
}