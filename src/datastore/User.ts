import * as firebase from 'firebase'
import { action, autorun, computed, observable } from 'mobx'

export interface UserValue {
  firstname: string
  lastname: string
  email: string
  profilePicture?: string
  interests: string[]
  pushNotificationToken?: string
}

interface RawUserValue {
  firstname: string
  lastname: string
  email: string
  profilePicture: string | null
  interests: string[]
  pushNotificationToken: string | null
}

export class User {
  public static async retrieve(
    docRef: firebase.firestore.DocumentReference,
  ): Promise<User | undefined> {
    const data = await docRef.get()
    return this.retrieveFromDocSnapShot(data)
  }

  public static retrieveFromDocSnapShot(
    docSnapShot: firebase.firestore.DocumentSnapshot,
  ): User | undefined {
    if (!docSnapShot.exists) {
      return undefined
    }
    const savedData = docSnapShot.data() as RawUserValue
    return new User(this.fromRaw(savedData), docSnapShot.ref)
  }

  public static retrieveFromQueryDocumentSnapShot(
    queryDocSnapShot: firebase.firestore.QueryDocumentSnapshot,
  ): User {
    // queryDocSnapShot is guaranteed to have data
    return this.retrieveFromDocSnapShot(queryDocSnapShot)!
  }

  public static async createUser(
    docRef: firebase.firestore.DocumentReference,
    value: UserValue,
  ): Promise<User> {
    const result = await docRef.set(User.toJson(value))
    return new User(value, docRef)
  }

  private static toJson({
    profilePicture,
    pushNotificationToken,
    ...rest
  }: UserValue): RawUserValue {
    return {
      ...rest,
      profilePicture: profilePicture || null,
      pushNotificationToken: pushNotificationToken || null,
    }
  }

  private static fromRaw({
    profilePicture,
    pushNotificationToken,
    ...rest
  }: RawUserValue): UserValue {
    return {
      ...rest,
      profilePicture: profilePicture || undefined,
      pushNotificationToken: pushNotificationToken || undefined,
    }
  }

  @observable
  public value: UserValue
  public readonly id: string

  public constructor(
    value: UserValue,
    private readonly docRef: firebase.firestore.DocumentReference,
  ) {
    this.id = docRef.id
    this.value = value
  }

  public async update<K extends keyof UserValue>(
    changes: Pick<UserValue, K>,
  ): Promise<void> {
    await this.docRef.set(changes, { merge: true })
    // now do the local merge
    this.value = Object.assign(this.value, changes)
  }
}
