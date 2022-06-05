import React from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  lang: {
    width: 32,
    height: 32,
    margin: 10,
  },
});
export const LanguageSelector = () => {
  const { i18n } = useTranslation();
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => i18n.changeLanguage('en')}>
        <Image style={styles.lang} source={require('../../assets/en.png')} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => i18n.changeLanguage('ro')}>
        <Image style={styles.lang} source={require('../../assets/ro.png')} />
      </TouchableOpacity>
    </View>
  );
};
