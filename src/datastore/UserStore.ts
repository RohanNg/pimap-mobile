import { action, autorun, computed, observable, runInAction } from 'mobx'
import { createTransformer } from 'mobx-utils'

import { User, UserValue } from './User'

export class UserStore {
  private static DB_COLLECTION: string = 'users'

  @observable
  public users: { [id: string]: User } = {}

  private userCollection: firebase.firestore.CollectionReference

  constructor(db: firebase.firestore.Firestore) {
    this.userCollection = db.collection(UserStore.DB_COLLECTION)
  }

  @action
  public async getUser(userId: string): Promise<User | undefined> {
    // Lookup cache
    const savedUser = this.users[userId]
    if (savedUser) {
      return Promise.resolve(savedUser)
    }

    // Retrieve && update cache
    const docRef = this.userCollection.doc(userId)
    const user = await User.retrieve(docRef)
    if (!user) {
      return undefined
    }

    return this.store(user)
  }

  @action
  public async createUser(value: UserValue, uid: string): Promise<User> {
    const user = await User.createUser(this.userCollection.doc(uid), value)
    return this.store(user)
  }

  public async query(
    f: (
      collectionRef: firebase.firestore.CollectionReference,
    ) => firebase.firestore.Query,
  ): Promise<User[]> {
    const query = f(this.userCollection)
    const result = await query.get()

    const activities = runInAction(() => {
      return result.docs.map(doc => {
        const user = User.retrieveFromQueryDocumentSnapShot(doc)
        return this.store(user)
      })
    })

    return activities
  }

  public async getAllUsers(): Promise<User[]> {
    const result = await this.userCollection.get()
    const users = runInAction(() => {
      return result.docs.map(doc => {
        const user = User.retrieveFromQueryDocumentSnapShot(doc)
        return this.store(user)
      })
    })
    return users
  }

  @action
  private store(user: User): User {
    this.users[user.id] = user
    return user
  }
}
