import { Constants, Facebook, Location, Permissions } from 'expo'
import * as React from 'react'
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

import * as firebase from 'firebase'
import { tabBarIcon } from '../components/navigation/tabBarIcon'

import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu'
import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-cards'
import Item from '../components/Item'
import SideMenu from '../components/SideMenu'


const { height, width } = Dimensions.get('window')

interface HomeScreenProps {
  navigation: NavigationScreenProp<{}, {}>
}

export class Home extends React.Component<HomeScreenProps> {

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
  public static navigationOptions: NavigationBottomTabScreenOptions = {
    title: 'Home',
    tabBarIcon: tabBarIcon('home'),
  }
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

  public render(): React.ReactNode {

    return (
      <SafeAreaView style={{ flex: 1 }}>
   
        
        <ScrollView
          scrollEventThrottle={16}
          >
            <View style={{ flex: 1, backgroundColor: 'white', paddingTop: 20 }}>
               <SideMenu toMap = {this.toMap} logOut = {this.logOut}/>

              <Text style={{ fontSize: 24, fontWeight: '700', paddingHorizontal: 20 }}>
                Popular Events 
              </Text>

              <View style={{ height: 130, marginTop: 20 }}>
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              >
                <Item imageUri={require('../components/resource/football.jpg')}
                  name="Home" press={() =>this.props.navigation.navigate('Details')} 
                />

                <Item imageUri={require('../components/resource/football.jpg')}
                  name="Experiences"
                />
                <Item imageUri={require('../components/resource/football.jpg')}
                  name="Resturant"
                />
              </ScrollView>
              </View>
              <View style={{ marginTop: 40, paddingHorizontal: 20 }}>
                <Text style={{ fontSize: 24, fontWeight: '700' }}>
                  Trending
                </Text>
                <Text style={{ fontWeight: '100', marginTop: 10 }}>
                   Can you find your favorite events ?

                </Text>
                <View style={{ height: 200, marginTop: 20 }}>
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              >
                <Item imageUri={require('../components/resource/football.jpg')}
                  name="Home" press={() =>this.props.navigation.navigate('Details')} 
                />

                <Item imageUri={require('../components/resource/football.jpg')}
                  name="Experiences"
                />
                <Item imageUri={require('../components/resource/football.jpg')}
                  name="Resturant"
               />
              </ScrollView>

              </View>
            </View>
          </View>
        </ScrollView>
        
           
      </SafeAreaView>   
    )
  }
}

const styles = StyleSheet.create({
  column: {
    flex: 1,
    flexDirection: "column"
  },
  row: {
    flex: 1,
    flexDirection: "row"
  },
  box1: {
    flex: 1
  },
  box2: {
    flex: 1
  },
  button: {
    shadowColor: 'rgba(0,0,0, .4)', // IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1, //IOS,
    borderRadius: 5,
    backgroundColor: '#fff',
    elevation: 2, // Android
    maxHeight: 54,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    padding: 5
  }
});

