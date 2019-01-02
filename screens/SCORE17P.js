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

class SCORE17P extends React.Component {
    static navigationOptions = {
        title: 'Point Upper 17',
    };

    render() {
        return (
          <View >

              <Button title="go back to login screen" onPress={() => this.props.navigation.popToTop()} />
          </View>
        );
    }
}



const AppStack = createStackNavigator({  SCORE17P: SCORE17P ,Add: Add });


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
