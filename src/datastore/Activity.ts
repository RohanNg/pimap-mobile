import { action, autorun, computed, observable } from 'mobx'

export interface ActivityValue {
  creatorID: string
  publicInteractions?: {
    goingUserIDs: string[]
    interestedUserIDs: string
  }
  privateInteractions?: {
    memberIDs: string[]
    invitedUserIDs: string[]
    requestedUserIDs: string[]
  }
  title: string
  description: string
  tags: string[]
  privacy: 'public' | 'private'
  mode: 'onetime' | 'recurring'
  coordinate: {
    lat: number
    lon: number
  }
  time: Date
  coverImage: string
  images: string[]
}

interface RawActivityValue {
  creatorID: string
  title: string
  description: string
  tags: string[]
  publicInteractions: {
    goingUserIDs: string[]
    interestedUserIDs: string
  } | null
  privateInteractions: {
    memberIDs: string[]
    invitedUserIDs: string[]
    requestedUserIDs: string[]
  } | null
  privacy: 'public' | 'private'
  mode: 'onetime' | 'recurring'
  coordinate: {
    lat: number
    lon: number
  }
  timestampms: number
  coverImage: string
  images: string[]
}

export class Activity {
  // Retrieve Activity from given document reference
  // Returned undefined if the referen refer to an unknown object
  public static async retrieveFromDocRef(
    docRef: firebase.firestore.DocumentReference,
  ): Promise<Activity | undefined> {
    const docSnapShot = await docRef.get()
    return this.retrieveFromDocSnapShot(docSnapShot)
  }

  public static retrieveFromDocSnapShot(
    docSnapShot: firebase.firestore.DocumentSnapshot,
  ): Activity | undefined {
    if (!docSnapShot.exists) {
      return undefined
    }

    const {
      timestampms,
      publicInteractions,
      privateInteractions,
      ...rest
    } = docSnapShot.data() as RawActivityValue
    return new Activity(docSnapShot.ref, {
      ...rest,
      publicInteractions: publicInteractions ? publicInteractions : undefined,
      privateInteractions: privateInteractions
        ? privateInteractions
        : undefined,
      time: new Date(timestampms * 1000),
    })
  }

  public static retrieveFromQueryDocumentSnapShot(
    queryDocSnapShot: firebase.firestore.QueryDocumentSnapshot,
  ): Activity {
    // queryDocSnapShot is guaranteed to have data
    return this.retrieveFromDocSnapShot(queryDocSnapShot)!
  }

  public static async create(
    docRef: firebase.firestore.DocumentReference,
    value: ActivityValue,
  ): Promise<Activity> {
    const result = await docRef.set(Activity.toJson(value))
    return new Activity(docRef, value)
  }

  private static toJson({
    time,
    publicInteractions,
    privateInteractions,
    ...rest
  }: ActivityValue): RawActivityValue {
    return {
      ...rest,
      publicInteractions: publicInteractions ? publicInteractions : null,
      privateInteractions: privateInteractions ? privateInteractions : null,
      timestampms: time.getTime(),
    }
  }

  @observable
  public value: ActivityValue

  public readonly id: string

  public constructor(
    private readonly docRef: firebase.firestore.DocumentReference,
    value: ActivityValue,
  ) {
    this.id = docRef.id
    this.value = value
  }

  public delete(): Promise<void> {
    return this.docRef.delete()
  }
}
