import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector} from 'react-redux';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { getAllProducts } from '../../redux/actions';
import ProductCard from '../Cards/ProductCard/ProductCard';
import { FlatList } from 'react-native-gesture-handler';
const { REACT_APP_URL } = process.env;
//const REACT_APP_URL = 'http://192.168.0.98:3001/'

export default function WhishList() {
  
  let wishlist = useSelector(state=>state.wishlist);
  let games = useSelector(state => state.products2);
  let filterGames = [];
  let fg;
  let dispatch = useDispatch();

  useEffect( () => {
    dispatch(getAllProducts())
  }, [dispatch])

  useEffect(() => {

  }, [wishlist])


  if(wishlist){(wishlist.forEach(LS => {
      fg = games.filter(games => LS === games.id);
      // console.log(fg)
      if (fg.length > 0) {
          filterGames.push(fg[0])
      }
      }
    ))
  }


  return (
    <View>
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