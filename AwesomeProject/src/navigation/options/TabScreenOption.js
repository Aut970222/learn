import * as React from 'react';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

// TabScreenOption 配置
const TabScreenOption = (route) => {
  let labelName;
  let iconName;

  switch (route.name) {
    case 'Discover':
      labelName = '发现';
      iconName = 'compass';
      break;
    case 'Video':
      labelName = '视频';
      iconName = 'camrecorder';
      break;
    case 'Guide':
      labelName = '文档';
      iconName = 'layers';
      break;
    case 'Forum':
      labelName = '社区';
      iconName = 'bubbles';
      break;
    default:
      labelName = '我的';
      iconName = 'user';
  }
  return {
    tabBarLabel: labelName,
    tabBarIcon: ({focused, color}) => (
      <SimpleLineIcons name={iconName} size={25} color={color} />
    ),
  };
};

export default TabScreenOption;
