import React from 'react';
import {
    ActivityIndicator,
    AsyncStorage,
    StatusBar,
    StyleSheet,
    View,
    Platform,
    Text,
    TouchableOpacity,
    TouchableHighlight,
    Image,
    Dimensions,
    Button,
    Linking
} from 'react-native';
import {
    createSwitchNavigator,
    createStackNavigator,
    createAppContainer,
    createBottomTabNavigator,
} from 'react-navigation';

import { Entypo as Icon } from '@expo/vector-icons';
import { Colors, Fonts } from '../constants';


import Add from './Add';
import App from './App';
import Q9 from './Q9';
import Chats from './Chats';
import FirstOpApp from './FirstOpApp';

import SelfHarm_Danger from '../screens/SelfHarm_Danger';
import SelfHarm_NoNeed from '../screens/SelfHarm_NoNeed';
import SelfHarm_Normal from '../screens/SelfHarm_Normal';


import Check_me from '../screens/Check_me';
import Let_talk from '../screens/Let_talk';
import Need_help from '../screens/Need_help';
import SelectImage from '../AbilityBot/SelectImage';
import ShowActivity from '../AbilityBot/ShowActivity';
import { Header } from 'react-native-elements'


const chartIcon = require('../assets/images/pages/chart.png');
const calendarIcon = require('../assets/images/pages/calendar.png');
const chatIcon = require('../assets/images/pages/chat.png');
const galleryIcon = require('../assets/images/pages/gallery.png');
const profileIcon = require('../assets/images/pages/profile.png');

const { height,width } = Dimensions.get('window')





class HomeScreen extends React.Component {
  static navigationOptions = {
      title: 'HomeScreen',

  };
  ShowActivity  = () => {
   this.props.navigation.navigate('ShowActivity');
  };

   Chats = () => {
    this.props.navigation.navigate('Chats');
   };
    App = () => {
      this.props.navigation.navigate('App');
    };
    Q9 = () => {
      this.props.navigation.navigate('Q9');
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
    SelectImage = () => {
        this.props.navigation.navigate('SelectImage');
    };
    FirstOpApp = () => {
        this.props.navigation.navigate('FirstOpApp');
    };

    Website = ()=>{ Linking.openURL('http://www.hospital.tu.ac.th/');
    };

    constructor(props) {
    super(props);
    this.state={
      loadingPage: 'OnBoarding'
    }

  }


  componentWillMount() {
    this.retrieveData();
  }
  retrieveData = async () => {
    try {
      var value = await AsyncStorage.getItem('@onBoardingPageLoad:key');
      if (value == "login") {
        this.setState({
          loadingPage: 'Login'
        });
      }
      else {
        this.setState({
          loadingPage: 'OnBoarding'
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  login = async () => {
    try {
      await AsyncStorage.setItem("@onBoardingPageLoad:key", "login");
      this.props.navigation.navigate("App");


    } catch (error) {
      // Error saving data
    }
  };

  GoApp = async () => {
    try {
      await AsyncStorage.setItem("@onBoardingPageLoad:key", "Another");



    } catch (error) {
      // Error saving data
    }
  };


    render(){

      if (this.state.loadingPage == "Login") {
        return(
          <View style={styles.container}>
          <Image style={styles.stretch1}
          source={require('../assets/garoo/0001.png')}/>
      <View style={styles.row}>

        <TouchableOpacity onPress={this.Website} style={styles.item}>
          <Image resizeMode="contain" source={profileIcon} style={styles.itemImage} />
          <Text style={styles.itemText}>Profile</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <TouchableOpacity onPress={this.Chats} style={styles.item}>
          <Image resizeMode="contain" source={chatIcon} style={styles.itemImage} />
          <Text style={styles.itemText}>Chats</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={this.ShowActivity} style={styles.item}>
          <Image resizeMode="contain" source={calendarIcon} style={styles.itemImage} />
          <Text style={styles.itemText}>Calendar</Text>
        </TouchableOpacity>

      </View>
    </View>

              );


      }
      else {
        return (
          <View>

          <TouchableHighlight onPress={this.login}>
          <Image style={styles.stretch}
          source={require('../assets/garoo/0001.png')}/>
        </TouchableHighlight>

        <View style={styles.row}>
        <TouchableOpacity onPress={this.login} style={styles.item}>
          <Image resizeMode="contain" source={chatIcon} style={styles.itemImage} />
          <Text style={styles.itemText}>เริ่มคุยกับฉัน  คลิ๊กเลย!!{"\n"}</Text>

        </TouchableOpacity>

          </View>

        </View>

          // <View>
          //           <Button title="Check_me" onPress={this.Check_me}/>
          //           <Button title="Let_talk" onPress={this.Let_talk}/>
          //           <Button title="Need_help" onPress={this.Need_help}/>
          //           <Button title="First App Page" onPress={this.login}/>
          //         </View>
                );
      }



       }
    }


const AppStack = createStackNavigator({   HomeScreen : HomeScreen,
                                          Add: Add,
                                          App: App,
                                          SelectImage: SelectImage,
                                          Chats:Chats,
                                          ShowActivity:ShowActivity,
                                          Q9:Q9,
                                          FirstOpApp:FirstOpApp,

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

const styles = StyleSheet.create({
  stretch: {
    backgroundColor: '#DDDDDD',
    padding: 200,
    width,
    height,
    flex: 1
  },
  stretch1: {
    backgroundColor: '#DDDDDD',
    padding: 100,
    width,
    height,
    flex: 1
  },

  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingTop: 10,
  },
  row: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    marginTop: 10,
  },
  item: {
    flex: 1,
    height: 120,
    paddingVertical: 20,
    borderColor: Colors.primaryLight,
    borderWidth: 1,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'space-around',
    marginHorizontal: 5,
  },
  itemText: {
    color: Colors.primary,
    fontFamily: Fonts.primary,
  },
  itemImage: {
    height: 35,
  },
});

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
