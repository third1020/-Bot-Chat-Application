import React from 'react';
import {
    ActivityIndicator,
    AsyncStorage,
    StatusBar,
    StyleSheet,
    View,
    Text,
    Button,
} from 'react-native';
import {
    createSwitchNavigator,
    createStackNavigator,
    createAppContainer,
} from 'react-navigation';
import Add from '../navigation/Add';
import ChatBot from 'react-native-chatbot';

class SCORE2T4 extends React.Component {
    static navigationOptions = {
        title: 'Point Between 2 and 4',
    };

    render() {
        return (
          <ChatBot
          handleEnd={this.handleEnd}
          steps={[
            {
              id: '1',
              message: 'อาการเป็นไงบ้างหมอสิ',
              trigger: '2',
            },
            {
              id: '2',
              options: [
                { value: 1, label: 'นอนไม่หลับ', trigger: '3' },
                { value: 2, label: 'คิดมากตลอดเวลา', trigger: '3' },
                { value: 3, label: 'คิดสั้น', trigger: '3' },
                { value: 4, label: 'คิดยาว', trigger: '3' },
                { value: 5, label: 'อยากฆ่าตัวตาย', trigger: '3' },
              ],
            },
            {
              id: '3',
              message: 'รายงานผล อาการผู้ป่วย',
              end: true,
            },
          ]}
        />

        );
    }
}



const AppStack = createStackNavigator({  SCORE2T4: SCORE2T4 ,Add: Add });


export default createAppContainer(createSwitchNavigator(
    {
        App: AppStack,
    },
));

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});
