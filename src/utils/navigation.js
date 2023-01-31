import React from 'react';
import {Text,Button,Dimensions,View, Image} from 'react-native';
import {createStackNavigator} from "@react-navigation/stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/home';
import Profile from '../screens/profile';
import Setting from '../screens/setting';
import Search from '../screens/search';
import PropertyDetails from '../screens/propertyDetails';
import Images from '../../Images/images';
import Login from '../screens/login';
import NewProperty from '../screens/newProperty';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const SettingsStackNavigator = createStackNavigator();
const SettingsStack = () => {
    return(
        <SettingsStackNavigator.Navigator>
            <SettingsStackNavigator.Screen name="Settings" component={Setting} options={{headerShown:false}}/>
            <SettingsStackNavigator.Screen name="NewProperty" component={NewProperty} options={{headerShown:false}}/>
        </SettingsStackNavigator.Navigator>
    )
}


const ScreenStackNavigator = createBottomTabNavigator();
const ScreenNavigator = () => {
    return(
        <ScreenStackNavigator.Navigator 
            screenOptions={{
                tabBarShowLabel : false,
                tabBarStyle: {
                    height:windowHeight*0.08,
                    position:'absolute',
                    elevation:16,
                    paddingHorizontal:10,
                    backgroundColor:'#fff',
                },
            }}>
            <ScreenStackNavigator.Screen name="Home" component={Home}  options={{
                headerShown:false,
                tabBarIcon:({focused}) =>(
                    <View style={{display:'flex',justifyContent:'center', alignItems:'center',width:'100%',marginHorizontal:10,marginTop:5}}>
                        <View style={{height:25,width:25,display:'flex',justifyContent:'center', alignItems:'center',borderRadius:20,shadowColor:'#c7c7c7'}}>
                            <Image
                                style={{height:18,width:18,alignSelf:'center',tintColor:focused?'#36629c':'#000'}}
                                resizeMode='contain'
                                source={Images.home}/>
                        </View>
                        <Text style={{marginVertical:2.5,color:focused?'#36629c':'#000',fontSize:12}}>Home</Text>
                    </View>
                ),
            }} />
            <ScreenStackNavigator.Screen name="Setting" component={SettingsStack} options={{
                headerShown:false,
                tabBarIcon:({focused}) =>(
                    <View style={{display:'flex',justifyContent:'center', alignItems:'center',width:'100%',marginHorizontal:10,marginTop:5}}>
                        <View style={{height:25,width:25,display:'flex',justifyContent:'center', alignItems:'center',borderRadius:20}}>
                            <Image
                                style={{height:20,width:20,alignSelf:'center',tintColor:focused?'#36629c':'#000'}}
                                resizeMode='contain'
                                source={Images.hand}/>
                        </View>
                        <Text style={{marginVertical:2.5,color:focused?'#36629c':'#000',fontSize:12}}>MyZolo</Text>
                    </View>
                ),
            }}/>
            <ScreenStackNavigator.Screen name="Search" component={Search} options={{
                headerShown:false,
                tabBarIcon:({focused}) =>(
                    <View style={{display:'flex',justifyContent:'center', alignItems:'center',width:'100%',marginHorizontal:10,marginTop:5}}>
                        <View style={{height:25,width:25,display:'flex',justifyContent:'center', alignItems:'center',borderRadius:20}}>
                            <Image
                                style={{height:18,width:18,alignSelf:'center',tintColor:focused?'#36629c':'#000'}}
                                resizeMode='contain'
                                source={Images.search}/>
                        </View>
                        <Text style={{marginVertical:2.5,color:focused?'#36629c':'#000',fontSize:12}}>Search</Text>
                    </View>
                ),
            }}/>
            <ScreenStackNavigator.Screen name="Profile" component={Profile} options={{
                headerShown:false,
                tabBarIcon:({focused}) =>(
                    <View style={{display:'flex',justifyContent:'center', alignItems:'center',width:'100%',marginHorizontal:10,marginTop:5}}>
                        <View style={{height:25,width:25,display:'flex',justifyContent:'center', alignItems:'center',borderRadius:20}}>
                            <Image
                                style={{height:18,width:18,alignSelf:'center',tintColor:focused?'#36629c':'#000'}}
                                resizeMode='contain'
                                source={Images.profile}/>
                        </View>
                        <Text style={{marginVertical:2.5,color:focused?'#36629c':'#000',fontSize:12}}>Profile</Text>
                    </View>
                ),
            }}/>
        </ScreenStackNavigator.Navigator>
    );
}

const AppStackNavigator = createStackNavigator()
const AppNavigator = () => {
    return(
        <AppStackNavigator.Navigator>
            <AppStackNavigator.Screen name='Login' component={Login} options={{headerShown:false}}/>
            <AppStackNavigator.Screen name='App' component={ScreenNavigator} options={{headerShown:false}}/>
        </AppStackNavigator.Navigator>
    )
}


export default ScreenNavigator;