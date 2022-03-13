import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Block, GalioProvider} from 'galio-framework';
import React from 'react';
import * as Screen from './screens';
//import * as S from './App.styles';
//import './src/localization/i18n';
import {SCREEN} from './utils/definitions';
import theme from './utils/theme';
import {Dimensions, ScrollView, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const App = () => {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <GalioProvider theme={theme}>
        <Block flex>
          <Stack.Navigator
            initialRouteName={SCREEN.HOME}
            screenOptions={{
              headerShown: false,
            }}>
            <Stack.Screen name={SCREEN.HOME} component={Screen.Home} />
            <Stack.Screen
              name={SCREEN.VIEWCHART}
              component={Screen.ViewChart}
            />
          </Stack.Navigator>
        </Block>
      </GalioProvider>
    </NavigationContainer>
  );
};

export default App;
