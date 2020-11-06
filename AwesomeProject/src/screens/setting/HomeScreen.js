import React, {useLayoutEffect} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {Cell, Section, TableView} from 'react-native-tableview-simple';
import SettingHome from '../../components/shared/SettingHome';
import Colors from '../../constants/Colors';

function HomeScreen({route, navigation}) {
  useLayoutEffect(() => {
    navigation.setOptions({title: '设置'});
  });
  const uri = 'https://clwy.cn/train';
  return (
    <View style={styles.container}>
      <ScrollView>
        <TableView>
          <Section header="浏览">
            <SettingHome title="Wiki知识库" uri={uri} />
            <SettingHome title="站点导航" uri={uri} />
          </Section>
          <Section header="长乐未央">
            <SettingHome title="关于长乐未央" uri={uri} />
            <SettingHome title="隐私政策" uri={uri} />
          </Section>
          <Section header="线下培训">
            <SettingHome title="培训简介" uri={uri} />
            <SettingHome title="Web前端培训" uri={uri} />
            <SettingHome title="Python培训" uri={uri} />
            <SettingHome title="PHP培训" uri={uri} />
          </Section>
          <Section>
            {/*<SettingHome title="安全退出" uri={uri} />*/}
            <Cell
              title="安全退出"
              titleTextColor={Colors.primary}
              onPress={() => {
                navigation.navigate('User', {
                  screen: 'UserSignOut',
                });
              }}
              titleTextStyle={{textAlign: 'center'}}
              contentContainerStyle={{height: 50}}
            />
          </Section>
        </TableView>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DDDDDD',
    textAlign: 'center',
  },
  gray: {},
});

export default HomeScreen;
