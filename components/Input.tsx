import * as React from 'react'
import { Controller } from 'react-hook-form'
import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native'
import { Input as UIKittenInput, Text, InputProps, Icon } from '@ui-kitten/components'

export const Input = (props: Props) => {
  const { label, control, name, rules, error, ...inputProps } = props

  return (
    <View style={styles.container}>
      <Controller
        control={control}
        render={({ onChange, onBlur, value }) => (
          <UIKittenInput
            caption={(props: any) => <Text {...props}>{error}</Text>}
            status={error ? 'danger' : 'primary'}
            label={label}
            onBlur={onBlur}
            onChangeText={(value) => onChange(value)}
            value={value}
            {...inputProps}
          />
        )}
        name={name}
        rules={rules}
        defaultValue=""
      />
    </View>
  )
}

export const InputPassword: typeof Input = (props) => {
  const [secureTextEntry, setSecureTextEntry] = React.useState(true)

  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry)
  }

  const renderIcon = (props: any) => (
    <TouchableWithoutFeedback onPress={toggleSecureEntry}>
      <Icon {...props} name={secureTextEntry ? 'eye-off' : 'eye'} />
    </TouchableWithoutFeedback>
  )

  return <Input secureTextEntry={secureTextEntry} accessoryRight={renderIcon} {...props} />
}

interface Props extends InputProps {
  name: string
  control: ControllerProps['control']
  rules?: ControllerProps['rules']
  label?: string
  error?: string
}

type ControllerProps = React.ComponentProps<typeof Controller>

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  input: {
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 5,
    paddingVertical: 5,
    paddingLeft: 5,
    fontSize: 16,
    height: 40,
  },
  label: {
    paddingVertical: 5,
    fontSize: 16,
    fontWeight: 'bold',
  },
  textError: {
    color: '#fc6d47',
    fontSize: 14,
  },
})
