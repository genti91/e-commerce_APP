import { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import { existsUsername, userFormat, validatedFormat, validatedFunctions, findEmail, createNewUser } from "./CreateUserHelper";
import { Input, FormControl, WarningOutlineIcon, Box, Button, useToast } from "native-base";
import { useNavigation } from '@react-navigation/native';

export default function CreateUser() {

  const toast = useToast();
  const [user, setUser] = useState(userFormat),
  [userGet, setUserNames] = useState({ userExist: false, usernameExists: false }),
  [disabledBtn, setDisabled] = useState(true),
  [isChange, setChange] = useState(validatedFormat),
  [isSubmit, setIsSubmit] = useState(false),
  [validate, setvalidate] = useState(validatedFormat);

  const navigation = useNavigation();

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
  console.log(getUser)
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
  toast.show({
    render: () => {
        return <Box bg="emerald.500" px="2" py="1" rounded="sm" mb={5}>
                Account created succesfully!
            </Box>;
    }
  })
  navigation.navigate('Login')
};

  return (
    <ScrollView>

      <Box style={{marginTop: 30}} alignItems="center">

        <FormControl w="75%" maxW="300px">
          <FormControl.Label>Email</FormControl.Label>
          <Input type="email" label="Email" value={user.email} onChange={(e)=>handleChange(e)} name="email" id="email" placeholder="your@email.com" />
          <FormControl.ErrorMessage isInvalid={isChange.email && !validate.email} leftIcon={<WarningOutlineIcon size="xs" />}>
              Email address is invalid!
          </FormControl.ErrorMessage>
          <FormControl.ErrorMessage isInvalid={userGet.userExist} leftIcon={<WarningOutlineIcon size="xs" />}>
            Email Address already exists.
          </FormControl.ErrorMessage>
        </FormControl>

        <FormControl isInvalid={isChange.password && !validate.password} w="75%" maxW="300px">
          <FormControl.Label>Password</FormControl.Label>
          <Input type="password" onChange={e => handleChange(e)} value={user.password} name="password" id="password" placeholder="your password"/>
          <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
            Password Must be Contain: number, symbol, uppercase and 8 digits.
          </FormControl.ErrorMessage>
        </FormControl>

        <FormControl isInvalid={isChange.cPassword && user.cPassword !== user.password} w="75%" maxW="300px">
          <FormControl.Label>Confirm password</FormControl.Label>
          <Input type="password" onChange={e => handleChange(e)} value={user.cPassword} name="cPassword" id="cPassword" placeholder="enter password" />
          <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
            Passwords don't match.
          </FormControl.ErrorMessage>
        </FormControl>


        <FormControl isInvalid={isChange.name && !validate.name} w="75%" maxW="300px">
          <FormControl.Label>First name</FormControl.Label>
          <Input type="text" onChange={(e, name) => handleChange(e, name)} value={user.name} name="name" id="name" placeholder="name" />
          <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
            Characters Invalid.
          </FormControl.ErrorMessage>
        </FormControl>


        <FormControl isInvalid={isChange.lastname && !validate.lastname} w="75%" maxW="300px">
          <FormControl.Label>Last name</FormControl.Label>
          <Input type="text" onChange={e => handleChange(e)} value={user.lastname} name="lastname" id="lastname" placeholder="last name"/>
          <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
            Characters Invalid.
          </FormControl.ErrorMessage>
        </FormControl>


        <FormControl w="75%" maxW="300px">
          <FormControl.Label>Username</FormControl.Label>
          <Input type="text" onChange={(e) => handleChange(e)} value={user.username} name="username" id="username" placeholder="username"/>
          <FormControl.ErrorMessage isInvalid={isChange.username && !validate.username} leftIcon={<WarningOutlineIcon size="xs" />}>
            Username Invalid.
          </FormControl.ErrorMessage>
          <FormControl.ErrorMessage isInvalid={userGet.usernameExists} leftIcon={<WarningOutlineIcon size="xs" />}>
            Username already exists.
          </FormControl.ErrorMessage>
        </FormControl>

        <Button style={{width: '75%', marginTop: 25}} disabled={disabledBtn} onPress={(e) => handleSubmit(e)}>Submit</Button>

      </Box>

    </ScrollView>
  );
}