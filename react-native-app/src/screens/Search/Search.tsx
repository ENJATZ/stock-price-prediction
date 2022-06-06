import { Block } from 'galio-framework';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Animated,
  Dimensions,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import { AutocompleteDropdown } from 'react-native-autocomplete-dropdown';
import LinearGradient from 'react-native-linear-gradient';
import { LanguageSelector } from '../../components/LanguageSelector/LanguageSelector';
import { Text } from '../../components/Text/Text';
import { useKeyboardStatus } from '../../hooks/useKeyboardStatus';
import { DataSetType, SuggestionType } from '../../types';
import { SCREEN } from '../../utils/definitions';
import * as S from './Search.styles';
import yahooService from '../../services/yahoo.service';
import theme from '../../utils/theme';

export const Search = ({ navigation }: any) => {
  const HEIGHT = 200;

  const { t } = useTranslation();
  const { height } = Dimensions.get('screen');
  const [dataSet, setDataSet] = useState<DataSetType[] | undefined>(undefined);
  const dropdownController = useRef(null);
  const [suggestionsLoading, setSuggestionsLoading] = useState(false);
  const animatedValue = React.useRef(new Animated.Value(HEIGHT)).current;
  const isKeyboardOpened = useKeyboardStatus();

  const navigateToChart = (symbol: string) => {
    navigation.navigate(SCREEN.VIEWCHART, { symbol });
  };

  const getSuggestions = useCallback(async input => {
    if (typeof input !== 'string' || input.length < 2) {
      setDataSet(undefined);
      return;
    }
    setSuggestionsLoading(true);

    const yahooSuggestions = await yahooService.findSuggestions(input);
    const _dataSet = yahooSuggestions
      .filter(
        (item: SuggestionType) => item.name && item.exchange && item.symbol,
      )
      .map((item: SuggestionType, index) => ({
        id: index.toString(),
        title: `${item.symbol};${item.name};${item.exchange}`,
      }));
    setDataSet(_dataSet);
    setSuggestionsLoading(false);
  }, []);

  const handleItemSelection = (id: string) => {
    const symbol = dataSet && dataSet[parseInt(id)].title?.split(';')[0];
    if (symbol) {
      navigateToChart(symbol);
    }
  };
  useEffect(() => {
    const toValue = isKeyboardOpened ? HEIGHT * 0.8 : HEIGHT;
    Animated.timing(animatedValue, {
      toValue: toValue,
      delay: 0,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, [isKeyboardOpened, animatedValue]);

  return (
    <LinearGradient
      colors={[theme.COLORS.DARK3, theme.COLORS.DARK3]}
      style={{ height: height }}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <S.KeyboardAvoidingView>
          <S.ViewLayout>
            <S.Img
              style={{ width: animatedValue, height: animatedValue }}
              source={require('../../assets/logo.png')}
            />
            <Text>{t('homeScreen.findTicker')}</Text>
            <AutocompleteDropdown
              //ref={searchRef}
              controller={controller => {
                dropdownController.current = controller;
              }}
              dataSet={dataSet}
              onChangeText={getSuggestions}
              onSelectItem={item => {
                item && handleItemSelection(item.id);
              }}
              debounce={600}
              suggestionsListMaxHeight={Dimensions.get('window').height * 0.4}
              // onClear={onClearPress}
              //  onSubmit={(e) => onSubmitSearch(e.nativeEvent.text)}
              // onOpenSuggestionsList={onOpenSuggestionsList}
              loading={suggestionsLoading}
              useFilter={false} // prevent rerender twice
              textInputProps={{
                placeholder: t('homeScreen.findPlaceholder'),
                autoCorrect: false,
                autoCapitalize: 'none',
                style: {
                  borderRadius: 5,
                  backgroundColor: '#383b42',
                  color: '#fff',
                  paddingLeft: 18,
                },
              }}
              rightButtonsContainerStyle={{
                borderRadius: 5,
                right: 8,
                height: 30,
                top: 10,
                alignSelf: 'center',
                backgroundColor: '#383b42',
              }}
              inputContainerStyle={{
                backgroundColor: 'transparent',
                width: 200,
              }}
              suggestionsListContainerStyle={{
                backgroundColor: '#383b42',
                width: 200,
              }}
              containerStyle={{ flexGrow: 1, flexShrink: 1 }}
              renderItem={(item, text) => {
                const info = item?.title?.split(';');
                return (
                  <Block style={{ padding: 15 }}>
                    <Text style={{ fontSize: 12 }}>{info && info[0]}</Text>
                    <Text style={{ fontSize: 8, color: 'gray' }}>
                      {info && info[1]} - {info && info[2]}
                    </Text>
                  </Block>
                );
              }}
              inputHeight={50}
              showChevron={false}
            />
          </S.ViewLayout>
        </S.KeyboardAvoidingView>
      </TouchableWithoutFeedback>
      <Block
        style={{
          position: 'absolute',
          bottom: 200,
          display: 'flex',
          justifyContent: 'center',
          width: '100%',
        }}>
        <LanguageSelector />
      </Block>
    </LinearGradient>
  );
};
