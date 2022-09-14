import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { ActivityIndicator } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import MaterialCommunityIcons from 'react-native-vector-icons/Ionicons';
import LoginRN from './src/Components/Login/LoginRN';
import Home from './src/Components/Home/Home';
import ShoppingCart from './src/Components/ShoppingCart/ShoppingCart';
import { color } from 'react-native-reanimated';
import WhishList from './src/Components/WishList/WhishList';
import MyStore from './src/Components/MyStore/MyStore';
import { Provider, useSelector } from 'react-redux';
import store from './src/redux/store';
import { Text, View, Image, StyleSheet } from 'react-native';
import CreateUser from './src/Components/CreateUser/CreateUser';
import HomeStack from './src/Components/HomeStack/HomeStack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loadUser } from './src/Components/Login/LoadUser';
import { useDispatch } from 'react-redux';
import { getUsers, loadCart } from './src/redux/actions';
import UserProfile from './src/Components/UserProfile/UserProfile';
import { loadCartStorage } from './src/Components/ShoppingCart/loadCartStorage';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

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
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    })
  }, []);

  let {user} = useSelector(state=>state.users);

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