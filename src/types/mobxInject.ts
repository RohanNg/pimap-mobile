import * as React from 'react'
import { Omit } from 'typelevel-ts'
type Common<A, B> = { [P in keyof A & keyof B]: A[P] | B[P] }

declare module 'mobx-react' {
  export function inject<
    Store,
    InjecttedProps extends object,
    CompProps extends object
  >(
    mapStoreToProps: (store: Store) => InjecttedProps,
  ): (
    component: React.ComponentType<CompProps>,
  ) => React.ComponentType<Omit<CompProps, keyof InjecttedProps>>

  export function inject<Store extends object, CompProps extends object>(
    mapStoreToProps: (store: Store) => Common<Store, CompProps>,
  ): (
    component: React.ComponentType<CompProps>,
  ) => React.ComponentType<Omit<CompProps, keyof Common<Store, CompProps>>>
}
