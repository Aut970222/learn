import React, {useLayoutEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  RefreshControl,
  TouchableWithoutFeedback,
  Alert,
  TouchableOpacity,
} from 'react-native';
import useFetchData from '../../hooks/useFetchData';
import Colors from '../../constants/Colors';
import Share from 'react-native-share';
import Collapsible from 'react-native-collapsible';
import Icon from 'react-native-vector-icons/EvilIcons';
import fetchRequest from '../../utils/fetchRequest';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-community/async-storage';


function CoursesScreen({navigation, route}) {
  const {id, title} = route.params;
  const url = `/video/api/v2/courses/${id}.json`;
  const {data, fetchData} = useFetchData(url, {course: {}, teacher: {}});
  const [refreshing, setRefreshing] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [favorite, setFavorite] = useState(false);
  console.log(data);
  useLayoutEffect(() => {
    navigation.setOptions({title: title});
  }, [navigation, title]);
  useLayoutEffect(() => {
    setFavorite(favorite);
  }, [favorite]);
  const onRefresh = () => {
    setRefreshing(true);
    fetchData(url);
    setRefreshing(false);
  };
  if (!data.chapters || data.chapters.length == 0) {
    return null;
  }
  const page = data.chapters.map((item, index) => (
    <TouchableWithoutFeedback
      key={item.id}
      onPress={() =>
        navigation.navigate('Chapter', {
          screen: 'VideoChapters',
          params: {
            id: item.id,
            title: item.title,
          },
        })
      }>
      <View style={styles.slide}>
        <View style={styles.icon}>
          <Icon name="play" size={30} color="#00ccff" />
        </View>
        <View style={styles.courseRight}>
          <Text>{index + 1}</Text>
          <View style={styles.courseTop}>
            <Text>{item.title}</Text>
            <View style={styles.courseBottom}>
              <Text style={styles.free}>{item.free ? '免费' : '付费'}</Text>
              <Text>{item.created_at}</Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  ));
  const options = {
    message: 'A framework for building native apps using React',
    url: 'http://facebook.github.io/react-native/',
    title: 'React Native',
  };

  // 显示心
  const renderHeart = () => {
    if (favorite) {
      return (
        <Ionicons
          name={'ios-heart'}
          size={28}
          color={Colors.primary}
          style={styles.favoriteIcon}
        />
      );
    }

    return (
      <Ionicons
        name={'ios-heart-outline'}
        size={28}
        color={'#C8C7CC'}
        style={styles.favoriteIcon}
      />
    );
  };

  // 关注、取消关注
  const favoriteToggle = async () => {
    const userToken = await AsyncStorage.getItem('userToken');
    if (!userToken) {
      Alert.alert('错误', '请先登录后再关注！');
      return;
    }

    const params = {obj_type: 'course', obj_id: data.course.id};
    const method = favorite ? 'DELETE' : 'POST';

    try {
      await fetchRequest('/api/v2/favorites', method, params);
      setFavorite(!favorite);
    } catch (err) {
      if (err.message == 'unauthorized') {
        Alert.alert('错误', '登录超时，请重新登录！');
        navigation.navigate('User', {
          screen: 'UserSignOut',
        });
      }
    }
  };

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>
      }>
      <Image source={{uri: data.course.image}} style={styles.image}/>
      <View style={styles.bottoms}>
        <Text style={styles.title}>{data.course.name}</Text>
        <Collapsible collapsed={isCollapsed} collapsedHeight={50}>
          <Text style={styles.content}>{data.course.body}</Text>
        </Collapsible>
        <TouchableWithoutFeedback onPress={() => setIsCollapsed(!isCollapsed)}>
          <View>
            <Text style={{textAlign: 'center'}}>
              {isCollapsed ? (
                <Icon name="chevron-down" size={60} color="#B3B3B3" />
              ) : (
                <Icon name="chevron-up" size={60} color="#B3B3B3" />
              )}
            </Text>
          </View>
        </TouchableWithoutFeedback>
        {page}
        <TouchableWithoutFeedback
          key={data.teacher.id}
          onPress={() =>
            navigation.navigate('Teacher', {
              id: data.teacher.id,
              title: data.teacher.name,
            })
          }>
          <View style={styles.teacher}>
            <Image source={{uri: data.teacher.avatar}} style={styles.pic}/>
            <Text>{data.teacher.name}</Text>
            <Text>{data.teacher.company}</Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={() =>
            Share.open(options)
              .then(console.log('分享成功'))
              .catch(console.log('分享失败'))
          }>
          <View style={styles.share}>
            <Icon name="share-apple" size={50} color="#B3B3B3" />
          </View>
        </TouchableWithoutFeedback>
        {/*<TouchableWithoutFeedback*/}
        {/*  onPress={() =>*/}
        {/*    Share.open(options)*/}
        {/*      .then(console.log('分享成功'))*/}
        {/*      .catch(console.log('分享失败'))*/}
        {/*  }>*/}
        {/*  <View style={styles.store}>*/}
        {/*    <Icon name="heart" size={50} color="#B3B3B3" />*/}
        {/*  </View>*/}
        {/*</TouchableWithoutFeedback>*/}
        <TouchableOpacity style={styles.store} onPress={() => favoriteToggle()}>
          {renderHeart()}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  head: {
    color: Colors.primary,
    fontSize: 26,
    marginTop: 28,
    marginBottom: 18,
    fontWeight: 'bold',
  },
  heading: {
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 10,
  },
  slides: {
    height: 362,
  },
  content: {
    paddingLeft: 15,
    paddingRight: 15,
  },
  slide: {
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 20,
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#B3B3B3',
  },
  image: {
    width: '100%',
    height: 210,
    borderRadius: 5,
  },
  date: {
    color: Colors.primary,
    fontSize: 12,
    marginTop: 6,
    marginBottom: 4,
  },
  title: {
    fontSize: 18,
    margin: 10,
  },
  dotStyle: {
    height: 7,
    width: 7,
  },
  paginationStyle: {
    marginBottom: 12,
  },
  pic: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  share: {
    position: 'absolute',
    top: -24,
    right: 20,
    width: 50,
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 25,
  },
  store: {
    position: 'absolute',
    top: -24,
    right: 80,
    width: 50,
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 25,
  },
  bottoms: {
    position: 'relative',
  },
  course: {
    paddingTop: 20,
    alignItems: 'center',
    borderBottomWidth: 3,
    borderBottomColor: '#000',
  },
  courseRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  courseTop: {
    justifyContent: 'space-between',
    marginLeft: 10,
    height: 60,
  },
  courseBottom: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  free: {
    paddingTop: 2,
    paddingLeft: 7,
    paddingBottom: 2,
    paddingRight: 7,
    color: '#fff',
    backgroundColor: '#00ccff',
    borderRadius: 3,
  },
  icon: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  teacher: {
    marginLeft: 15,
    marginRight: 15,
    marginTop: 10,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#B3B3B3',
  },
});
export default CoursesScreen;
