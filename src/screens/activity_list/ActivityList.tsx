import { observer } from 'mobx-react'
import * as React from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { NavigationScreenProp } from 'react-navigation'
import { withNavigation } from 'react-navigation'

import { ActivityCard } from '../../components/card/ActivityCard'
import { Header } from '../../components/header'
import { Activity } from '../../datastore'

interface ActivityListProps {
  activitities: Activity[]
  onActivityPressed?: (activity: Activity) => void
  horizontallyScrollable?: boolean
}

export const ActivityList: React.SFC<ActivityListProps> = ({
  activitities,
  onActivityPressed,
  horizontallyScrollable = false,
}) => {
  return (
    <ScrollView
      style={styles.activitiesContainer}
      contentContainerStyle={styles.contentContainer}
      horizontal={horizontallyScrollable}
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
    paddingTop: 24,
  },
  contentContainer: {
    alignItems: 'center',
    paddingBottom: 48,
  },
})
