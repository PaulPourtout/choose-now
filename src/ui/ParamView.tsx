import {StyleSheet, View} from 'react-native';
import React, {useLayoutEffect, useCallback} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {IconButton} from './components/IconButton';
import {BackIcon} from './components/icons/BackIcon';
import {CheckIcon} from './components/icons/CheckIcon';
import {ChoicesContext} from './context/ChoicesContext';
import {Button} from './components/Button';
import {Form} from './components/ParamView/Form';
import {DropDown} from './components/DropDown';

const PRESETS = [
  {
    label: '1',
    data: ['1', 'no'],
  },
  {
    label: '2',
    data: ['2', 'no'],
  },
  {
    label: '3',
    data: ['3', 'no'],
  },
  {
    label: '4',
    data: ['4', 'no'],
  },
  {
    label: '5',
    data: ['5', 'no'],
  },
];

interface Props {
  navigation: any;
  choices: string[];
  setChoices: (newChoices: string[]) => void;
}

const ParamViewComponent = ({navigation, choices, setChoices}: Props) => {
  let tempData: string[] = choices;

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
      <View style={{flex: 1}}>
        <View style={{zIndex: 200}}>
          <View style={{alignItems: 'center'}}>
            <DropDown
              label="Find idea presets"
              onChange={(preset: string[]) => setChoices(preset)}
              data={PRESETS}
            />
          </View>
        </View>
        <Form data={choices} updateData={handleUpdateData} />
      </View>
      <Button
        title="Enregistrer mes choix"
        onPress={saveChoices}
        style={styles.saveButton}
      />
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
