import {
  Button,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableNativeFeedback,
  View,
} from 'react-native';
import React, {useState, useLayoutEffect, useCallback} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {IconButton} from './components/IconButton';
import {BackIcon} from '../assets/BackIcon';
import {CheckIcon} from '../assets/CheckIcon';
import {ChoicesContext} from './context/ChoicesContext';
import {
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import {DeleteIcon} from '../assets/DeleteIcon';
import {TouchablePlatform} from './components/TouchablePlatform';

interface Props {
  navigation: any;
  choices: string[];
  setChoices: (newChoices: string[]) => void;
}

const ParamViewComponent = ({navigation, choices, setChoices}: Props) => {
  const [fields, setFields] = useState(choices); // Only used updates fields number
  const [tempChoices, setTempChoices] = useState(choices); // Keeps data editing temporarly

  const navigateBackHome = useCallback(() => {
    navigation.navigate('Home');
  }, [navigation]);

  const saveChoices = useCallback(() => {
    setChoices(tempChoices);
    navigateBackHome();
    // console.log('CHOICES TO SAVE', choices);
  }, [setChoices, tempChoices, navigateBackHome]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerMode: 'float',
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

  const updateField = (value: string, index: number) => {
    const newChoices = [...tempChoices];
    newChoices[index] = value;
    setTempChoices(newChoices);
  };

  const addField = () => {
    const newChoices = [...tempChoices, ''];
    setFields(newChoices);
    setTempChoices(newChoices);
  };

  const removeField = (index: number) => {
    const newChoices = [...tempChoices];
    newChoices.splice(index, 1);
    setFields([...newChoices]);
    setTempChoices(newChoices);
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
      <View style={{flex: 1}}>
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <Text
            style={{
              fontSize: 20,
              color: '#FFF',
              fontWeight: '500',
              marginVertical: 24,
            }}>
            Your Choices
          </Text>
          <ScrollView keyboardDismissMode="interactive">
            {fields.map((choice: string, index: number) => (
              <View key={`${choice}${index}`} style={styles.fieldContainer}>
                <TextInput
                  style={styles.field}
                  defaultValue={choice}
                  onChangeText={value => updateField(value, index)}
                  placeholder="Type your choice"
                />
                <IconButton
                  icon={<DeleteIcon color="#212121" />}
                  onPress={() => removeField(index)}
                />
              </View>
            ))}
          </ScrollView>
          <TouchablePlatform
            onPress={() => addField()}
            style={{
              backgroundColor: '#8bdcaa',
              height: 60,
              width: 60,
              borderRadius: 30,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={{fontSize: 40, fontWeight: 'bold', color: '#FFF'}}>
              +
            </Text>
          </TouchablePlatform>
        </KeyboardAvoidingView>
      </View>
      <Button title="Enregistrer mes choix" onPress={saveChoices} />
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
    height: 600,
    alignItems: 'center',
  },
  fieldContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  field: {
    borderWidth: 1,
    padding: 4,
    width: 300,
    color: '#212121',
    backgroundColor: '#FFF',
  },
});
