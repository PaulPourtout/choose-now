import {View, Text, StyleSheet, Button} from 'react-native';
import React, {useState} from 'react';
import {WheelView} from './WheelView';
import {ParamView} from './ParamView';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ChoicesContext} from './context/ChoicesContext';

export const MainView = ({navigation}) => {
  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.setChoicesButton}>
        <Text style={styles.title}>{'Nico,\n choisis !'}</Text>
      </View>
      <View style={styles.wheelContainer}>
        <ChoicesContext.Consumer>
          {({choices}) => <WheelView choices={choices} />}
        </ChoicesContext.Consumer>
      </View>
      <View style={styles.setChoicesButton}>
        <Button
          onPress={() => navigation.navigate('SetChoices')}
          title="Set your choices"
        />
      </View>
      {/* <ParamView choices={choices} handleChoicesUpdate={setChoices} /> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FF4848',
  },
  wheelContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    justifyContent: 'center',
    fontSize: 40,
    textAlign: 'center',
    lineHeight: 50,
    fontWeight: '800',
    color: '#FFF',
  },
  setChoicesButton: {
    flex: 0.5,
    justifyContent: 'center',
  },
});
