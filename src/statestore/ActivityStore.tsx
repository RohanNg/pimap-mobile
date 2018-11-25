import { action, autorun, computed, observable } from 'mobx'
import { createTransformer } from 'mobx-utils'

export interface Activity {
  id: string
  userID: string
  title: string
  description: string
  tags: string[]
  privary: 'public' | 'private'
  mode: 'onetime' | 'recurring'
  location?: {
    latitude: number
    longitude: number
  }
  time: Date
  images: string[]
}

export class ActivityStore {
  @observable
  public activities: { [id: string]: Activity } = {}

  // Use autorun if you have a function that should run automatically but that doesn't result in a new value
  // Mutation that run automatically
  private loggerDisposer = autorun(() =>
    console.info(
      'from Activity Store: cool, state was updated and number of activities are',
      Object.keys(this.activities).length,
    ),
  )

  public getActivitiesForUser: (
    userID: string,
  ) => Activity[] = createTransformer(id => {
    const activities = []
    for (const k of Object.keys(this.activities)) {
      const value = this.activities[k]
      if (value.userID === id) {
        activities.push(value)
      }
    }
    return activities
  })

  @computed
  // reactively && pure function highly optimized by mobx that
  // + produce a value that can be used by other observers
  // + highly optimized by mobx
  private get activityCount(): number {
    return Object.keys(this.activities).length
  }

  public getActivity(key: string): Activity | undefined {
    return this.activities[key]
  }

  // Use @action for performant and optimized mutation
  // This method should be invoked directly on store instance.
  // .e.g. activityStore.addActivity(...)
  @action
  public addActivity(activity: Activity): void {
    this.activities[activity.id] = activity
  }

  // Use @action for performant and optimized mutation
  // This method should be invoked directly on store instance.
  // .e.g. activityStore.addActivity(...)
  @action
  public setActivityTItle(activityID: string, title: string): void {
    const ac = this.activities[activityID]
    if (ac) {
      ac.title = title
    }
  }

  @action.bound
  // With bound, this method can be passed around as a function
  // .e.g
  // const mutate = addActivityDirect
  // mutate()
  public addActivityDirect(activity: Activity): void {
    this.activities[activity.id] = activity
  }
}
