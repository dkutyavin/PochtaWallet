import { StackNavigationProp } from '@react-navigation/stack'

// registration
export type RegistrationStackParamList = {
  Greetings: undefined
  PhoneVerify: undefined
  UserInfo: undefined
  Credentials: undefined
}

type RegistrationScreenNavigationProp<
  T extends keyof RegistrationStackParamList
> = StackNavigationProp<RegistrationStackParamList, T>

export type RegistrationScreenProps<T extends keyof RegistrationStackParamList> = {
  navigation: RegistrationScreenNavigationProp<T>
}

// main
export type MainStackParamList = {
  Profile: undefined
  VC: undefined
  VCDetails: undefined
  Documents: undefined
}

export type MainScreenProps<T extends keyof MainStackParamList> = {
  navigation: StackNavigationProp<MainStackParamList, T>
}
