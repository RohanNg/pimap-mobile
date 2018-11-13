import * as React from 'react'

import { MaterialIcons } from '@expo/vector-icons'

export const tabBarIcon = (name: string) => ({
  tintColor,
}: {
  tintColor: string | null
  focused: boolean
}) => (
  <MaterialIcons
    style={{ backgroundColor: 'transparent' }}
    name={name}
    color={tintColor || 'black'}
    size={24}
  />
)
