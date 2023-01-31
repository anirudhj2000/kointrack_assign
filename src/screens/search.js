import { View, Text, StyleSheet, Image, TouchableOpacity,Dimensions,Keyboard} from 'react-native'
import React,{useState}from 'react';
import Images from '../../Images/images';
import { TextInput } from 'react-native-gesture-handler';

const sh = Dimensions.get('window').height;
const sw = Dimensions.get('window').width;

const Search = () => {
  const [focus, setFocus] = useState(false);
  const [searchText, setSearchValue] = useState("")

  const handleSearch = (val) => {
    setSearchValue(val);

  }
  return (
    <View>
        <View style={styles.searchStyle}>
            <TextInput value={searchText} onChangeText={(val) => {handleSearch(val)}} onFocus={() => setFocus(true)} placeholder='Search a location, area or city' style={{color:'#ababab',fontSize:12,height:'100%',color:'#000'}}/>
            <TouchableOpacity onPress={() => {setFocus(false);Keyboard.dismiss();setSearchValue("")}}>
                <Image source={focus?Images.close:Images.search} style={{height:16,width:16,tintColor:'#ababab'}} />
            </TouchableOpacity>
            
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