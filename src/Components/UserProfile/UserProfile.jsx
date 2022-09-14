import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleSheet, Text, View,TouchableHighlight } from 'react-native';
import { useDispatch } from 'react-redux';
import { resetUser } from '../../redux/actions';

export default function UserProfile() {

    let dispatch = useDispatch()

    async function handleSubmit(e) {
        try{
            await AsyncStorage.clear();
            dispatch(resetUser());
        }catch(err){
            console.log(err)
        }
    }

  return (
    <View style={styles.container}>
      <TouchableHighlight
            style={styles.button}
            onPress={(e) => handleSubmit(e)}
        >
            <Text style={styles.textButton}>Logout</Text>
        </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
        marginTop: 30,
        paddingLeft: 15,
        paddingRight: 15
    },
    button : {
        backgroundColor : 'skyblue',
        paddingTop : 15 ,
        paddingBottom : 15
    },
    textButton: {
        textAlign: 'center',
        color: 'white'
    },
    title: {
        textAlign: 'center',
        fontSize: 18,
        marginBottom: 5
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 2,
        marginBottom: 20
    }
})