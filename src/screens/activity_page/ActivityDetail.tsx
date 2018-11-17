import * as React from 'react'
import {
  Alert,
  Button,
  Platform,
  StyleProp,
  StyleSheet,
  View,
} from 'react-native'
import {
  NavigationBottomTabScreenOptions,
  NavigationScreenProp,
  SafeAreaView,
} from 'react-navigation'

import {
  Appbar,
  Caption,
  Headline,
  Paragraph,
  Subheading,
  Text,
  Title,
} from 'react-native-paper'

import { tabBarIcon } from '../../components/navigation/tabBarIcon'
import { theme } from '../../theme'

interface ActivityDetailProps {
  navigation: NavigationScreenProp<{}, {}>
  style?: StyleProp<{}>
}

export class ActivityDetail extends React.Component<ActivityDetailProps> {
  public static navigationOptions: NavigationBottomTabScreenOptions = {
    title: 'Home',
    tabBarIcon: tabBarIcon('home'),
  }

  public render(): React.ReactNode {
    return (
      <View style={[styles.body, this.props.style]}>
        <Text>
          Aurora activity tonight in the Helsinki region.
          {'\n\n'}
          If you haven’t known, Finland is blessed with Northern light. Because
          we have such long summer its quite hard to see the thing. According to
          the Finnish meteorological institute at Helsinki we can have 1/20
          chance a month to see this spectacular phenomenon, but due to the
          light and the fact that winter is quite cloudy and crappy here, this
          is a golden gem. So don’t miss!
          {'\n\n'}
          I’ll pick you up by car if you happen to be nearby
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  body: { paddingHorizontal: 16 },
})
