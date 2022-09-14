import AsyncStorage from "@react-native-async-storage/async-storage";

export async function saveCart(id){
    try{
        let cart = await AsyncStorage.getItem('cart');
        cart = JSON.parse(cart);
        if (!cart) {
            await AsyncStorage.setItem('cart', JSON.stringify([id]));
        }else{
            cart.push(id);
            await AsyncStorage.setItem('cart', JSON.stringify(cart));
        }
        let new_cart = await AsyncStorage.getItem('cart');
        console.log('new cart: ', JSON.parse(new_cart));
    }catch(err){
        console.log(err)
    }
};