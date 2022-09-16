import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { ActivityIndicator, View, Image, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import MaterialCommunityIcons from 'react-native-vector-icons/Ionicons';
import LoginRN from './src/Components/Login/LoginRN';
import WhishList from './src/Components/WishList/WhishList';
import MyStore from './src/Components/MyStore/MyStore';
import { Provider, useSelector, useDispatch } from 'react-redux';
import store from './src/redux/store';
import CreateUser from './src/Components/CreateUser/CreateUser';
import HomeStack from './src/Components/HomeStack/HomeStack';
import { loadUser } from './src/Components/Login/LoadUser';
import { getUserOrders, getUsers, loadCart, loadWhishList } from './src/redux/actions';
import UserProfile from './src/Components/UserProfile/UserProfile';
import { loadCartStorage } from './src/Components/ShoppingCart/loadCartStorage';
import { loadWhishListStorage } from './src/Components/WishList/loadWhishListStorage';
import ShoppingCart from './src/Components/ShoppingCart/ShoppingCart';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const {REACT_APP_URL} = process.env;
//const REACT_APP_URL = 'http://192.168.0.98:3001/'

const AppWrapper = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  )
}

const App = () => {

  const [loading, setLoading] = useState(true);
  let dispatch = useDispatch();

  useEffect( () => {
    loadUser().then((res) => {
      dispatch(getUsers(res.token))
      loadCartStorage().then((cart) => {
        dispatch(loadCart(cart));
      })
      loadWhishListStorage().then((wishList) => {
        dispatch(loadWhishList(wishList));
      })
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    })
  }, []);

  let {user} = useSelector(state=>state.users);
  if(user){
    dispatch(getUserOrders(user.id));
  }

  return (
    <View style={{height: '100%'}}>
      { loading ? <View style={styles.loading}>
        <Image style={styles.img} source={require('./logo.png')} />
        <ActivityIndicator size="large" color="#00ff00" />
    </View> :

    <NavigationContainer>
      {!user && 
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginRN} options={{ headerShown: false }} />
        <Stack.Screen name="CreateUser" component={CreateUser} />
      </Stack.Navigator>
     }
      {user &&
      <Tab.Navigator initialRouteName='HomeStack'>
      <Tab.Screen name='WishList' component={WhishList} 
          options={{
            tabBarIcon: ({ color, size }) => 
            (<MaterialCommunityIcons name="heart" color={color} size={size} />)
            }}
        />
        <Tab.Screen name='Cart' component={ShoppingCart} 
          options={{
            tabBarIcon: ({ color, size }) => 
            (<MaterialCommunityIcons name="cart" color={color} size={size} />)
          }}
        />
        <Tab.Screen name='HomeStack' component={HomeStack} 
          options={{
            tabBarIcon: ({ color, size }) => 
            (<MaterialCommunityIcons name="home" color={color} size={size} />),
            headerShown: false,
            }}
        />
        <Tab.Screen name='MyStore' component={MyStore} 
          options={{
            tabBarIcon: ({ color, size }) => 
            (<MaterialCommunityIcons name="library" color={color} size={size} />)
            }}
        />
        <Tab.Screen name='Profile' component={UserProfile} 
          options={{
            tabBarIcon: ({ color, size }) => 
            (<MaterialCommunityIcons name="person" color={color} size={size} />)
          }}
        />
      </Tab.Navigator>}
    </NavigationContainer>}
    </View>
  );
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  img : {
      width: 150,
      height: 150,
      marginBottom: 20,
  }
})

export default AppWrapper;