import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Divider = (props) => {
  return (
    <View style={[props.style,styles.divider]} />
  )
}

export default Divider

const styles = StyleSheet.create({
    divider : {
        borderBottomWidth:1,
        borderBottomColor:'#ababab',
    }
})