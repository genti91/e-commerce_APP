import React from 'react';
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
import { Text, View } from 'react-native';
import CreateUser from './src/Components/CreateUser/CreateUser';
import HomeStack from './src/Components/HomeStack/HomeStack';

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

  let {user} = useSelector(state=>state.users);

  return (
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
        <Tab.Screen name='Profile' component={ShoppingCart} 
          options={{
            tabBarIcon: ({ color, size }) => 
            (<MaterialCommunityIcons name="person" color={color} size={size} />)
          }}
        />
      </Tab.Navigator>}
    </NavigationContainer>
  );
}

export default AppWrapper;