import { StyleSheet, Text, View, TextInput, Touchable, TouchableOpacity, Image, Dimensions, ScrollView, ImagePicker, ImageBackground,KeyboardAvoidingView} from 'react-native'
import React,{useState, useEffect, useReducer} from 'react'
import Images from '../../Images/images';
import {launchImageLibrary} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import CheckBox from 'react-native-check-box'


const sh = Dimensions.get('window').height;
const sw = Dimensions.get('window').width;

const NewProperty = (props) => {
  const [propertyName, setPropertyName] = useState("");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState("");
  const [imgUrl, setImageUrl] = useState("");
  const [radioVal, setRadioVal] = useState(0);
  const [toggleCheckBox, setToggleCheckBox] = useState([false,false,false]);


  var radio_props = [
    {label: 'Male', value: 0 },
    {label: 'Female', value: 1 },
    {label: 'Unisex', value: 1 }
  ];

  const handleImagePicker = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    setImage(result.assets[0].uri);
    const reference = storage().ref('img'+Date.now());
    await reference.putFile(result.assets[0].uri);
    const url = await reference.getDownloadURL().catch((error) => {throw error})
    console.log(url);
    setImageUrl(url);
    // setImage(result.assets[0].uri);
  };


  return (
    <ScrollView style={{height:sh}} contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.title}>
        <TouchableOpacity onPress={() => {props.navigation.pop()}}>
            <Image source={Images.back} style={{height:20,width:20,tintColor:'#209cf5'}}/>
        </TouchableOpacity>
        <Text style={{fontSize:20,marginHorizontal:'2.5%',color:'#209cf5'}}>New Property</Text>
      </View>
      {
        image ? 
            <ImageBackground source={{uri:image}} resizeMode='contain' style={{height:sh*0.2,width:'90%',alignSelf:'center',marginVertical:'5%'}}>
                <TouchableOpacity style={{position:'absolute',right:0}} onPress={() => {setImage(null)}}>
                    <Image source={Images.close} style={{height:16,width:16,right:0,tintColor:'#000'}}/>
                </TouchableOpacity>    
            </ImageBackground> :
             <View style={styles.upload}>
                <TouchableOpacity style={{alignItems:'center'}} onPress={() => {handleImagePicker()}}>
                    <Image source={Images.upload} style={{height:24,width:24,tintColor:'#209cf5'}}/>
                    <Text style={{color:'#209cf5',fontSize:12}}>Upload property images</Text>
                </TouchableOpacity>
            </View>
      }
      {/* <View style={styles.upload}>
            <TouchableOpacity style={{alignItems:'center'}} onPress={() => {handleImagePicker()}}>
                <Image source={Images.upload} style={{height:24,width:24,tintColor:'#209cf5'}}/>
                <Text style={{color:'#209cf5',fontSize:12}}>Upload property images</Text>
            </TouchableOpacity>
      </View> */}
      <KeyboardAvoidingView>
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
            <View style={[styles.input]}>
                <TextInput multiline={true} placeholder='Enter City'/>
            </View>
        </View>
      </KeyboardAvoidingView>

      <View style={{width:'90%',alignSelf:'center',marginTop:'2.5%'}}>
        <Text style={{fontSize:14,color:'#209cf5'}}>Catering for *</Text>
        <RadioForm
            style={{flexDirection:'row',justifyContent:'space-between',width:'100%',alignSelf:'center',marginVertical:'2.5%'}}
            labelColor={'#209cf5'}
            radio_props={radio_props}
            initial={0}
            formHorizontal={true}
            onPress={(value) => {setRadioVal(value)}}
            />
      </View>

      <View style={{width:'90%',alignSelf:'center',marginTop:'2.5%'}}>
        <Text style={{fontSize:14,color:'#209cf5'}}>Types of rooms *</Text>
        <CheckBox
          style={{marginTop:'2.5%',marginBottom:'2%'}}
          isChecked={toggleCheckBox[0]}
          checkBoxColor={'#209cf5'}
          onClick={() => setToggleCheckBox([!toggleCheckBox[0],toggleCheckBox[1],toggleCheckBox[2]])}
          rightText = {"Three Sharing"}
        />
        <CheckBox
          style={{marginVertical:'2%'}}
          isChecked={toggleCheckBox[1]}
          checkBoxColor={'#209cf5'}
          onClick={() => setToggleCheckBox([toggleCheckBox[0],!toggleCheckBox[1],toggleCheckBox[2]])}
          rightText = {"Two Sharing"}
        />
        <CheckBox
          style={{marginVertical:'2%'}}
          isChecked={toggleCheckBox[2]}
          checkBoxColor={'#209cf5'}
          onClick={() => setToggleCheckBox([toggleCheckBox[0],toggleCheckBox[1],!toggleCheckBox[2]])}
          rightText = {"Single Room"}
        />
        
      </View>
      <View style={{width:'95%',alignSelf:'center',display:'flex',flexDirection:'row-reverse',marginBottom:'20%'}}>
            <TouchableOpacity style={{marginRight:'2.5%'}}>
              <View style={{height:sh*0.05,width:sw*0.2,justifyContent:'center',alignItems:'center',backgroundColor:'#209cf5'}}>
                <Text style={{color:'#fff'}}>Save</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={{right:0,marginRight:'2.5%'}}>
              <View style={{height:sh*0.05,width:sw*0.2,borderWidth:1,justifyContent:'center',alignItems:'center',borderColor:'#209cf5'}}>
                <Text style={{color:'#209cf5'}}>Clear</Text>
              </View>
            </TouchableOpacity>
            
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