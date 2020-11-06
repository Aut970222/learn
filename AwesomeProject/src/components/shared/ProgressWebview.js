import React, {useLayoutEffect, useRef} from 'react';
import {View, StyleSheet} from 'react-native';
import {WebView} from 'react-native-webview';
import Colors from '../../constants/Colors';

// 自定义进度条
const ProgressBar = (props) => {
  const style = {
    width: `${props.progress * 100}%`,
  };
  return <View style={[styles.loadingBar, style]}/>;
};

function ProgressWebview(props) {
  const {uri} = props;
  const webview = useRef(null);
  const [progress, setProgress] = React.useState(0);


  return (
    <View style={styles.container}>
      <ProgressBar progress={progress}/>

      <WebView
        ref={webview}
        source={{uri: uri}}
        userAgent="clwy-app"
        onLoadProgress={({nativeEvent}) => {
          // 设置 percent 为 0...1，有小数
          setProgress(nativeEvent.progress);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  loadingBar: {
    backgroundColor: Colors.primary,
    height: 2,
  },
});

export default ProgressWebview;
