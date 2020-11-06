import React, {useLayoutEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import Colors from '../../constants/Colors';
import useFetchData from '../../hooks/useFetchData';
import Icon from 'react-native-vector-icons/EvilIcons';

function HomeScreen({navigation}) {
  useLayoutEffect(() => {
    navigation.setOptions({title: '搜索'});
  });
  const url = '/api/v2/search/hot_keys';
  const {data, fetchData} = useFetchData(url);
  const [key, setKey] = useState('');
  const setSearchKey = (key) => {
    console.log(key);
    setKey(key);
  };
  const onSubmitEditing = () => {
    navigation.navigate('SearchResults', {
      key: key,
    });
  };
  const hotkey = data.map((item, index) => (
    <TouchableWithoutFeedback key={item}>
      <View>
        <Text
          style={styles.hotkey}
          onPress={() =>
            navigation.navigate('SearchResults', {
              key: item,
            })
          }>
          {item}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  ));
  return (
    <View style={styles.container}>
      <Icon name="search" size={30} color="#CCCCCC" />
      <TextInput
        style={styles.input}
        autoCapitalize={'none'}
        autoFocus={true}
        returnKeyType={'search'}
        selectionColor={Colors.primary}
        onChangeText={(key) => setSearchKey(key)}
        onSubmitEditing={() => onSubmitEditing()}
      />
      <Text>热门搜索内容</Text>
      <View style={styles.hot}>{hotkey}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
    paddingLeft: 8,
    paddingRight: 8,
  },
  input: {
    backgroundColor: '#fff',
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 5,
    paddingTop: 5,
    paddingBottom: 5,
  },
  hot: {
    flexDirection: 'row',
    marginTop: 10,
    // justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  hotkey: {
    paddingRight: 5,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 5,
    backgroundColor: '#66E0FF',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    marginBottom: 10,
  },
});

export default HomeScreen;
