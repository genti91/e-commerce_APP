import AsyncStorage from "@react-native-async-storage/async-storage";

export async function saveCart(id,remove){
    try{
        if (remove) {
            await AsyncStorage.removeItem('cart')
        }else{
            let cart = await AsyncStorage.getItem('cart');
            cart = JSON.parse(cart);
            if (!cart) {
                await AsyncStorage.setItem('cart', JSON.stringify([id]));
            }else{
                cart.push(id);
                await AsyncStorage.setItem('cart', JSON.stringify(cart));
            }
        }
    }catch(err){
        console.log(err)
    }
};