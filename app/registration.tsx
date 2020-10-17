import * as React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { Greetings } from '../screens/registration/Greetings'
import { UserInfo } from '../screens/registration/UserInfo'
import { RegistrationStackParamList } from '../types/navigation'
import { PhoneVerify } from '../screens/registration/PhoneVerify'
import { Credentials } from '../screens/registration/Credentials'

const { Navigator, Screen } = createStackNavigator<RegistrationStackParamList>()

export function Registration() {
  return (
    <Navigator initialRouteName="Greetings" headerMode="none">
      <Screen name="Greetings" component={Greetings} />
      <Screen name="UserInfo" component={UserInfo} />
      <Screen name="PhoneVerify" component={PhoneVerify} />
      <Screen name="Credentials" component={Credentials} />
    </Navigator>
  )
}
