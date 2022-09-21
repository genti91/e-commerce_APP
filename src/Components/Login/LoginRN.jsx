import { StyleSheet, Text, View, Linking } from 'react-native';
import React, { useEffect } from 'react'
import { useState } from "react";
import { useDispatch } from "react-redux";
//import gLogo from './btn_google.svg'
import { postUsers } from "./LoginHelper";
import { findEmail } from "../CreateUser/CreateUserHelper";
import { useSelector } from "react-redux";
import { getUsers } from "../../redux/actions";
import { useNavigation } from '@react-navigation/native';
import { Input, Stack, Pressable, Icon, Button, Image, WarningOutlineIcon, FormControl } from "native-base";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default function LoginRN() {
  const navigation = useNavigation();
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
    try{
    const userExist = await findEmail(user.username);
    if (userExist.user === null) {
      setUserGet((i) => ({ ...i, userNExists: true }));
    } 
      else if (userExist.isBanned) {
      setUserGet((i) => ({ ...i, userBan: true }));
    // } else if (!userExist.isVerified) {
    //   setUserGet((i) => ({ ...i, isVerified: true }));
    } else {
      const info = await postUsers(user);
      info.message?.search('login') && setUserGet((i) => ({ ...i, failedLog: true }));
      info.token && dispatch(getUsers(info.token)) && window.sessionStorage.setItem('token', info.token);
        
    }
    }catch(err){
        console.log(err)
    }
  }
  const [show, setShow] = useState(false);

  return (
    <View style={styles.container}>



        <Stack space={4} w="100%" alignItems="center">

        <Image source={require('../../../logo.png')
        } alt="" size="xl" />

          <Text style={styles.title}>Login</Text>
          
          <FormControl w={{base: "75%",md: "25%"}} >
            <Input 
            InputLeftElement={<Icon as={<MaterialIcons name="person" />} size={5} ml="2" color="muted.400" />} 
            placeholder="Email"
            value={user.username}
            onChangeText={(e) => handleEmail(e)}
            />
            <FormControl.ErrorMessage isInvalid={userGet.userNExists} leftIcon={<WarningOutlineIcon size="xs" />}>
              Email address invalid
            </FormControl.ErrorMessage>
            <FormControl.ErrorMessage isInvalid={userGet.userBan} leftIcon={<WarningOutlineIcon size="xs" />}>
              Email address is banned
            </FormControl.ErrorMessage>
            <FormControl.ErrorMessage isInvalid={userGet.isVerified} leftIcon={<WarningOutlineIcon size="xs" />}>
              Email address not verified
            </FormControl.ErrorMessage>
          </FormControl>

          <FormControl w={{base: "75%",md: "25%"}} >
          <Input
            type={show ? "text" : "password"} 
            InputRightElement={
              <Pressable onPress={() => setShow(!show)}>
                <Icon as={<MaterialIcons name={show ? "visibility" : "visibility-off"} />} 
                size={5} mr="2" color="muted.400" />
              </Pressable>
            } 
            placeholder="Password"
            value={user.password}
            onChangeText={(e) => handlePassword(e)}
            />
            <FormControl.ErrorMessage isInvalid={userGet.failedLog} leftIcon={<WarningOutlineIcon size="xs" />}>
              Password is invalid
            </FormControl.ErrorMessage>
          </FormControl>

          <Button style={{width: '75%'}} onPress={(e) => handleSubmit(e)}>Login</Button>

          <Button style={{width: '75%'}} onPress={() => navigation.navigate('Create Account')}>Create an account</Button>

          <Button style={{width: '75%'}} size="sm" variant="link" onPress={async (e) => {
            await Linking.openURL('https://e-commerce-videogames.vercel.app/restore');
          }}>
            Forgot your password?
          </Button>

        </Stack>

    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingLeft: 15,
        paddingRight: 15,
        justifyContent: 'center'
    },
    button : {
        backgroundColor : 'skyblue',
        paddingTop : 15 ,
        paddingBottom : 15,
        margin: 10
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