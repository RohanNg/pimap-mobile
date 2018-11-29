import * as React from 'react'
import { Activity } from '../../datastore'

import { ScrollView, StyleSheet, View } from 'react-native'
import { NavigationScreenProp } from 'react-navigation'
import { withNavigation } from 'react-navigation'

import { ActivityCard } from '../../components/card/ActivityCard'
import { Header } from '../../components/header'

interface ActivityListProps {
  title: string
  activitities: Activity[]
  goBack: () => void
  onActivityPressed: (activityID: string) => void
}

export const ActivityList: React.SFC<ActivityListProps> = ({
  activitities,
  title,
  goBack,
  onActivityPressed,
}) => {
  return (
    <View style={styles.container}>
      <Header title={title} goBack={goBack} />
      <ScrollView
        style={styles.activitiesContainer}
        contentContainerStyle={{
          alignItems: 'center',
          paddingBottom: 48,
        }}
      >
        {activitities.map(
          ({
            value: { creatorID, privacy, title: activityTitle, coverImage },
            id,
          }) => {
            return (
              <ActivityCard
                key={id}
                activity={{
                  image: { uri: coverImage },
                  organizer: 'Dang Nguyen',
                  privacy,
                  title: activityTitle,
                }}
                onPress={() => onActivityPressed(id)}
              />
            )
          },
        )}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  activitiesContainer: {
    flex: 1,
    paddingTop: 24,
  },
})
