import * as React from 'react';
import {HeaderStyleInterpolators} from '@react-navigation/stack';
import Colors from '../../constants/Colors';

// Stack 公共配置
const BaseScreenOption = {
  // 标题组件的样式
  headerTitleStyle: {
    fontWeight: '400',
    color: Colors.headerTitle,
  },

  // 标题组件的颜色（自带返回箭头）
  headerTintColor: Colors.primary,

  // iOS 使用 UIKit 标题栏
  headerStyleInterpolator: HeaderStyleInterpolators.forUIKit,

  // 安卓标题栏居中
  headerTitleAlign: 'center',
};

export default BaseScreenOption;
