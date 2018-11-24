import { ActivityStore } from './ActivityStore'
export * from './ActivityStore'

export interface AppStateStore {
  activityStore: ActivityStore
}

export const appStateStore: AppStateStore = {
  activityStore: new ActivityStore(),
}
