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

export const ParamView = ({choices, handleChoicesUpdate}) => {
  const [tempChoices, setTempChoices] = useState(choices);
  const saveChoices = () => handleChoicesUpdate(tempChoices);
  const updateField = (value: string, index: number) => {
    const newChoices = [...tempChoices];
    newChoices[index] = value;
    setTempChoices(newChoices);
  };

  const addField = () => setTempChoices([...tempChoices, '']);
  const removeField = (index: number) => {
    const newChoices = [...tempChoices];
    newChoices.splice(index, 1);
    setTempChoices(newChoices);
  };
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <Text>Inscris tes choix ici:</Text>
      <ScrollView>
        {tempChoices.map((choice: string, index: number) => (
          <View key={`${choice}${index}`} style={styles.fieldContainer}>
            <Text>Choix {index + 1}: </Text>
            <TextInput
              style={styles.field}
              key={index}
              onChangeText={value => updateField(value, index)}>
              {choice}
            </TextInput>
            <Button title="Supprimer" onPress={() => removeField(index)} />
          </View>
        ))}
      </ScrollView>

      <Button title="Ajouter un choix" onPress={addField} />
      <Button title="Enregistrer mes choix" onPress={saveChoices} />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
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
    backgroundColor: '#FFF',
  },
});
