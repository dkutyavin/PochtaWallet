import * as React from 'react'
import {
  Icon,
  TopNavigation as TopNavigationUI,
  TopNavigationAction,
  Text,
} from '@ui-kitten/components'

export function TopNavigation({ title, onPress }: { title: string; onPress: any }) {
  return (
    <TopNavigationUI
      accessoryLeft={(props) => <BackAction onPress={onPress} {...props} />}
      title={(evaProps) => <Text {...evaProps}>{title}</Text>}
      subtitle={(evaProps) => <Text {...evaProps}>Назад</Text>}
    />
  )
}

const BackIcon = (props: any) => <Icon {...props} name="arrow-back" />
const BackAction = (props: any) => <TopNavigationAction icon={BackIcon} {...props} />
