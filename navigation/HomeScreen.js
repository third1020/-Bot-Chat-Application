import React from 'react';
import {
    ActivityIndicator,
    AsyncStorage,
    StatusBar,
    StyleSheet,
    View,
    Text,
} from 'react-native';
import {
    createSwitchNavigator,
    createStackNavigator,
    createAppContainer,
    createBottomTabNavigator,
} from 'react-navigation';


import Add from './Add';
import App from './App';

import SCORE2T4 from '../screens/SCORE2T4';
import SCORE5T8 from '../screens/SCORE5T8';
import SCORE9T16 from '../screens/SCORE9T16';
import SCORE17P from '../screens/SCORE17P';

import Check_me from '../screens/Check_me';
import Let_talk from '../screens/Let_talk';
import Need_help from '../screens/Need_help';
import { Button,Header,Icon,PricingCard,SocialIcon } from 'react-native-elements'



class HomeScreen extends React.Component {
  static navigationOptions = {
      title: 'HomeScreen',
  };

  App = () => {
      this.props.navigation.navigate('App');
  };

    _AddData = () => {
        this.props.navigation.navigate('Add');
    };

    _2T4 = () => {
        this.props.navigation.navigate('SCORE2T4');
    };
    _5T8 = () => {
        this.props.navigation.navigate('SCORE5T8');
    };
    _9T16 = () => {
        this.props.navigation.navigate('SCORE9T16');
    };
    _17P = () => {
        this.props.navigation.navigate('SCORE17P');
    };
    Check_me = () => {
        this.props.navigation.navigate('Check_me');
    };
    Let_talk = () => {
        this.props.navigation.navigate('Let_talk');
    };
    Need_help = () => {
        this.props.navigation.navigate('Need_help');
    };


    render() {
        return (

            <View>

                <Button title="First page " onPress={this.App} />
                <Button title="Form Add data :)" onPress={this._AddData} />
                <Button title="_2T4 :)" onPress={this._2T4} />
                <Button title="_5T8 :)" onPress={this._5T8} />
                <Button title="_9T16 :)" onPress={this._9T16} />
                <Button title="_17P :)" onPress={this._17P} />

                <Button title="Check_me :)" onPress={this.Check_me} />
                <Button title="Let_talk :)" onPress={this.Let_talk} />
                <Button title="Need_help :)" onPress={this.Need_help} />



            </View>
        );
    }
}

const AppStack = createStackNavigator({   HomeScreen : HomeScreen,
                                          Add: Add,
                                          App: App,

                                          SCORE2T4: SCORE2T4 ,
                                          SCORE5T8: SCORE5T8,
                                          SCORE9T16: SCORE9T16,
                                          SCORE17P: SCORE17P ,
                                          Check_me: Check_me,
                                          Let_talk: Let_talk,
                                          Need_help: Need_help,
                                        });


export default createAppContainer(createSwitchNavigator(
    {
        App: AppStack,
    },
));

// const HomeIconWithBadge = props => {
//   // You should pass down the badgeCount in some other ways like context, redux, mobx or event emitters.
//   return <IconWithBadge {...props} badgeCount={3} />;
// };
//
// const getTabBarIcon = (navigation, focused, tintColor) => {
//   const { routeName } = navigation.state;
//   let IconComponent = Ionicons;
//   let iconName;
//   if (routeName === 'Home') {
//     iconName = `ios-information-circle${focused ? '' : '-outline'}`;
//     // We want to add badges to home tab icon
//     IconComponent = HomeIconWithBadge;
//   } else if (routeName === 'SCORE2T4') {
//     iconName = `ios-options${focused ? '' : '-outline'}`;
//   } else if (routeName === 'SCORE5T8') {
//     iconName = `ios-options${focused ? '' : '-outline'}`;
//   } else if (routeName === 'SCORE9T16') {
//     iconName = `ios-options${focused ? '' : '-outline'}`;
//   } else if (routeName === 'SCORE17P') {
//     iconName = `ios-options${focused ? '' : '-outline'}`;
//   } else if (routeName === 'Check_me') {
//     iconName = `ios-options${focused ? '' : '-outline'}`;
//   } else if (routeName === 'Let_talk') {
//     iconName = `ios-options${focused ? '' : '-outline'}`;
//   } else if (routeName === 'Need_help') {
//     iconName = `ios-options${focused ? '' : '-outline'}`;
//   } else if (routeName === 'App') {
//     iconName = `ios-options${focused ? '' : '-outline'}`;
//   }
//
//   // You can return any component that you like here!
//   return <IconComponent name={iconName} size={25} color={tintColor} />;
// };
//
// export default createAppContainer(
//   createBottomTabNavigator(
//     {
//       Home: { screen: HomeScreen },
//       SCORE2T4: { screen: SCORE2T4 },
//       SCORE5T8: { screen: SCORE5T8 },
//       SCORE9T16: { screen: SCORE9T16 },
//       SCORE17P: { screen: SCORE17P },
//       Check_me: { screen: Check_me },
//       Let_talk: { screen: Let_talk },
//       Need_help: { screen: Need_help },
//       App: { screen: App },
//
//     },
//     {
//       defaultNavigationOptions: ({ navigation }) => ({
//         tabBarIcon: ({ focused, tintColor }) =>
//           getTabBarIcon(navigation, focused, tintColor),
//       }),
//       tabBarOptions: {
//         activeTintColor: 'tomato',
//         inactiveTintColor: 'gray',
//       },
//     }
//   )
// );
