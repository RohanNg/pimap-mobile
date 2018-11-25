import { action, autorun, computed, observable, runInAction } from 'mobx'
import { createTransformer } from 'mobx-utils'

import { Activity, RawActivityValue } from './Activity'

export class ActivityStore {
  private static DB_COLLECTION: string = 'activities'

  @observable
  public activities: { [id: string]: Activity } = {}

  private activityCollection: firebase.firestore.CollectionReference

  constructor(db: firebase.firestore.Firestore) {
    this.activityCollection = db.collection(ActivityStore.DB_COLLECTION)
  }

  @action
  public async getActivity(activityKey: string): Promise<Activity | undefined> {
    // Lookup cache
    const savedActivity = this.activities[activityKey]
    if (savedActivity) {
      console.info('Activity found in cache')
      return Promise.resolve(savedActivity)
    }

    // Retrieve && update cache
    const docRef = this.activityCollection.doc(activityKey)
    const activity = await Activity.retrieve(docRef)
    if (activity) {
      this.store(activity)
    }
    return activity
  }

  @action
  public async createActivity(value: RawActivityValue): Promise<Activity> {
    const activity = await Activity.create(this.activityCollection.doc(), value)
    console.info('activity was created')
    this.store(activity)
    return activity
  }

  @action
  private store(activity: Activity): void {
    this.activities[activity.id] = activity
  }
}
