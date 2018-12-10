import * as React from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { Title } from 'react-native-paper'
import { theme } from '../../theme'
import { LoadingUser } from './LoadingUser'

export const LoadingUsers: React.SFC<{
  title: string
  userIDs: string[]
}> = ({ title, userIDs }) => {
  if (userIDs.length === 0) {
    return null
  }
  return (
    <View style={styles.peopleListContainer}>
      <Title>{title}</Title>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={styles.peopleList_scrollView}
      >
        {userIDs.map(uid => (
          <LoadingUser key={uid} userID={uid} />
        ))}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  peopleListContainer: {
    marginTop: theme.spacing.tight,
  },
  peopleList_scrollView: {
    marginTop: theme.spacing.atomic,
  },
  peopleImage: {
    height: 60,
    width: 60,
    borderRadius: theme.roundness,
    marginRight: 12,
  },
})
