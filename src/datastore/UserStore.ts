import { action, autorun, computed, observable, runInAction } from 'mobx'
import { createTransformer } from 'mobx-utils'

import { User, RawUserValue } from './User'

export class UserStore {
  private static DB_COLLECTION: string = 'users'

  @observable
  public users: { [id: string]: User } = {}

  private userCollection: firebase.firestore.CollectionReference

  constructor(db: firebase.firestore.Firestore) {
    this.userCollection = db.collection(UserStore.DB_COLLECTION)
  }

  @action
  public async createUser(value: RawUserValue): Promise<User> {
    const user = await User.createUser(this.userCollection.doc(), value)
    return this.store(user)
  }

  @action
  private store(user: User): User {
    this.users[user.id] = user
    return user
  }
}
