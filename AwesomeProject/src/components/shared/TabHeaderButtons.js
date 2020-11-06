import * as React from 'react';
import {HeaderButtons, HeaderButton} from 'react-navigation-header-buttons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Colors from '../../constants/Colors';

const TabHeaderButton = (props) => (
  <HeaderButton
    IconComponent={SimpleLineIcons}
    iconSize={20}
    color={Colors.headerButton}
    {...props}
  />
);

export const TabHeaderButtons = (props) => {
  return <HeaderButtons HeaderButtonComponent={TabHeaderButton} {...props} />;
};

export {Item} from 'react-navigation-header-buttons';
