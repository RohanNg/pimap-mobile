import * as React from 'react'

import { MaterialIcons } from '@expo/vector-icons'

export const tabBarIcon = (name: string) => ({
  tintColor,
  focused,
}: {
  tintColor: string | null
  focused: boolean
}) => (
  <MaterialIcons
    style={{ backgroundColor: 'transparent' }}
    name={name}
    color={tintColor || 'black'}
    size={focused ? 24 : 30}
  />
)
