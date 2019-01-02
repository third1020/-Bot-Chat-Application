/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
// import AppContainer from './navigation/AppContainer';
// import TabNavigation from './navigation/TabNavigation';
// import DrawerNavigation from './navigation/DrawerNavigation';
// import Appbot from './navigation/App';
import AuthenticationFlows from './navigation/AuthenticationFlows';
// import OtherScreen from './navigation/OtherScreen';

export default class App extends Component {
  render() {
    return (

      // <Appbot />
      // <OtherScreen />
      <AuthenticationFlows />
    );
  }
}
