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
import {presetStore, Preset} from '../data/presetStore';

interface Props {
  navigation: any;
  choices: string[];
  setChoices: (newChoices: string[]) => void;
}

const ParamViewComponent = ({navigation, choices, setChoices}: Props) => {
  let [tempData, setTempData] = useState(choices);
  let [presets, setPresets] = useState<Preset[]>([]);

  useEffect(() => {
    getPresets();
  }, []);

  const getPresets = async () => {
    if (presets.length === 0) {
      const preset = await presetStore.getAllPresets();
      if (Array.isArray(preset)) {
        setPresets(preset);
        console.log('PRESETS IN PARAMS', preset);
      }
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

  const saveCurrentChoicesAsPreset = async () => {
    const newPreset: Preset = {
      label: 'New Preset', //TODO:  ADD dialog modal to let user add label,
      data: tempData,
    };

    const savedPreset = await presetStore.savePreset(newPreset);
    if (savedPreset) {
      setPresets([...presets, savedPreset]);
    }
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={{zIndex: 2, alignItems: 'center'}}>
        {presets.length > 0 && (
          <>
            <View style={{zIndex: 2, alignItems: 'center'}}>
              <DropDown
                label="Find idea presets"
                onChange={(preset: string[]) => setTempData(preset)}
                data={presets}
              />
            </View>
            <Button
              title="clear presets"
              onPress={() => presetStore.clearPresets()}
            />
          </>
        )}
      </View>
      <View style={{flex: 1}}>
        <Button title="Save as preset" onPress={saveCurrentChoicesAsPreset} />
        <Form data={tempData} updateData={handleUpdateData} />
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
