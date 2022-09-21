import React, { useState } from 'react'
import { View } from 'react-native'
import { filterByGenres, filterByPlatforms, getAllProducts, Orderby, orderEsrb } from '../../redux/actions.js'
import { useDispatch, useSelector } from 'react-redux';
import { Menu, Pressable, Divider, Select, CheckIcon } from "native-base";
import { useEffect } from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';



export default function Order() {

    const dispatch = useDispatch()

    const products = useSelector((state) => state.products)
    let genres = [...new Set(products.map(e => e.genres).flat().map(e => e.name))]
    let platforms = [...new Set(products.map(e => e.platforms).flat().map(e => e.name))]
    let esrb = [...new Set(products.map(e => e.esrb_rating))]

    useEffect(() => {
        dispatch(getAllProducts())
    }, [dispatch])

    function handleFilterByPlatforms(value) {
        setPosition2(value);
        if (value !== "default") {
          dispatch(filterByPlatforms(value));
        }
    };

    function handleFilterByGenre(value) {
        setPosition3(value);
        if (value !== "default") {
            dispatch(filterByGenres(value));
        }
    };

    function esrbContent(value) {
        setPosition4(value);
        if (value !== "default") {
            dispatch(orderEsrb(value))
        };
    };

    const onSelectItemm = (value) => {

        setPosition(value)

        switch(value){
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
                    })); 
                break
            case "Lowest_Price":
                dispatch(Orderby((a,b)=>{return a.price - b.price})); break
            default: break;
        };
    }
    const [position, setPosition] = useState("auto");
    const [position2, setPosition2] = useState("auto");
    const [position3, setPosition3] = useState("auto");
    const [position4, setPosition4] = useState("auto");
    
    return (

      <Menu offset={15} closeOnSelect={false} w="200" trigger={triggerProps => {
        return <Pressable {...triggerProps} style={{marginTop: 10}}>
            <MaterialIcons name="tune" size={40} color='gray'/>
        </Pressable>;
        }}>
        <Menu.Group defaultValue="Order By..." title="Order By...">
          <Menu.Item value="order">

            <View style={{width: "100%"}}>
                <Select selectedValue={position} mx={{
                base: 0,
                md: "auto"
                }} onValueChange={nextValue => onSelectItemm(nextValue)} _selectedItem={{
                bg: "cyan.600",
                endIcon: <CheckIcon size={4} />
                }} accessibilityLabel="Select a position for Menu">
                    <Select.Item label="Order by..." value="auto" />
                    <Select.Item label="A-Z" value="A-Z" />
                    <Select.Item label="Z-A" value="Z-A" />
                    <Select.Item label="Highest Rating" value="higher" />
                    <Select.Item label="Lower Rating" value="lower" />
                    <Select.Item label="Highest Price" value="Highest_Price" />
                    <Select.Item label="Lowest Price" value="Lowest_Price" />
                </Select>
            </View>

          </Menu.Item>
        </Menu.Group>

        <Divider mt="3" w="100%" />

        <Menu.Group title="Filter By...">

          <Menu.Item value="Platforms">
            <View style={{width: "100%"}}>
                <Select selectedValue={position2} mx={{
                base: 0,
                md: "auto"
                }} onValueChange={nextValue => handleFilterByPlatforms(nextValue)} _selectedItem={{
                bg: "cyan.600",
                endIcon: <CheckIcon size={4} />
                }} accessibilityLabel="Select a position for Menu">
                    <Select.Item label="Platforms" value="auto" />
                    {platforms.length && platforms.map(e => {
                        return(
                        <Select.Item key={e} label={e} value={e} />
                    )})}
                </Select>
            </View>
          </Menu.Item>

          <Menu.Item value="Genres">
            <View style={{width: "100%"}}>
                <Select selectedValue={position3} mx={{
                base: 0,
                md: "auto"
                }} onValueChange={nextValue => handleFilterByGenre(nextValue)} _selectedItem={{
                bg: "cyan.600",
                endIcon: <CheckIcon size={4} />
                }} accessibilityLabel="Select a position for Menu">
                    <Select.Item label="Genres" value="auto" />
                    {genres.length && genres.map(e => {
                        return(
                        <Select.Item key={e} label={e} value={e} />
                    )})}
                </Select>
            </View>
          </Menu.Item>


          <Menu.Item value="Esrb">
            <View style={{width: "100%"}}>
                <Select selectedValue={position4} mx={{
                base: 0,
                md: "auto"
                }} onValueChange={nextValue => esrbContent(nextValue)} _selectedItem={{
                bg: "cyan.600",
                endIcon: <CheckIcon size={4} />
                }} accessibilityLabel="Select a position for Menu">
                    <Select.Item label="Esrb" value="auto" />
                    {esrb.length && esrb.map(e => {
                        return(
                        <Select.Item key={e} label={e} value={e} />
                    )})}
                </Select>
            </View>
          </Menu.Item>

        </Menu.Group>
      </Menu>
  )
  
}



