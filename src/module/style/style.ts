import { StyleSheet } from 'react-native';

export const globalStyle = StyleSheet.create({
  screen: {
    flex: 1,
  },
  cardItem:{
    borderRadius:8,
    backgroundColor:'lightgray',
    padding:8,
    marginVertical:8,
    marginHorizontal:8
  },
  cardRow:{
    flex:1,
    flexDirection:'row',
    justifyContent:"flex-start",
    alignItems:'center'
  },
  titleStyle:{
    fontSize:15
  },  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderColor:'lightgrey',
    borderRadius:8
  },

});
