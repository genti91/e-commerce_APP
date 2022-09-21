import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Alert, TouchableHighlight, Modal } from 'react-native';
import ProductCard from '../Cards/ProductCard/ProductCard';
import { addToCart, clearCart, getAllProducts, getUserOrders, postOrder } from "../../redux/actions";
import { useNavigation } from '@react-navigation/native';
import WebView from "react-native-webview";
import { removeCart } from '../../redux/removeCart';
import axios from 'axios';
import { saveCart } from '../../redux/saveCart';
import { useToast, Box } from 'native-base';
const {REACT_APP_URL} = process.env;
//const REACT_APP_URL = 'http://192.168.0.98:3001/'

export default function ShoppingCart() {
  let cart = useSelector(state => state.cart);
  let games = useSelector(state => state.products2);
  let {user} = useSelector(state => state.users);
  let filterGames = [];
  let fg;
  let dispatch = useDispatch();
  const navigation = useNavigation();
  const toast = useToast();
  //onPress={() => navigation.navigate('Detail', {...item})}

  useEffect( () => {
    dispatch(getAllProducts())
  }, [dispatch])

  useEffect(() => {

  }, [cart])


  cart !== null && (cart.forEach(LS => {
    fg = games.filter(games => LS === games.id);
    if (fg.length > 0) {
        filterGames.push(fg[0])
    }
  }
  ))


  let total = 0;
  if (filterGames){
    filterGames.forEach(e => total+=e.price)
  }

  const [state, setState] = useState({showModal: false, status: "Pending"});

  function handleResponse(data){
    if (data.title === "success") {
      setState({ showModal: false, status: "Complete" });
      filterGames.forEach(async (e) => {
        //dispatch(postOrder({game_id: e.id, game_name: e.name, price: e.price, user_id: user.id, username: user.username, mercadopago_id: user.id}))
        await axios.post(`${REACT_APP_URL}order/post`, {game_id: e.id, game_name: e.name, price: e.price, user_id: user.id, username: user.username, mercadopago_id: user.id})
      })
      dispatch(clearCart())
      dispatch(getUserOrders(user.id))
      //alert('Successful purchase, your games will be added to your library')
      toast.show({
        placement: "top",
        render: () => {
          return(
          <Box style={{alignItems: 'center'}} bg="emerald.500" px="2" py="1" rounded="sm" mb={5}>
            <Text>Successful purchase,</Text>
            <Text>your games will be added to your library</Text>
          </Box>)
        }
      })
    } else if (data.title === "cancel") {
        setState({ showModal: false, status: "Cancelled" });
    } else {
        return;
    }
  };

  return (
    <View style={styles.container}>

      {!cart || cart.length === 0 ? <Text style={styles.noProducts}>No products yet...</Text> : null}

      <FlatList
        style={styles.list}
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

      <Modal
          visible={state.showModal}
          onRequestClose={() => setState({ showModal: false })}
      >
          <WebView
              source={{ uri: `${REACT_APP_URL}paypal/rend` }}
              onNavigationStateChange={data =>
                  handleResponse(data)
              }
              injectedJavaScript={`document.getElementById('price').value=${`${total}`};document.f1.submit()`}
          />
      </Modal>

      <View style={styles.bottom}>
      <Text style={styles.total}>Total: {total} USD$</Text>
      <TouchableHighlight
          style={styles.button}
          onPress={() => setState({ showModal: true })}
          disabled={!cart || cart.length === 0 ? true : false}
      >
          <Text style={styles.textButton}>Purchase</Text>
      </TouchableHighlight>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
      height: '100%',
      width: '100%',
  },
  button : {
    position: 'absolute',
    bottom:0,
    right:0,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'black',
    marginTop:5,
    marginRight: 20,
    marginBottom: 10,
    width:160
  },
  textButton: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
  total: {
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 20,
    marginTop: 25,
    height: 40
  },
  bottom:{
    backgroundColor: '#e9e7e9'
  },
  noProducts: {
    marginTop: 70,
    textAlign: 'center',
    fontSize: 20
  },
  list: {
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
  }
})