import React from 'react';
import {StyleSheet, Text, ViewStyle} from 'react-native';
import {TouchablePlatform} from './TouchablePlatform';

interface Props {
  style?: ViewStyle;
  title: string;
  onPress: () => void;
}

export const Button = (props: Props) => (
  <TouchablePlatform
    style={[styles.container, props.style]}
    onPress={props.onPress}>
    <Text style={styles.text}>{props.title}</Text>
  </TouchablePlatform>
);

const styles = StyleSheet.create({
  container: {
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 14,
    backgroundColor: '#4ac679',
  },
  text: {
    color: '#FFF',
    fontSize: 14,
    textAlign: 'center',
    fontWeight: '500',
    textTransform: 'uppercase',
  },
});
