import * as React from 'react'
import { BottomNavigation, BottomNavigationTab } from '@ui-kitten/components'
import { MainStackParamList } from '../types/navigation'
import { Profile } from '../screens/main/Profile'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

const { Navigator, Screen } = createBottomTabNavigator<MainStackParamList>()

export function MainApp() {
  return (
    <Navigator initialRouteName="Profile" tabBar={(props) => <BottomTabBar {...props} />}>
      <Screen name="Profile" component={Profile} />
    </Navigator>
  )
}

const BottomTabBar = ({ navigation, state }: any) => (
  <BottomNavigation
    selectedIndex={state.index}
    onSelect={(index) => navigation.navigate(state.routeNames[index])}
  >
    <BottomNavigationTab title="ПРОФИЛЬ" />
  </BottomNavigation>
)
