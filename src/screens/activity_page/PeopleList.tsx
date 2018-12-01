import * as React from 'react'
import {
  Image,
  ImageSourcePropType,
  Platform,
  ScrollView,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native'

import { Headline } from 'react-native-paper'

import { theme } from '../../theme'

interface Person {
  name: string
  image: ImageSourcePropType
}
interface PeopleListProps {
  style?: ViewStyle
  caption: string
  people: Person[]
}

export const PeopleList: React.SFC<PeopleListProps> = ({
  style,
  caption,
  people,
}) => {
  return (
    <View style={styles.peopleListContainer}>
      <Headline>{caption}</Headline>
      <ScrollView horizontal={true} style={styles.peopleList_scrollView}>
        {people.map(({ name, image }) => {
          return (
            <Image
              key={name}
              source={image}
              resizeMethod={'resize'}
              style={styles.peopleImage}
            />
          )
        })}
      </ScrollView>
    </View>
  )
}

export const peopleData: Person[] = [
  {
    name: 'Dang Nguyen',
    image: require('../../resources/nooke.jpg'),
  },
  {
    name: 'Thanh Nguyen',
    image: require('../../resources/nooke.jpg'),
  },
  {
    name: 'Nam Anh Nguyen',
    image: require('../../resources/nooke.jpg'),
  },
  {
    name: 'Samuli Holstrom',
    image: require('../../resources/nooke.jpg'),
  },
]

const SECTION_SPACING = theme.spacing.tight
const SUB_SECTION_SPACING = theme.spacing.tiny

const styles = StyleSheet.create({
  peopleListContainer: {
    marginTop: SECTION_SPACING,
  },
  peopleList_scrollView: {
    marginTop: SUB_SECTION_SPACING,
  },
  peopleImage: {
    height: 60,
    width: 60,
    borderRadius: theme.roundness,
    marginRight: 12,
  },
})
