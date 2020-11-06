import React, {useState} from 'react';
import {
  Dimensions,
  StyleSheet,
  FlatList,
  Text,
  View,
  TouchableHighlight,
} from 'react-native';
import useFetchData from '../../hooks/useFetchData';
import Icon from 'react-native-vector-icons/EvilIcons';

const window = Dimensions.get('window');

function Menu(props) {
  const {onItemSelected, chapters, course} = props;
  // console.log(chapters);

  // 顶部标题
  const renderHeader = () => (
    <Text style={styles.courseName}>{course.name}</Text>
  );

  // 分割线
  const renderSeparator = () => (
    <View style={styles.separator}>
      <View style={styles.separator_inner} />
    </View>
  );

  // 切换视频
  const playVideo = (item) => {
    onItemSelected(item.id, item.title);
  };
  const renderItem = ({item, index}) => (
    <TouchableHighlight underlayColor="#ddd" onPress={() => playVideo(item)}>
      <View style={styles.chapters}>
        <View style={styles.titleWrapper}>
          <Icon name="play" size={30} color="#00ccff" />
          <Text style={styles.title}>{item.title}</Text>
        </View>
        <Text style={styles.time}>{item.time}</Text>
      </View>
    </TouchableHighlight>
  );

  return (
    <FlatList
      style={styles.container}
      data={chapters}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
      ListHeaderComponent={renderHeader}
      ItemSeparatorComponent={renderSeparator}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    borderRightWidth: 1,
    borderRightColor: '#C8C7CC',
  },
  separator: {
    marginLeft: 15,
    marginRight: 0,
    backgroundColor: '#C8C7CC',
  },
  separator_inner: {
    height: StyleSheet.hairlineWidth,
  },
  courseName: {
    height: 45,
    fontSize: 17,
    paddingLeft: 22,
    lineHeight: 45,
    fontWeight: 'bold',
    backgroundColor: '#F1F2F2',
  },
  chapters: {
    flexDirection: 'row',
    minHeight: 41,
    paddingTop: 10,
    paddingBottom: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  playIcon: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#666A6C',
    marginLeft: 22,
    textAlign: 'center',
    lineHeight: 17,
  },
  titleWrapper: {
    flexDirection: 'row',
    flexBasis: '65%',
  },
  title: {
    color: '#343434',
    fontSize: 14,
    marginLeft: 18,
  },
  time: {
    color: '#343434',
    marginRight: 10,
  },
});

export default Menu;
