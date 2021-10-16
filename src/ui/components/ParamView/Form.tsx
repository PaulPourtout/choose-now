import React, {useEffect, useState} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {DeleteIcon} from '../icons/DeleteIcon';
import {IconButton} from '../IconButton';
import {TouchablePlatform} from '../TouchablePlatform';

interface Props {
  data: string[];
  updateData: (data: string[]) => void;
}

export const Form = ({data, updateData}: Props) => {
  const [tempChoices, setTempChoices] = useState(data);
  const [fields, setFields] = useState(data);

  const handleUpdateField = (newData: string[]) => {
    setTempChoices(newData);
    updateData(newData);
  };

  const handleOnChangeField = (value: string, index: number) => {
    const newChoices = [...tempChoices];
    newChoices[index] = value;
    handleUpdateField(newChoices);
  };

  const addField = () => {
    const newChoices = [...tempChoices, ''];
    setFields(newChoices);
    handleUpdateField(newChoices);
  };

  const removeField = (index: number) => {
    const newChoices = [...tempChoices];
    newChoices.splice(index, 1);
    setFields([...newChoices]);
    handleUpdateField(newChoices);
  };

  useEffect(() => {
    setTempChoices(data);
    setFields(data);
  }, [data]);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <Text style={styles.sectionTitle}>Your Choices</Text>
      <ScrollView keyboardDismissMode="interactive">
        {fields.map((choice: string, index: number) => (
          <View key={`${choice}${index}`} style={styles.fieldContainer}>
            <TextInput
              style={styles.field}
              defaultValue={choice}
              onChangeText={value => handleOnChangeField(value, index)}
              placeholder="Type your choice"
            />
            <IconButton
              icon={<DeleteIcon color="#212121" />}
              onPress={() => removeField(index)}
            />
          </View>
        ))}
      </ScrollView>
      <TouchablePlatform onPress={() => addField()} style={styles.addButton}>
        {/* TODO: Replace text with icon */}
        <Text style={{fontSize: 40, fontWeight: 'bold', color: '#FFF'}}>+</Text>
      </TouchablePlatform>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
    height: 350,
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 20,
    color: '#FFF',
    fontWeight: '500',
    marginVertical: 24,
  },
  fieldContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  field: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 4,
    width: 300,
    color: '#212121',
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#6C6C6C',
  },
  addButton: {
    backgroundColor: '#F9B208',
    height: 60,
    width: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
