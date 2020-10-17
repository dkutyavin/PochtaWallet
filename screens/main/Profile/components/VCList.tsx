import React from 'react';
import { Icon, ListItem, List } from '@ui-kitten/components';

export const VCList = () => {
  const passport = [{ title: 'Выдан: Почта России', description: 'Тип документа: Паспорт РФ' }];

  const renderItemIcon = (props: any) => <Icon {...props} name="person" />;

  const renderItem = ({ item }: any) => (
    <ListItem title={item.title} description={item.description} accessoryLeft={renderItemIcon} />
  );

  return <List style={{ backgroundColor: 'white' }} data={passport} renderItem={renderItem} />;
};