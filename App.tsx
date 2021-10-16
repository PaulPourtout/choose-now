import React, {useState} from 'react';
import {MainView} from './src/ui/MainView';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ParamView} from './src/ui/ParamView';
import 'react-native-gesture-handler';
import {ChoicesContext} from './src/ui/context/ChoicesContext';
import {Text} from 'react-native';

const Stack = createNativeStackNavigator();

const App = () => {
  const [choices, setChoices] = useState(['No', 'Yes']);

  return (
    <NavigationContainer>
      <ChoicesContext.Provider value={{choices, setChoices}}>
        <Stack.Navigator>
          <Stack.Group screenOptions={{headerShown: false}}>
            <Stack.Screen name="Home" component={MainView} />
          </Stack.Group>
          <Stack.Group
            screenOptions={{
              presentation: 'fullScreenModal',
            }}>
            <Stack.Screen
              name="SetChoices"
              component={ParamView}
              options={{
                headerTitle: () => (
                  <Text style={{color: '#FFF', fontSize: 20, marginLeft: 8}}>
                    Set your choices
                  </Text>
                ),
                headerBackVisible: false,
                headerStyle: {backgroundColor: '#E14242'},
              }}
            />
          </Stack.Group>
        </Stack.Navigator>
      </ChoicesContext.Provider>
    </NavigationContainer>
  );
};

export default App;
