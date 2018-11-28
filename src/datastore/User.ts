import { action, autorun, computed, observable } from 'mobx'
import * as firebase from 'firebase'

export interface UserValue {
  firstname: string
  lastname: string
  email: string
  hobby: string[]
  password: string
}

interface RawUserValue {
  firstname: string
  lastname: string
  email: string
  hobby: string[]
  password: string
}

export class User {
  public static async retrieve(
    docRef: firebase.firestore.DocumentReference,
  ): Promise<User | undefined> {
    const data = await docRef.get()
    if (!data.exists) {
      return undefined
    }

    const { ...rest } = data.data() as RawUserValue
    return new User({ ...rest }, docRef.id)
  }

  public static async addHobby(
    docRef: firebase.firestore.DocumentReference,
    newhobby: string[],
  ) {
    const data = await docRef.get()
    const hobbies = data.data() as RawUserValue
    const newHobby = await docRef.update({
      hobby: firebase.firestore.FieldValue.arrayUnion(newhobby),
    })
  }

  public static async createUser(
    docRef: firebase.firestore.DocumentReference,
    value: UserValue,
  ): Promise<User> {
    const result = await docRef.set(User.toJson(value))
    //console.log(docRef.id)
    return new User(value, docRef.id)
  }

  private static toJson({ ...rest }: UserValue): RawUserValue {
    return { ...rest }
  }

  @observable
  public value: UserValue
  public readonly id: string

  public constructor(value: UserValue, id: string) {
    this.id = id
    this.value = value
  }
}
