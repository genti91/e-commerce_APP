import AsyncStorage from "@react-native-async-storage/async-storage";

export async function saveWishList(id){
    try{
        let whishList = await AsyncStorage.getItem('whishList');
        whishList = JSON.parse(whishList);
        if (!whishList) {
            await AsyncStorage.setItem('whishList', JSON.stringify([id]));
        }else{
            whishList.push(id);
            await AsyncStorage.setItem('whishList', JSON.stringify(whishList));
        }
    }catch(err){
        console.log(err)
    }
};