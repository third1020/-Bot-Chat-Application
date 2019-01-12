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
// import App from './navigation/App';
// import FirstOpApp from './navigation/FirstOpApp';
import HomeScreen from './navigation/HomeScreen';

// import Add from './navigation/Add';
// import PlaySound from './AbilityBot/PlaySound';
// import SelectImage from './AbilityBot/SelectImage';

// import SelfHarm_Danger from './screens/SelfHarm_Danger';
// import SelfHarm_NoNeed from './screens/SelfHarm_NoNeed';
// import SelfHarm_Normal from './screens/SelfHarm_Normal';
// import Check_me from './screens/Check_me';
// import Let_talk from './screens/Let_talk';
// import Need_help from './screens/Need_help';




export default class App extends Component {
  render() {
    return (
      // <FirstOpApp/>
      // <SelfHarm_Danger />
      // <SelfHarm_NoNeed />
      // <SelfHarm_Normal />

      <HomeScreen />
      // <SelectImage />
      // <Add />
      // <PlaySound />
      // <Check_me/>
    );
  }
}
