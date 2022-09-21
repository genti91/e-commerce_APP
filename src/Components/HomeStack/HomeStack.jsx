import { createStackNavigator } from '@react-navigation/stack';
import Home from '../Home/Home';
import ProductDetails from '../ProductDetails/ProductDetails';

const Stack = createStackNavigator();

export default function HomeStack() {

  return (
    <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Detail" component={ProductDetails} />
    </Stack.Navigator>
  );
}