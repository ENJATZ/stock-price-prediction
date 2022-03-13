import React, {useState, useRef, useCallback, useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {Dimensions, ScrollView, Image, Animated} from 'react-native';
import {Button} from '../../components/Button/Button';
import {Text} from '../../components/Text/Text';
import {Block, Icon} from 'galio-framework';
import LinearGradient from 'react-native-linear-gradient';
import theme from '../../utils/theme';
import {AutocompleteDropdown} from 'react-native-autocomplete-dropdown';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faXmark, faCircleDown} from '@fortawesome/free-solid-svg-icons';
import {findSuggestions} from './HomeAPI';
import {SuggestionType, DataSetType} from '../../types';
import Spinner from 'react-native-loading-spinner-overlay';
import {ProgressBar} from '../../components/ProgressBar/ProgressBar';

export const Home = ({navigation}: any) => {
  const {t, i18n} = useTranslation();
  const {height, width} = Dimensions.get('screen');
  const [dataSet, setDataSet] = useState<DataSetType[] | undefined>(undefined);
  const dropdownController = useRef(null);
  const countInterval = useRef<any>(null);
  const loaderValue = useRef(new Animated.Value(0)).current;
  const [suggestionsLoading, setSuggestionsLoading] = useState(false);
  const [loading, setLoading] = useState(0);

  const getSuggestions = useCallback(async input => {
    if (typeof input !== 'string' || input.length < 2) {
      setDataSet(undefined);
      return;
    }
    setSuggestionsLoading(true);

    const yahooSuggestions = await findSuggestions(input);
    const dataSet = yahooSuggestions.map((item: SuggestionType, index) => ({
      id: index.toString(),
      title: `${item.symbol};${item.name};${item.exchange}`,
    }));
    setDataSet(dataSet);

    setSuggestionsLoading(false);
  }, []);

  // Loading handling
  const handleItemSelection = (id: string) => {
    const symbol = dataSet && dataSet[parseInt(id)].title?.split(';')[0];
    if (symbol) {
      console.log(symbol);
      setLoading(1);
      countInterval.current = setInterval(
        () => setLoading(old => old + 5),
        300,
      );
      return () => {
        clearInterval(countInterval!); //when user exits, clear this interval.
      };
    }
  };
  const load = (count: any) => {
    Animated.timing(loaderValue, {
      toValue: count, //final value
      duration: 500, //update value in 500 milliseconds
      useNativeDriver: false,
    }).start();
  };
  useEffect(() => {
    load(loading);
    if (loading >= 100) {
      setLoading(100);
      clearInterval(countInterval);
    }
  }, [loading]);
  // Loading handling

  const aWidth = loaderValue.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
    extrapolate: 'clamp',
  });
  if (loading > 0 && loading < 100) {
    return (
      <LinearGradient
        colors={[theme.COLORS.DARK1, theme.COLORS.DARK1]}
        style={{height: height}}>
        <Block flex center style={{paddingTop: 30}}>
          <Spinner visible textStyle={{color: 'white'}} />
          <Block style={{paddingTop: 450}}>
            <ProgressBar aWidth={aWidth} />
          </Block>
        </Block>
      </LinearGradient>
    );
  }
  return (
    <LinearGradient
      colors={[theme.COLORS.PALLETE2, theme.COLORS.PALLETE2]}
      style={{height: height}}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{display: 'flex'}}>
        <Block flex center style={{marginTop: 200}}>
          <Image
            style={{width: 220, height: 220}}
            source={require('../../assets/logo.png')}
          />
          <Text>Search a company</Text>
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
              placeholder: 'e.g: AAPL (Apple)',
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
              width: 260,
            }}
            containerStyle={{flexGrow: 1, flexShrink: 1}}
            renderItem={(item, text) => {
              const info = item?.title?.split(';');
              return (
                <Block style={{padding: 15}}>
                  <Text style={{fontSize: 12}}>{info && info[0]}</Text>
                  <Text style={{fontSize: 8, color: 'gray'}}>
                    {info && info[1]} - {info && info[2]}
                  </Text>
                </Block>
              );
            }}
            inputHeight={50}
            showChevron={false}
          />
        </Block>
      </ScrollView>
    </LinearGradient>
  );
};
