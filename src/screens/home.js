import { View, Text, StyleSheet,Dimensions, Image, TouchableOpacity, FlatList,ActivityIndicator} from 'react-native'
import React,{useState, useEffect}from 'react'
import Images from '../../Images/images';
import {Picker} from '@react-native-picker/picker';
import PropertyCard from '../components/propertyCard';
import auth from '@react-native-firebase/auth';
import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import { useIsFocused } from "@react-navigation/native";

const sh = Dimensions.get('window').height;
const sw = Dimensions.get('window').width;

const Home = (props) => {
  const isFocused = useIsFocused();
  const [selectedCity, setSelectedCity] = useState('Hyderabad');
  const [toggle, setToggle] = useState(false);
  const [listings, setListings]=  useState([]);

  useEffect(() => {
    checkUserExists();
    setSelectedCity('Hyderabad')
    console.log("Shit")
  },[isFocused])

  useEffect(() => {
    setToggle(false)
    getListings();
  },[selectedCity,isFocused])

  const getListings = async() => {

    console.log(selectedCity)
    await firestore()
        .collection('listings')
        // Filter results
        .where('city', '==', selectedCity)
        .get()
        .then(querySnapshot => {
            console.log('Total users: ', querySnapshot.size);
            let arr = [];
            querySnapshot.forEach(documentSnapshot => {
                tempObj = documentSnapshot.data();
                tempObj['id'] = documentSnapshot.id
                arr = [...arr,tempObj]
                setListings(arr)
                console.log("arr", arr)
        });
        }).then(() => {setToggle(true)});
  }

  const checkUserExists = () => {
    // setViewToggle(false)
        auth().onAuthStateChanged((user) => {
        if (user) {
            console.log("user exists",user)
        }
        else{
            signInAnonymously();
        }
    });  
   }

   const signInAnonymously = () => {
        auth()
        .signInAnonymously()
        .then(() => {
        console.log('User signed in anonymously');
        })
        .catch(error => {
        if (error.code === 'auth/operation-not-allowed') {
            console.log('Enable anonymous in your firebase console.');
        }
    
        console.error(error);
        });
   }

   const handlePropertySelect = (item) => {
        props.navigation.navigate('ViewProperty',{id:item.id});
   }

   if(!toggle){
        return(
            <View style={{height:'100%',width:'100%',display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
                <ActivityIndicator size={'large'} color={'#7F53AC'} style={{marginVertical:sh*0.05}}/>
            </View>
        )
   }


  return (
    // <ActivityIndicator size={'large'} color={'#7F53AC'} style={{marginVertical:sh*0.05}}/>
    <View>
      <View style={styles.logoView}>
        <Image source={Images.logo} style={{height:48,width:48}}/>
      </View>

      <View style={styles.utilBarStyles}>
        <Picker
            style={[styles.picker,{width:'40%',color:'#209cf5',fontSize:8,padding:0,flexGrow:0,marginLeft:'-5%'}]}
            dropdownIconColor={'#209cf5'}
            itemStyle={{color:'#209cf5'}}
            selectedValue={selectedCity}
            onValueChange={(itemValue, itemIndex) =>
                setSelectedCity(itemValue)
            }>
            <Picker.Item label="Hyderabad" value="Hyderabad" />
            <Picker.Item label="Bangalore" value="Bangalore" />
            <Picker.Item label="Chennai" value="Chennai" />
            <Picker.Item label="Pune" value="Pune" />
        </Picker>
        <View style={{display:'flex',flexDirection:'row'}}>
            <TouchableOpacity>
                <Image style={styles.utilIconStyle} source={Images.chat}/>
            </TouchableOpacity>
            <TouchableOpacity>
                <Image style={styles.utilIconStyle} source={Images.bell}/>
            </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity onPress={() => {props.navigation.navigate('Search')}} style={{width:'95%',alignSelf:'center'}}>
        <View style={styles.searchStyle}>
            <Text style={{color:'#ababab',fontSize:12}}>Search a location, area or city</Text>
            <Image source={Images.search} style={{height:16,width:16,tintColor:'#ababab'}} />
        </View>
      </TouchableOpacity>
      <View style={{width:'95%',marginVertical:'5%',alignSelf:'center',flexDirection:'column'}}>
        <View style={{flexDirection:'row',width:'100%',justifyContent:'space-between',alignItems:'center'}}>  
            <View style={{flexDirection:'column'}}>
                <Text style={{fontSize:16,fontWeight:'bold',color:'#000'}}>Featured Developers</Text>
                <Text style={{fontSize:12,color:'#000',marginTop:4}}>Explore top properties</Text>
            </View>
            <TouchableOpacity>
                <Text style={{color:'#5203fc',fontWeight:'bold'}}>View All</Text>
            </TouchableOpacity>
        </View>
        <FlatList
            horizontal={true}
            data={listings}
            showsHorizontalScrollIndicator={false}
            style={{flexGrow:0,marginTop:'2.5%'}}
            renderItem={({item}) => {
                return(
                    <PropertyCard
                        onPress = {() => {handlePropertySelect(item)}}
                        title={item.name}
                        city={item.city}
                        source={{uri : item.imageUrl}}
                        rentMin={item.price}
                        gender={item.gender}/>
                )
            }}/>
      </View>
      <View style={{width:'95%',marginTop:'5%',alignSelf:'center',flexDirection:'column'}}>
        <View style={{flexDirection:'row',width:'100%',justifyContent:'space-between',alignItems:'center'}}>  
            <View style={{flexDirection:'column'}}>
                <Text style={{fontSize:16,fontWeight:'bold',color:'#000'}}>Select Developers</Text>
                <Text style={{fontSize:12,color:'#000',marginTop:4}}>Zolo properties are premium offerings comparable to luxurious aparments</Text>
            </View>
        </View>
        <FlatList
            horizontal={true}
            data={listings}
            showsHorizontalScrollIndicator={false}
            style={{flexGrow:0,marginTop:'2.5%'}}
            renderItem={({item}) => {
                return(
                    <PropertyCard
                        onPress = {() => {handlePropertySelect(item)}}
                        title={item.name}
                        city={item.city}
                        source={{uri : item.imageUrl}}
                        rentMin={item.price}
                        gender={item.gender}/>
                )
            }}/>
      </View>

    </View>
  )
}

export default Home;

const styles = new StyleSheet.create({
    container : {
        height:'100%',
        width:'100%',
        backgroundColor:'#fff'
    },

    logoView : {
        alignSelf:'center',
        marginVertical:'2.5%'
    },

    utilBarStyles : {
        width:'95%',
        alignSelf:'center',
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },

    picker : {
        transform: [
           { scaleX: 0.8 }, 
           { scaleY: 0.8 },
        ],
    },

    utilIconStyle : {
        height:18,
        width:18,
        tintColor:'#209cf5',
        marginRight:16
    },

    searchStyle : {
        width :'100%',
        height:sh*0.04,
        borderWidth:1,
        borderRadius:sh*0.05,
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        paddingHorizontal:16,
        alignItems:'center'
    }
})