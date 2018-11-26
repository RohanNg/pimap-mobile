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
}

const image = (() => {
  return require('../../assets/activity_image/aurora.jpg')
})()

export const ActivityList: React.SFC<ActivityListProps> = ({
  activitities,
  title,
  goBack,
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
          ({ value: { creatorID, privacy, title: activityTitle }, id }) => {
            return (
              <ActivityCard
                key={id}
                activity={{
                  image,
                  organizer: 'Dang Nguyen',
                  privacy,
                  title: activityTitle,
                }}
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
