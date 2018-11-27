import { action, autorun, computed, observable, runInAction } from 'mobx'
import { createTransformer } from 'mobx-utils'

import { User, RawUserValue } from './User'

export class UserStore {
  private static DB_COLLECTION: string = 'users'
  private static DB_DOCUMENT: string

  @observable
  public users: { [id: string]: User } = {}

  private userCollection: firebase.firestore.CollectionReference

  constructor(db: firebase.firestore.Firestore) {
    this.userCollection = db.collection(UserStore.DB_COLLECTION)
  }

  @action
  public async createUser(value: RawUserValue, uid: string): Promise<User> {
    const user = await User.createUser(this.userCollection.doc(uid), value)
    return this.store(user, uid)
  }

  @action
  private store(user: User, uid: string): User {
    this.users[uid] = user
    return user
  }
}
