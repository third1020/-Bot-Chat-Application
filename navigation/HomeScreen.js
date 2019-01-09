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

import SelfHarm_Danger from '../screens/SelfHarm_Danger';
import SelfHarm_NoNeed from '../screens/SelfHarm_NoNeed';
import SelfHarm_Normal from '../screens/SelfHarm_Normal';


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

    SelfHarm_Danger = () => {
        this.props.navigation.navigate('SelfHarm_Danger');
    };
    SelfHarm_NoNeed = () => {
        this.props.navigation.navigate('SelfHarm_NoNeed');
    };
    SelfHarm_Normal = () => {
        this.props.navigation.navigate('SelfHarm_Normal');
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
                <Button title="ช่วยเหลือเร่งด่วน" onPress={this.SelfHarm_Danger} />
                <Button title="ช่วยเหลือ" onPress={this.SelfHarm_Normal} />
                <Button title="ไม่ต้องการความช่วยเหลือ" onPress={this.SelfHarm_NoNeed} />
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

                                          SelfHarm_Danger: SelfHarm_Danger ,
                                          SelfHarm_NoNeed: SelfHarm_NoNeed,
                                          SelfHarm_Normal: SelfHarm_Normal,

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
