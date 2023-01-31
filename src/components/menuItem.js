import { StyleSheet, Text, View, TouchableOpacity, Dimensions,Image} from 'react-native'
import React from 'react';
import Images from '../../Images/images';

const sh = Dimensions.get('window').height;
const sw = Dimensions.get('window').width;

const MenuItem = (props) => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View style={styles.menuStyle}>
        <View style={{flexDirection:'column'}}>
            <Text style={{color:'#000',fontWeight:'bold'}}>{props.title}</Text>
            <Text style={{color:'#000'}}>{props.desc}</Text>
        </View>
        <Image style={{height:24,width:24,tintColor:'#6231cc'}} source={Images.right_arrow}/>
      </View>
    </TouchableOpacity>
  )
}

export default MenuItem;

const styles = StyleSheet.create({
    menuStyle : {
        width:'100%',
        height:sh*0.05,
        display:'flex',
        flexDirection:'row',
        marginVertical:8,
        justifyContent:'space-between'
    }
})