import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts, getUserOrders } from '../../redux/actions';
import ProductCard from '../Cards/ProductCard/ProductCard';

export default function MyStore() {
  let dispatch = useDispatch();
  let {user} = useSelector(state => state.users);
  let userOrders = useSelector(state => state.userOrders);
  let games = useSelector(state => state.products2);
  let filterGames = [];
  let fg;

  useEffect( () => {
    dispatch(getAllProducts())
    dispatch(getUserOrders(user.id))
  }, []);

  if(userOrders){ 
    userOrders.forEach(LS => {
      fg = games.filter(games => LS.game_id === games.id);
      if (fg.length > 0) {
          filterGames.push(fg[0])
      }
    }
    )
  }

  return (
    <View>
      {!filterGames || filterGames.length === 0 ? <Text style={styles.noProducts}>No products yet...</Text> : null}
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
    </View>
  );
}

const styles = StyleSheet.create({
  list: {
    paddingTop: 5,
    paddingLeft: 10,
    paddingRight: 10,
  },
  noProducts: {
    marginTop: 70,
    textAlign: 'center',
    fontSize: 20
  },
});