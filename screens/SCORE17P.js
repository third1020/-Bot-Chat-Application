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
          <ChatBot
          handleEnd={this.handleEnd}
          steps={[
            
            {
                id: '1',
                message: 'โปรดระบุว่าคุณคือ บุคคลทั่วไป หรือ บุคลากร/นักศึกษามหาวิทยาลัยธรรมศาสตร์',
                trigger: '2',
              },
              {
                id: '2',
                options: [
                  {  label: 'บุคคลทั่วไป', trigger:'3'},
                  {  label: 'บุคลากร/นักศึกษามหาวิทยาลัยธรรมศาสตร์', trigger:'4'},
                ],
              },
              {
                id: '3',
                message: 'สามารถโทรปรึกษากับพี่ๆผู้เชี่ยวชาญได้เลย ที่ 1323 สายด่วนสุขภาพจิต ฟรี! ได้ตลอด 24 ชม.เลยจ้า',
                trigger: '7',
              },
              {
                id: '4',
                message: 'สามารถโทรปรึกษากับพี่ๆผู้เชี่ยวชาญได้เลย ที่ 02-564-4440 ต่อ 1282, 6604 ศูนย์สุขภาวะทางจิต มหาวิทยาลัยธรรมศาสตร์ หรือ 1323 สายด่วนกรมสุขภาพจิต ฟรี! ได้ตลอด 24 ชม.',
                trigger: '5',
              },
              {
                id: '5',
                options: [
                  {  label: 'โทรแล้วครับ', trigger:'HowWasIt'},
                  {  label: 'โทรแล้วค่ะ', trigger:'HowWasIt'},
                ],
              },
                          {
                            id: 'HowWasIt',
                            message: 'คุณรู้สึกยังไงที่ได้คุยกับฉันในวันนี้' ,
                            trigger: 'HowWasItChoice',
                          },
                          {
                            id: 'HowWasItChoice',
                              options: [
                                {  label: '👍', trigger: 'feedbackreply' },
                                {  label: '👎', trigger: 'feedbackreply' },
                              ],
                            },
                            {
                              id: 'feedbackreply',
                              message: 'ขอบคุณสำหรับการติชม ฉันมีความสุขทุกครั้งที่ได้เป็นเพื่อนดูแลใจของคุณ 😊' ,
                              trigger: 'feedbackemoji',
                            },
                            {
                              id: 'feedbackemoji',
                                options: [
                                  {  label: '❤️', trigger: 'seeu' },
                                ],
                              },
                                {
                                  id: 'seeu',
                                  message: 'แล้วพบกันอีกนะ  😊' ,
                                  trigger: 'seeuChoice',
                                },

                                {
                                  id: 'seeuChoice',
                                    options: [
                                      {  label: 'แล้วพบกัน Mindbot', end: true },
                                      {  label: 'Bye Mindbot', end: true },
                                    ],
                                  },
          ]}
        />

        );
    }
}
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
