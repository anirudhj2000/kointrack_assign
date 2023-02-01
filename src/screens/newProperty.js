import { StyleSheet, Text, View, TextInput, Touchable, TouchableOpacity, Image, Dimensions, ScrollView, ImagePicker, ImageBackground,KeyboardAvoidingView} from 'react-native'
import React,{useState, useEffect, useReducer} from 'react'
import Images from '../../Images/images';
import {launchImageLibrary} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import RadioForm from 'react-native-simple-radio-button';
import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import Toast from 'react-native-toast-message';


const sh = Dimensions.get('window').height;
const sw = Dimensions.get('window').width;

const ACTIONS = {
  ADD_NAME: 'name',
  ADD_DESCRIPTION: 'description',
  ADD_ADDRESS: 'address',
  ADD_IMAGE_URL:'url',
  ADD_CITY:'city',
  ADD_PRICE:'price',
  ADD_GENDER:'gender',
  SET_INFO : 'set'
}

function reducer(propertyInfo,action){
    switch(action.type){
      case ACTIONS.ADD_NAME:
        return {...propertyInfo,name : action.payload.name}
      case ACTIONS.ADD_DESCRIPTION:
        return {...propertyInfo,description : action.payload.description}
      case ACTIONS.ADD_ADDRESS:
        return {...propertyInfo,address : action.payload.address}
      case ACTIONS.ADD_IMAGE_URL:
        return {...propertyInfo,imageURL : action.payload.imageURL}
      case ACTIONS.ADD_CITY:
        return {...propertyInfo,city : action.payload.city}
      case ACTIONS.ADD_PRICE:
        return {...propertyInfo,price : action.payload.price}
      case ACTIONS.ADD_GENDER:
        return {...propertyInfo,gender : action.payload.gender}
      case ACTIONS.SET_INFO:
        return {}
      default:
        return propertyInfo;
    }
}


