import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../Home/Home';
import ProductDetails from '../ProductDetails/ProductDetails';
import Filters from '../Filters/Filters.jsx'

const Stack = createStackNavigator();

export default function HomeStack() {

  return (
    <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Detail" component={ProductDetails} />
        <Stack.Screen name='Filters' component={Filters}/>
    </Stack.Navigator>
  );
}