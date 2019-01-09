import React from 'react';
import { StyleSheet, Text, View ,ActivityIndicator, AsyncStorage,Alert,} from 'react-native';
import ChatBot from 'react-native-chatbot';


import { Button } from 'react-native-elements';


import {
    createSwitchNavigator,
    createStackNavigator,
    createAppContainer,
} from 'react-navigation';

import PropTypes from 'prop-types';

export default class PlaySound extends React.Component {
    static navigationOptions = {
        title: 'PlaySound',
    };

    constructor(props)
        {
          super(props);

          this.audioPlayer = new Expo.Audio.Sound();

        }

        playSound = async () => {
            try {
              await this.audioPlayer.unloadAsync()
              await this.audioPlayer.loadAsync(require("../assets/sounds/mp3_theme_song.mp3"));
              await this.audioPlayer.playAsync();
            } catch (err) {
              console.warn("Couldn't Play audio", err)
            }
        }

        playInEnd = async () => {
            try {
              await this.audioPlayer.unloadAsync()
              await this.audioPlayer.loadAsync(require("../assets/sounds/inend.mp3"));
              await this.audioPlayer.playAsync();
            } catch (err) {
              console.warn("Couldn't Play audio", err)
            }
        }

        StopSound = async () => {
            try {
              await this.audioPlayer.pauseAsync();
            } catch (err) {
              console.warn("Can't stop", err)
            }
        }

  render() {
return (
  <View>
  <Button title="In the end" onPress={this.playInEnd} />
  <Button title="Theme" onPress={this.playSound} />

  <Button title="Stop" onPress={this.StopSound} />

  </View>

    );

    }

  }



PlaySound.propTypes = {
  steps: PropTypes.object,
};

PlaySound.defaultProps = {
  steps: undefined,
};
