import * as Immutable from 'immutable'
import { topicTags } from '../../data/topicTags'

export const TopicTags: Immutable.Set<string> = Immutable.OrderedSet(
  topicTags.map(t => t.name.toLocaleLowerCase()),
)
