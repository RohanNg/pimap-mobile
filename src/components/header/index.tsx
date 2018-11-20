import * as React from 'react'

import { SafeAreaView, StyleSheet } from 'react-native'
import { Appbar } from 'react-native-paper'
import { theme } from '../../theme'

export const Header: React.SFC<{ title: string; goBack?: () => void }> = ({
  title,
  goBack,
}) => {
  return (
    <SafeAreaView style={styles.container}>
      <Appbar>
        {goBack && <Appbar.BackAction onPress={goBack} />}
        <Appbar.Content titleStyle={styles.appBarTitleContent} title={title} />
      </Appbar>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors!.primary,
  },
  appBarTitleContent: {
    fontSize: 24,
  },
})
