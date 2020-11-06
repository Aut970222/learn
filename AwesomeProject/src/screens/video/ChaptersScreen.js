import React, {useState, useLayoutEffect} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  TouchableWithoutFeedback,
} from 'react-native';
import SideMenu from 'react-native-side-menu-updated';
import Video from 'react-native-clwy-video-player';
import Menu from '../../components/shared/Menu';
import useFetchData from '../../hooks/useFetchData';
import Icon from 'react-native-vector-icons/EvilIcons';
import ProgressWebview from '../../components/shared/ProgressWebview';

// const {width} = Dimensions.get('window');

function ChaptersScreen({route, navigation}) {
  // console.log(route);
  const {id, title} = route.params;
  const [isOpen, setIsOpen] = useState(false);
  const [HeaderTitle, setHeaderTitle] = useState(title);
  const [fullscreen, setFullscreen] = useState(false);
  const [url, setURL] = useState(
    `/video/api/v2/chapters/${id}.json`,
  );
  const {data, fetchData} = useFetchData(url, {
    chapter: {},
    course: {},
    chapters: {},
  });
  const uri = data.chapter.video;
  // console.log(data);
  useLayoutEffect(() => {
    navigation.setOptions({
      title: HeaderTitle,
      headerShown: !fullscreen,
    });
  });
  const toggle = () => {
    setIsOpen(!isOpen);
  };
  const updateMenuState = (isOpen) => {
    setIsOpen(isOpen);
  };
  const onItemSelected = (id, title) => {
    setIsOpen(false);
    setURL(`https://clwy.cn/video/api/v2/chapters/${id}.json`);
    setHeaderTitle(title);
  };
  // 切换全屏
  const onFullScreen = (status) => {
    setFullscreen(status);
  };
  const menu = (
    <Menu
      onItemSelected={onItemSelected}
      chapters={data.chapters}
      course={data.course}
    />
  );
  return (
    <SideMenu
      menu={menu}
      isOpen={isOpen}
      onChange={(isOpen) => updateMenuState(isOpen)}
      disableGestures={true}>
      <View style={styles.container}>
        <Video
          url={uri}
          autoPlay
          logo={'https://images.itfun.tv/school/images/common/logo.png'}
          placeholder={data.course.image}
          hideFullScreenControl={false}
          onFullScreen={(status) => onFullScreen(status)}
          rotateToFullScreen
          // style={styles.backgroundVideo}
          // resizeMode={'contain'}
        />

        {/*<TouchableOpacity onPress={toggle} style={styles.button}>*/}
        {/*  <Icon name="navicon" size={30} color="#00ccff" />*/}
        {/*</TouchableOpacity>*/}

        <TouchableWithoutFeedback
          onPress={() => {
            setIsOpen(!isOpen);
          }}>
          <View style={styles.sideBarButtonWrapper}>
            <View style={styles.sideBarButton}>
              <Icon
                name="navicon"
                size={30}
                color="#00ccff"
                style={styles.chaptersIcon}
              />
              <Text style={styles.chapters}>课程列表</Text>
            </View>
          </View>
        </TouchableWithoutFeedback>

        <SafeAreaView style={styles.webview}>
          <ProgressWebview
            uri={`https://clwy.cn/video/courses/css/chapters/${data.chapter.id}/info`}
          />
        </SafeAreaView>
      </View>
    </SideMenu>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  sideBarButtonWrapper: {
    backgroundColor: '#fff',
    padding: 6,
  },
  sideBarButton: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#D4D1D9',
    width: 95,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
  },
  chapters: {
    textAlign: 'center',
    lineHeight: 32,
    marginLeft: 3,
    fontSize: 12,
  },
  chaptersIcon: {
    textAlign: 'center',
    lineHeight: 32,
  },
  webview: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default ChaptersScreen;
