import * as React from 'react'
import { Dimensions, Image, ScrollView, StyleSheet } from 'react-native'

export const Albums: React.SFC<{}> = () => {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {COVERS.map((source, i) => (
        <Image key={i} source={source} style={styles.cover} />
      ))}
    </ScrollView>
  )
}
/* tslint:disable:no-var-requires */
const COVERS = [
  require('../../assets/album/i1.jpg'),
  require('../../assets/album/i2.jpg'),
  require('../../assets/album/i3.jpg'),
  require('../../assets/album/i4.jpg'),
  require('../../assets/album/i5.jpg'),
  require('../../assets/album/i6.jpg'),
  require('../../assets/album/i7.jpg'),
  require('../../assets/album/i8.jpg'),
]

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#343C46',
  },
  content: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  cover: {
    width: '50%',
    height: Dimensions.get('window').width / 2,
  },
})
