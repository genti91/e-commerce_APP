import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableHighlight } from 'react-native';
import React, { useEffect } from 'react'
import { useState } from "react";
import { useDispatch } from "react-redux";
//import gLogo from './btn_google.svg'
import { postUsers } from "./LoginHelper";
import { findEmail } from "../CreateUser/CreateUserHelper";
import { useSelector } from "react-redux";
import { getUsers } from "../../redux/actions";
const { REACT_APP_URL } = process.env;
//const REACT_APP_URL = 'http://192.168.0.98:3001/'

export default function LoginRN() {

    const [user, setUser] = useState({ username: "", password: "" }),
    [userGet, setUserGet] = useState({ userNExists: false, failedLog: false, userBan: false, isVerified: false }),
    [disabled, setDisabled] = useState(true),
    dispatch = useDispatch()
    let usuario = useSelector(state=>state.users);

  const { userAuth } = useSelector(state => {
    return { userAuth: state.users }
  })

  useEffect(() => {
    if (user.username && user.password) {
      setDisabled(false)
    } else {
      setDisabled(true)
    }
  }, [user])

  function handleEmail(e) {
    setUser({ ...user, ['username']: e })
    setUserGet((i) => ({ ...i, userNExists: false, userBan: false, isVerified: false }))
  }

  function handlePassword(e) {
    setUser({ ...user, ['password']: e })
    setUserGet((i) => ({ ...i, failedLog: false }))
  }

  async function handleSubmit(e) {
    console.log('user: ', user)
    try{
    const userExist = await findEmail(user.username);
    console.log('userExist: ', userExist)
    if (userExist.user === null) {
      setUserGet((i) => ({ ...i, userNExists: true }));
    } 
      else if (userExist.isBanned) {
      setUserGet((i) => ({ ...i, userBan: true }));
    // } else if (!userExist.isVerified) {
    //   setUserGet((i) => ({ ...i, isVerified: true }));
    } else {
        try{
            const info = await postUsers(user);
            console.log('info: ', info)
            info.message?.search('login') && setUserGet((i) => ({ ...i, failedLog: true }));
            info.token && dispatch(getUsers(info.token)) && window.sessionStorage.setItem('token', info.token);
        }catch(err){
            console.log("err postUsers: ", err)
        }
    }
    }catch(err){
        console.log(err)
    }
  }


  return (
    <View style={styles.container}>
        <Text style={styles.title}>Login</Text>
        <TextInput 
            style={styles.input}
            placeholder="Email"
            name="username"
            type="email"
            id="username"
            value={user.username}
            onChangeText={(e) => handleEmail(e)}
        />
        <TextInput
            secureTextEntry={true}
            style={styles.input}
            placeholder="Password"
            name="password"
            type="password"
            id="password"
            value={user.password}
            onChangeText={(e) => handlePassword(e)}
        />
        <TouchableHighlight
            style={styles.button}
            onPress={(e) => handleSubmit(e)}
        >
            <Text style={styles.textButton}>Login</Text>
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
        paddingRight: 15,
        justifyContent: 'center'
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