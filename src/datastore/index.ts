import { ActivityStore } from './ActivityStore'

export { ActivityStore } from './ActivityStore'
export { Activity, ActivityValue } from './Activity'

export interface AppStateStore {
  activityStore: ActivityStore
}

export function buildAppDataStore({
  db,
}: {
  db: firebase.firestore.Firestore
}): AppStateStore {
  return {
    activityStore: new ActivityStore(db),
  }
}
