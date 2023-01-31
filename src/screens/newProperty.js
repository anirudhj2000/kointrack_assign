import { StyleSheet, Text, View, TextInput, Touchable, TouchableOpacity, Image, Dimensions, ScrollView } from 'react-native'
import React,{useState, useEffect, useReducer} from 'react'
import Images from '../../Images/images'

const sh = Dimensions.get('window').height;
const sw = Dimensions.get('window').width;

const NewProperty = (props) => {
  const [propertyName, setPropertyName] = useState("");
  const [location, setLocation] = useState("");
  return (
    <ScrollView style={{height:sh}} contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.title}>
        <TouchableOpacity onPress={() => {props.navigation.pop()}}>
            <Image source={Images.back} style={{height:20,width:20,tintColor:'#209cf5'}}/>
        </TouchableOpacity>
        <Text style={{fontSize:20,marginHorizontal:'2.5%',color:'#209cf5'}}>New Property</Text>
      </View>
      <View style={styles.upload}>
            <TouchableOpacity style={{alignItems:'center'}}>
                <Image source={Images.upload} style={{height:24,width:24,tintColor:'#209cf5'}}/>
                <Text style={{color:'#209cf5',fontSize:12}}>Upload property images</Text>
            </TouchableOpacity>
      </View>
      <View style={{width:'90%',alignSelf:'center',marginTop:'2.5%'}}>
        <Text style={{fontSize:20,color:'#000'}}>Property Details</Text>

        <Text style={{fontSize:14,color:'#209cf5',marginTop:'2.5%'}}>Property Name *</Text>
        <View style={[styles.input,{}]}>
            <TextInput placeholder='Enter Property name'/>
        </View>
        <Text style={{fontSize:14,color:'#209cf5',marginTop:'2.5%'}}>Property Description *</Text>
        <View style={[styles.input,{height:sh*0.2}]}>
            <TextInput multiline={true} placeholder='Enter Description'/>
        </View>
        <Text style={{fontSize:14,color:'#209cf5',marginTop:'2.5%'}}>Property Address *</Text>
        <View style={[styles.input,{}]}>
            <TextInput multiline={true} placeholder='Enter Property Address'/>
        </View>
        <Text style={{fontSize:14,color:'#209cf5',marginTop:'2.5%'}}>City *</Text>
        <View style={[styles.input,{marginBottom:'25%'}]}>
            <TextInput multiline={true} placeholder='Enter City'/>
        </View>
        
      </View>
    </ScrollView>
  )
}

export default NewProperty

const styles = StyleSheet.create({
    title : {
        marginVertical:'5%',
        display:'flex',
        flexDirection:'row',
        marginHorizontal:'2.5%',
        alignItems:'center'
    },

    upload : {
        height:sh*0.2,
        width:'90%',
        alignSelf:'center',
        borderWidth:1,
        borderStyle:'dashed',
        borderRadius:4,
        borderColor:'#209cf5',
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'column'
    },

    input : {
        width:'95%',
        borderWidth:1,
        borderColor:'#209cf5',
        borderRadius:4,
        marginVertical:8
    }
})