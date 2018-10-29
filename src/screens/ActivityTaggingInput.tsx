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

/** All tags are in lowercase for simplicity */
const tagsLowerCase = tags.map(v => v.toLocaleLowerCase())

interface TaggingComponenState {
  query: string
  inputFieldFocused: boolean
  taggedValues: Immutable.OrderedSet<string>
}

const CREATE_TAG_PREFIX = 'Create tag'

interface ActivityTaggingInputProps {
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
            placeholder="Search..."
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
    const { query, taggedValues } = this.state
    let newTag: string
    if (tagValue.startsWith(`${CREATE_TAG_PREFIX} '`)) {
      newTag = this.state.query.toLocaleLowerCase()
    } else {
      newTag = tagValue
    }
    this.setState({
      taggedValues: taggedValues.add(newTag),
    })
  }

  private removeTag(tagValue: string): void {
    this.setState(({ taggedValues }) => ({
      taggedValues: taggedValues.remove(tagValue),
    }))
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
      return []
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
        return (
          <Chip
            key={v}
            style={styles.chip}
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
  inputField: {
    flex: 1,
    marginTop: 8,
    marginLeft: 4,
    paddingLeft: 10,
    minWidth: 40,
  },
})
