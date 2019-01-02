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

class SCORE9T16 extends React.Component {
    static navigationOptions = {
        title: 'Point Between 9 and 16',
    };

    render() {
        return (
          <View >

              <Button title="go back to login screen" onPress={() => this.props.navigation.popToTop()} />
          </View>
        );
    }
}



const AppStack = createStackNavigator({  SCORE9T16: SCORE9T16 ,Add: Add });


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
