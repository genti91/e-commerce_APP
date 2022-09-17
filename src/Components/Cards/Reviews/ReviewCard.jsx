import { StyleSheet, Text, View,TouchableHighlight } from 'react-native';
import { useDispatch } from 'react-redux';

export default function ReviewCard() {

    let dispatch = useDispatch()


  return (
    <View style={styles.container}>
        <Text style={styles.textButton}>Review</Text>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        height:100,
        width:50,
        backgroundColor: 'black',
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