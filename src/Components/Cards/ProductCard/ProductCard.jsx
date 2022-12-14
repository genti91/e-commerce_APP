import * as React from 'react';
import { Text, View,  Image, StyleSheet, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import MaterialCommunityIcons from 'react-native-vector-icons/Ionicons';
import { addToCart, addWish, removeFromCart, removeWish } from '../../../redux/actions';
import { useEffect } from 'react';
import { useToast, Box } from 'native-base';

export default function ProductCard({item}) {
	const navigation = useNavigation();
  const route = useRoute();
  let dispatch = useDispatch();
  const toast = useToast();
  let cart = useSelector(state => state.cart);
  let userOrders = useSelector(state=>state.userOrders);
  let wishlist = useSelector(state=>state.wishlist);
  let foundCart = false;
  if (cart) {
    cart.forEach( e =>{ if ( e === item.id ) {foundCart = true}});
  }
  let foundWish = false;
  if (wishlist) {
    wishlist.forEach( e =>{ if ( e === item.id ) {foundWish = true}});
  }
  let owned = false;
  let gam = userOrders.filter((e)=> e.game_id === item.id)
  if (gam.length > 0) {
    owned = true;
  }
  useEffect(() => {
    
  }, [cart, wishlist])

  const handleClick = (e) => {
    if (route.name === 'Cart') {
      dispatch(removeFromCart(item.id));
    }else{
      dispatch(removeWish(item.id))
    }
    
  }

  let cartColor = 'grey'
  if (foundCart) {
    cartColor = '#496fad'
  }
  let wishColor = 'grey'
  if (foundWish) {
    wishColor = '#ad5049'
  }
  let genres="";
  item && item.genres.forEach(e=> genres = genres + e.name + " ");
  let disabled = item.fromApi;


  function handleCart(){
    let fC;
    if (cart) {
      fC = cart.filter(e=>e===item.id);
    }
    if (owned) {
      toast.show({
        render: () => {
          return <Box bg="yellow.500" px="2" py="1" rounded="sm" mb={5}>
                  You already own this game!
                </Box>;
        }
      })
    }else if(foundCart){
      dispatch(removeFromCart(item.id));
    }else{
      dispatch(addToCart(item.id)) // dispacha al carrito de compras con el id del game en la db
    }
  }

  function handleWhish(){
    let fC;
    if (wishlist) {
      fC = wishlist.filter(e=>e === item.id);
    }
    if (owned) {
      toast.show({
        render: () => {
          return <Box bg="yellow.500" px="2" py="1" rounded="sm" mb={5}>
                  You already own this game!
                </Box>;
        }
      })
    }else if(foundWish){
      dispatch(removeWish(item.id))
    }else{
      dispatch(addWish(item.id)) // dispacha al carrito de compras con el id del game en la db
    }
  }
  let platformsArr = []
  if (item.platforms && item.platforms.length > 0) {
    let platformsSet = new Set();
    item.platforms.forEach(e => {
      if (e.name.includes('PlayStation')) platformsSet.add('PlayStation');
      if (e.name.includes('Xbox')) platformsSet.add('Xbox');
      if (e.name === 'PC') platformsSet.add('PC');
    });
    platformsSet.forEach(e => platformsArr.push(e))
  }

  return (
    <TouchableOpacity 
      disabled={item.fromApi}
			style={styles.container}
			onPress={() => navigation.navigate('Detail', {...item})}
	  >
			<Image 
				style={styles.image}
        source={{uri: item.background_image}}
        resizeMode={'cover'}
			/>
      <View>
      <View style={styles.textContainer}><Text numberOfLines={1} style={styles.text}>{item.name}</Text></View>
      
      {item.platforms && item.platforms.length > 0 && (
      <View style={{flexDirection: "row", marginTop: 2}}>
      <Text style={styles.platforms} >Available on:</Text>
        {platformsArr.map((e, i) => {
          let img;
          if(e === 'PC') img = require('../../../images/PC.png')
          if(e === 'Xbox') img = require('../../../images/Xbox.png')
          if(e === 'PlayStation') img = require('../../../images/PlayStation.png')
          return(
            <Image 
              key={i}
              style={styles.iconImg}
              source={img}
              resizeMode={'cover'}
            />
          )
        })}
      </View>)}
      {!owned ? 
      <View>
        <View style={styles.iconContainer}> 
          <View style={styles.cart}>
            <TouchableWithoutFeedback
              disabled={item.fromApi}
              onPress={(e) => handleCart(e)}
            >
              <MaterialCommunityIcons name="cart" color={cartColor} size={30}/>
            </TouchableWithoutFeedback>
          </View>
          <TouchableWithoutFeedback
            disabled={item.fromApi}
            style={styles.heart}
            onPress={(e) => handleWhish(e)}
          >
            <MaterialCommunityIcons name="heart" color={wishColor} size={30}/>
          </TouchableWithoutFeedback>
          {item.fromApi ? 
          <Text style={styles.noStock}>No Stock</Text>:
          <Text style={styles.price}>{item.price}$</Text>
          }
      {route.name !== 'Home' && route.name !== 'Library' && 
        <View style={styles.button}>
        <TouchableWithoutFeedback
            disabled={item.fromApi}
            onPress={(e) => handleClick(e)}
            //style={{marginRight: 10}}
        >
            <MaterialCommunityIcons name="close" color='black' size={35}/>
        </TouchableWithoutFeedback>
        </View>}
      </View>
      </View>:null}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#d7dbdb',
        marginBottom: 10,
        width: '100%',
        marginRight: 20,
        height: 100,
        flexDirection: "row",
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#c7d1d6',
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    image: {
        height: '100%',
        width: 150,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
    },
    iconImg:{
      marginTop: 6,
      marginLeft: 7,
      width: 20,
      height: 20,
    },
    text: {
        marginLeft: 10,
        marginTop: 5,
        fontSize: 16,
    },
    button: {
      marginLeft:23
    },
    textContainer: {
      maxWidth: 170,
    },
    iconContainer: {
      width: 140,
      paddingLeft: 10,
      marginTop: 7,
      flexDirection: "row",
      height: 38,
    },
    cart: {
      marginRight: 10,
    },
    heart: {
      marginLeft: 20
    },
    price: {
      marginLeft: 10,
      marginTop: 4,
      fontSize: 18,
      fontWeight: 'bold',
    },
    platforms: {
      marginLeft: 15,
      marginTop: 5
    },
    noStock: {
      marginLeft: 10,
      marginTop: 7,
      fontSize: 15,
      fontWeight: 'bold',
    }
  });