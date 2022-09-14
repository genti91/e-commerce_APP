import * as React from 'react';
import { Text, View,  Image, StyleSheet, TouchableOpacity, TouchableHighlight } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import MaterialCommunityIcons from 'react-native-vector-icons/Ionicons';
import { removeFromCart } from '../../../redux/actions';

export default function ProductCard({item}) {
	const navigation = useNavigation();
  const route = useRoute();
  let dispatch = useDispatch();
  let cart = useSelector(state => state.cart);
  let foundCart = false;
  cart.forEach( e =>{ if ( e === item.id ) {foundCart = true}});

  const handleClick = (e) => {
    dispatch(removeFromCart(item.id));
  }

  return (
    <TouchableOpacity 
			style={styles.container}
			onPress={() => navigation.navigate('Detail', {...item})}
	  > 
      <View>
			<Image 
				style={styles.image}
                source={{uri: item.background_image}}
                resizeMode={'cover'}
			/>
      <Text style={styles.text}>{item.name}</Text>
      </View>
      {foundCart && route.name !== 'Home' && <TouchableHighlight
            style={styles.button}
            onPress={(e) => handleClick(e)}
        >
            <MaterialCommunityIcons name="close" color='black' size={50}/>
        </TouchableHighlight>}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor:'#ccc',
        marginBottom: 10,
        width: '100%',
        height: 100,
        flexDirection: "row",
    },
    image: {
        height: 60,
        width: 100,
        marginTop: 10,
        marginLeft: 10
    },
    text: {
        marginLeft: 5
    },
    button: {
      alignSelf: 'flex-end'
    },
  });