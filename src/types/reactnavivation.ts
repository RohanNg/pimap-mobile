import * as React from 'react'
import { NavigationInjectedProps } from 'react-navigation'

declare module 'react-navigation' {
  function withNavigation<P>(
    Component: React.ComponentType<P & NavigationInjectedProps>,
  ): React.ComponentType<P>
}
