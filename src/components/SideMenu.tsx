import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu'
import React, { Component } from 'react'
import * as firebase from 'firebase'
import { Alert, Button, View, 
    Text,
    StyleSheet,
    SafeAreaView,
    TextInput,
    Platform,
    StatusBar,
    ScrollView,
    Image,
    Dimensions } from 'react-native'
import {
  createStackNavigator,
  NavigationBottomTabScreenOptions,
  NavigationContainer,
  NavigationScreenConfig,
  NavigationScreenProp,
} from 'react-navigation'




export default class SideMenu extends Component {
	_menu = null;
 
    setMenuRef = ref => {
      this._menu = ref;
    };
   
    toMap = () => {
      	this.props.navigation.navigate('NearbyActivities')
    };

     logOut = async () => {
    	await firebase.auth().signOut()
        this.props.navigation.navigate('Login')
          
    };
   
    showMenu = () => {
      this._menu.show();
    };

    public render(): React.ReactNode {

    return (
     <Menu
          ref={this.setMenuRef}
          button={<Text onPress={this.showMenu}>Menu</Text>}
        >
          <MenuItem onPress={this.props.toMap}>Map</MenuItem>
          <MenuItem onPress={this.props.logOut}>LogOut</MenuItem>
          
    </Menu>
    )
	}
}
	
