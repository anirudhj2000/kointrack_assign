import { StyleSheet, Text, View, FlatList} from 'react-native'
import React from 'react';
import { myZoloItems } from '../utils/constants';
import Divider from '../components/divider';
import MenuItem from '../components/menuItem';

const Setting = () => {
  return (
    <View>
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
            <MenuItem title={item.title} desc={item.desc} />
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