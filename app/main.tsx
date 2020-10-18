import * as React from 'react'
import { BottomNavigation, BottomNavigationTab } from '@ui-kitten/components'
import { MainStackParamList } from '../types/navigation'
import { Profile } from '../screens/main/Profile'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Documents } from '../screens/main/Documents'
import { VCDetails } from '../screens/main/VCDetails'

const { Navigator, Screen } = createBottomTabNavigator<MainStackParamList>()

export function MainApp() {
  return (
    <Navigator
      initialRouteName="Profile"
      tabBar={(props) => {
        if (props.state.index > 1) return null
        return <BottomTabBar {...props} />
      }}
    >
      <Screen name="Profile" component={Profile} />
      <Screen name="Documents" component={Documents} />
      <Screen name="VCDetails" component={VCDetails} />
    </Navigator>
  )
}

const BottomTabBar = ({ navigation, state }: any) => (
  <BottomNavigation
    selectedIndex={state.index}
    onSelect={(index) => navigation.navigate(state.routeNames[index])}
  >
    <BottomNavigationTab title="ПРОФИЛЬ" />
    <BottomNavigationTab title="Документы" />
  </BottomNavigation>
)
