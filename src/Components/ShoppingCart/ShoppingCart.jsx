import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { StyleSheet, Text, View, FlatList } from 'react-native';
import ProductCard from '../Cards/ProductCard/ProductCard';
import { addToCart, getAllProducts } from "../../redux/actions";
import AsyncStorage from "@react-native-async-storage/async-storage";
const REACT_APP_URL = 'http://10.0.2.2:3001/'

export default function ShoppingCart() {
  let cart = useSelector(state => state.cart);
  let games = useSelector(state => state.products2);
  let users = useSelector(state => state.users);
  let filterGames = [];
  let [cartLS, setCartLS] = useState([]);
  let fg;
  let gamesCO;
  let forCheckout;
  let dispatch = useDispatch();
//const username = await AsyncStorage.getItem('username');
//await AsyncStorage.setItem('password', password);
  useEffect( () => {
    dispatch(getAllProducts())
    // let cartLS2 = await JSON.parse(await AsyncStorage.getItem('username'));
    // await AsyncStorage.setItem('cart',JSON.stringify(cart));
    // if (cart.length < 1 && cartLS2 !== null) {
    //    console.log(cartLS2)
    //    cartLS2.forEach(e => dispatch(addToCart(e)));
    // }
    // if (cartLS2) {
    //    setCartLS(cartLS2)
    // }
  }, [dispatch])

  useEffect(() => {

  }, [cart])


  cart !== undefined && (cart.forEach(LS => {
    fg = games.filter(games => LS === games.id);
    // console.log(fg)
    if (fg.length > 0) {
        filterGames.push(fg[0])
    }
  }
  ))

  //arreglo vacio. 
  // if (!cartLS && cart.length > 0) {
  //     console.log('cart: ', cart)
  //     cart.forEach(e => {
  //         fg = games.filter((f) => e === f.id)
  //         filterGames.push(fg[0])
  //     })
  // }


  if (filterGames.length > 0) {
      gamesCO = filterGames.map(e => {
          return {
              title: e.name,
              unit_price: e.price,
              quantity: 1
          }
      })
      forCheckout = {
          items: gamesCO,
          back_urls: {
              "success": "http://localhost:8080/feedback",
              "failure": "http://localhost:8080/feedback",
              "pending": "http://localhost:8080/feedback"
          },
          auto_return: "approved",
  };




  let string_user_id;
    if(users.user){
        string_user_id = JSON.stringify(users.user.id)
        string_user_id = string_user_id + "/"
        const carro = cart.map(e => e).join('*')
        string_user_id = string_user_id + carro
    }



    forCheckout = {
        items: gamesCO,
        external_reference: `${users.user?string_user_id:null}`, //el id de cada orden
        back_urls: {
            "success": `${process.env.REACT_APP_URL}cart/feedback`,
            "failure": `${process.env.REACT_APP_URL}cart/feedback`, //cambiar a mensaje de error
            "pending": `${process.env.REACT_APP_URL}cart/feedback` //x2
        },
        auto_return: "approved",
    };
  };


  return (
    <View>
      <Text>My shopping cart</Text>
      <FlatList
        data={filterGames}
        keyExtractor={({ id }) => id.toString()}
        renderItem={({ item }) => 
        (
          <ProductCard 
            id={item.id}
            item={item}                           
          />
        )}
      />
    </View>
  );
}