import { ActivityStore } from './ActivityStore'
import { UserStore } from './UserStore'

export { ActivityStore } from './ActivityStore'
export { Activity, ActivityValue } from './Activity'
export { UserStore } from './UserStore'
export { User, UserValue } from './User'

export interface AppStateStore {
  activityStore: ActivityStore
  userStore: UserStore
}

export function buildAppDataStore({
  db,
}: {
  db: firebase.firestore.Firestore
}): AppStateStore {
  return {
    activityStore: new ActivityStore(db),
    userStore: new UserStore(db),
  }
}
