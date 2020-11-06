import * as React from 'react';
import {View, Text, StyleSheet, Image, TouchableWithoutFeedback, FlatList} from 'react-native';
import useFetchData from '../../hooks/useFetchData';
import {useNavigation} from '@react-navigation/native';

function Histories(props) {
  const {uri} = props;
  const navigation = useNavigation();

  const {
    data,
    loading,
    setLoading,
    error,
    setError,
    fetchData,
  } = useFetchData(uri, {histories: []});
  console.log(data);

  const renderItem = ({item, index}) => (
    // <TouchableWithoutFeedback
    //   onPress={() =>
    //     navigation.navigate('Chapter', {
    //       screen: 'VideoChapters',
    //       params: {
    //         id: item.id,
    //         title: item.title,
    //       },
    //     })
    //   }>
      <View style={styles.container}>
        <Text>{item.chapter.title}</Text>
        <Image source={{uri: item.course.image}} style={styles.image} />
        <Text>{item.course.name}</Text>
      </View>
    // </TouchableWithoutFeedback>
  );
  return (
    <View style={styles.container}>
      <FlatList
        data={data.histories}
        renderItem={renderItem}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  image: {
    width: 60,
    height: 60,
    // borderRadius: 5,
  },
  row: {
    flexDirection: 'row',
  },
});
export default Histories;
