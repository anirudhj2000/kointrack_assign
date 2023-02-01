import { StyleSheet, Text, View, Dimensions,FlatList,Image,TouchableOpacity,ActivityIndicator} from 'react-native'
import React,{useState, useEffect}from 'react';
import Images from '../../Images/images';
import firestore from '@react-native-firebase/firestore';
import PropertyCard from '../components/propertyCard';

const sh = Dimensions.get('window').height;
const sw = Dimensions.get('window').width;

const Bookings = (props) => {

    const [listings, setListings]=  useState([]);
    const [toggle, setToggle] = useState(false);

    useEffect(() => {
        getInitialInfo();
    }, [])
    
    const getInitialInfo = async() => {
        await firestore()
            .collection('bookings')
            .get()
            .then(querySnapshot => {
                console.log('Total users: ', querySnapshot.size);
                let arr = [];
                querySnapshot.forEach(documentSnapshot => {
                    tempObj = documentSnapshot.data();
                    tempObj['id'] = documentSnapshot.id
                    arr = [...arr,tempObj]
                    setListings(arr)
                    console.log(arr)
            });
            }).then(() => {setToggle(true)});
    }

    if(!toggle){
        return(
                <View style={{height:'100%',width:'100%',display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
                    <ActivityIndicator size={'large'} color={'#7F53AC'} style={{marginVertical:sh*0.05}}/>
                </View>
            )
    }

    const handlePropertySelect = (item) => {
        props.navigation.navigate('ViewProperty',{id:item.id,showBooking:false})
    }

  return (
    <View>
      <View style={{marginVertical:'5%',marginHorizontal:'2.5%',flexDirection:'row',alignItems:'center'}}>
        <TouchableOpacity onPress={() => {props.navigation.pop()}}>
            <Image source={Images.back} style={{height:20,width:20}}/>
        </TouchableOpacity>
        <Text style={{fontSize:24,marginHorizontal:'2.5%',color:'#000'}}>Bookings</Text>
      </View>
      <View style={{marginHorizontal:'5%'}}>
      <FlatList
        data={listings}
        renderItem={({ item }) => (
            <PropertyCard
                style={{marginVertical:'2.5%'}}
                onPress = {() => {handlePropertySelect(item)}}
                title={item.name}
                city={item.city}
                source={{uri : item.imageUrl}}
                rentMin={item.price}
                gender={item.gender}/>
        )}
        //Setting the number of column
        numColumns={2}
        keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </View>
  )
}

export default Bookings

const styles = StyleSheet.create({})