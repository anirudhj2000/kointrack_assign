import { StyleSheet, Text, View, Dimensions,Image} from 'react-native'
import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Images from '../../Images/images';

const sh = Dimensions.get('window').height;
const sw = Dimensions.get('window').width;

const SearchItem = (props) => {
  return (
    <TouchableOpacity onPress={props.onPress} style={styles.card}>
        <Image source={Images.house} style={{marginHorizontal:'5%',height:24,width:24}}/>
        <View>
            <Text style={{color:'#000',fontSize:18,marginHorizontal:'2.5%'}}>{props.name}</Text>
            <View style={{display:'flex',flexDirection:'row',alignItems:'center',marginHorizontal:'2.5%'}}>
                <Text>{props.city}</Text>
                { props.gender &&
                    <Text style={{marginHorizontal:'5%',borderRadius:4,paddingHorizontal:4,backgroundColor:'#888888'}}>{props.gender}</Text>
                }  
            </View>
        </View>
        
    </TouchableOpacity>
  )
}

export default SearchItem;

const styles = StyleSheet.create({
    card: {
        width:'95%',
        alignSelf:'center',
        height:sh*0.07,
        display:'flex',
        flexDirection:'row',
        marginHorizontal:'5%',
        marginVertical:'2%',
        borderWidth:1,
        alignItems:'center',
        borderRadius:8,
        borderColor:'#c7c7c7'
    }
})