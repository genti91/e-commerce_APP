import { StyleSheet, Text, View, FlatList } from 'react-native';
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector} from 'react-redux';
import { getAllProducts, setCurrentPage, getUsers, addWish, resetWish } from '../../redux/actions';
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
  const currentGames = searchered.length ? searchered.slice(indexOfFirstGame, indexOfLastGame) : games.slice(indexOfFirstGame, indexOfLastGame);

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


  return (
    <View>
        
      <View>
          <Searchbar
              placeholder="Search for character..."
              //onChangeText={value => setSearch(value)}
              //value={search}
              //onIconPress={searchCharacter}
              //onSubmitEditing={searchCharacter}
          />
          <FlatList
              data={currentGames}
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
        
    </View>
  );
}