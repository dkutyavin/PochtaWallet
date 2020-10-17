import React, { PropsWithChildren } from 'react'
import { View } from 'react-native'
import { Text, Divider } from '@ui-kitten/components'
import { styles } from '../index'

export function Group({ title, children }: PropsWithChildren<{ title: string }>) {
  return (
    <View style={styles.panel}>
      <Text category="h4" style={styles.title}>
        {title}
      </Text>
      <Divider />

      {children}
    </View>
  )
}

export function DataItem({ label, info }: { label: string; info: string }) {
  return (
    <View style={{ justifyContent: 'space-between', marginBottom: 10 }}>
      <Text style={{ color: '#858585', fontSize: 18, fontWeight: '300' }}>{label}</Text>
      <Text category="h5">{info || '--'}</Text>
    </View>
  )
}
