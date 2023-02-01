import { View, Text, StyleSheet, Image, TouchableOpacity,Dimensions,Keyboard,ActivityIndicator} from 'react-native'
import React,{useState,useEffect}from 'react';
import Images from '../../Images/images';
import { FlatList, TextInput } from 'react-native-gesture-handler';
import firestore from '@react-native-firebase/firestore';
import SearchItem from '../components/searchItem';
import { useIsFocused } from "@react-navigation/native";

const sh = Dimensions.get('window').height;
const sw = Dimensions.get('window').width;

const Search = (props) => {
  const isFocused = useIsFocused();
  const [focus, setFocus] = useState(false);
  const [searchText, setSearchValue] = useState("");
  const [toggle, setToggle] = useState(false);
  const [listings, setListings]=  useState([]);
  const [searchList, setSearchList] = useState([]);
  
  useEffect(() => {
    setToggle(false);
    getInitialInfo();
    setSearchList([]);
  }, [isFocused])

  const getInitialInfo = async() => {
    await firestore()
        .collection('listings')
        .get()
        .then(querySnapshot => {
            console.log('Total users: ', querySnapshot.size);
            let arr = [];
            querySnapshot.forEach(documentSnapshot => {
                tempObj = documentSnapshot.data();
                tempObj['id'] = documentSnapshot.id
                arr = [...arr,tempObj]
                setListings(arr)
        });
        }).then(() => {setToggle(true)});
  }
  

  const handleSearch = (val) => {
    setSearchValue(val);
    if(val.length<3){
        setSearchList([]);
        return;
    }
    let obj = listings.filter((item) => {
        if(item.name.toLowerCase().includes(val)){
            return item
        }
        if(item.description.includes(val)){
            return item
        }
        if(item.address.includes(val)){
            return item
        }
        if(item.city.includes(val)){
            return item
        }
    })

    console.log(obj);
    setSearchList(obj)
  }

  if(!toggle){
    return(
        <View style={{height:'100%',width:'100%',display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
            <ActivityIndicator size={'large'} color={'#7F53AC'} style={{marginVertical:sh*0.05}}/>
        </View>
    )
  }

  return (
    <View>
        <View style={styles.searchStyle}>
            <TextInput value={searchText} onChangeText={(val) => {handleSearch(val)}} onFocus={() => setFocus(true)} placeholder='Search a location, area or city' style={{color:'#ababab',fontSize:12,height:'100%',color:'#000'}}/>
            <TouchableOpacity onPress={() => {setFocus(false);Keyboard.dismiss();setSearchValue("")}}>
                <Image source={focus?Images.close:Images.search} style={{height:16,width:16,tintColor:'#ababab'}} />
            </TouchableOpacity>
        </View>
        <View style={{marginVertical:'2.5%'}}>
            <FlatList 
                data={searchList}
                renderItem={({item}) => {
                    return(
                        <SearchItem
                            onPress={() => {props.navigation.navigate('ViewProperty',{id:item.id})}}
                            name={item.name}
                            city={item.city}
                            gender={item.gender} />
                    )
                }}/>    
        </View> 
            
    </View>
  )
}

export default Search;

const styles = new StyleSheet.create({
    searchStyle : {
        width :'95%',
        height:sh*0.05,
        borderWidth:1,
        borderRadius:sh*0.05,
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        paddingHorizontal:16,
        alignItems:'center',
        marginTop:'5%',
        alignSelf:'center'
    }
})