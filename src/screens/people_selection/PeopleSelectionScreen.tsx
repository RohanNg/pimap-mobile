import * as React from 'react'

import {} from 'react-native'

import { Activity } from '../../datastore'

import { Image, ScrollView, StyleSheet, View } from 'react-native'
import { List, Switch } from 'react-native-paper'
import { NavigationScreenProp } from 'react-navigation'
import { withNavigation } from 'react-navigation'

import { ActivityCard } from '../../components/card/ActivityCard'
import { Header } from '../../components/header'
import { theme } from '../../theme'

export interface UserInfo {
  uid: string
  displayName: string
  selected: boolean
  imageURL?: string
}

interface PeopleSelectionScreenProps {
  title: string
  users: UserInfo[]
  goBack?: () => void
  userClicked: (uid: string) => void
  onPersonSelected: (uid: string) => void
  onPersonRemoved: (uid: string) => void
}

export const PeopleSelectionScreen: React.SFC<PeopleSelectionScreenProps> = ({
  title,
  users,
  goBack,
  onPersonRemoved,
  onPersonSelected,
  userClicked,
}) => {
  return (
    <View style={styles.container}>
      <Header title={title} goBack={goBack} />
      <ScrollView
        style={styles.usersContainer}
        contentContainerStyle={{
          paddingBottom: theme.spacing.extravagant,
          paddingHorizontal: theme.spacing.tight,
        }}
      >
        {users.map(({ displayName, imageURL, selected, uid }) => {
          return (
            <List.Item
              key={uid}
              title={displayName}
              description="Interests: sport, nature, adult"
              style={styles.userInfoRow}
              left={({ color }) => (
                <Image
                  source={
                    imageURL
                      ? { url: imageURL }
                      : require('../../assets/place_holder/user.png')
                  }
                  style={styles.userImage}
                />
              )}
              right={({ color }) => (
                <Switch
                  value={selected}
                  onValueChange={userSelected =>
                    userSelected ? onPersonSelected(uid) : onPersonRemoved(uid)
                  }
                  style={styles.selectionToggle}
                />
              )}
            />
          )
        })}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  usersContainer: {
    flex: 1,
    paddingTop: 24,
  },
  userInfoRow: {
    paddingVertical: 0,
    marginTop: theme.spacing.tight,
  },
  userImage: {
    height: 42,
    width: 42,
    borderRadius: 21,
    margin: 4,
  },
  selectionToggle: {
    marginTop: 6,
  },
})
