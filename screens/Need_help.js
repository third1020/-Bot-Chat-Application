import React from 'react';
import {
    ActivityIndicator,
    AsyncStorage,
    StatusBar,
    StyleSheet,
    View,
    Text,
    Button,
    Image
} from 'react-native';
import {
    createSwitchNavigator,
    createStackNavigator,
    createAppContainer,
} from 'react-navigation';
import Add from '../navigation/Add';
import ChatBot from 'react-native-chatbot';
import PropTypes from 'prop-types';
import Emoji from 'react-native-emoji';
import styled from 'styled-components/native';

class Need_help extends React.Component {
    static navigationOptions = {
        title: 'Need_help',
    };

    constructor(props) {
    super(props);

    this.state = {
      name: '',
      gender: '',
      age: '',
    };
  }

  componentWillMount() {
    const { steps } = this.props;
    const { name, gender, age } = steps;

    this.setState({ name, gender, age });

    score = name.value+gender.value;
  }

  render() {
    const { name, gender, age } = this.state;
    return (


              <Text>{score}</Text>

    );
  }
}

Need_help.propTypes = {
  steps: PropTypes.object,
};

Need_help.defaultProps = {
  steps: undefined,
};

class SimpleForm extends React.Component {
  render() {
    return (
      <ChatBot
        steps={[
          {
            id: '1',
            component: (<Emoji name="coffee" style={{fontSize: 50}} />),
            asMessage: true,
            trigger: '55',
          },
          {
            id: '55',
            component: (<Image style={{width: 90 , height:100}} source={require("../assets/garoo/1.png")}/>),
            asMessage: true,
            trigger: 'name',
          },
          {
            id: 'name',
            options: [
              { value: 0, label: 'Male', trigger: '3' },
              { value: 2, label: 'Female', trigger: '3' },
            ],

          },
          {
            id: '3',
            message: 'Hi {previousValue}! What is your gender?',
            trigger: 'gender',
          },
          {
            id: 'gender',
            options: [
              { value: 0, label: 'Male', trigger: '5' },
              { value: 0, label: 'Female', trigger: '5' },
            ],
          },
          {
            id: '5',
            message: 'How old are you?',
            trigger: 'age',
          },
          {
            id: 'age',
            user: true,
            trigger: '7',
            validator: (value) => {
              if (isNaN(value)) {
                return 'value must be a number';
              } else if (value < 0) {
                return 'value must be positive';
              } else if (value > 120) {
                return `${value}? Come on!`;
              }

              return true;
            },
          },
          {
            id: '7',
            message: 'Great! Check out your summary',
            trigger: 'review',
          },
          {
            id: 'review',
            component: <Need_help />,
            asMessage: true,
            trigger: 'update',
          },
          {
            id: 'update',
            message: 'Would you like to update some field?',
            trigger: 'update-question',
          },
          {
            id: 'update-question',
            options: [
              { value: 'yes', label: 'Yes', trigger: 'update-yes' },
              { value: 'no', label: 'No', trigger: 'end-message' },
            ],
          },
          {
            id: 'update-yes',
            message: 'What field would you like to update?',
            trigger: 'update-fields',
          },
          {
            id: 'update-fields',
            options: [
              { value: 'name', label: 'Name', trigger: 'update-name' },
              { value: 'gender', label: 'Gender', trigger: 'update-gender' },
              { value: 'age', label: 'Age', trigger: 'update-age' },
            ],
          },
          {
            id: 'update-name',
            update: 'name',
            trigger: '7',
          },
          {
            id: 'update-gender',
            update: 'gender',
            trigger: '7',
          },
          {
            id: 'update-age',
            update: 'age',
            trigger: '7',
          },
          {
            id: 'end-message',
            message: 'Thanks! Your data was submitted successfully!',
            end: true,
          },
        ]}
      />
    );
  }
}

export default SimpleForm;
