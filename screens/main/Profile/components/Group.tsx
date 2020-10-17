import React, { PropsWithChildren } from 'react';
import { View } from 'react-native';
import { Text, Divider } from '@ui-kitten/components';
import { styles } from '../index';

export function Group({ title, children }: PropsWithChildren<{ title: string; }>) {
  return (
    <View style={styles.panel}>
      <Text category="h4" style={styles.title}>
        {title}
      </Text>
      <Divider />

      {children}
    </View>
  );
}
