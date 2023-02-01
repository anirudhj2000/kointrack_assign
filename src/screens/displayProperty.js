import { StyleSheet, Text, View,FlatList,Dimensions} from 'react-native'
import React , {useState, useEffect} from 'react';
import { firebase } from '@react-native-firebase/firestore';

const sh = Dimensions.get('window').height;
const sw = Dimensions.get('window').width;

const DisplayProperty = (props) => {
  let {id} = props.route.params;
  const [toggle, setToggle] = useState(true);

  useEffect(() => {
    fetchPropertyDetails();
  })

  const fetchPropertyDetails = () => {

  }
  return (
    <View style={styles.container}>
        {
            toggle ? 
            <View style={{height:'100%',width:'100%',display:'flex',flexDirection:'column'}}>
                <Text style={styles.header}>Hi</Text>
            </View> 
            :

            <ActivityIndicator size={'large'} color={'#7F53AC'} style={{marginVertical:sh*0.05}}/>
        }
    </View>
  )
}

export default DisplayProperty

const styles = StyleSheet.create({
    container : {
        height:'100%',
        width:'100%',
        flex:1,
    }
})