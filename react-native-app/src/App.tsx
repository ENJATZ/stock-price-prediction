import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Block, GalioProvider } from 'galio-framework';
import React from 'react';
import * as Screen from './screens';
import './localization/i18n';
import { SCREEN } from './utils/definitions';
import theme from './utils/theme';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { StatusBar } from 'react-native';
import { AppContextProvider } from './components/AppContextProvider/AppContextProvider';
import { useTranslation } from 'react-i18next';

const App = () => {
  const { t } = useTranslation();
  const Tab = createBottomTabNavigator();
  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" />
      <AppContextProvider>
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

                  switch (route.name) {
                    case SCREEN.HOME:
                      iconName = 'poll';
                      break;
                    case SCREEN.VIEWCHART:
                      iconName = 'chart-bar';
                      break;
                    case SCREEN.SEARCH:
                      iconName = 'search';
                      break;
                    case SCREEN.FAVORITES:
                      iconName = 'star';
                      break;
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
                tabBarShowLabel: false,
              })}>
              <Tab.Screen
                name={SCREEN.HOME}
                component={Screen.Home}
                options={{
                  title: t('homeScreen.title'),
                }}
              />
              <Tab.Screen
                name={SCREEN.SEARCH}
                component={Screen.Search}
                options={{
                  title: t('searchScreen.title'),
                }}
              />
              <Tab.Screen
                name={SCREEN.VIEWCHART}
                component={Screen.ViewChart}
                options={{
                  title: t('viewChartScreen.title'),
                }}
              />
              <Tab.Screen
                name={SCREEN.FAVORITES}
                component={Screen.Favorites}
                options={{
                  title: t('favoriteScreen.title'),
                }}
              />
            </Tab.Navigator>
          </Block>
        </GalioProvider>
      </AppContextProvider>
    </NavigationContainer>
  );
};

export default App;
