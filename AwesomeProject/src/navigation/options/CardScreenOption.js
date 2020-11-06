import * as React from 'react';
import {Platform} from 'react-native';
import {CardStyleInterpolators} from '@react-navigation/stack';
import BaseScreenOption from './BaseScreenOption';
import {Item, TabHeaderButtons} from '../../components/shared/TabHeaderButtons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from '../../constants/Colors';

// Card Stack 配置
const CardScreenOption = (route, navigation) => ({
  // 公共基础配置
  ...BaseScreenOption,

  // 启用安卓的手势返回
  gestureEnabled: true,

  //安卓使用左右切屏
  cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,

  // 滑动返回的方向为：水平
  gestureDirection: 'horizontal',

  // 自定义返回按钮
  headerLeft: () => (
    <TabHeaderButtons>
      <Item
        title="close"
        IconComponent={Ionicons}
        iconName={Platform.OS === 'ios' ? 'ios-chevron-back' : 'md-arrow-back'}
        iconSize={Platform.OS === 'ios' ? 30 : 25}
        color={Colors.primary}
        onPress={() => navigation.goBack()}
      />
    </TabHeaderButtons>
  ),
});

export default CardScreenOption;
