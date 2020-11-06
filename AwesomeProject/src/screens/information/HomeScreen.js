import React, {useState, useLayoutEffect} from 'react';
import {
  FlatList,
  StyleSheet,
  RefreshControl,
  TouchableWithoutFeedback,
  View,
  Text,
} from 'react-native';
import Loading from '../../components/shared/Loading';
import NetworkError from '../../components/shared/NetworkError';
import NoData from '../../components/shared/NoData';
import Colors from '../../constants/Colors';
import {TabHeaderButtons, Item} from '../../components/shared/TabHeaderButtons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import useFetchData from '../../hooks/useFetchData';

const url = '/information/api/v2/articles.json';

// 加载更多初始值哈哈
const loadMore = {
  currentPage: 1,
  lastPage: false,
};

function HomeScreen({navigation}) {
  useLayoutEffect(() => {
    navigation.setOptions({
      title: '新闻',
      headerRight: () => (
        <TabHeaderButtons>
          <Item
            title="close"
            IconComponent={Ionicons}
            iconName="ios-close"
            iconSize={30}
            color={Colors.primary}
            onPress={() => navigation.goBack()}
          />
        </TabHeaderButtons>
      ),
    });
  }, [navigation]);

  const [refreshing, setRefreshing] = useState(false);
  const {
    data,
    setData,
    loading,
    setLoading,
    error,
    setError,
    fetchData,
  } = useFetchData(url, {
    articles: [],
  });

  // 判断是否加载中
  if (loading) {
    return <Loading />;
  }

  // 重新加载
  const onReload = () => {
    setLoading(true);
    setError(false);
    fetchData(url);
  };

  // 判断网络错误
  if (error) {
    return <NetworkError onReload={onReload} />;
  }

  // 判断是否有数据
  if (data.articles.length == 0) {
    return <NoData />;
  }

  // 下拉刷新
  const onRefresh = async () => {
    setRefreshing(true);
    fetchData(url);
    setRefreshing(false);
  };

  // 加载更多
  const onEndReached = async () => {
    // 如果是最后一页，直接返回
    if (loadMore.lastPage) {
      return;
    }

    // 页面数自增
    loadMore.currentPage++;

    // 读取接口
    let response = await fetch(`${url}?page=${loadMore.currentPage}`);
    let res = await response.json();

    // 如果没有新数据，设置为最后一页
    if (res.articles.length == 0) {
      loadMore.lastPage = true;
      return;
    }

    // 添加数据到 data 里
    setData({articles: [...data.articles, ...res.articles]});
  };

  // 通知列表
  const renderItem = ({item, index}) => (
    <TouchableWithoutFeedback
      onPress={() => {
        navigation.navigate('InformationArticles', {
          id: item.id,
          title: item.title,
        });
      }}>
      <View style={styles.notice}>
        <Text style={styles.noticeTitle}>{item.title}</Text>
        <Text style={styles.date}>{item.created_at}</Text>
      </View>
    </TouchableWithoutFeedback>
  );

  // 分割线
  const renderSeparator = () => (
    <View style={styles.separator}>
      <View style={styles.separatorInner} />
    </View>
  );

  return (
    <FlatList
      style={styles.container}
      ItemSeparatorComponent={renderSeparator}
      data={data.articles}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderItem}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          tintColor={Colors.primary}
        />
      }
      onEndReached={onEndReached}
      onEndReachedThreshold={0.1}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingTop: 10,
  },
  notice: {
    display: 'flex',
    marginLeft: 10,
    minHeight: 70,
  },
  noticeTitle: {
    flex: 1,
    fontSize: 14,
    fontWeight: '200',
    marginTop: 10,
    marginBottom: 10,
  },
  date: {
    flex: 1,
    fontSize: 12,
    fontWeight: '200',
    color: '#4D5154',
    paddingBottom: 10,
    alignSelf: 'flex-end',
    paddingRight: 5,
  },
  separator: {
    marginLeft: 15,
    marginRight: 0,
    backgroundColor: '#C8C7CC',
  },
  separatorInner: {
    height: StyleSheet.hairlineWidth,
  },
});

export default HomeScreen;
