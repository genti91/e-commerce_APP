import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleSheet, Text, View,TouchableHighlight, Image} from 'react-native';
import { resetUser } from '../../redux/actions';
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { existsUsername, userFormat, validatedFormat, validatedFunctions, findEmail, editUser } from "./UserProfileHelper";
//import NoWorkResult from "postcss/lib/no-work-result";
import { getUsers, putUser } from "../../redux/actions";
import { TouchableOpacity } from 'react-native-gesture-handler';
import { HelperText, TextInput } from 'react-native-paper';
//import bcrypt from 'bcryptjs'




export default function UserProfile() {
    
let dispatch = useDispatch()
let actualUser = useSelector(state => state.users.user)
const [changeToInput, setChangeToInput] = useState({})
console.log(actualUser)

const [user, setUser] = useState(actualUser),
    [userGet, setUserNames] = useState({ userExist: false, usernameExists: false }),
    [disabledBtn, setDisabled] = useState(true),
    [isChange, setChange] = useState(validatedFormat),
    [isSubmit, setIsSubmit] = useState(false),
    [validate, setvalidate] = useState(validatedFormat);

async function handleLogout(e) {
        try{
            await AsyncStorage.clear();
            dispatch(resetUser());
        }catch(err){
            console.log(err)
        }
    }

async function handleSubmit(e) {
        e.preventDefault()
        //manda "user" al back
        await editUser(user)
    
        //manda "user" a redux
        dispatch(putUser(user))
    }

// let userState = useSelector(state => state.user)


function handleChange(e) {
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

// useEffect(() => {
//     const token = window.sessionStorage.getItem('token');
//     token && (user === undefined) && dispatch(getUsers(token));
//     console.log("🚀 ~ file: UserProfile.jsx ~ line 101 ~ useEffect ~ token", token)
// }, [user, dispatch])

useEffect(() => {
    if (Object.values(validate).includes(false) || userGet.usernameExists || userGet.userExist) {
        setDisabled(true)
    } else {
        setDisabled(false)
    }
}, [user, isChange, userGet.usernameExists])

async function handleSubmit(e) {
    if (user !== undefined) {
        const response = await existsUsername(user.username);
        if (response) {
            setUserNames((i) => ({ ...i, usernameExists: true }))
            return
        }
        const getUser = await findEmail(user?.email);
        if (getUser) {
            setUserNames((i) => ({ ...i, userExist: true }));
            return
        } else if (!getUser) {
            await createNewUser(user)
        } else {
            setDisabled(true)
            setvalidate({
                ...validate,
                email: false
            });
        }
        setChange(validatedFormat);
        setUser(userFormat);
        setvalidate(validatedFormat);
        setDisabled(true)
        setIsSubmit(true);
        setChangeToInput({})
    }
};





//botón cloudinary
// let [path, setPath] = useState("");
// function showWidget() {

//     let widget = window.cloudinary.openUploadWidget({
//         cloudName: `vgpf`,
//         uploadPreset: `videogamespf`,
//         sources: ['local', 'url']
//     }, (error, result) => {
//         // console.log("----------------------------------------ERROR")
//         // console.log(error)
//         // console.log("----------------------------------------RESULT")
//         // console.log(result.event)
//         // console.log(result.info)
//         if (!error && result.event === "success") {
//             // setPath(result.info.url)
//             // user.profile_pic = path
//             setUser((i) => ({ ...i, profile_pic: result.info.url }))
//         }
//     });

//     widget.open()
// };




//comprobación de passwords
// let [oldPassword, setOldPassword] = useState("")
// let [newPassword, setNewPassword] = useState("")
// let [confirmNewPassword, setConfirmNewPassword] = useState("")

// async function handlePasswordChange(e) {

//     let oldPass = await bcrypt.compare(oldPassword, user.password)
//     console.log(" 🚀 ~ file: UserProfile.jsx ~ line 164 ~ handlePasswordChange ~ oldPass", oldPass)
//     let confirmation = validatedFunctions.password(newPassword)
//     let newConfirmedPass = "";
//     if (oldPass === true) {
//         if (newPassword !== "" && confirmNewPassword !== "") {
//             if (confirmation) {
//                 if (newPassword === confirmNewPassword) {
//                     let hashedPassword = bcrypt.hashSync(newPassword, process.env.REACT_APP_KEY_SALT)
//                     newConfirmedPass = hashedPassword
//                 }
//             }
//         }
//     }
//     if (confirmation && newConfirmedPass !== "") {
//         user.password = newConfirmedPass
//     }
// }
// let [disabledEmail, setDisabledEmail] = useState(true)
// let [disabledOldPassword, setDisabledOldPassword] = useState(true)
// let [disabledNewPassword, setDisabledNewPassword] = useState(true)
// let [disabledConfirmNewPassword, setDisabledConfirmNewPassword] = useState(true)
// let [disabledName, setDisabledName] = useState(true)
// let [disabledLastname, setDisabledLastname] = useState(true)
// let [disabledUsername, setDisabledUsername] = useState(true)





  return (
//         <h3>Edit Your Profile</h3>
//         <form onSubmit={(e) => handleSubmit(e)} method='post'>
//             <div class="relative z-0 mb-6 w-full group">

//                 <button class={'form-control'} onClick={showWidget}> Upload Image </button>
//                 <img src={user.profile_pic} id={"uploadedImage"} alt={"selectedPic"} onClick={() => setPath("")} />
//             </div>

//             {/* E-MAIL */}
//             <div class="relative z-0 mb-6 w-full group">
//                 <small onClick={(e) => setDisabledEmail(!disabledEmail)}
//                     for="exampleInputEmail1"
//                     class="form-label">E-Mail:
//                 </small>

//                 <input type="email"
//                     onChange={e => handleChange(e)}
//                     // value={}
//                     name="email"
//                     id="email"
//                     class={`form-control ${isChange.email && !validate.email && "is-invalid"}`}
//                     placeholder={`${actualUser && actualUser.email}`}
//                     required=""

//                     disabled={disabledEmail} />

//                 {isChange.email && !validate.email && <small>Email Address is incorrect</small>}
//                 {userGet.userExist && <small>Email Address already exists</small>}
//             </div>

//             {/* OLD PASSWORD */}
//             <div class="relative z-0 mb-6 w-full group">
//                 <small onClick={(e) => setDisabledOldPassword(!disabledOldPassword)} for="password" class="form-label">Old Password</small><br />

//                 <input type="password"
//                     onChange={e => { setOldPassword(e.target.value); handlePasswordChange(e) }}
//                     value={oldPassword}
//                     name="oldpassword" id="password"
//                     class={`form-control ${isChange.password && !validate.password && "is-invalid"}`}
//                     placeholder="Old Password"
//                     required=""
//                     disabled={disabledOldPassword} />

//                 {isChange.password && !validate.password && <small>Password Must be Contain: number, symbol, uppercase and 8 digits</small>}
//             </div>

//             {/* NEW PASSWORD */}
//             <div class="relative z-0 mb-6 w-full group">
//                 <small onClick={(e) => setDisabledNewPassword(!disabledNewPassword)} for="password" class="form-label">New Password</small><br />

//                 <input type="password"
//                     onChange={e => { setNewPassword(e.target.value); handlePasswordChange(e) }}
//                     value={newPassword}
//                     name="password"
//                     id="password"
//                     class={`form-control ${isChange.password && !validate.password(newPassword) && "is-invalid"}`}
//                     placeholder="New Password"
//                     required=""
//                     disabled={disabledNewPassword} />

//                 {isChange.password && !validate.password && <small>Password Must be Contain: number, symbol, uppercase and 8 digits</small>}
//             </div>

//             {/* CONFIRM NEW PASSWORD */}
//             <div class="relative z-0 mb-6 w-full group">
//                 <small onClick={(e) => setDisabledConfirmNewPassword(!disabledConfirmNewPassword)} for="confirm password" class="form-label">Confirm New Password</small>

//                 <input class={`form-control ${isChange.cPassword && user.cPassword !== user.password && "is-invalid"}`}
//                     type="password"
//                     onChange={e => { setConfirmNewPassword(e.target.value); handlePasswordChange(e) }}
//                     value={confirmNewPassword}
//                     name="cPassword"
//                     id="cPassword"
//                     placeholder="Confirm New password"
//                     required=""
//                     disabled={disabledConfirmNewPassword} />

//                 {isChange.cPassword && user.cPassword !== user.password && <small>Passwords don't match</small>}
//             </div>

//             {/* NAME */}
//             <div class="grid md:grid-cols-2 md:gap-6">
//                 <div class="relative z-0 mb-6 w-full group">
//                     <small onClick={(e) => setDisabledName(!disabledName)} for="name" class="form-label">Name</small><br />

//                     <input class={`form-control ${isChange.name && !validate.name && "is-invalid"}`}
//                         type="text"
//                         onChange={e => handleChange(e)}
//                         // value={actualUser && actualUser.name}
//                         name="name"
//                         id="name"
//                         placeholder={`${actualUser && actualUser.name}`}
//                         required=""
//                         disabled={disabledName} />

//                     {isChange.name && !validate.name && <small>Characters Invalid</small>}
//                 </div>

//                 {/* LASTNAME */}
//                 <div class="relative z-0 mb-6 w-full group">
//                     <small onClick={(e) => setDisabledLastname(!disabledLastname)} for="lastname" class="form-label">Lastname</small><br />

//                     <input class={`form-control ${isChange.lastname && !validate.lastname && "is-invalid"}`}
//                         type="text"
//                         onChange={e => handleChange(e)}
//                         // value={actualUser && actualUser.lastname}
//                         name="lastname"
//                         id="lastname"
//                         placeholder={`${actualUser && actualUser.lastname}`}
//                         required=""
//                         disabled={disabledLastname} />

//                     {isChange.lastname && !validate.lastname && <small>Characters Invalid</small>}
//                 </div>

//                 {/* USERNAME */}
//                 <div class="relative z-0 mb-6 w-full group">
//                     <small onClick={(e) => setDisabledUsername(!disabledUsername)} for="username" class="form-label">Username:  </small>

//                     <input type="text"
//                         onChange={(e) => handleChange(e)}
//                         // value={actualUser && actualUser.username}
//                         name="username"
//                         id="username"
//                         class={`form-control ${isChange.username && !validate.username && "is-invalid"}`}
//                         placeholder={`${actualUser && actualUser.username}`}
//                         required=""
//                         disabled={disabledUsername} />

//                     {isChange.username && !validate.username && <small>Username Invalid</small>}
//                     {userGet.usernameExists && <small>Username already exists</small>}
//                 </div>
//             </div>
//             {/* <div>All fields are required</div> */}

//             {/* SUBMIT BUTTON */}
//             <button type="submit" class="btn btn-primary" >Submit</button>
//         </form>
//     </div>
// </div>





    <View style={styles.container}>
        <Image style={styles.image} source={{uri: actualUser.profile_pic}}/>
        <Text>Email</Text>
       { changeToInput.email? 
        <View>
            <TextInput onChange={e => handleChange(e)} type="email" value={user.email} name="email" id="email" placeholder={`${actualUser && actualUser.email}`}/>
            {/* <HelperText type="error" visible={isChange.username && !validate.username} >
            Username Invalid
            </HelperText> */}
        </View>
       :<View>
        <Text>{actualUser.email}</Text>
        <TouchableHighlight
            style={styles.button}
            onPress={()=> setChangeToInput({...changeToInput, email: true})}
        >
            <Text style={styles.textButton}>Change your email</Text>
        </TouchableHighlight>
        </View>
        }
        <Text>Name</Text>
        {
            changeToInput.name?
            <View>
            <TextInput onChange={(e)=>handleChange(e)} value={actualUser.name} name="name" id="name" placeholder={`${actualUser && actualUser.name}`}/>
            {/* <HelperText type="error" visible={isChange.name && !validate.name} >
            Username Invalid
            </HelperText> */}
        </View>
            :
            <View>
        <Text>{actualUser.name}</Text>
        <TouchableHighlight
            style={styles.button}
            onPress={()=> setChangeToInput({...changeToInput, name: true})}
        >
            <Text style={styles.textButton}>Change your name</Text>
        </TouchableHighlight>
        </View>
        }
        <Text>Lastname</Text>
        {
            changeToInput.lastname?
            <View>
            <TextInput onChange={(e)=>handleChange(e)} value={actualUser.lastname} name="lastname" id="lastname" placeholder={`${actualUser && actualUser.lastname}`}/>
            {/* <HelperText type="error" visible={isChange.name && !validate.name} >
            Username Invalid
            </HelperText> */}
            </View>
            :
            <View>
            <Text>{actualUser.lastname}</Text>
                <TouchableHighlight
                    style={styles.button}
                    onPress={()=> setChangeToInput({...changeToInput, lastname: true})} >
                <Text style={styles.textButton}>Change your lastname</Text>
                </TouchableHighlight>
            </View>
        }
        <Text>Username</Text>
        {
            changeToInput.username?
            <View>
            <TextInput onChange={(e)=>handleChange(e)} value={actualUser.username} name="username" id="username" placeholder={`${actualUser && actualUser.username}`}/>
            {/* <HelperText type="error" visible={isChange.name && !validate.name} >
            Username Invalid
            </HelperText> */}
            </View>
            :
            <View>
            <Text>{actualUser.username}</Text>
                <TouchableHighlight
                    style={styles.button}
                    onPress={()=> setChangeToInput({...changeToInput, username: true})} >
                <Text style={styles.textButton}>Change your username</Text>
                </TouchableHighlight>
            </View>
        }
        <View>
        {   changeToInput.email || changeToInput.name || changeToInput.lastname || changeToInput.username ?
            <View>
                <TouchableHighlight
                style={styles.button}
                onPress={() => setChangeToInput({})}>
                <Text style={styles.textButton}>Cancel changes</Text>
                 </TouchableHighlight>
                 <TouchableHighlight
                style={styles.button}
                onPress={(e) => handleSubmit(e)}>
                <Text style={styles.textButton}>Submit changes</Text>
                 </TouchableHighlight>
            </View>
            : <TouchableHighlight
                style={styles.button}
                onPress={(e) => handleLogout(e)}>
                <Text style={styles.textButton}>Logout</Text>
            </TouchableHighlight>
        }
        </View>
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
        justifyContent: "center"
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
    },
    image: {
        height: '30%',
        width: 200,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        alignContent: "center",
        justifyContent: "center"
    }
})