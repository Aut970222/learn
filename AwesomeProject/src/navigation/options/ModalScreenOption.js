import * as React from 'react';
import BaseScreenOption from './BaseScreenOption';
import Colors from '../../constants/Colors';

// Modal Stack 配置
const ModalScreenOption = (route, navigation) => ({
  // 公共基础配置
  ...BaseScreenOption,

  // 设置导航条返回文字样式
  headerBackTitleStyle: {
    color: Colors.primary,
  },
  headerShown: true,
  gestureEnabled: true,
  cardOverlayEnabled: true,
  headerStatusBarHeight:
    navigation.dangerouslyGetState().routes.indexOf(route) > 0 ? 0 : undefined,
});

export default ModalScreenOption;
