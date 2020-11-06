import React, {useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback,
  Image,
  RefreshControl,
} from 'react-native';
import Loading from '../../components/shared/Loading';
import NetworkError from '../../components/shared/NetworkError';
import useFetchData from '../../hooks/useFetchData';
import ListItems from '../../components/home/ListItems';
import DividerTitle from '../../components/home/DividerTitle';
import Swiper from 'react-native-swiper';
import Colors from '../../constants/Colors';

const url = '/api/v2/home.json';

function HomeScreen({navigation}) {
  const [refreshing, setRefreshing] = useState(false);
  const {data, loading, setLoading, error, setError, fetchData} = useFetchData(
    url,
  );

  if (!data.recommended_courses || data.recommended_courses.length == 0) {
    return null;
  }
  const pages = data.recommended_courses.map((course, index) => (
    <TouchableWithoutFeedback
      key={course.id}
      onPress={() =>
        navigation.navigate('VideoCourses', {
          id: course.id,
          title: course.name,
        })
      }>
      <View style={styles.slide}>
        <Image source={{uri: course.image}} style={styles.image} />
        <Text style={styles.date}>{course.created_at}发布</Text>
        <Text style={styles.title}>{course.name}</Text>
        <Text style={styles.desc}>{course.desc}</Text>
      </View>
    </TouchableWithoutFeedback>
  ));

  // 判断是否加载中
  if (loading) {
    return <Loading />;
  }

  // 下拉刷新
  const onRefresh = () => {
    setRefreshing(true);
    fetchData(url);
    setRefreshing(false);
  };

  if (error) {
    return <NetworkError />;
  }
  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <View style={styles.content}>
        <Text style={styles.head}>发现</Text>
        <Text style={styles.heading}>推荐课程</Text>
      </View>
      <View style={styles.slides}>
        <Swiper
          loop={false}
          showsButtons={false}
          dotColor={'#999'}
          activeDotColor={Colors.primary}
          paginationStyle={styles.paginationStyle}
          dotStyle={styles.dotStyle}
          activeDotStyle={styles.dotStyle}
          removeClippedSubviews={false}>
          {pages}
        </Swiper>
      </View>
      <ListItems title={'课程发布日历'} data={data.calendar_courses} />

      <DividerTitle type={'视频教程'} subtitle={'VIDEO'} />

      <ListItems title={'最受欢迎的课程'} data={data.popular_courses} />

      <ListItems title={'入门课程'} data={data.introductory_courses} />
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
    position: 'relative',
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
  },
  dotStyle: {
    height: 7,
    width: 7,
  },
  paginationStyle: {
    marginBottom: 12,
  },
});

export default HomeScreen;
