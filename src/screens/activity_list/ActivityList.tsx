import { observer } from 'mobx-react'
import * as React from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { ViewStyle } from 'react-native'
import { NavigationScreenProp } from 'react-navigation'
import { withNavigation } from 'react-navigation'

import { ActivityCard } from '../../components/card/ActivityCard'
import { Header } from '../../components/header'
import { Activity } from '../../datastore'

interface ActivityListProps {
  activitities: Activity[]
  onActivityPressed?: (activity: Activity) => void
  horizontallyScrollable?: boolean
  style?: ViewStyle
}

export const ActivityList: React.SFC<ActivityListProps> = ({
  activitities,
  onActivityPressed,
  horizontallyScrollable = false,
  style,
}) => {
  return (
    <ScrollView
      style={styles.activitiesContainer}
      contentContainerStyle={[styles.contentContainer, style]}
      horizontal={horizontallyScrollable}
      showsHorizontalScrollIndicator={false}
    >
      {activitities.map(activity => {
        const {
          value: { creatorID, privacy, title: activityTitle, coverImage },
          id,
        } = activity
        return (
          <ActivityCard
            key={id}
            activity={{
              image: { uri: coverImage },
              organizer: creatorID,
              privacy,
              title: activityTitle,
            }}
            onPress={onActivityPressed && (() => onActivityPressed(activity))}
          />
        )
      })}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  activitiesContainer: {
    flex: 1,
  },
  contentContainer: {
    alignItems: 'center',
  },
})
