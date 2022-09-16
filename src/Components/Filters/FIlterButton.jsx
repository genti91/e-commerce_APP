import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert} from 'react-native'
import { Button } from 'react-native-paper'
import { getUsedPlatforms, getUsedGenres } from '../../redux/actions.js'
import { useNavigation, useRoute } from '@react-navigation/native'
import { useDispatch, useSelector, } from 'react-redux'
import imagesPath from '../../constants/imagesPath.js'


export default function FIlterButton() {
    const platforms = useSelector((state) => state.platforms)
    const genres = useSelector((state) => state.genres)

    React.useEffect(() =>{
      dispatch(getUsedPlatforms())
      dispatch(getUsedGenres())
    })

    const navigation = useNavigation();
    const route = useRoute();
    let dispatch = useDispatch()
  return (
    <View>
        <TouchableOpacity 
                onPress={() => navigation.navigate('Filters', {...platforms, ...genres}) }
            >
            <Button style={styles.containter} title='Hola'>
                <Image source={imagesPath.filter}/>  
            </Button>
        </TouchableOpacity>
    </View>
  )
}


const styles = StyleSheet.create({
    containter: {
   /*      alignItems: 'center',
        justifyContent: 'center', */
        textDecorationColor: '#000',
        shadowColor: '#000',
        shadowRadius: 3,
        marginTop: 3,
        backgroundColor: 'white',
        borderRadius: 6,
        minHeight: 42,
        justifyContent: 'space-between',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },   
      
})