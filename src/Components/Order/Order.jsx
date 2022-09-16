import React, { useState } from 'react'
import {View, StyleSheet, Text, TouchableHighlight, Alert, FlatList, Image, ScrollView} from 'react-native'
import { Button } from 'react-native-paper';
import { Orderby } from '../../redux/actions.js'
import { useDispatch, useSelector } from 'react-redux';
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import imagesPath from '../../constants/imagesPath.js';




export default function Order({
    data = [],
    value = {},
    onSelect = () => {}
}) 

{

    const dispatch = useDispatch()
    const [showOptions, setShowOptiones] = useState(false)

    const onSelectItem = (val) => {
        setShowOptiones(!showOptions)
        onSelect(val)
        
        switch(val.value){
                case  "A-Z":
                dispatch(Orderby((a, b) => { return a.name.toUpperCase() < b.name.toUpperCase() ? -1 : 1 })); break //si es menor -1
                case "Z-A":
                dispatch(Orderby((a, b) => { return b.name.toUpperCase() < a.name.toUpperCase() ? -1 : 1 })); break
                case "higher":
                    dispatch(Orderby((a,b)=>{return b.rating - a.rating })); break //si el puntaje es menor lo mueve al fondo
                case "lower":
                    dispatch(Orderby((a,b)=>{return a.rating - b.rating })); break
                    case "Highest_Price":
                        dispatch(Orderby((a,b)=>{
                  if (!a.price && !b.price) {
                    return 0;
                  }
                  if (!a.price) {
                      return 1;
                    }
                    if (!b.price) {
                        return -1;
                    }
                    return b.price - a.price
                })); break
                case "Lowest_Price":
                    dispatch(Orderby((a,b)=>{return a.price - b.price})); break
            default: break;
        };
    }

    function miFuncion(e) {
       
    }

   
    
    let handlerChange = (e)=>{
        e.preventDefault()

       
    };
    
    return (
        <View style={styles.containter}>
            <TouchableOpacity 
                style={styles.dropDownStyle}
                activeOpacity={0.8}
                onPress={() => setShowOptiones(!showOptions)}
            >
                <Text style={{
                    color: 'grey',
                    fontSize: 17
                }}>Order by...</Text>
                <Image style={{
                    transform: [{rotate: showOptions? '180deg' : '0deg'}]
                    }} source={imagesPath.icDropDown}></Image> 
            </TouchableOpacity>
           {showOptions && (<View
                style={{
                    backgroundColor: '#03989E',
                    padding: 8,
                    borderRadius: 6,
                    maxHeight: 120,
                    shadowColor: "#000"
                }}>
            <ScrollView
                keyboardShouldPersistTaps='handled'
                showsVerticalScrollIndicator={false}
                >
            <TouchableOpacity>
            {data.map((val, i) => {
                return (
                    <TouchableOpacity 
                        key={String(i)}
                        onPress={() => onSelectItem(val)}
                        style={{
                            backgroundColor: '#FFFFFF',
                            paddingVertical: 8,
                            borderRadius: 4,
                            paddingHorizontal: 4,
                            marginBottom: 4,
                            textDecorationColor: '#FFFFFF',
                            shadowColor: "#000"
                        }}
                        >
                        <Text>{val.name}</Text>
                    </TouchableOpacity>
                )
            })}
            </TouchableOpacity>
            </ScrollView>
            </View>)}
        </View>
  )
  
}

 const styles = StyleSheet.create({
     containter: {
        textDecorationColor: '#FFFFFF',
        shadowColor: "#000"
     },

     dropDownStyle: {
        shadowColor: '#000',
        shadowRadius: 3,
        marginTop: 3,
        backgroundColor: 'white',
        padding: 8,
        borderRadius: 6,
        minHeight: 42,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 2,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
     }
 })



