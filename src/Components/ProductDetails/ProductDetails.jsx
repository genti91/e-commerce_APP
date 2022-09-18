import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View, FlatList, Image, Dimensions, TouchableHighlight, ScrollView, Animated } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, addWish } from '../../redux/actions';
import { Box, useToast } from "native-base";
import ReviewCard from '../Cards/Reviews/ReviewCard';
import ReadMore from 'react-native-read-more-text';
import {ExpandingDot} from "react-native-animated-pagination-dots";
import styles from './DetailsStyles'
import ReviewBox from '../Review/Review';
const {REACT_APP_URL} = process.env;
//const REACT_APP_URL = 'http://192.168.0.98:3001/'


const {width} = Dimensions.get('window');
const SPACING = 5;
const ITEM_LENGTH = width;
const BORDER_RADIUS = 10;

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
  const toast = useToast();
  const scrollX = useRef(new Animated.Value(0)).current;
  const [render, setRender] = useState('');
  
  let user = useSelector(state => state.users); // se trae el usuario logueado para permitir agregar a wishlist
  let dispatch = useDispatch();

  useEffect(() => {
    if (user.length) setDisabled(false); //si cuando se monta el componente hay usuario logueado habilita el addwish
    setTimeout(() => {
      axios.get(`${REACT_APP_URL}videogames/${id}`)
      .then(res => {
        setGame({...res.data, Screenshots: [{image: res.data.background_image}, ...res.data.Screenshots]})
        axios.get(`${REACT_APP_URL}reviews/${id}`)
        .then(res => setReviews(res.data.filter((e)=> !e.reported)))
        .catch(err => console.log(err))
      })
      .catch(err => console.log(err))
    }, 500);
  }, [id, user, render]);

  function handleCart(){
    let fC;
    if (cart) {
      fC = cart.filter(e=>e===id);
    }
    if (owned) {
      toast.show({
        render: () => {
          return <Box bg="yellow.500" px="2" py="1" rounded="sm" mb={5}>
                  You already own this game!
                </Box>;
        }
      })
    }else if(fC && fC.length>0){
    toast.show({
      render: () => {
        return <Box bg="red.500" px="2" py="1" rounded="sm" mb={5}>
                Game already in cart!
              </Box>;
      }
    })
    }else{
      dispatch(addToCart(game.id)) // dispacha al carrito de compras con el id del game en la db
      toast.show({
        render: () => {
          return <Box bg="emerald.500" px="2" py="1" rounded="sm" mb={5}>
                  Game added to cart!
                </Box>;
        }
      })
    }
  }

  function handleWhish(){
    let fC;
    if (wishlist) {
      fC = wishlist.filter(e=>e===id);
    }
    if (owned) {
      toast.show({
        render: () => {
          return <Box bg="yellow.500" px="2" py="1" rounded="sm" mb={5}>
                  You already own this game!
                </Box>;
        }
      })
    }else if(fC && fC.length>0){
      toast.show({
        render: () => {
          return <Box bg="red.500" px="2" py="1" rounded="sm" mb={5}>
                  Game already in wishlist!
                </Box>;
        }
      })
    }else{
      dispatch(addWish(game.id)) // dispacha al carrito de compras con el id del game en la db
      toast.show({
        render: () => {
          return <Box bg="emerald.500" px="2" py="1" rounded="sm" mb={5}>
                  Game added to wishlist!
                </Box>;
        }
      })
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

      <View style={styles.descriptionContainer}>
        <Text style={styles.price}>{game.price}$</Text>
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
      </View>


      <View style={styles.descriptionContainer}>
        <ReadMore
          numberOfLines={3}
          renderTruncatedFooter={_renderTruncatedFooter}
          renderRevealedFooter={_renderRevealedFooter}
          onReady={_handleTextReady}>
          <Text style={styles.description}>
            {game.description}
          </Text>
        </ReadMore>
      </View>
        
      <View style={styles.descriptionContainer}>
        <View style={{alignItems: 'center',}}>
          <View style={{flexDirection: 'row'}}>
            <Text style={{fontWeight: 'bold'}}>Rating:</Text>
            <Text> {game.rating}</Text>
            <Text style={{fontWeight: 'bold',marginLeft: 10}}>Metacritic:</Text>
            <Text> {game.metacriticRating}</Text>
          </View>
          <View style={{flexDirection: 'row',borderTopWidth: 1}}>
            <Text style={{fontWeight: 'bold',}}>Esrb:</Text>
            <Text> {game.esrb_rating}</Text>
            <Text style={{fontWeight: 'bold',marginLeft: 10}}>Released:</Text>
            <Text> {game.released}</Text>
          </View>
        </View>
      </View>

      <View style={styles.descriptionContainer}>
        <View style={{alignItems: 'center',}}>
          <Text style={{fontWeight: 'bold',}}>Platforms</Text>
          <Text> {game.platforms?.map(e=>e.name).join(' | ')}</Text>
        </View>
      </View>

      <View style={styles.descriptionContainer}>
        <View style={{alignItems: 'center',}}>
          <Text style={{fontWeight: 'bold',}}>Genres</Text>
          <Text> {game.genres?.map(e=>e.name).join(' | ')}</Text>
        </View>
      </View>

      <View style={{width: ITEM_LENGTH}}>
      <View style={styles.descriptionContainer}>
        <View style={{alignItems: 'center',}}>
        <Text style={{fontWeight: 'bold', marginBottom: 3,}}>Reviews</Text>
        {!reviews || reviews.length === 0 && (<Text>This game doesn't have any reviews yet!</Text>)}
        <FlatList
        contentContainerStyle={{alignItems: 'center'}}
        keyExtractor={item => item.id}
        horizontal
        data={reviews}
        pagingEnabled 
        showsHorizontalScrollIndicator={false}
        decelerationRate={'normal'}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          {
            useNativeDriver: false,
          }
        )}
        renderItem={({ item }) => (
            <ReviewCard review={item}/>
          )}
        />

      </View>
        {reviews &&
        (<ExpandingDot
          data={reviews}
          expandingDotWidth={30}
          scrollX={scrollX}
          inActiveDotOpacity={0.6}
          dotStyle={{
            width: 10,
            height: 10,
            backgroundColor: '#347af0',
            borderRadius: 5,
            marginHorizontal: 5
          }}
          containerStyle={{
            top: 30,
          }}
        />)}
      </View>
      </View>
      <ReviewBox productId={id} reviews={reviews} setReviews={setReviews}/>
    </ScrollView>
  );
}

function _renderTruncatedFooter(handlePress){
  return (
    <Text style={{color: '#9190e0', marginTop: 5}} onPress={handlePress}>
      Read more
    </Text>
  );
}
function _renderRevealedFooter(handlePress){
  return (
    <Text style={{color: '#9190e0', marginTop: 5}} onPress={handlePress}>
      Show less
    </Text>
  );
}
function _handleTextReady(){
  // ...
}