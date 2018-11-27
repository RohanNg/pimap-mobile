import * as React from 'react'
import { ImageSourcePropType, StyleSheet } from 'react-native'
import { Button, Caption, Card, Paragraph, Text } from 'react-native-paper'
import { theme } from '../../theme'

interface ActivityCardProps {
  activity: {
    organizer: string
    title: string
    privacy: 'public' | 'private'
    image: ImageSourcePropType
  }
  onPress?: () => void
}

export const ActivityCard: React.SFC<ActivityCardProps> = ({
  activity: { title, organizer, privacy, image },
  onPress,
}) => {
  return (
    <Card style={styles.card} elevation={5} onPress={onPress}>
      <Card.Cover style={styles.coverImage} source={image} />
      <Card.Content style={styles.cardContent}>
        {privacy === 'private' && (
          <Text style={styles.privateLabel}>Private</Text>
        )}
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.organizerInfo}>{organizer}</Text>
      </Card.Content>
    </Card>
  )
}

const border = {
  borderWidth: 1,
  borderColor: 'black',
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    width: 230,
    marginRight: 10,
    marginBottom: 8,
  },
  coverImage: {
    height: 120,
  },
  cardContent: { paddingHorizontal: 8, paddingTop: 8 },
  title: { fontSize: 14 },
  organizerInfo: { fontSize: 10 },
  privateLabel: {
    backgroundColor: theme.colors!.primary,
    padding: 4,
    width: 52,
    borderRadius: theme.roundness,
    textAlign: 'center',
    overflow: 'hidden',
    color: 'white',
    fontSize: 10,
    position: 'absolute',
    top: -9,
    left: 172,
  },
})
