import { StyleSheet, Text, View,FlatList,Dimensions,ActivityIndicator, ImageBackground, TouchableOpacity,Image} from 'react-native'
import React , {useState, useEffect} from 'react';
import firestore from '@react-native-firebase/firestore';
import Images from '../../Images/images';
import Divider from '../components/divider';
import { ScrollView } from 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';

const sh = Dimensions.get('window').height;
const sw = Dimensions.get('window').width;

const DisplayProperty = (props) => {
  let {id} = props.route.params;
  const [toggle, setToggle] = useState(false);
  const [details, setPropertyDetails] = useState({})

  useEffect(() => {
    fetchPropertyDetails();
  },[])

  const handleBooking = () => {


    let today = new Date().toISOString().slice(0, 10)
    console.log(today)

    let bookingObj = {}
    bookingObj = {...details};
    bookingObj['status'] = "Booked";
    bookingObj['bookingDate'] =today;

    firestore()
     .collection('bookings')
     .add(bookingObj)
     .then(() => {
        console.log('Booking added!');
        Toast.show({
            type: 'success',
            text1: 'Booking successfull!',
            text2 : 'Please check you bookings in myZolo area',
            position:'top',
            visibilityTime:2000
        });
      })
      .then(() => {
        setTimeout(() => {
            props.navigation.navigate('App');
        },1500)
        
      })
  }

  const fetchPropertyDetails = () => {
    firestore()
        .collection('listings')
        .doc(id)
        .get()
        .then(documentSnapshot => {
            console.log(documentSnapshot.data())
            setPropertyDetails(documentSnapshot.data())
        }).then(() => {setToggle(true)})
  }

  if(!toggle){
    return(
        <View style={{height:'100%',width:'100%',display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
            <ActivityIndicator size={'large'} color={'#7F53AC'} style={{marginVertical:sh*0.05}}/>
        </View>
    )
  }
  return (
    <>
    <ScrollView style={[styles.container,{zIndex:1}]} contentContainerStyle={{ flexGrow: 1}}>
            <View style={{height:'100%',width:'100%',display:'flex',flexDirection:'column',marginBottom:'20%'}}>
                <ImageBackground source={{uri : details.imageUrl}} style={{height:sh*0.25,width:'100%'}}>
                    <TouchableOpacity onPress={() => {props.navigation.pop()}}>
                        <Image source={Images.back} style={{height:16,width:16,tintColor:'#fff',marginTop:'2.5%',marginHorizontal:'2.5%'}} />
                    </TouchableOpacity>
                </ImageBackground>
                <View style={{height:'100%',width:'100%',borderTopLeftRadius:16,borderTopRightRadius:16,marginTop:'-10%',backgroundColor:'#fff',zIndex:2,padding:12}}>
                    <View style={{width:'100%',flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                        <View style={{display:'flex',flexDirection:'column'}}>
                            <Text style={{fontSize:24,color:'#000'}}>{details.name}</Text>
                            <Text style={{color:'#888888'}}>{details.city}</Text>
                        </View>
                        <Text style={{padding:8,backgroundColor:'#888888',borderRadius:4,color:'#fff'}}>{details.gender}</Text>
                    </View>
                    <Divider style={{marginVertical:'2.5%'}}/>
                    <View style={{padding:8,flexDirection:'row'}}>
                        <Image source={Images.premium} style={{height:64,width:64}} />
                        <View style={{flexDirection:'column',marginHorizontal:'5%',width:'80%'}}>
                            <Text style={{color:'#000',fontWeight:'bold'}}>This is a signature property</Text>
                            <Text numberOfLines={3} style={{color:'#888888',fontSize:12}}>Premium properties amenities and neighbourhood. No more hefty deposits,exorbitant rents and miserly landlords</Text>
                        </View>
                    </View>
                    <Divider style={{marginVertical:'2.5%'}}/>
                    <View>
                        <Text style={{fontSize:20,color:'#000'}}>Description</Text>
                        <Text style={{marginVertical:'1%',color:'#888888'}}>{details.description}</Text>
                    </View>
                    <Divider style={{marginVertical:'2.5%'}}/>
                    <View>
                        <Text style={{fontSize:20,color:'#000'}}>Address</Text>
                        <Text style={{marginVertical:'1%',color:'#888888'}}>{details.address}</Text>
                    </View>
                    <Divider style={{marginVertical:'2.5%'}}/>
                    <View>
                        <Text style={{fontSize:16,color:'#000'}}>Rooms starting from</Text>
                        <Text style={{marginVertical:'1%',color:'#888888'}}>₹{details.price} per month.</Text>
                    </View>
                </View>
            </View> 
    </ScrollView>
        <View style={{position:'absolute',bottom:0,elevation:4,display:'flex',flexDirection:'row',height:sh*0.07,backgroundColor:'#fff',width:'100%',padding:8,marginBottom:'1%',justifyContent:'space-between',alignItems:'center',zIndex:2}}>
            <View style={{flexDirection:'column',justifyContent:'center',alignItems:'center',marginHorizontal:'2.5%'}}>
                <Text style={{fontSize:10,color:'#ababab'}}>Token amount</Text>
                <Text style={{fontSize:16,color:'#000'}}>₹1,000</Text>
            </View>
            <TouchableOpacity style={{marginHorizontal:'2.5%'}} onPress={() => {handleBooking()}}>
                <Text style={{paddingHorizontal:24,paddingVertical:6,borderRadius:24,backgroundColor:'#372096',color:'#fff',fontSize:12}}>Book</Text>
            </TouchableOpacity>
        </View>
        <Toast style={{position:'absolute',zIndex:3}}
                topOffset={40}
        />
    </>
  )
}

export default DisplayProperty

const styles = StyleSheet.create({
    container : {
        height:'100%',
        width:'100%',
    }
})