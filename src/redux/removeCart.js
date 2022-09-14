import AsyncStorage from "@react-native-async-storage/async-storage";

export async function removeCart(id){
    try{
        let cart = await AsyncStorage.getItem('cart');
        cart = JSON.parse(cart);
        console.log(id)
        let new_cart = cart.filter((e) => e !== id)
        console.log(new_cart)
        await AsyncStorage.setItem('cart', JSON.stringify(new_cart));

        let new_cart_ = await AsyncStorage.getItem('cart');
        //console.log('new cart: ', JSON.parse(new_cart_));
    }catch(err){
        console.log(err)
    }
};