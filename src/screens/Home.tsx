import { Constants, Facebook, Location, Permissions } from 'expo'
import * as React from 'react'
import {
  Alert,
  Button,
  Dimensions,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
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

import {
  Appbar,
  Headline,
  Paragraph,
  Subheading,
  Switch,
  TextInput,
  Title,
} from 'react-native-paper'

import * as firebase from 'firebase'
import Item from '../components/card/Item'
import PopularItem from '../components/card/PopularItem'
import Topic from '../components/card/Topic'
import { Header } from '../components/header'
import { tabBarIcon } from '../components/navigation/tabBarIcon'
import { theme } from '../theme'

interface HomeScreenProps {
  navigation: NavigationScreenProp<{}, {}>
}

const { height, width } = Dimensions.get('window')

export class Home extends React.Component<HomeScreenProps> {
  public static navigationOptions: NavigationBottomTabScreenOptions = {
    title: 'Home',
    tabBarIcon: tabBarIcon('home'),
  }

  public render(): React.ReactNode {
    return (
      <View style={styles.container}>
        <Header
          title="Home"
          goBack={async () => {
            await firebase.auth().signOut()
            this.props.navigation.navigate('Login')
          }}
        />
        <ScrollView style={styles.bodyContainer}>
          <HorizontallyScrollableSection title={'Topics'}>
            <Topic children="Football" />
            <Topic children="Football" />
            <Topic children="Football" />
          </HorizontallyScrollableSection>

          <HorizontallyScrollableSection title={'Trendings'}>
            <Item />
            <Item />
            <Item />
          </HorizontallyScrollableSection>

          <HorizontallyScrollableSection title={'Popular, right now'}>
            <PopularItem />
            <PopularItem />
            <PopularItem />
          </HorizontallyScrollableSection>
          <View style={{ height: 18 }} />
        </ScrollView>
      </View>
    )
  }
}

const HorizontallyScrollableSection: React.SFC<{
  title: string
  style?: {}
}> = ({ title, children, style }) => {
  return (
    <View style={[styles.section, style]}>
      <Headline>{title}</Headline>
      <ScrollView horizontal={true}>{children}</ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bodyContainer: {
    backgroundColor: theme.colors!.background,
    paddingHorizontal: 8,
  },
  section: {
    marginTop: 20,
  },
})
