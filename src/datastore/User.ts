import { action, autorun, computed, observable } from 'mobx'

export interface UserValue {
    userId: string
    firstname: string
    lastname: string
    email: string 
    hobby: string[]
    password: string 

}

interface RawUserValue {
    userId: string
    firstname: string
    lastname: string
    email: string 
    hobby: string[]
    password: string 

}

export class User {
    

    public static async createUser (
        docRef: firebase.firestore.DocumentReference,
        value:  UserValue,
    ): Promise<User> {
        const result = await docRef.set(User.toJson(value))
        return new User(docRef, value)
    }

    private static toJson({ ...rest }: UserValue): RawUserValue {
        return { ...rest }
    }

    @observable
    public value: UserValue

    public readonly id: string

    public constructor(
        private readonly docRef: firebase.firestore.DocumentReference,
        value: UserValue,
      ) {
        this.id = docRef.id
        this.value = value
      }


       
    
}