import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, Image, Dimensions, TouchableHighlight, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, addWish } from '../../redux/actions';
import ReviewCard from '../Cards/Reviews/ReviewCard';
const {REACT_APP_URL} = process.env;
//const REACT_APP_URL = 'http://192.168.0.98:3001/'


const {width} = Dimensions.get('window');
const SPACING = 5;
const ITEM_LENGTH = width; // Item is a square. Therefore, its height and width are of the same length.
const BORDER_RADIUS = 20;

export default function ProductDetails({route}) {
  let id = route.params.id
  const [game, setGame] = useState({});
  const [disabled, setDisabled] = useState(true); // si no esta logueado desabilita addwish
  let cart = useSelector(state=>state.cart);
  let userOrders = useSelector(state=>state.userOrders);
  let wishlist = useSelector(state=>state.wishlist);
  const [reviews, setReviews] = useState();
  let owned = false;
  let gam = userOrders.filter((e)=> e.game_id === id)
  if (gam.length > 0) {
    owned = true;
  }
  
  let user = useSelector(state => state.users); // se trae el usuario logueado para permitir agregar a wishlist
  let dispatch = useDispatch();

  useEffect(() => {
    if (user.length) setDisabled(false); //si cuando se monta el componente hay usuario logueado habilita el addwish
    setTimeout(() => {
      axios.get(`${REACT_APP_URL}videogames/${id}`)
      .then(res => {
        setGame(res.data)
        axios.get(`${REACT_APP_URL}reviews/${id}`)
        .then(res => setReviews(res.data.filter((e)=> !e.reported)))
        .catch(err => console.log(err))
      })
      .catch(err => console.log(err))
    }, 500);
  }, [id, user]);

  function handleCart(){
    let fC;
    if (cart) {
      fC = cart.filter(e=>e===id);
    }
    if (owned) {
      alert("You already own this game!")
    }else if(fC && fC.length>0){
    alert("Juego ya agregado al carrito anteriormente!")
    }else{
      dispatch(addToCart(game.id)) // dispacha al carrito de compras con el id del game en la db
    }
  }

  function handleWhish(){
    let fC;
    if (wishlist) {
      fC = wishlist.filter(e=>e===id);
    }
    if (owned) {
      alert("You already own this game!")
    }else if(fC && fC.length>0){
    alert("Juego ya agregado al la whish list anteriormente!")
    }else{
      dispatch(addWish(game.id)) // dispacha al carrito de compras con el id del game en la db
    }
  }

  return (
    <ScrollView>
      <Text style={styles.name}>{route.params.name}</Text>
      <FlatList
      contentContainerStyle={{alignItems: 'center'}}
      keyExtractor={item => item.image}
      horizontal
      data={game.Screenshots}
      pagingEnabled 
      showsHorizontalScrollIndicator={false}
      renderItem={({ item }) => (
        <View style={{width: ITEM_LENGTH}}>
          <View style={styles.itemContent}>
            <Image source={{uri: item.image}} style={styles.itemImage} />
          </View>
        </View>
        )}
      />
      <View style={styles.btnContainer}>
      <TouchableHighlight
          style={styles.button}
          onPress={(e) => handleCart(e)}
      >
          <Text style={styles.textButton}>Add to Cart</Text>
      </TouchableHighlight>
      <TouchableHighlight
          style={styles.button}
          onPress={(e) => handleWhish(e)}
      >
          <Text style={styles.textButton}>Add to WhishList</Text>
      </TouchableHighlight>
      </View>
      <View className='verticalScrollable1'>
        {reviews && reviews.map((e) => {
          return(<ReviewCard></ReviewCard>)
        })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {},
  itemContent: {
    marginHorizontal: SPACING * 3,
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: BORDER_RADIUS + SPACING * 2,
  },
  itemText: {
    fontSize: 24,
    position: 'absolute',
    bottom: SPACING * 2,
    right: SPACING * 2,
    color: 'white',
    fontWeight: '600',
  },
  itemImage: {
    width: '100%',
    height: ITEM_LENGTH,
    borderRadius: BORDER_RADIUS,
    resizeMode: 'cover',
  },
  name: {
    textAlign: 'center',
    fontSize: 50
  },
  btnContainer: {
    alignItems: 'center',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'black',
    marginTop:20,
    width:200
  },
  textButton: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
});