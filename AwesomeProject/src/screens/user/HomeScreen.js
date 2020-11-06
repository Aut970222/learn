import * as React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import ScrollableTabView, {
  ScrollableTabBar,
} from 'react-native-scrollable-tab-view';
import Colors from '../../constants/Colors';
import UserHome from '../../components/user/UserHome';
import Histories from '../../components/user/Histories';
import StoreCourses from '../../components/user/StoreCourses';

function HomeScreen() {
  const uri = '/api/v2/users/me.json';
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
        <View tabLabel="我的主页" style={styles.container}>
          <UserHome uri={uri} />
        </View>
        <View tabLabel="历史收看" style={styles.container}>
          <Histories uri={'/api/v2/users/course_histories.json'} />
        </View>
        <Text tabLabel="收藏的课程">
          <StoreCourses uri={'/api/v2/users/favorite_courses.json'} />
        </Text>
        <Text tabLabel="收藏的文档">project</Text>
      </ScrollableTabView>
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

export default HomeScreen;
