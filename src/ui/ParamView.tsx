import {
  Button,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {IconButton} from './components/IconButton';
import {BackIcon} from '../assets/BackIcon';
import {CheckIcon} from '../assets/CheckIcon';
import {ChoicesContext} from './context/ChoicesContext';

interface Props {
  navigation: any;
  choices: string[];
  setChoices: (newChoices: string[]) => void;
}

const ParamViewComponent = ({navigation, choices, setChoices}: Props) => {
  const [fields, setFields] = useState(choices); // Only used updates fields number
  const [tempChoices, setTempChoices] = useState(choices); // Keeps data editing temporarly

  navigation.setOptions({
    headerLeft: () => <></>,
    headerRight: () => (
      <IconButton icon={<CheckIcon color="#FFF" />} onPress={saveChoices} />
    ),
  });

  const saveChoices = () => {
    setChoices(tempChoices);
    navigateBackHome();
    console.log('CHOICES TO SAVE', {tempChoices, fields, choices});
  };

  const updateField = (value: string, index: number) => {
    const newChoices = [...tempChoices];
    newChoices[index] = value;
    setTempChoices(newChoices);
    console.log('UPDATING FIELD', newChoices);
  };

  const addField = () => {
    console.log('add field', {tempChoices, fields});
    const newChoices = [...tempChoices, ''];
    setFields(newChoices);
    setTempChoices(newChoices);
  };

  const removeField = (index: number) => {
    const newChoices = [...tempChoices];
    newChoices.splice(index, 1);
    setFields([...newChoices]);
    setTempChoices(newChoices);
    console.log('NEW TEMP CHOICES', {tempChoices, fields});
  };

  const navigateBackHome = () => {
    console.log('BACK TO HOME');

    navigation.navigate('Home');
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      {/* <View style={styles.header}>
        <IconButton
          icon={<BackIcon color="#FFF" />}
          onPress={navigateBackHome}
        />
        <Text style={styles.headerTitle}>Set choices</Text>
        <IconButton icon={<CheckIcon color="#FFF" />} onPress={saveChoices} />
      </View> */}
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <Text>Inscris tes choix ici:</Text>
        <ScrollView keyboardDismissMode="interactive">
          {fields.map((choice: string, index: number) => (
            <View key={`${choice}${index}`} style={styles.fieldContainer}>
              <Text>Choix {index + 1}: </Text>
              <TextInput
                style={styles.field}
                defaultValue={choice}
                onChangeText={value => updateField(value, index)}
                placeholder="Type your choice"
              />
              <Button title="Supprimer" onPress={() => removeField(index)} />
            </View>
          ))}
        </ScrollView>

        <Button title="Ajouter un choix" onPress={addField} />
        <Button title="Enregistrer mes choix" onPress={saveChoices} />
      </KeyboardAvoidingView>
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
  iconButton: {},
  iconButtonText: {
    color: '#FFF',
  },
  container: {
    marginTop: 15,
    height: 300,
  },
  fieldContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  field: {
    borderWidth: 1,
    padding: 4,
    minWidth: 150,
    color: '#212121',
    backgroundColor: '#FFF',
  },
});
