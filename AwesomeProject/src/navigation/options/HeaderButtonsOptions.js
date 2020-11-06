import * as React from 'react';
import {Button, View} from 'react-native';
//  顶部 图标按钮 公用配置
const HeaderButtonsOption = (navigation) => {
  return {
    headerLeft: () => (
      <Button
        onPress={() => navigation.navigate('Information')}
        title="新闻"
        color="#000"
      />
    ),
    headerRight: () => (
      <View style={{flexDirection: 'row'}}>
        <Button
          onPress={() => navigation.navigate('Search')}
          title="搜索"
          color="#000"
        />
        <Button
          onPress={() => navigation.navigate('Setting')}
          title="设置"
          color="#000"
        />
      </View>
    ),
  };
};

export default HeaderButtonsOption;
