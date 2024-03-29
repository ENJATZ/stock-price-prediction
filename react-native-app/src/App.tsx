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
import SplashScreen from 'react-native-splash-screen';
import { AppContextProvider } from './components/AppContextProvider/AppContextProvider';
import { useTranslation } from 'react-i18next';
import { LogBox } from 'react-native';

LogBox.ignoreAllLogs();
const App = () => {
  const { t } = useTranslation();
  const Tab = createBottomTabNavigator();

  React.useEffect(() => {
    SplashScreen.hide();
  });

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
                  borderBottomWidth: 0,
                  backgroundColor: '#1E1E1E',
                  shadowOffset: {
                    width: 0,
                    height: 12,
                  },
                  shadowOpacity: 0.02,
                  shadowRadius: 16.0,
                  shadowColor: 'white',
                  elevation: 24,
                  bottom: 0,
                  padding: 10,
                  width: '100%',
                  zIndex: 0,
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
                  borderTopWidth: 0,
                  shadowOffset: {
                    width: 0,
                    height: 12,
                  },
                  shadowOpacity: 0.58,
                  shadowRadius: 16.0,
                  elevation: 24,
                  bottom: 0,
                  padding: 10,
                  width: '100%',
                  zIndex: 0,
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
