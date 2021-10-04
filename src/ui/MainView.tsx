import {View, Text, StyleSheet, SafeAreaView} from 'react-native';
import React, {useState} from 'react';
import {WheelView} from './WheelView';
import {ParamView} from './ParamView';

export const MainView = ({}) => {
  const [choices, setChoices] = useState(['Pizza', 'Profiteroles', 'Tiramisu']);
  return (
    <SafeAreaView style={styles.mainContainer}>
      <Text>Nico, choisis !</Text>
      <WheelView choices={choices} />
      <ParamView choices={choices} handleChoicesUpdate={setChoices} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#B1FFFD',
  },
});
