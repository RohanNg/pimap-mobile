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
  taggedValues: Immutable.OrderedSet<string>
}

const CREATE_TAG_PREFIX = 'Create tag'

export class AutoCompleteTest extends React.Component<
  {},
  TaggingComponenState
> {
  public constructor(props: {}) {
    super(props)
    this.state = {
      query: '',
      taggedValues: Immutable.OrderedSet(),
    }

    this.addTag = this.addTag.bind(this)
    this.removeTag = this.removeTag.bind(this)
  }

  public render(): React.ReactNode {
    const { query, taggedValues } = this.state
    const data = this.filterData(query, taggedValues)
    return (
      <View style={styles.container}>
        <Text> What the fuck is going on</Text>
        <View style={styles.taggingComponentContainer}>
          <View style={styles.selectedChipsContainer}>
            <ChipList
              values={this.state.taggedValues.toArray()}
              onClose={this.removeTag}
            />
            <TextInput
              placeholder={'...'}
              style={styles.inputField}
              autoCorrect={false}
              onChangeText={text =>
                this.setState({
                  query: text,
                })
              }
            />
          </View>
          <View style={styles.selectedChipsContainer}>
            <ChipList values={data} onPress={this.addTag} />
          </View>
        </View>
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

  private filterData(
    query: string,
    existingValues: Immutable.Set<string>,
  ): string[] {
    const qryLowercase = query.toLocaleLowerCase().trim()
    if (!qryLowercase) {
      return []
    }

    const suggestion = []
    if (!existingValues.contains(qryLowercase)) {
      suggestion.push(`${CREATE_TAG_PREFIX} '${qryLowercase}'`)
    }
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

const border = {
  borderColor: '#b9b9b9',
  borderRadius: 1,
  borderWidth: 1,
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
    borderWidth: 2,
    paddingBottom: 4,
  },
  chip: {
    marginLeft: 4,
    marginTop: 4,
  },
  inputField: {
    flex: 1,
    marginTop: 8,
    marginLeft: 6,
    paddingLeft: 10,
    minWidth: 40,
  },
  selectedChipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
})
