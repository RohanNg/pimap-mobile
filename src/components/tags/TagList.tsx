/* tslint:disable:no-any */
import * as Immutable from 'immutable'
import * as React from 'react'
import { StyleSheet, View, ViewStyle } from 'react-native'
import { Chip } from 'react-native-paper'

import { theme } from '../../theme'
import { TopicTags } from './TopicTags'

interface TagListProps {
  values: string[]
  onPress?: (chipValue: string) => any
  onClose?: (chipValue: string) => any
}

export const TagList: React.SFC<TagListProps> = ({
  onClose,
  onPress,
  values,
}) => {
  return (
    <React.Fragment>
      {values.map(v => {
        const style: ViewStyle[] = [styles.chip]
        if (TopicTags.contains(v)) {
          style.push(styles.topicChip)
        }
        return (
          <Chip
            key={v}
            style={style}
            onPress={onPress && (() => onPress(v))}
            onClose={onClose && (() => onClose(v))}
          >
            {v}
          </Chip>
        )
      })}
    </React.Fragment>
  )
}

const styles = StyleSheet.create({
  chip: {
    marginLeft: 4,
    marginTop: 4,
  },
  topicChip: {
    borderWidth: 1,
    borderColor: theme.colors!.primary,
  },
})
