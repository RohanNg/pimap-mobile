import * as React from 'react'

import { SafeAreaView, StyleSheet } from 'react-native'
import { Appbar } from 'react-native-paper'
import { theme } from '../../theme'

export const Header: React.SFC<{ title: string }> = ({ title }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Appbar>
        <Appbar.Content
          style={styles.appBarContent}
          titleStyle={styles.appBarTitleContent}
          title={title}
        />
      </Appbar>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: { backgroundColor: theme.colors!.primary },
  appBarContent: {
    flex: 0,
    marginLeft: -48,
  },
  appBarTitleContent: {
    fontWeight: 'bold',
    fontSize: 28,
  },
})
