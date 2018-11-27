import { action, autorun, computed, observable, runInAction } from 'mobx'
import { createTransformer } from 'mobx-utils'

import { Activity, ActivityValue } from './Activity'

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
      return Promise.resolve(savedActivity)
    }

    // Retrieve && update cache
    const docRef = this.activityCollection.doc(activityKey)
    const activity = await Activity.retrieveFromDocRef(docRef)
    if (!activity) {
      return undefined
    }

    return this.store(activity)
  }

  @action
  public async createActivity(value: ActivityValue): Promise<Activity> {
    const activity = await Activity.create(this.activityCollection.doc(), value)
    return this.store(activity)
  }

  public async query(
    f: (
      collectionRef: firebase.firestore.CollectionReference,
    ) => firebase.firestore.Query,
  ): Promise<Activity[]> {
    const query = f(this.activityCollection)
    const result = await query.get()

    const activities = runInAction(() => {
      return result.docs.map(doc => {
        const activity = Activity.retrieveFromQueryDocumentSnapShot(doc)
        return this.store(activity)
      })
    })

    return activities
  }

  @action
  private store(activity: Activity): Activity {
    this.activities[activity.id] = activity
    return activity
  }
}
