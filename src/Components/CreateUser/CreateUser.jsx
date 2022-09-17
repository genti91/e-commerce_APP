import { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import { HelperText, TextInput } from 'react-native-paper';
import { existsUsername, userFormat, validatedFormat, validatedFunctions, findEmail, createNewUser } from "./CreateUserHelper";

export default function CreateUser() {
  const [user, setUser] = useState(userFormat),
  [userGet, setUserNames] = useState({ userExist: false, usernameExists: false }),
  [disabledBtn, setDisabled] = useState(true),
  [isChange, setChange] = useState(validatedFormat),
  [isSubmit, setIsSubmit] = useState(false),
  [validate, setvalidate] = useState(validatedFormat);

function handleChange(e) {
  console.log(e._dispatchInstances.memoizedProps.name)
  console.log(e.nativeEvent.text)
  setUserNames((i) => ({
    ...i, userExist: false, usernameExists: false
  }));
  setChange({
    ...isChange,
    [e._dispatchInstances.memoizedProps.name]: true
  });
  setUser({
    ...user,
    [e._dispatchInstances.memoizedProps.name]: e.nativeEvent.text
  });
  if (e._dispatchInstances.memoizedProps.name === 'username') {
    setvalidate({
      ...validate,
      [e._dispatchInstances.memoizedProps.name]: validatedFunctions.username(e.nativeEvent.text)
    })
  } else if (e._dispatchInstances.memoizedProps.name !== 'cPassword') {
    setvalidate({
      ...validate,
      [e._dispatchInstances.memoizedProps.name]: validatedFunctions[e._dispatchInstances.memoizedProps.name](e.nativeEvent.text)
    })
  }
};

useEffect(() => {
  if (Object.values(validate).includes(false) || userGet.usernameExists || userGet.userExist) {
    setDisabled(true)
  } else {
    setDisabled(false)
  }
}, [user, isChange, userGet.usernameExists])

async function handleSubmit() {
  const response = await existsUsername(user.username);
  if (response) {
    setUserNames((i) => ({ ...i, usernameExists: true }))
    return
  }
  const getUser = await findEmail(user.email);
  if (getUser.user !== undefined && getUser.user === null) {
    await createNewUser(user);
  } else {
    setUserNames((i) => ({ ...i, userExist: true }));
    setDisabled(true);
    return;
  }
  setChange(validatedFormat);
  setUser(userFormat);
  setvalidate(validatedFormat);
  setDisabled(true)
  setIsSubmit(true);
};

  return (
    <View>
      <Text>Create your user account!</Text>

      <TextInput type="email" label="Email" value={user.email} onChange={(e)=>handleChange(e)} name="email" id="email" placeholder="your@email.com"/>
      <HelperText type="error" visible={isChange.email && !validate.email}>
        Email address is invalid!
      </HelperText>
      <HelperText type="error" visible={userGet.userExist}>
        Email Address already exists
      </HelperText>

      <TextInput type="password" onChange={e => handleChange(e)} value={user.password} name="password" id="password" placeholder="Your Password"/>
      <HelperText type="error" visible={isChange.password && !validate.password} >
      Password Must be Contain: number, symbol, uppercase and 8 digits
      </HelperText>

      <TextInput type="password" onChange={e => handleChange(e)} value={user.cPassword} name="cPassword" id="cPassword" placeholder="Confirm password"/>
      <HelperText type="error" visible={isChange.cPassword && user.cPassword !== user.password} >
      Passwords don't match
      </HelperText>

      <TextInput type="text" onChange={(e, name) => handleChange(e, name)} value={user.name} name="name" id="name" placeholder="First name"/>
        <HelperText type="error" visible={isChange.name && !validate.name} >
        Characters Invalid
        </HelperText>

      <TextInput type="text" onChange={e => handleChange(e)} value={user.lastname} name="lastname" id="lastname" placeholder="Last name"/>
        <HelperText type="error" visible={isChange.lastname && !validate.lastname} >
        Characters Invalid
        </HelperText>

      <TextInput type="text" onChange={(e) => handleChange(e)} value={user.username} name="username" id="username" placeholder="Username"/>
        <HelperText type="error" visible={isChange.username && !validate.username} >
        Username Invalid
        </HelperText>
        <HelperText type="error" visible={userGet.usernameExists} >
        Username already exists
        </HelperText>
        <Text>
        All fields are required
        </Text>
        <TouchableHighlight
            style={styles.button}
            onPress={() => handleSubmit()}>
              <View>
                <Text style={styles.textButton}>Create an account</Text>
              </View>
        </TouchableHighlight>
    </View>
  );
}
const styles = StyleSheet.create({

  button : {
      backgroundColor : 'skyblue',
      paddingTop : 15 ,
      paddingBottom : 15,
      margin: 10
  }
})