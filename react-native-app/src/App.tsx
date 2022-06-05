import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Block, GalioProvider } from 'galio-framework';
import React from 'react';
import * as Screen from './screens';
import './localization/i18n';
import { SCREEN } from './utils/definitions';
import theme from './utils/theme';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { SafeAreaView, StatusBar } from 'react-native';

const App = () => {
  const Stack = createStackNavigator();
  const Tab = createBottomTabNavigator();
  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" />
      <GalioProvider theme={theme}>
        <Block flex>
          <Tab.Navigator
            screenOptions={({ route }) => ({
              headerTintColor: 'white',
              headerStyle: {
                backgroundColor: '#1E1E1E',
              },
              tabBarIcon: ({ focused, color, size }) => {
                let iconName;

                if (route.name === 'Home') {
                  iconName = 'home';
                } else if (route.name === 'View Chart') {
                  iconName = 'chart-bar';
                } else if (route.name === 'Favorites') {
                  iconName = 'star';
                } else if (route.name === 'Search') {
                  iconName = 'search';
                }

                return (
                  <FontAwesome5
                    name={iconName}
                    solid={focused}
                    brand={!focused}
                    color={color}
                    size={size}
                  />
                );
              },
              tabBarActiveTintColor: theme.COLORS.YELLOW_LOGO,
              tabBarInactiveTintColor: 'gray',
              tabBarStyle: {
                backgroundColor: '#1E1E1E',
                position: 'absolute',
                height: 80,
              },
              tabBarLabelStyle: { marginBottom: -3, paddingTop: 0 },
            })}>
            <Tab.Screen name="Home" component={Screen.Search} />
            <Tab.Screen name="Search" component={Screen.Search} />
            <Tab.Screen name="Favorites" component={Screen.ViewChart} />
          </Tab.Navigator>
        </Block>
      </GalioProvider>
    </NavigationContainer>
  );
  // return (
  //   <NavigationContainer>
  //     <GalioProvider theme={theme}>
  //       <Block flex>
  //         <Stack.Navigator
  //           initialRouteName={SCREEN.HOME}
  //           screenOptions={{
  //             headerShown: false,
  //           }}>
  //           <Stack.Screen name={SCREEN.HOME} component={Screen.Home} />
  //           <Stack.Screen
  //             name={SCREEN.VIEWCHART}
  //             component={Screen.ViewChart}
  //           />
  //         </Stack.Navigator>
  //       </Block>
  //     </GalioProvider>
  //   </NavigationContainer>
  // );
};

export default App;
