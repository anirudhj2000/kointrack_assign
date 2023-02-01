import { StyleSheet, Text, View,Image,TouchableOpacity,Dimensions, ImageBackground} from 'react-native'
import React from 'react'
import Images from '../../Images/images';

const sh = Dimensions.get('window').height;
const sw = Dimensions.get('window').width;

const PropertyCard = (props) => {
  return (
    <TouchableOpacity onPress={props.onPress}>
        <View style={[styles.cardStyle,props.style]}>
        {
            props.gender && 
            <ImageBackground source={props.source} style={{width:'100%',height:sh*0.095}}>
                <Text style={{bottom:0,position:'absolute',color:'#fff',padding:4,backgroundColor:'rgba(0,0,0,0.6)',borderRadius:4,fontSize:8,margin:8}}>{props.gender}</Text>
            </ImageBackground>
        }
            <Text style={{fontSize:14,fontWeight:'bold',marginHorizontal:4}}>{props.title}</Text>
            <Text style={{fontSize:10,marginHorizontal:4,marginTop:4}}>{props.city}</Text>
            <View style={{borderBottomWidth:1,width:'95%',borderBottomColor:'#ababab',alignSelf:'center',marginVertical:4}} />
            <View style={{display:'flex',flexDirection:'column'}}>
                    <Text style={{color:'#000',fontSize:10,marginHorizontal:4}}>Monthly Rent</Text>
                    <Text style={{fontSize:14,marginHorizontal:4,color:'#000'}}>₹{props.rentMin} <Text style={{fontSize:10}}>onwards</Text></Text>
            </View>
        </View>
    </TouchableOpacity>
  )
}

export default PropertyCard

const styles = StyleSheet.create({
    cardStyle : {
        width: sw*0.4,
        height:sh*0.2,
        marginRight:16,
        backgroundColor:'#e0e0e0',
        borderRadius:4,
        overflow:'hidden',
        flexDirection:'column'
    }
})