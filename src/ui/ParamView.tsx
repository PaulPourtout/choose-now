import {StyleSheet, View} from 'react-native';
import React, {useLayoutEffect, useCallback, useState, useEffect} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {IconButton} from './components/IconButton';
import {BackIcon} from './components/icons/BackIcon';
import {CheckIcon} from './components/icons/CheckIcon';
import {ChoicesContext} from './context/ChoicesContext';
import {Button} from './components/Button';
import {Form} from './components/ParamView/Form';
import {DropDown} from './components/DropDown';
import {presetStore} from '../data/presetStore';

// const PRESETS = [
//   {
//     label: 'Yes/No',
//     data: ['No', 'Yes'],
//   },
//   {
//     label: 'Restaurant',
//     data: ['Italian', 'Bobun', 'Chinese', 'Burger', 'Jap'],
//   },
//   {
//     label: 'Activities',
//     data: ['Cinema', 'Walk', 'Art expo', 'Drink'],
//   },
//   {
//     label: 'Music',
//     data: ['Rock', 'Blues', 'Rap', 'Pop'],
//   },
//   {
//     label: "Who's the boss ?",
//     data: ['You'],
//   },
// ];

interface Props {
  navigation: any;
  choices: string[];
  setChoices: (newChoices: string[]) => void;
}

const ParamViewComponent = ({navigation, choices, setChoices}: Props) => {
  let tempData: string[] = choices;
  let [presets, setPresets] = useState([]);

  useEffect(() => {
    getPresets();
  }, []);

  const getPresets = async () => {
    if (presets.length === 0) {
      const preset = await presetStore.getAllPresets();
      setPresets(preset);
      console.log('PRESETS', preset);
    }
  };

  const navigateBackHome = useCallback(() => {
    navigation.navigate('Home');
  }, [navigation]);

  const saveChoices = useCallback(() => {
    setChoices(tempData);
    navigateBackHome();
  }, [setChoices, tempData, navigateBackHome]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <IconButton
          onPress={navigateBackHome}
          icon={<BackIcon color="#FFF" />}
        />
      ),
      headerRight: () => (
        <IconButton onPress={saveChoices} icon={<CheckIcon color="#FFF" />} />
      ),
    });
  }, [navigation, saveChoices, navigateBackHome]);

  const handleUpdateData = (data: string[]) => {
    tempData = data;
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={{zIndex: 2, alignItems: 'center'}}>
        {presets.length > 0 && (
          <View>
            <DropDown
              label="Find idea presets"
              onChange={(preset: string[]) => setChoices(preset)}
              data={presets}
            />
            <Button title="clear presets" onPress={presetStore.clearPresets} />
          </View>
        )}
      </View>
      <View style={{flex: 1}}>
        <Form data={choices} updateData={handleUpdateData} />
      </View>
      <View>
        <Button
          title="Enregistrer mes choix"
          onPress={saveChoices}
          style={styles.saveButton}
        />
      </View>
    </SafeAreaView>
  );
};

export const ParamView = ({navigation}) => (
  <ChoicesContext.Consumer>
    {({choices, setChoices}) => (
      <ParamViewComponent
        choices={choices}
        setChoices={setChoices}
        navigation={navigation}
      />
    )}
  </ChoicesContext.Consumer>
);

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#FF4848',
  },
  header: {
    backgroundColor: '#E14242',
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '600',
    padding: 16,
    flex: 1,
  },
  saveButton: {
    width: 250,
    marginVertical: 42,
    alignSelf: 'center',
  },
});
