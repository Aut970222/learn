import * as React from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  Image,
  StyleSheet,
  ScrollView,
} from 'react-native';
import useFetchData from '../../hooks/useFetchData';

function ResultsScreen({route, navigation}) {
  // console.log(route);
  const {key} = route.params;
  // console.log(route.params.key);
  const url = `/api/v2/search.json?q=${key}`;
  const {data, fetchData} = useFetchData(url);
  console.log(data);
  if (!data.courses || data.courses.length == 0) {
    return null;
  }
  const page = data.courses.map((item) => (
    <TouchableWithoutFeedback
      key={item.id}
      onPress={() =>
        navigation.navigate('VideoCourses', {
          id: item.id,
          title: item.title,
        })
      }>
      <View>
        <Image source={{uri: item.image}} style={styles.image}/>
        <Text>{item.name}</Text>
        <Text>{item.body}</Text>
      </View>
    </TouchableWithoutFeedback>
  ));
  return (
    <View style={styles.container}>
      <ScrollView>{page}</ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 210,
    borderRadius: 5,
  },
});

export default ResultsScreen;
