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

class OtherScreen extends React.Component {
    static navigationOptions = {
        title: 'Form Add Data',
    };

    render() {
        return (
            <View>
                <Text>หน้านี้ภูมิทำนะ เอาโค้ดมาใส่หน้านี้</Text>
            </View>
        );
    }
}



const AppStack = createStackNavigator({  Other: OtherScreen });


export default createAppContainer(createSwitchNavigator(
    {
        App: AppStack,
    },
));
