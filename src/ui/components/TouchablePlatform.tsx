import React from 'react';
import {Platform, TouchableNativeFeedback, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

export const TouchablePlatform = props => {
  return Platform.OS === 'ios' ? (
    <TouchableOpacity {...props}>{props.children}</TouchableOpacity>
  ) : (
    <TouchableNativeFeedback {...props}>
      <View style={props.style}>{props.children}</View>
    </TouchableNativeFeedback>
  );
};
