import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  RefreshControl,
  FlatList,
} from 'react-native';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import useFetchData from '../../../hooks/useFetchData';
import Loading from '../../shared/Loading';
import NoData from '../../shared/NoData';
import NetworkError from '../../shared/NetworkError';
import Colors from '../../../constants/Colors';

const api = '/video/api/v2/categories/';

function CategoryItems(props) {
  const navigation = useNavigation();
  const {categoryId} = props;
  const url = `${api}${categoryId}.json`;
  const [refreshing, setRefreshing] = useState(false);
  const {
    data,
    setData,
    loading,
    setLoading,
    error,
    setError,
    fetchData,
  } = useFetchData(url);

  // 判断是否加载中
  if (loading) {
    return <Loading />;
  }

  // 判断网络错误
  if (error) {
    return <NetworkError />;
  }

  // 如果没有数据
  if (data.courses.length == 0) {
    return <NoData />;
  }

  // 课程列表
  const renderItem = ({item, index}) => (
    <TouchableWithoutFeedback
      onPress={() =>
        navigation.navigate('VideoCourses', {
          id: item.id,
          title: item.name,
        })
      }>
      <View style={styles.item}>
        <Image source={{uri: item.image}} style={styles.image} />
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.body} numberOfLines={3}>
          {item.body}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );

  // 下拉刷新
  const onRefresh = () => {
    setRefreshing(true);
    fetchData(url);
    setRefreshing(false);
  };

  return (
    <FlatList
      style={styles.container}
      data={data.courses}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderItem}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          tintColor={Colors.primary}
        />
      }
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  item: {
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

export default CategoryItems;
