import React from 'react';
import {StyleSheet} from 'react-native';
import {TouchablePlatform} from './TouchablePlatform';

interface Props {
  onPress: () => void;
  icon: React.ReactElement;
  style?: any;
}

export const IconButton = ({onPress, icon, style}: Props) => (
  <TouchablePlatform style={[styles.wrapper, style]} onPress={onPress}>
    {icon}
  </TouchablePlatform>
);

const styles = StyleSheet.create({
  wrapper: {
    width: 42,
    height: 42,
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
