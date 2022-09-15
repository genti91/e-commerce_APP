import AsyncStorage from "@react-native-async-storage/async-storage";

export async function removeWishList(id){
    try{
        let whishList = await AsyncStorage.getItem('whishList');
        whishList = JSON.parse(whishList);
        console.log(id)
        let new_whishList = whishList.filter((e) => e !== id)
        console.log(new_whishList)
        await AsyncStorage.setItem('whishList', JSON.stringify(new_whishList));
    }catch(err){
        console.log(err)
    }
};