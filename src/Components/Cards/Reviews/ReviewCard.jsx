import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { useDispatch } from 'react-redux';
import { Avatar } from "native-base";

const {width} = Dimensions.get('window');
const SPACING = 5;

export default function ReviewCard({review}) {

    let dispatch = useDispatch()


  return (
    <View style={{width: width-40}}>
        <View style={styles.reveiwContainer}>
            <View style={{flexDirection: 'row',}}>
                <Avatar bg="gray.500" source={{uri: review.profile_pic}}/>
                <View style={{maxWidth: 227, marginLeft: 10}}>
                    <Text style={{marginBottom: 5, fontWeight: 'bold'}}>{review.username}</Text>
                    <Text>{review.description}</Text>
                    <View style={{flexDirection: 'row', marginTop: 5}}>
                    <Text style={{fontWeight: 'bold'}}>Rating:  </Text>
                    <Text>{review.rating}</Text>
                    </View>
                </View>
            </View>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
    reveiwContainer: {
        padding: 10,
        marginHorizontal: SPACING * 2,
        borderRadius: 10,
    }
})