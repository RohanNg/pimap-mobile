import React, { Component } from 'react'
import { Alert, Button, Text, StyleSheet, View, 
    
    SafeAreaView,
    TextInput,
    Platform,
    StatusBar,
    ScrollView,
    Image,
    Dimensions } from 'react-native'

import {
  Back,
  Heart,
  More,
  PinIcon,
  Share
} from '../components/icon'
import CoverImage from '../components/CoverImage'


import {
  NavigationScreenProp,
  NavigationStackScreenOptions,
} from 'react-navigation'


interface DetailedScreenProps {
	navigation: NavigationScreenProp<{}, {}>
}

export default class DetailedScreen extends Component<DetailedScreenProps>{

	constructor(props: DetailedScreenProps){
		super(props)
	}


	public render(): React.ReactNode{
		return(
			
				<View style={styles.PinContainer}>

	        		<View style={styles.PinHeader}>
	          			<View style={styles.UtilityNav}>
				            <Button onPress={() =>{
				            	this.props.navigation.navigate('App'); 
				            	console.log('Hello')
				            }
				        } title = "Back" />
	          			</View>
	          		
	        </View>

	        <View style={styles.PinContent}>
	         	<CoverImage
		            source={require('../components/resource/football.jpg')}
		            originalWidth={400}
		            originalHeight={235}
	            />
	        </View>

	        <View style={styles.PinUser}>
	        	<View style = {{flexDirection: 'row'}}>
	          		<View style={styles.PinUserAvatar}/>
	          			<View style={styles.PinUserContainer}>
			            	<Text style={styles.PinUserText}>
			              		<Text style={{ fontSize: 16, fontWeight: '100', color: 'grey' }}>User Name </Text>
			           		</Text>
	            			
	          			</View>
	          		</View>
	          		<Text style={{ fontSize: 24, fontWeight: '400' }}>
            			Playing Soccer
          			</Text>
          			<Text style={{ fontSize: 10, color: 'grey'}}>Rautatientori, Helsinki 09:00</Text>

          			<Text style={{marginTop: 20, fontSize: 14, letterSpacing: 0, }}>Are own design entire former get should. Advantages boisterous day excellence boy. Out between our two waiting wishing. Pursuit he he garrets greater towards amiable so placing. Nothing off how norland delight. Abode shy shade she hours forth its use. Up whole of fancy ye quiet do. Justice fortune no to is if winding morning forming. </Text>	          	
	        	</View>	        
    		</View>
		)
	}
}

const styles = StyleSheet.create({
  PinContainer: {
    flex: 1,
    alignSelf: 'stretch'
  },
  PinHeader: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    flex: 1,
    padding: 8
  },
  UtilityNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1
  },
  PinButton: {
    flexDirection: 'row',
    backgroundColor: 'red',
    padding: 8,
    borderRadius: 6,
    justifyContent: 'space-between',
    width: 60
  },
  PinButtonText: {
    color: 'white'
  },
  PinButtonContainer: {
    flex: 1,
    alignItems: 'flex-end'
  },
  PinContent: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 8,
    paddingRight: 8,
  },
  ImagePlaceholder: {
    backgroundColor: '#1e1e1e',
    flex: 1,
    alignSelf: 'stretch',
    borderRadius: 6,
  },
  PinMeta: {
    flex: 1,
    flexDirection: 'row',
    paddingTop: 16,
    paddingRight: 8,
    paddingBottom: 16,
    paddingLeft: 8
  },
  PinMetaTextContainer: {

  },
  UtilityButton: {
    backgroundColor: '#cecece',
    alignItems: 'center',
    justifyContent: 'center'
  },
  UtilityButtonText: {
    color: 'black',
    fontWeight: 'bold'
  },
  PinUser: {
    flex: 5,
    paddingLeft: 8,
    paddingRight: 8
  },
  PinTitle: {
    
    paddingLeft: 8,
    paddingRight: 8
  },
  PinUserAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'black',
    marginRight: 8
  },
  TextBold: {
    fontWeight: 'bold'
  }
})