import * as React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import ScrollableTabView, {
  ScrollableTabBar,
} from 'react-native-scrollable-tab-view';
import Colors from '../../constants/Colors';
import useFetchData from '../../hooks/useFetchData';
import Loading from '../../components/shared/Loading';
import NetworkError from '../../components/shared/NetworkError';
import CategoryItems from '../../components/video/home/CategoryItems';

// 分类接口地址
const url = '/video/api/v2/categories.json';

function HomeScreen({navigation}) {
  const {
    data,
    loading,
    setLoading,
    error,
    setError,
    fetchData,
  } = useFetchData(url, {categories: []});
  console.log(data.categories);
  // 判断是否加载中
  if (loading) {
    return <Loading />;
  }

  // 判断网络错误
  if (error) {
    return <NetworkError />;
  }

  let pages = data.categories.map((item) => (
    <CategoryItems
      key={item.id.toString()}
      tabLabel={item.name}
      categoryId={item.id}
    />
  ));

  if (!data.categories || data.categories.length == 0) {
    return null;
  }

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <ScrollableTabView
        initialPage={0}
        renderTabBar={() => <ScrollableTabBar />}
        style={styles.container}
        tabBarUnderlineStyle={{backgroundColor: Colors.primary}}
        tabBarBackgroundColor={Colors.white}
        tabBarInactiveTextColor={Colors.tabBarInactiveText}
        tabBarActiveTextColor={Colors.tabBarActiveText}
        tabBarTextStyle={{fontWeight: '400'}}>
        {pages}
      </ScrollableTabView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
});

export default HomeScreen;
