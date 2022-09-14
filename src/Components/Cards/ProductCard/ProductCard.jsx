import * as React from 'react';
import { Text, View,  Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function ProductCard({item}) {
	const navigation = useNavigation();

  return (
    <TouchableOpacity 
			style={styles.container}
			onPress={() => navigation.navigate('Detail', {...item})}
	>
			<Image 
				style={styles.image}
                source={{uri: item.background_image}}
                resizeMode={'cover'}
			/>
      <Text style={styles.text}>{item.name}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor:'#ccc',
        marginBottom: 10,
        width: '100%',
        height: 100,
    },
    image: {
        height: 60,
        width: 100,
        marginTop: 10,
        marginLeft: 10
    },
    text: {
        marginLeft: 5
    }
  });