import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Input, FormControl, WarningOutlineIcon, useToast, Box } from "native-base";
import { useEffect, useState } from 'react';
import { getUserOrders, PostReview } from '../../redux/actions';
const {REACT_APP_URL} = process.env;
import axios from 'axios';


function validate(input, productOwned){
    let error={};
    if (productOwned) {   
        if(!input.description || input.description.length > 255) error.description ="Description required with no more than 256 characters"
        if(!input.rating || input.rating < 0 || input.rating > 100 || isNaN(input.rating))error.rating = "1 - 100"
    }
    return error
};


export default function ReviewBox({productId, reviews, setReviews}) {
    let user = useSelector(state => state.users);
    let userOrders = useSelector(state => state.userOrders);
    var username;
    var user_id;
    var profile_pic;
    if (user.user) {
        user_id = user.user.id;
        username = user.user.username;
        profile_pic = user.user.profile_pic;
    }
    const [activeSubmit, SetactiveSubmit] = useState(true);
    const [productOwned, SetProductOwned] = useState(false);
    const [userReviews, setUserReviews] = useState([]);
    const [reviewed, setReviewed] = useState(false);

    const toast = useToast();

    let [input , setInput] = useState({
        rating:"",
        description:"",
        user_id: user_id,
        productId: productId,
        profile_pic: profile_pic,
        username: username,
    });
    let [error, setError] = useState({});
    let dispatch = useDispatch();

    useEffect(()=>{
        if (productOwned && !reviewed) {   
            const llaves = Object.keys(input)
            for (const key of llaves) {
                if (input[key] && !error[key]) { //si hay input y no hay errores --false
                    SetactiveSubmit(false)
                }else {
                    SetactiveSubmit(true)
                    break;
                };
            };
        }
    }, [input, error])

    function handleRating (e){
        setInput({
            ...input,
            rating:e,
        });
        setError(validate({
            ...input,
            rating: e
        }, productOwned))
    };
    function handleDescription (e){
        setInput({
            ...input,
            description:e,
        });
        setError(validate({
            ...input,
            description: e
        }, productOwned))
    };
    useEffect(() => {
        if (user.user) {
            dispatch(getUserOrders(user_id))
        }
    }, []);
    useEffect(() => {
        userOrders.forEach(e => {
            if (e.game_id === productId) {
                SetProductOwned(true);
            }
        });
    }, [userOrders]);
    useEffect(() => {
        if (reviews) {
            setTimeout(() => {
                axios.get(`${REACT_APP_URL}reviews?user_id=${user_id}`)
                .then(res => setUserReviews(res.data.filter((e)=> !e.reported)))
                .catch(err => console.log(err))
            }, 500);
        }
    }, [user,reviews])

    useEffect(() => {
        if (reviews && userReviews) {
            userReviews.forEach(e => {
                if (e.productId === productId) {
                    setReviewed(true)
                }
            })
        }
    }, [userReviews,reviews])

    function handlerSubmit(){
        dispatch(PostReview(input));
        console.log("review enviado");
        setReviews([...reviews,...[input]])
        toast.show({
            render: () => {
                return <Box bg="emerald.500" px="2" py="1" rounded="sm" mb={5}>
                        Review Posted Succesfully!
                    </Box>;
            }
        })
        setInput({
            rating:"",
            description:"",
            user_id: user_id,
            productId: productId,
            username: username,
        })
    };


  return (
    <View style={styles.container}>

        <Text style={{fontSize: 14, fontWeight: 'bold', borderBottomWidth: 1}}>Leave us your review here!</Text>
    
        <FormControl isInvalid={error.rating} w="75%" maxW="300px">
        <FormControl.Label>Rating:</FormControl.Label>
        <Input onChangeText={(e) => handleRating(e)} placeholder="Enter a number between 1 and 100" value={input.rating}/>
        <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
          Rating must be between 1 and 100.
        </FormControl.ErrorMessage>
        </FormControl>

        <FormControl isInvalid={error.description} w="75%" maxW="300px">
        <FormControl.Label>Review:</FormControl.Label>
        <Input onChangeText={(e) => handleDescription(e)} placeholder="Write your review here" value={input.description}/>
        <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
            Description required and must be less than 256 characters.
        </FormControl.ErrorMessage>
        </FormControl>

        <TouchableHighlight
          style={styles.button}
          disabled={activeSubmit}
          onPress={e => handlerSubmit()}
        >
          <Text style={styles.textButton}>POST REVIEW</Text>
        </TouchableHighlight>

        { !productOwned ? <Text style={styles.warning}>You must own the product to review</Text> : null }
        { reviewed ? <Text style={styles.warning}>You already reviewed this game</Text> : null }

    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#e8e8e8',
        marginRight: 10,
        marginLeft: 10,
        padding: 10,
        marginTop: 10,
        borderRadius: 10,
        borderColor: '#c7d1d6',
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        marginBottom:5
    },
    button: {
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 7,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: '#c7d1d6',
        width: 145,
        marginBottom: 5,
    },
    textButton: {
        fontSize: 12,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'black',
    },
    warning: {
        fontSize: 11,
    }
})