import { StyleSheet, Text, View, FlatList } from 'react-native';
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector} from 'react-redux';
import { getAllProducts, setCurrentPage, getUsers, addWish, resetWish, searchProduct, clear } from '../../redux/actions';
import ProductCard from '../Cards/ProductCard/ProductCard';
import { Searchbar } from 'react-native-paper'
import Order from '../Order/Order.jsx'
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
  const data = [
    {id: 1, name: "Price: Higher to lower", value: 'higher'}, 
    {id: 2, name: "Price: Lower to Higher", value: 'lower'},
    {id: 3, name: "Rating: Higher to lower", value: 'Highest_Price'},
    {id: 4, name: "Rating: Lower to Higher", value: 'Lowest_Price'},
    {id: 5, name: "A-Z", value: 'A-Z'},
    {id: 6, name: "Z-A", value: 'Z-A'},

]

  

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

  const [selectedIte, setSelectedIte] = useState(null)

  const onSelect = (item) => {
    setSelectedIte(item)
  }

  return (
    <View>
        
      <View>
          <Searchbar
              placeholder="Search for character..."
              onChangeText={value => handleChange(value)}
              value={name}
              onIconPress={handleSubmit}
              onSubmitEditing={handleSubmit}
          />

          <Order
            value={selectedIte}
            data={data}
            onSelect={onSelect}
            
          />

          <FlatList
                style={{marginBottom:100}}
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