import * as React from 'react';
import {TabHeaderButtons, Item} from '../../components/shared/TabHeaderButtons';

//  顶部 图标按钮 公用配置
const HeaderButtonsOption = (navigation) => {
  return {
    headerLeft: () => (
      <TabHeaderButtons>
        <Item
          title="notice"
          iconName="bell"
          onPress={() =>
            navigation.navigate('Information', {
              screen: 'InformationHome',
            })
          }
        />
      </TabHeaderButtons>
    ),
    headerRight: () => (
      <TabHeaderButtons>
        <Item
          title="search"
          iconName="magnifier"
          onPress={() =>
            navigation.navigate('Search', {
              screen: 'SearchHome',
            })
          }
        />
        <Item
          title="setting"
          iconName="options"
          onPress={() =>
            navigation.navigate('Setting', {
              screen: 'SettingHome',
            })
          }
        />
      </TabHeaderButtons>
    ),
  };
};
export default HeaderButtonsOption;
