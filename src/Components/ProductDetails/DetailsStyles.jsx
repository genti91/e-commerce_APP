import { StyleSheet } from 'react-native';

const SPACING = 5;
const BORDER_RADIUS = 10;

export default StyleSheet.create({
    container: {},
    itemContent: {
      marginHorizontal: SPACING * 2,
      alignItems: 'center',
      backgroundColor: 'white',
      borderRadius: BORDER_RADIUS + SPACING * 2,
    },
    itemText: {
      fontSize: 24,
      position: 'absolute',
      bottom: SPACING * 2,
      right: SPACING * 2,
      color: 'white',
      fontWeight: '600',
    },
    itemImage: {
      width: '100%',
      height: 200,
      borderRadius: BORDER_RADIUS,
      resizeMode: 'cover',
    },
    name: {
      textAlign: 'center',
      fontSize: 40
    },
    btnContainer: {
  
    },
    button: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 7,
      paddingHorizontal: 32,
      borderRadius: 4,
      elevation: 3,
      backgroundColor: 'black',
      width: 176,
      marginBottom: 5,
    },
    textButton: {
      fontSize: 14,
      fontWeight: 'bold',
      letterSpacing: 0.25,
      color: 'white',
    },
    descriptionContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
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
    description: {
      fontSize: 15
    },
    price: {
      fontSize: 30,
      fontWeight: 'bold',
      marginRight: 50
    },
  });
