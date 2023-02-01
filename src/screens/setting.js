import { StyleSheet, Text, View, FlatList,BackHandler} from 'react-native'
import React from 'react';
import { myZoloItems } from '../utils/constants';
import Divider from '../components/divider';
import MenuItem from '../components/menuItem';
import Toast from 'react-native-toast-message';
import auth from '@react-native-firebase/auth';

const Setting = (props) => {


  const handleItemSelect = (item) => {
    if(item.title!='Logout'){
      props.navigation.navigate(item.navigation)
    }
    else{
      auth()
      .signOut()
      .then(() => {

          Toast.show({
            type: 'success',
            text1: 'Logout Successfull',
            text2 : 'App will be closed in few seconds, Please visit again',
            position:'top',
            visibilityTime:2000
          });

          setTimeout(() => {
            BackHandler.exitApp();
          },4000)
        
      });

    }
    
  }
  // props.navigation.navigate(item.navigation
  return (
    <View>
      <Toast style={{position:'absolute',zIndex:2}}
        bottomOffset={80}
        />
      <Text style={styles.titleStyle}>My Items</Text>
      <Divider style={{width:'95%',alignSelf:'center',marginTop:4}} />
      <FlatList
        style={{width:'95%',alignSelf:'center', marginTop:'2.5%',flexGrow:0}}
        data={myZoloItems}
        ItemSeparatorComponent={() => {
          return(
            <Divider style={{width:'100%'}}/>
          )
        }}
        renderItem={({item}) => {
          return(
            <MenuItem onPress={() => {handleItemSelect(item)}} title={item.title} desc={item.desc} />
          )
        }} />
    </View>
  )
}

export default Setting;

const styles = StyleSheet.create({
  titleStyle : {
    fontSize:16,
    color:'#000',
    marginHorizontal:'2.5%',
    marginTop :'5%'
  }
})