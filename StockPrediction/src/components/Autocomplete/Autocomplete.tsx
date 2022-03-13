import {AutocompleteDropdown} from 'react-native-autocomplete-dropdown';

export const Autocomplete = () => {
  return (
    <AutocompleteDropdown
      ref={searchRef}
      controller={controller => {
        dropdownController.current = controller;
      }}
      dataSet={suggestionsList}
      onChangeText={getSuggestions}
      onSelectItem={item => {
        item && setSelectedItem(item.id);
      }}
      debounce={600}
      suggestionsListMaxHeight={Dimensions.get('window').height * 0.4}
      // onClear={onClearPress}
      //  onSubmit={(e) => onSubmitSearch(e.nativeEvent.text)}
      // onOpenSuggestionsList={onOpenSuggestionsList}
      loading={loading}
      useFilter={false} // prevent rerender twice
      textInputProps={{
        placeholder: 'Type 3+ letters',
        autoCorrect: false,
        autoCapitalize: 'none',
        style: {
          borderRadius: 25,
          backgroundColor: '#383b42',
          color: '#fff',
          paddingLeft: 18,
        },
      }}
      rightButtonsContainerStyle={{
        borderRadius: 25,
        right: 8,
        height: 30,
        top: 10,
        alignSelfs: 'center',
        backgroundColor: '#383b42',
      }}
      inputContainerStyle={{
        backgroundColor: 'transparent',
      }}
      suggestionsListContainerStyle={{
        backgroundColor: '#383b42',
      }}
      containerStyle={{flexGrow: 1, flexShrink: 1}}
      renderItem={(item, text) => (
        <Text style={{color: '#fff', padding: 15}}>{item.title}</Text>
      )}
      ChevronIconComponent={<Feather name="x-circle" size={18} color="#fff" />}
      ClearIconComponent={
        <Feather name="chevron-down" size={20} color="#fff" />
      }
      inputHeight={50}
      showChevron={false}
      //  showClear={false}
    />
  );
};
