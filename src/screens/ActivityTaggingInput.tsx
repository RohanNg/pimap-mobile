/* tslint:disable:no-any */
import { Constants, Facebook, Location, Permissions } from 'expo'
import * as Immutable from 'immutable'
import * as React from 'react'
import {
  Alert,
  Button,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import { Chip } from 'react-native-paper'

import { tabBarIcon } from '../components/navigation/tabBarIcon'
import { tags } from '../data/tags'
import { theme } from '../theme'

/** All tags are in lowercase for simplicity */
const tagsLowerCase = tags.map(v => v.toLocaleLowerCase())

interface TaggingComponenState {
  query: string
  inputFieldFocused: boolean
  taggedValues: Immutable.OrderedSet<string>
}

const TopicTags: Immutable.Set<string> = Immutable.OrderedSet([
  'nature',
  'sport',
  'music',
  'animal',
  'science',
  'technology',
])

const CREATE_TAG_PREFIX = 'Create tag'

interface ActivityTaggingInputProps {
  tagSetChanged: (tags: Immutable.Set<string>) => void
  style?: {}
}

export class ActivityTaggingInput extends React.Component<
  ActivityTaggingInputProps,
  TaggingComponenState
> {
  public constructor(props: ActivityTaggingInputProps) {
    super(props)
    this.state = {
      query: '',
      inputFieldFocused: false,
      taggedValues: Immutable.OrderedSet(),
    }

    this.addTag = this.addTag.bind(this)
    this.removeTag = this.removeTag.bind(this)

    this.onInputFieldFocused = this.onInputFieldFocused.bind(this)
    this.onInputFieldBlurred = this.onInputFieldBlurred.bind(this)
  }

  public render(): React.ReactNode {
    const { query, taggedValues, inputFieldFocused } = this.state
    const data = inputFieldFocused ? this.filterData(query, taggedValues) : []

    return (
      <View style={[styles.taggingComponentContainer, this.props.style]}>
        <View style={styles.selectionContainer}>
          <ChipList
            values={this.state.taggedValues.toArray()}
            onClose={this.removeTag}
          />
          <TextInput
            placeholder="Add tags..."
            style={styles.inputField}
            autoCorrect={false}
            onChangeText={text =>
              this.setState({
                query: text,
              })
            }
            onFocus={this.onInputFieldFocused}
            onBlur={this.onInputFieldBlurred}
          />
        </View>
        {data.length && (
          <View style={styles.suggestionContainer}>
            <ChipList values={data} onPress={this.addTag} />
          </View>
        )}
      </View>
    )
  }

  private addTag(tagValue: string): void {
    const { query, taggedValues: oldTaggedValues } = this.state
    let newTag: string
    if (tagValue.startsWith(`${CREATE_TAG_PREFIX} '`)) {
      newTag = this.state.query.toLocaleLowerCase()
    } else {
      newTag = tagValue
    }

    const taggedValues = oldTaggedValues.add(newTag)
    this.props.tagSetChanged(taggedValues)
    this.setState({
      taggedValues,
    })
  }

  private removeTag(tagValue: string): void {
    const { taggedValues: oldTaggedValues } = this.state
    const taggedValues = oldTaggedValues.remove(tagValue)
    this.props.tagSetChanged(taggedValues)
    this.setState({
      taggedValues,
    })
  }

  private onInputFieldFocused(): void {
    this.setState({ inputFieldFocused: true })
  }

  private onInputFieldBlurred(): void {
    this.setState({ inputFieldFocused: false })
  }

  private filterData(
    query: string,
    existingValues: Immutable.Set<string>,
  ): string[] {
    const qryLowercase = query.toLocaleLowerCase().trim()
    if (!qryLowercase) {
      // User give no query, so we suggest topic tags
      return TopicTags.filter(t => !existingValues.contains(t!)).toArray()
    }

    let suggestion = []
    for (const tag of tagsLowerCase) {
      if (suggestion.length > 15) {
        break
      }
      const tagLwc = tag.toLocaleLowerCase()
      if (
        !existingValues.contains(tagLwc) &&
        tagLwc.indexOf(qryLowercase) !== -1
      ) {
        suggestion.push(tag)
      }
    }

    // Suggest user to create new tags
    if (
      !existingValues.contains(qryLowercase) &&
      !suggestion.some(s => s === qryLowercase)
    ) {
      suggestion = [`${CREATE_TAG_PREFIX} '${qryLowercase}'`, ...suggestion]
    }

    return suggestion
  }
}

interface ChipSetting {
  values: string[]
  onPress?: (chipValue: string) => any
  onClose?: (chipValue: string) => any
}

const ChipList: React.SFC<ChipSetting> = ({ onClose, onPress, values }) => {
  return (
    <React.Fragment>
      {values.map(v => {
        const style = [styles.chip]
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

const BORDER_WITH = 1

const border = {
  borderColor: '#b9b9b9',
  borderRadius: 1,
  borderWidth: BORDER_WITH,
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 100,
    paddingHorizontal: 8,
  },
  taggingComponentContainer: {
    ...border,
    borderRadius: 4,
    borderWidth: BORDER_WITH,
  },
  selectionContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderColor: '#b9b9b9',
    borderWidth: BORDER_WITH,
    marginHorizontal: -BORDER_WITH,
    marginVertical: -BORDER_WITH,
    borderRadius: 4,
    paddingTop: 4,
    paddingBottom: 8,
  },
  suggestionContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderColor: '#b9b9b9',
    paddingTop: 4,
    paddingBottom: 8,
  },
  chip: {
    marginLeft: 4,
    marginTop: 4,
  },
  topicChip: {
    borderWidth: 1,
    borderColor: theme.colors!.primary,
  },
  inputField: {
    flex: 1,
    marginTop: 8,
    marginLeft: 4,
    paddingLeft: 10,
    minWidth: 40,
  },
})
