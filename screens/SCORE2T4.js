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

class SCORE2T4 extends React.Component {
    static navigationOptions = {
        title: 'Point Between 2 and 4',
    };

    render() {
        return (
          <View >
              
              <Button title="go back to login screen" onPress={() => this.props.navigation.popToTop()} />
          </View>
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
