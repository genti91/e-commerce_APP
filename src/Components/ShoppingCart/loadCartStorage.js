import AsyncStorage from "@react-native-async-storage/async-storage";

export async function loadCartStorage(id){
    try{
        let cart = await AsyncStorage.getItem('cart');
        cart = JSON.parse(cart);
        return cart
    }catch(err){
        console.log(err)
    }
};