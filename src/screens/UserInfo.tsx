import { Constants, Facebook, Location, Permissions } from 'expo'
import * as React from 'react'
import {
  ActivityIndicator,
  SafeAreaView,
  Alert,
  Button,
  Platform,
  StatusBar,
  Text,
  View,
} from 'react-native'
import {
  createStackNavigator,
  NavigationBottomTabScreenOptions,
  NavigationContainer,
  NavigationScreenConfig,
  NavigationScreenProp,
} from 'react-navigation'

import { withAuthenticatedUser } from '../services/AuthService'

import CustomMultiPicker from "react-native-multiple-select-list";

import SelectMultiple from 'react-native-select-multiple'

const hobby = ['Soccer', 'Swim', 'Badminton']

const interests = ['VideoGames', 'Boardgames', 'Movie']

interface UserInfoScreenProps {
  navigation: NavigationScreenProp<{}, {}>
}


export class UserInfo extends React.Component<UserInfoScreenProps> {
	constructor(props: UserInfoScreenProps) {
    super(props)
    this.state = { selectedHobby: [], selectedInterest: [] }
    this.onSelectionsHobbyChange = this.onSelectionsHobbyChange.bind(this)
    this.onSelectionsIntChange = this.onSelectionsIntChange.bind(this)

  }
   onSelectionsHobbyChange = (selectedHobby) => {
    // selectedFruits is array of { label, value }
    this.setState({ selectedHobby })
  }
  onSelectionsIntChange = (selectedInterest) => {
    // selectedFruits is array of { label, value }
    this.setState({ selectedInterest })
  }


	public render(): React.ReactNode {	
		
	 return (
	 <SafeAreaView>
      <Text style={{ fontSize: 24, fontWeight: '700' }}>
            Hobby
          </Text>    
            <SelectMultiple
          items={hobby}
          selectedItems={this.state.selectedHobby}
          onSelectionsChange={this.onSelectionsHobbyChange} />
          
         <Text style={{ fontSize: 24, fontWeight: '700' }}>
            Interests
          </Text>

          <SelectMultiple
          items={interests}
          selectedItems={this.state.selectedInterest}
          onSelectionsChange={this.onSelectionsIntChange} />
          <Button
          	onPress={() =>this.props.navigation.navigate('App')}
          	title="Done"
          />

          
      </SafeAreaView>
	 	);
	}
	
}
 
