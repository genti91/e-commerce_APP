import { StyleSheet, Text, View, FlatList } from 'react-native';
import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector} from 'react-redux';
import { getAllProducts, setCurrentPage, getUsers, addWish, resetWish, searchProduct, clear } from '../../redux/actions';
import MaterialCommunityIcons from 'react-native-vector-icons/Ionicons';
import ProductCard from '../Cards/ProductCard/ProductCard';
import { Searchbar } from 'react-native-paper'
import Order from '../Order/Order.jsx'
import { Button, Box, Fab, Center, Icon, PresenceTransition, Spinner } from "native-base";
import FIlter from '../Filters/FIlterButton';
//import Pagination from '../Pagination/Pagination';
//import SideBar from '../SideBar/SideBar';
//import Filters from "../Filters/Filters"


export default function Home() {

  let games = useSelector(state => state.products);
  let searchered = useSelector(state => state.searchered);
  let dispatch = useDispatch();
  let currentPage = useSelector((state) => state.currentPage);
  let [gamesPerPage, setgamesPerPage] = useState(15);
  let [showButton, setShowButton] = useState(false);
  let [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(true);
  const indexOfLastGame = currentPage * gamesPerPage;
  const indexOfFirstGame = indexOfLastGame - gamesPerPage;
  //const currentGames = searchered.length ? searchered.slice(indexOfFirstGame, indexOfLastGame) : games.slice(indexOfFirstGame, indexOfLastGame);
  const currentGames = searchered.length ? searchered : games
  const data = [
    {id: 1, name: "Price: Higher to lower", value: 'Highest_Price'}, 
    {id: 2, name: "Price: Lower to Higher", value: 'Lowest_Price'},
    {id: 3, name: "Rating: Higher to lower", value: 'higher'},
    {id: 4, name: "Rating: Lower to Higher", value: 'lower'},
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
        moveToTop()
    }else{
        setLoading(true)
        dispatch(searchProduct(name))
        setName("");
        moveToTop()
    }
  }

  const [selectedIte, setSelectedIte] = useState(null)

  const onSelect = (item) => {
    setSelectedIte(item)
  }

  const flatList = useRef();
  const moveToTop = () => flatList.current.scrollToIndex({ index: 0 });

  function handleScroll(e) {
    e = e.nativeEvent.contentOffset.y
    if (e === 0) {
      setShowButton(false);
    }else{setShowButton(true)}
  }

  function clearRefresh(){
    dispatch(clear())
  }

  useEffect(() => {
    setLoading(false)
  },[currentGames])

  return (
    <View>

      

      <View style={styles.container}>
          <Searchbar
              style={{marginTop:5, marginBottom:5}}
              placeholder="Search for character..."
              onChangeText={value => handleChange(value)}
              value={name}
              onIconPress={handleSubmit}
              onSubmitEditing={handleSubmit}
          />
      <View style={styles.filterContainer}>
          
          <Order
            style={{shadowColor: "grey"}}
            value={selectedIte}
            data={data}
            onSelect={onSelect}
          />

        <FIlter/>

      </View>
      { loading ? <Spinner style={{marginTop: 50}} color="emerald.500" size="lg" /> :
      <FlatList
          ref={flatList}
          onScroll={(e) => handleScroll(e)}
          style={{marginBottom:100, marginTop: 5}}
          showsVerticalScrollIndicator={false}
          data={currentGames}
          keyExtractor={({ id }) => id.toString()}
          refreshing={false}
          onRefresh={clearRefresh}
          initialNumToRender={7}
          maxToRenderPerBatch={5}
          decelerationRate={0.02}
          renderItem={({ item }) => 
          (
              <ProductCard 
                  key={item.id}
                  item={item}                           
              />
          )}
      />}

      </View>
      {/* <Box alignItems="center" style={styles.button}>
        <Button onPress={moveToTop}><MaterialCommunityIcons name="arrow-up" color={'black'} size={25} /></Button>
      </Box> */}

      <PresenceTransition style={styles.transition} visible={showButton} initial={{opacity: 0, scale: 0}} 
        animate={{
          opacity: 1,
          scale: 1,
          transition: {
            duration: 550
          }
        }}
      >
        <Fab style={styles.button} onPress={moveToTop} renderInPortal={false} shadow={2} size={10} icon={<Icon color="black" as={MaterialCommunityIcons} name="arrow-up" size="5" />} />
      </PresenceTransition>

        {/* {showButton && (<Fab style={styles.button} onPress={moveToTop} renderInPortal={false} shadow={2} size={10} icon={<Icon color="black" as={MaterialCommunityIcons} name="arrow-up" size="5" />} />)} */}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
      paddingRight: 10,
      paddingLeft: 10,
      marginBottom: 105,
  },
  button: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    marginRight: 10,
    marginBottom: 110,
    backgroundColor: '#b2cfd9'
  },
  transition: {
    position: 'absolute',
    bottom: 0,
    right: 0,
  },

  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});