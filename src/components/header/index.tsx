import * as React from 'react'

import { SafeAreaView, StyleSheet } from 'react-native'
import { Appbar } from 'react-native-paper'
import { theme } from '../../theme'

export const Header: React.SFC<{
  title: string
  goBack?: () => void
  left?: React.ReactNode
}> = ({ title, goBack, children, left }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Appbar style={styles.appBar}>
        {left}
        {goBack && <Appbar.BackAction onPress={goBack} />}
        <Appbar.Content titleStyle={styles.appBarTitleContent} title={title} />
        {children}
      </Appbar>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors!.primary,
  },
  appBar: {
    height: 42,
  },
  appBarTitleContent: {
    fontSize: 22,
  },
})
