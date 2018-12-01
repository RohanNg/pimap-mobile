import { action, autorun, computed, observable } from 'mobx'

export interface UserValue {
  firstname: string
  lastname: string
  email: string
  profilePicture?: string
  interests: string[]
}

interface RawUserValue {
  firstname: string
  lastname: string
  email: string
  profilePicture: string | null
  interests: string[]
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
    return new User(this.fromRaw(savedData), docSnapShot.id)
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
    return new User(value, docRef.id)
  }

  private static toJson({ profilePicture, ...rest }: UserValue): RawUserValue {
    return {
      ...rest,
      profilePicture: profilePicture || null,
    }
  }

  private static fromRaw({ profilePicture, ...rest }: RawUserValue): UserValue {
    return {
      ...rest,
      profilePicture: profilePicture || undefined,
    }
  }

  @observable
  public value: UserValue
  public readonly id: string

  public constructor(value: UserValue, id: string) {
    this.id = id
    this.value = value
  }
}
