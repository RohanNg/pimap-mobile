import { action, autorun, computed, observable } from 'mobx'

export interface UserValue {
  uid: string
  firstname: string
  lastname: string
  email: string
  hobby: string[]
  password: string
}

export interface RawUserValue {
  uid: string
  firstname: string
  lastname: string
  email: string
  hobby: string[]
  password: string
}

export class User {
  public static async createUser(
    docRef: firebase.firestore.DocumentReference,
    value: UserValue,
  ): Promise<User> {
    const result = await docRef.set(User.toJson(value))
    return new User(value)
  }

  private static toJson({ ...rest }: UserValue): RawUserValue {
    return { ...rest }
  }

  @observable
  public value: UserValue

  public constructor(value: UserValue) {
    this.value = value
  }
}
