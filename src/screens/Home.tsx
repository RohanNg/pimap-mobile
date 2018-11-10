import { Constants, Facebook, Location, Permissions } from 'expo'
import * as React from 'react'
import { Alert, Button, Platform, Text, View } from 'react-native'
import {
  createStackNavigator,
  NavigationBottomTabScreenOptions,
  NavigationContainer,
  NavigationScreenConfig,
  NavigationScreenProp,
} from 'react-navigation'

import * as firebase from 'firebase'
import { tabBarIcon } from '../components/navigation/tabBarIcon'
<<<<<<< HEAD
=======
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu'


>>>>>>> adding new screen for users to enter their hobbies, interests

interface HomeScreenProps {
  navigation: NavigationScreenProp<{}, {}>
}

export class Home extends React.Component<HomeScreenProps> {
<<<<<<< HEAD
=======
  constructor(props: HomeScreenProps){
    super(props);
    this.state = {
      "events": [],
    }
  }

  componentDidMount(){
    fetch('http://api.hel.fi/linkedevents/v1/event/?start=2014-01-15&end=2014-01-20')
    .then((res) => res.json())
    .then((data) => {this.setState({events : data.data}); console.log(data.data);});

  }
>>>>>>> adding new screen for users to enter their hobbies, interests
  public static navigationOptions: NavigationBottomTabScreenOptions = {
    title: 'Home',
    tabBarIcon: tabBarIcon('home'),
  }
<<<<<<< HEAD

  public render(): React.ReactNode {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
=======
   _menu = null;
 
    setMenuRef = ref => {
      this._menu = ref;
    };
   
    hideMenu = () => {
      this._menu.hide();
    };
   
    showMenu = () => {
      this._menu.show();
    };

  public render(): React.ReactNode {

    
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Menu
          ref={this.setMenuRef}
          button={<Text onPress={this.showMenu}>Show menu</Text>}
        >
          <MenuItem onPress={this.hideMenu}>Menu item 1</MenuItem>
          <MenuItem onPress={this.hideMenu}>Menu item 2</MenuItem>
          <MenuItem onPress={this.hideMenu} disabled>
            Menu item 3
          </MenuItem>
          <MenuDivider />
          <MenuItem onPress={this.hideMenu}>Menu item 4</MenuItem>
        </Menu>
>>>>>>> adding new screen for users to enter their hobbies, interests
        <Text>Home Screen</Text>
        <Button
          title="Go to Details"
          onPress={() => this.props.navigation.navigate('NearbyActivities')}
        />
        <Button
          title="Log out"
          onPress={async () => {
            await firebase.auth().signOut()
            this.props.navigation.navigate('Login')
          }}
        />
      </View>
    )
  }
}
