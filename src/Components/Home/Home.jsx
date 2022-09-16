import { StyleSheet, Text, View, FlatList } from 'react-native';
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector} from 'react-redux';
import { getAllProducts, setCurrentPage, getUsers, addWish, resetWish, searchProduct, clear } from '../../redux/actions';
import ProductCard from '../Cards/ProductCard/ProductCard';
import { Searchbar } from 'react-native-paper'
//import Pagination from '../Pagination/Pagination';
//import SideBar from '../SideBar/SideBar';
//import Filters from "../Filters/Filters"


export default function Home() {

  let games = useSelector(state => state.products);
  let searchered = useSelector(state => state.searchered);
  let dispatch = useDispatch();
  let currentPage = useSelector((state) => state.currentPage);
  let [gamesPerPage, setgamesPerPage] = useState(15);
  const indexOfLastGame = currentPage * gamesPerPage;
  const indexOfFirstGame = indexOfLastGame - gamesPerPage;
  //const currentGames = searchered.length ? searchered.slice(indexOfFirstGame, indexOfLastGame) : games.slice(indexOfFirstGame, indexOfLastGame);
  const currentGames = searchered.length ? searchered : games
  //const user = useSelector((state) => state.users),
      //wishList = useSelector(state => state.wishlist),
      //token = window.sessionStorage.getItem('token');
  // const [show, setShow] = useState(false);

  const paginado = (number) => {
      dispatch(setCurrentPage(number))
  }

  useEffect(() => {
      //token && dispatch(getUsers(token));
      dispatch(getAllProducts());
  }, []);

  // useEffect(() => {
  //     return () => dispatch(getUsers(token));
  // }, []);

  // useEffect(() => {
  //     user.products?.length !== 0 ? user.products?.map(e => dispatch(addWish(e.id))):
  //     dispatch(resetWish());
  // },[user])

  let [name, setName] = useState('');
  function handleChange(e) {
    setName(e)
  }
  function handleSubmit() {
    if (!name) {
        dispatch(clear())
    }else{
        dispatch(searchProduct(name));
        dispatch(setCurrentPage(1));
        setName("");
    }
  }

  return (
    <View>
        
      <View style={styles.container}>
          <Searchbar
              style={{marginTop:5}}
              placeholder="Search for character..."
              onChangeText={value => handleChange(value)}
              value={name}
              onIconPress={handleSubmit}
              onSubmitEditing={handleSubmit}
          />
          <FlatList
              style={{marginBottom:100, marginTop: 5}}
              showsVerticalScrollIndicator={false}
              data={currentGames}
              keyExtractor={({ id }) => id.toString()}
              initialNumToRender={20}
              maxToRenderPerBatch={20}
              decelerationRate={0.02}
              renderItem={({ item }) => 
              (
                  <ProductCard 
                      key={item.id}
                      item={item}                           
                  />
              )}
          />
      </View>
        
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
      paddingRight: 10,
      paddingLeft: 10,
  }
});