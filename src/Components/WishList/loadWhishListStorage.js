import AsyncStorage from "@react-native-async-storage/async-storage";

export async function loadWhishListStorage(){
    try{
        let whishList = await AsyncStorage.getItem('whishList');
        whishList = JSON.parse(whishList);
        return whishList
    }catch(err){
        console.log(err)
    }
};