const NewProperty = (props) => {
  const [propertyInfo, dispatch] = useReducer(reducer,{})
  const [image, setImage] = useState("");
  const [imgUrl, setImageUrl] = useState("");
  const [radioVal, setRadioVal] = useState('');


  useEffect(() => {
    fircheck()
  },[])

  const fircheck = () => {
    firestore()
      .collection('listings')
      .get()
      .then(querySnapshot => {
        console.log('Total users: ', querySnapshot.size);

        querySnapshot.forEach(documentSnapshot => {
          console.log('User ID: ', documentSnapshot.id, documentSnapshot.data());
        });
      });
    // console.log(usersCollection)
  }

  var radio_props = [
    {label: 'Male', value: 'Male' },
    {label: 'Female', value: 'Female' },
    {label: 'Unisex', value: 'Unisex' }
  ];

  const handleRadio = (val) => {
    setRadioVal(val);
    dispatch({type:ACTIONS.ADD_GENDER,payload:{gender:val}})
    console.log(propertyInfo)
  }

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
    dispatch({type:ACTIONS.ADD_IMAGE_URL,payload : {imageURL : url}});
    
  };

  const validateFields = () => {
    if(!propertyInfo.city){
      return false;
    }
    if(!propertyInfo.name){
      return false;
    }if(!propertyInfo.description){
      return false;
    }if(!propertyInfo.address){
      return false;
    }if(!propertyInfo.price){
      return false;
    }
    if(!propertyInfo.imageURL){
      //settings default image
      dispatch({type:ACTIONS.ADD_IMAGE_URL,payload:{imageURL: "https://firebasestorage.googleapis.com/v0/b/kointrackassignment.appspot.com/o/img1675236058038?alt=media&token=812a0044-38af-4948-b1b0-6071504298ff"}})
    }
    return true
  }

  const handleSubmit = async() => {
    console.log(propertyInfo);
    if(!validateFields()){
        Toast.show({
          type: 'error',
          text1: 'Error!',
          text2 : 'Please enter all the details',
          position:'bottom',
          visibilityTime:2000
      });
      return;
    }

    let obj = {};

    if(propertyInfo.gender){
      obj["gender"] = propertyInfo.gender;
    }
    else{
      obj["gender"] = radioVal;
    }

    
    obj["name"] = propertyInfo.name;
    obj["description"] = propertyInfo.description;
    obj["price"] = propertyInfo.price;
    obj["address"] = propertyInfo.address;
    obj["city"] = propertyInfo.city;
    obj["imageUrl"] = propertyInfo.imageURL;

    console.log(obj);

    firestore()
      .collection('listings')
      .add(obj)
      .then(() => {
        console.log('User added!');
      })
      .then(() => {
        handleClear();
        props.navigation.pop();
      })
    

  }

  const handleClear = () => {
    dispatch({type:ACTIONS.SET_INFO});
    setImage(null)
  }


  return (
    <>
     <Toast style={{position:'absolute',zIndex:2}}
        bottomOffset={80}
        />
    <ScrollView style={{height:sh,zIndex:0}} contentContainerStyle={{ flexGrow: 1}}>
      
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
      <KeyboardAvoidingView>
        <View style={{width:'90%',alignSelf:'center',marginTop:'2.5%'}}>
            <Text style={{fontSize:20,color:'#000'}}>Property Details</Text>

            <Text style={{fontSize:14,color:'#209cf5',marginTop:'2.5%'}}>Property Name *</Text>
            <View style={[styles.input,{}]}>
                <TextInput 
                  value={propertyInfo.name} 
                  
                  onChangeText={(val) => {dispatch({type:ACTIONS.ADD_NAME, payload : {name : val}})}} 
                  placeholder='Enter Name'/>
            </View>
            <Text style={{fontSize:14,color:'#209cf5',marginTop:'2.5%'}}>Property Description *</Text>
            <View style={[styles.input,{height:sh*0.2}]}>
                <TextInput 
                  value={propertyInfo.description} 
                  multiline={true} 
                  onChangeText={(val) => {dispatch({type:ACTIONS.ADD_DESCRIPTION, payload : {description : val}})}} 
                  placeholder='Enter Description'/>
            </View>
            <Text style={{fontSize:14,color:'#209cf5',marginTop:'2.5%'}}>Property Address *</Text>
            <View style={[styles.input,{}]}>
                <TextInput 
                  value={propertyInfo.address} 
                  
                  onChangeText={(val) => {dispatch({type:ACTIONS.ADD_ADDRESS, payload : {address : val}})}} 
                  placeholder='Enter Address'/>
            </View>
            <Text style={{fontSize:14,color:'#209cf5',marginTop:'2.5%'}}>City *</Text>
            <View style={[styles.input]}>
                <TextInput 
                  value={propertyInfo.city} 
                  onChangeText={(val) => {dispatch({type:ACTIONS.ADD_CITY, payload : {city : val}})}} 
                  placeholder='Enter Address'/>
            </View>
            <Text style={{fontSize:14,color:'#209cf5',marginTop:'2.5%'}}>Price *</Text>
            <View style={[styles.input,{flexDirection:'row',justifyContent:'flex-start',alignItems:'center',width:'40%'}]}>
                <TextInput 
                    value={propertyInfo.price} 
                    onChangeText={(val) => {dispatch({type:ACTIONS.ADD_PRICE, payload : {price : val}})}} 
                    keyboardType='number-pad' 
                    
                    placeholder='Enter Amount'/>
                <Text style={{position:'absolute',right:0,marginHorizontal:8,fontSize:24}}>₹</Text>
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
            onPress={(value) => {handleRadio(value)}}
            />
      </View>

      <View style={{width:'95%',alignSelf:'center',display:'flex',flexDirection:'row-reverse',marginBottom:'20%',marginTop:'5%'}}>
            <TouchableOpacity style={{marginRight:'2.5%'}} onPress={() => {handleSubmit()}}>
              <View style={{height:sh*0.05,width:sw*0.2,justifyContent:'center',alignItems:'center',backgroundColor:'#209cf5'}}>
                <Text style={{color:'#fff'}}>Publish</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {handleClear()}} style={{right:0,marginRight:'2.5%'}}>
              <View style={{height:sh*0.05,width:sw*0.2,borderWidth:1,justifyContent:'center',alignItems:'center',borderColor:'#209cf5'}}>
                <Text style={{color:'#209cf5'}}>Clear</Text>
              </View>
            </TouchableOpacity>
            
       </View>
    </ScrollView>
    </>
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
        marginVertical:8,
    }
})