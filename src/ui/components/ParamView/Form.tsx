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
import {AddIcon} from '../icons/AddIcon';
import {IconButton} from '../IconButton';

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
          <Field
            key={`${choice}${index}`}
            updateField={value => handleOnChangeField(value, index)}
            removeField={() => removeField(index)}
            defaultValue={choice}
          />
        ))}
      </ScrollView>
      <IconButton
        style={styles.addButton}
        icon={<AddIcon color="#FFF" size={40} />}
        onPress={addField}
      />
    </KeyboardAvoidingView>
  );
};

interface FieldProps {
  updateField: (value: string) => void;
  removeField: () => void;
  defaultValue: string;
}

const Field = ({updateField, removeField, defaultValue}: FieldProps) => (
  <View style={styles.fieldContainer}>
    <TextInput
      style={styles.field}
      defaultValue={defaultValue}
      onChangeText={updateField}
      placeholder="Type your choice"
    />
    <IconButton
      style={styles.fieldIcon}
      icon={<DeleteIcon color="#212121" />}
      onPress={removeField}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
    // maxHeight: 450,
    flex: 1,
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
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
    width: 300,
    height: 42,
    color: '#212121',
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#6C6C6C',
    borderRightWidth: 0,
  },
  fieldIcon: {
    borderWidth: 1,
    borderColor: '#805a00',
    backgroundColor: '#F9B208',
    borderBottomRightRadius: 4,
    borderTopRightRadius: 4,
  },
  addButton: {
    marginTop: 8,
    backgroundColor: '#F9B208',
    height: 60,
    width: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
