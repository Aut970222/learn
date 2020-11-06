import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  FlatList,
  RefreshControl,
  ScrollView,
} from 'react-native';
import useFetchData from '../../hooks/useFetchData';
import {useNavigation} from '@react-navigation/native';
import Colors from '../../constants/Colors';

function StoreCourses(props) {
  const {uri} = props;
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation();
  const {
    data,
    loading,
    setLoading,
    error,
    setError,
    fetchData,
  } = useFetchData(uri, {courses: []});
  console.log(data);

  // 下拉刷新
  const onRefresh = () => {
    setRefreshing(true);
    fetchData(uri);
    setRefreshing(false);
  };

  const renderItem = ({item, index}) => (
    <TouchableWithoutFeedback
      onPress={() =>
        navigation.navigate('VideoCourses', {
          id: item.id,
          title: item.name,
        })
      }>
      <View style={styles.items}>
        <Image source={{uri: item.image}} style={styles.image} />
        <Text style={styles.title}>{item.name}</Text>
        {/*<Text style={styles.body} numberOfLines={3}>*/}
        {/*  {item.body}*/}
        {/*</Text>*/}
      </View>
    </TouchableWithoutFeedback>
  );
  return (
    <View style={styles.container}>
      <FlatList
        data={data.courses}
        renderItem={renderItem}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={Colors.primary}
          />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  row: {
    flexDirection: 'row',
  },
  items: {
    position: 'relative',
    marginTop: 10,
    marginBottom: 50,
    marginLeft: 10,
    marginRight: 10,
  },
  image: {
    height: 150,
    borderRadius: 5,
  },
  title: {
    marginTop: 10,
    fontSize: 16,
  },
  body: {
    fontSize: 12,
    marginTop: 6,
    color: Colors.date,
    lineHeight: 18,
  },
});
export default StoreCourses;
