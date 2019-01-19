import _ from 'lodash';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Random from 'random-id';
import { Dimensions, TextInput, ScrollView, Platform } from 'react-native';
import { CustomStep, OptionsStep, TextStep } from './steps/steps';
import schema from './schemas/schema';
import ChatBotContainer from './ChatBotContainer';
import InputView from './InputView';
import Footer from './Footer';
import Button from './Button';
import ButtonText from './ButtonText';

const { height, width } = Dimensions.get('window');

class ChatBot extends Component {
  /* istanbul ignore next */
  constructor(props) {
    super(props);

    this.state = {
      renderedSteps: [],
      previousSteps: [],
      currentStep: {},
      previousStep: {},
      steps: {},
      editable: false,
      inputValue: '',
      inputInvalid: false,
      defaultUserSettings: {},
    };

    this.getStepMessage = this.getStepMessage.bind(this);
    this.getTriggeredStep = this.getTriggeredStep.bind(this);
    this.generateRenderedStepsById = this.generateRenderedStepsById.bind(this);
    this.renderStep = this.renderStep.bind(this);
    this.triggerNextStep = this.triggerNextStep.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.onButtonPress = this.onButtonPress.bind(this);
    this.onInputFocus = this.onInputFocus.bind(this);
    this.onContentSizeChange = this.onContentSizeChange.bind(this);
    this.setContentRef = this.setContentRef.bind(this);
    this.setInputRef = this.setInputRef.bind(this);
  }

  componentWillMount() {
    const {
      botDelay,
      botAvatar,
      botBubbleColor,
      botFontColor,
      customDelay,
      customLoadingColor,
      userDelay,
      userAvatar,
      userBubbleColor,
      userFontColor,
    } = this.props;
    const steps = {};

    const defaultBotSettings = {
      delay: botDelay,
      avatar: botAvatar,
      bubbleColor: botBubbleColor,
      fontColor: botFontColor,
    };
    const defaultUserSettings = {
      delay: userDelay,
      avatar: userAvatar,
      bubbleColor: userBubbleColor,
      fontColor: userFontColor,
    };
    const defaultCustomSettings = {
      delay: customDelay,
      loadingColor: customLoadingColor,
    };

    for (let i = 0, len = this.props.steps.length; i < len; i += 1) {
      const step = this.props.steps[i];
      let settings = {};

      if (step.user) {
        settings = defaultUserSettings;
      } else if (step.message || step.asMessage || step.options) {
        settings = defaultBotSettings;
      } else if (step.component) {
        settings = defaultCustomSettings;
      }

      steps[step.id] = Object.assign(
        {},
        settings,
        schema.parse(step),
      );
    }

    schema.checkInvalidIds(steps);

    const firstStep = this.props.steps[0];

    if (firstStep.message) {
      const message = firstStep.message;
      firstStep.message = typeof message === 'function' ? message() : message;
      steps[firstStep.id].message = firstStep.message;
    }

    const currentStep = firstStep;
    const renderedSteps = [steps[currentStep.id]];
    const previousSteps = [steps[currentStep.id]];

    this.setState({
      defaultUserSettings,
      steps,
      currentStep,
      renderedSteps,
      previousSteps,
    });
  }

  onButtonPress() {
    const {
      renderedSteps,
      previousSteps,
      inputValue,
      defaultUserSettings,
    } = this.state;
    let { currentStep } = this.state;

    const isInvalid = currentStep.validator && this.checkInvalidInput();

    if (!isInvalid) {
      const step = {
        message: inputValue,
        value: inputValue,
      };

      currentStep = Object.assign(
        {},
        defaultUserSettings,
        currentStep,
        step,
      );

      renderedSteps.push(currentStep);
      previousSteps.push(currentStep);

      this.setState({
        currentStep,
        renderedSteps,
        previousSteps,
        editable: false,
        inputValue: '',
      });
    }
  }

  onInputFocus() {
    setTimeout(() => {
      this.scrollView.scrollToEnd();
    }, 100);
  }

  onContentSizeChange(contentWidth, contentHeight) {
    if (contentHeight > height - 50) {
      this.scrollView.scrollToEnd();
    }
  }

  getStepMessage(message) {
    const { previousSteps } = this.state;
    const lastStepIndex = previousSteps.length > 0 ? previousSteps.length - 1 : 0;
    const steps = this.generateRenderedStepsById();
    const previousValue = previousSteps[lastStepIndex].value;
    return (typeof message === 'function') ? message({ previousValue, steps }) : message;
  }

  getTriggeredStep(trigger, value) {
    const steps = this.generateRenderedStepsById();
    return (typeof trigger === 'function') ? trigger({ value, steps }) : trigger;
  }

  setContentRef(c) {
    this.scrollView = c;
  }

  setInputRef(c) {
    this.inputRef = c;
  }

  handleEnd() {
    const { previousSteps } = this.state;

    const renderedSteps = previousSteps.map((step) => {
      const { id, message, value } = step;
      return { id, message, value };
    });

    const steps = [];

    for (let i = 0, len = previousSteps.length; i < len; i += 1) {
      const { id, message, value } = previousSteps[i];
      steps[id] = { id, message, value };
    }

    const values = previousSteps.filter(step => step.value).map(step => step.value);

    if (this.props.handleEnd) {
      this.props.handleEnd({ renderedSteps, steps, values });
    }
  }

  triggerNextStep(data) {
    const {
      renderedSteps,
      previousSteps,
      steps,
      defaultUserSettings,
    } = this.state;
    let { currentStep, previousStep } = this.state;
    const isEnd = currentStep.end;

    if (data && data.value) {
      currentStep.value = data.value;
    }
    if (data && data.trigger) {
      currentStep.trigger = this.getTriggeredStep(data.trigger, data.value);
    }

    if (isEnd) {
      this.handleEnd();
    } else if (currentStep.options && data) {
      const option = currentStep.options.filter(o => o.value === data.value)[0];
      const trigger = this.getTriggeredStep(option.trigger, currentStep.value);
      delete currentStep.options;

      currentStep = Object.assign(
        {},
        currentStep,
        option,
        defaultUserSettings,
        {
          user: true,
          message: option.label,
          trigger,
        },
      );

      renderedSteps.pop();
      previousSteps.pop();
      renderedSteps.push(currentStep);
      previousSteps.push(currentStep);

      this.setState({
        currentStep,
        renderedSteps,
        previousSteps,
      });
    } else if (currentStep.trigger) {
      const isReplace = currentStep.replace && !currentStep.option;

      if (isReplace) {
        renderedSteps.pop();
      }

      const trigger = this.getTriggeredStep(currentStep.trigger, currentStep.value);
      let nextStep = Object.assign({}, steps[trigger]);

      if (nextStep.message) {
        nextStep.message = this.getStepMessage(nextStep.message);
      } else if (nextStep.update) {
        const updateStep = nextStep;
        nextStep = Object.assign({}, steps[updateStep.update]);

        if (nextStep.options) {
          for (let i = 0, len = nextStep.options.length; i < len; i += 1) {
            nextStep.options[i].trigger = updateStep.trigger;
          }
        } else {
          nextStep.trigger = updateStep.trigger;
        }
      }

      nextStep.key = Random(24);

      previousStep = currentStep;
      currentStep = nextStep;

      if (nextStep.user) {
        this.setState({ editable: true });
        this.inputRef.focus();
      } else {
        renderedSteps.push(nextStep);
        previousSteps.push(nextStep);
      }

      this.setState({
        renderedSteps,
        previousSteps,
        currentStep,
        previousStep,
      });
    }
  }

  generateRenderedStepsById() {
    const { previousSteps } = this.state;
    const steps = {};

    for (let i = 0, len = previousSteps.length; i < len; i += 1) {
      const { id, message, value } = previousSteps[i];
      steps[id] = { id, message, value };
    }

    return steps;
  }

  isLastPosition(step) {
    const { renderedSteps } = this.state;
    const length = renderedSteps.length;
    const stepIndex = renderedSteps.map(s => s.key).indexOf(step.key);

    if (length <= 1 || (stepIndex + 1) === length) {
      return true;
    }

    const nextStep = renderedSteps[stepIndex + 1];
    const hasMessage = nextStep.message || nextStep.asMessage;

    if (!hasMessage) {
      return true;
    }

    const isLast = step.user !== nextStep.user;
    return isLast;
  }

  isFirstPosition(step) {
    const { renderedSteps } = this.state;
    const stepIndex = renderedSteps.map(s => s.key).indexOf(step.key);

    if (stepIndex === 0) {
      return true;
    }

    const lastStep = renderedSteps[stepIndex - 1];
    const hasMessage = lastStep.message || lastStep.asMessage;

    if (!hasMessage) {
      return true;
    }

    const isFirst = step.user !== lastStep.user;
    return isFirst;
  }

  handleKeyPress(event) {
    if (event.nativeEvent.key === 'Enter') {
      this.onButtonPress();
    }
  }

  checkInvalidInput() {
    const { currentStep, inputValue } = this.state;
    const result = currentStep.validator(inputValue);
    const value = inputValue;

    if (typeof result !== 'boolean' || !result) {
      this.setState({
        inputValue: result.toString(),
        inputInvalid: true,
        editable: false,
      });

      setTimeout(() => {
        this.setState({
          inputValue: value,
          inputInvalid: false,
          editable: true,
        });
        this.inputRef.focus();
      }, 2000);

      return true;
    }

    return false;
  }

  renderStep(step, index) {
    const { renderedSteps, previousSteps } = this.state;
    const {
      avatarStyle,
      bubbleStyle,
      customStyle,
      customDelay,
      hideBotAvatar,
      hideUserAvatar,
    } = this.props;
    const { options, component, asMessage } = step;
    const steps = {};
    const stepIndex = renderedSteps.map(s => s.id).indexOf(step.id);
    const previousStep = stepIndex > 0 ? renderedSteps[index - 1] : {};

    for (let i = 0, len = previousSteps.length; i < len; i += 1) {
      const ps = previousSteps[i];

      steps[ps.id] = {
        id: ps.id,
        message: ps.message,
        value: ps.value,
      };
    }

    if (component && !asMessage) {
      return (
        <CustomStep
          key={index}
          delay={customDelay}
          step={step}
          steps={steps}
          style={customStyle}
          previousStep={previousStep}
          triggerNextStep={this.triggerNextStep}
        />
      );
    }

    if (options) {
      return (
        <OptionsStep
          key={index}
          step={step}
          triggerNextStep={this.triggerNextStep}
          bubbleStyle={bubbleStyle}
        />
      );
    }

    return (
      <TextStep
        key={index}
        step={step}
        steps={steps}
        previousValue={previousStep.value}
        triggerNextStep={this.triggerNextStep}
        avatarStyle={avatarStyle}
        bubbleStyle={bubbleStyle}
        hideBotAvatar={hideBotAvatar}
        hideUserAvatar={hideUserAvatar}
        isFirst={this.isFirstPosition(step)}
        isLast={this.isLastPosition(step)}
      />
    );
  }

  render() {
    const {
      editable,
      inputInvalid,
      inputValue,
      renderedSteps,
    } = this.state;
    const {
      botBubbleColor,
      botFontColor,
      className,
      contentStyle,
      footerStyle,
      inputStyle,
      placeholder,
      style,
      submitButtonStyle,
    } = this.props;

    const styles = {
      input: {
        borderWidth: 0,
        color: inputInvalid ? '#E53935' : '#4a4a4a',
        fontSize: 14,
        opacity: !editable && !inputInvalid ? 0.5 : 1,
        paddingRight: 16,
        paddingLeft: 16,
        height: 50,
        width: width - 80,
      },
      content: {
        height: height - 50,
        backgroundColor: '#eee',
      },
    };

    const textInputStyle = Object.assign({}, styles.input, inputStyle);
    const scrollViewStyle = Object.assign({}, styles.content, contentStyle);
    const platformBehavior = Platform.OS === 'ios' ? 'padding' : 'height';

    return (
      <ChatBotContainer
        className={`rsc ${className}`}
        style={style}
      >
        <ScrollView
          className="rsc-content"
          style={scrollViewStyle}
          ref={this.setContentRef}
          onContentSizeChange={this.onContentSizeChange}
        >
          {_.map(renderedSteps, this.renderStep)}
        </ScrollView>
        <InputView behavior={platformBehavior}>
          <Footer
            className="rsc-footer"
            style={footerStyle}
            disabled={!editable}
            invalid={inputInvalid}
            color={botBubbleColor}
          >
            <TextInput
              type="textarea"
              style={textInputStyle}
              className="rsc-input"
              placeholder={placeholder}
              ref={this.setInputRef}
              onKeyPress={this.handleKeyPress}
              onFocus={this.onInputFocus}
              onBlur={this.onInputFocus}
              onChangeText={text => this.setState({ inputValue: text })}
              value={inputValue}
              underlineColorAndroid="transparent"
              invalid={inputInvalid}
              editable={editable}
            />
            <Button
              className="rsc-button"
              style={submitButtonStyle}
              disabled={!editable}
              onPress={this.onButtonPress}
              invalid={inputInvalid}
              backgroundColor={botBubbleColor}
            >
              <ButtonText
                className="rsc-button-text"
                invalid={inputInvalid}
                fontColor={botFontColor}
              >
                SEND
              </ButtonText>
            </Button>
          </Footer>
        </InputView>
      </ChatBotContainer>
    );
  }
}

ChatBot.propTypes = {
  avatarStyle: PropTypes.object,
  botAvatar: PropTypes.string,
  botBubbleColor: PropTypes.string,
  botDelay: PropTypes.number,
  botFontColor: PropTypes.string,
  bubbleStyle: PropTypes.object,
  contentStyle: PropTypes.object,
  customStyle: PropTypes.object,
  customDelay: PropTypes.number,
  customLoadingColor: PropTypes.string,
  className: PropTypes.string,
  handleEnd: PropTypes.func,
  hideBotAvatar: PropTypes.bool,
  hideUserAvatar: PropTypes.bool,
  footerStyle: PropTypes.object,
  inputStyle: PropTypes.object,
  placeholder: PropTypes.string,
  steps: PropTypes.array.isRequired,
  style: PropTypes.object,
  submitButtonStyle: PropTypes.object,
  userAvatar: PropTypes.string,
  userBubbleColor: PropTypes.string,
  userDelay: PropTypes.number,
  userFontColor: PropTypes.string,
};

ChatBot.defaultProps = {
  avatarStyle: {},
  botBubbleColor: '#6E48AA',
  botDelay: 1000,
  botFontColor: '#fff',
  bubbleStyle: {},
  contentStyle: {},
  customStyle: {},
  customDelay: 1000,
  customLoadingColor: '#4a4a4a',
  className: '',
  footerStyle: {},
  handleEnd: undefined,
  hideBotAvatar: false,
  hideUserAvatar: true,
  inputStyle: {},
  placeholder: 'Type the message ...',
  style: {},
  submitButtonStyle: {},
  userBubbleColor: '#fff',
  userDelay: 1000,
  userFontColor: '#4a4a4a',
  botAvatar: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABOCAYAAAC3zZFGAAAACXBIWXMAAAsTAAALEwEAmpwYAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89+bN/rXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz/SMBAPh+PDwrIsAHvgABeNMLCADATZvAMByH/w/qQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf+bTAICd+Jl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA/g88wAAKCRFRHgg/P9eM4Ors7ONo62Dl8t6r8G/yJiYuP+5c+rcEAAAOF0ftH+LC+zGoA7BoBt/qIl7gRoXgugdfeLZrIPQLUAoOnaV/Nw+H48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl/AV/1s+X48/Pf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H/LcL//wd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s+wM+3zUAsGo+AXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93/+8//UegJQCAZkmScQAAXkQkLlTKsz/HCAAARKCBKrBBG/TBGCzABhzBBdzBC/xgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD/phCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8+Q8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8+xdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR+cQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI+ksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG+Qh8lsKnWJAcaT4U+IoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr+h0uhHdlR5Ol9BX0svpR+iX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK+YTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI+pXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q/pH5Z/YkGWcNMw09DpFGgsV/jvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY/R27iz2qqaE5QzNKM1ezUvOUZj8H45hx+Jx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4/OBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up+6Ynr5egJ5Mb6feeb3n+hx9L/1U/W36p/VHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm+eb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw+6TvZN9un2N/T0HDYfZDqsdWh1+c7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc+Lpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26/uNu5p7ofcn8w0nymeWTNz0MPIQ+BR5dE/C5+VMGvfrH5PQ0+BZ7XnIy9jL5FXrdewt6V3qvdh7xc+9j5yn+M+4zw33jLeWV/MN8C3yLfLT8Nvnl+F30N/I/9k/3r/0QCngCUBZwOJgUGBWwL7+Hp8Ib+OPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo+qi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt/87fOH4p3iC+N7F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi/RNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z+pn5mZ2y6xlhbL+xW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a/zYnKOZarnivN7cyzytuQN5zvn//tEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1+1dT1gvWd+1YfqGnRs+FYmKrhTbF5cVf9go3HjlG4dvyr+Z3JS0qavEuWTPZtJm6ebeLZ5bDpaql+aXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO/PLi8ZafJzs07P1SkVPRU+lQ27tLdtWHX+G7R7ht7vPY07NXbW7z3/T7JvttVAVVN1WbVZftJ+7P3P66Jqun4lvttXa1ObXHtxwPSA/0HIw6217nU1R3SPVRSj9Yr60cOxx++/p3vdy0NNg1VjZzG4iNwRHnk6fcJ3/ceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w+0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb++6EHTh0kX/i+c7vDvOXPK4dPKy2+UTV7hXmq86X23qdOo8/pPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb/1tWeOT3dvfN6b/fF9/XfFt1+cif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v+3Njv3H9qwHeg89HcR/cGhYPP/pH1jw9DBY+Zj8uGDYbrnjg+OTniP3L96fynQ89kzyaeF/6i/suuFxYvfvjV69fO0ZjRoZfyl5O/bXyl/erA6xmv28bCxh6+yXgzMV70VvvtwXfcdx3vo98PT+R8IH8o/2j5sfVT0Kf7kxmTk/8EA5jz/GMzLdsAAAAgY0hSTQAAeiUAAICDAAD5/wAAgOkAAHUwAADqYAAAOpgAABdvkl/FRgAAJO9JREFUeNrsnHdUlVf2v/elVxVRwQZ2FBCQKoglxN67oMK99Ho7lyodUaOJiSaZtJlvJsnMZCbNJEbToyKKWLASewG7YI1pKs/vD9CYTMxkZhJ1/dYc1l53LeBeXp73nHd/djlHAPmf/ef2Pwj/A/g/gP9/A1SI/LdmKSL+CoWis0KhkP/Y/osvEekpCgkzUyjMzBQK+bX2sAC0FZFJCoWi3wME6C8KmWWuUFiYKxTya+03AfgbjNEisl9EJsiDG0+LyIeWZmYO1mZmYvUr7WEAGNG1XZvDAW6dEZEnHhC8mf06tr/l28UFEZkj/8bqedAAQy3NzE69MGc8n6XPp4O97WERcb/P8PpaW5jvei9+Dq/On4JCIR+JiOOvffODBBhoY2FxNndkOEfyM2h+PJ+kMH9EpPg+wrMVkQ+Kxgzl1uMLqNKq8O/melNEYh52gEHmZmbHysaP4GhBBlVqFVcWZbEzM5EO9vbHRMTrPgEsnu03gJvL8jmYm8bn6dGUjRuOlbn5OhGxeVgBdheRjYYRIZwu1XMwL50qjYrtxgSuLc4iLtgPEcm6D/BC3Nq3vbwnK5mvH8tlo1pFpVrJG6oZeHXucEVEQh9WgM9O8urLgdxUDuelU6OLp1oby/qMGJrKM/l79HSsLcw3/NoZ8B8ORxGpWjl9LCwvYJshjhp9PNsNiWxQK5nlOwARKXwYAUZ5dGzPR8lzObZATY02jmpdHDW6OKrUSuqyUziyQM2j/XrdEJHJvyPA51NC/WF5AXW5qazLiGGrIZ4dxgR2GBN5fPJI7K0st4mI08MEsIe1hfnRZ2eO53ypgR2GBDZrY9nSCnCzNpZqXRxXFmXzzIxxiMi7vxO8jBG93flqUTanirV8mjqfzdo4tuji2GaIZ7cpifUZ0YS4d0VEpj1MAF+c4zeAc6V6juRn3AG2pdVaZqGK+kINxxZk4N/N9RsRGfEbwwvr5Gh/pVKt5KvF2XyWFs0mTSw1rdewVR9PrTGRXaYkUsMDEJEVDwvA8M5tHL5anx7DuRL9nZn3U9ukUVFrTODG43mUjh+BiKz8DeHZicj6FdPH8P3jedTo46jMUP7oWmr08WzVx1OXncLzsyfgaGO1TUQ6PGiAFiLyV+2wYM6XGagv0LDDmECVWvmzEDeqlTSVZ7LTmERnR4ejItLjNwJYONffi1uP53MoP5116Uq26xPYmZnEFm0c1drYVkfSAnBNciR9O7W/KCL+DxrgkK5tHJs+SZnHkQUZVOtiOZibyjZjPBvVqn8CWKVRUZeVwleLs4jy90JEUn4DeMO7t2tz9eiCDK4tzuKL9BiqNCr256ZyKC+dLboWgFt0cWzTx7MvO4WNaiWhPbohIpEPGmDhVG8PThfr+DInlSC3zuSPCufG4/lUaVRsyFBSo/8B4GZtLJWaWK4vyeWv86ehEMU7rRHDfyNZVj8/czw8WcQmXSzr1TFcKDfyp6jJqIJ8qNHFsceUxCaNim2GBHaakqg1JhDl7/0v5czvDdDSTKH4KH/UEE4X6WgsMxLk1gULhYJdWSlcX5bLZ6nz2KT9YSZWa2OpzFBytkTPDmMCnR0dDohI7/8CoHGqtwfXF2fzZU4qn6TO58ucFG4syyOiXy+c7ezYY0pmf3YKGzUqanRx7DAkciQ/naKxwxCRt37pBv7eAPu7tWvb8OKciezMTOTa4mwWTngEEcHbtRNXF2VzrlTPuvToH3nkKo2KfVkpHC9U80jfHtd/jZy4x/Do4+zUsMeUxLlSPZ+lRbNRHcPlhSa26uKxs7QkqHsXDuSmsS87mSpNy43cpovncH46r8ybQltbmwMi0udBAZw2rJfb95+mzmdPVgrnSgyUjBrOeP/eDHJ3ZkLf3ny3bAFHC9RsyIihRh/fImc0KjZr47hcYaJ47PDbaS4rEfEUkTEiMldE1K0hn0FEkkVkloiEi0j/21GMrZXlMx8kz4WniqjMULJRrWR3VhJN5SaKRg3D0daM4X26U62N40BuGlWtM3CbPp4dmYm8nxCJt2vHayIy/kEB1EwZ2J9qbSy7MpOoL9KwdPxIVEO82bs0AbdObUgK9oflhdQaE1mfHsNWfTybtbFUaWJpLDPy56jJWJmbn+jkYPe5b1eXhmG93a/M9vP6PmVwAJphgaQMCWB+oA+TvT2+CezeubFrO4d6W0uL90TkCdc2Dqc2GRO5WJHFJnULwPoiLZsy4hjXx42CSYHNY3163/p79IxbRxdkNN+egVv18dTo4tmkUTHH1xMRKXhQAA3T/fqzzRjPDkM8h/LSWBMfSS9bOzY+b6Dy+UwUIiyfNBqeLKQyQ0llRswdYbvDmMAnKfN5bd5UtunjaSjWcL7cwDdLc2H5Am4+kcfXS3PgyUIuVWSyVZ9AZYaS1QmRPDl1NOEtXpT8keGcLtax3ZDA/pw0FgwLpSxmNAefNxLs3rn52enjmo8UZLDpdmSkj2eHIYG9WUnkjhyCuULxtoiYPQiA2ikDPdhhTGSnMZF9Wcls1yfS08qaBVERcPELSmPGYCnC+nQV3z6Wy/qMGDZrY9mQEcO+rGSayk2snDEWzdBg3omexerYSFbFzebj5LlU6+M4WaRjrymZ9RkxHMxN42ShjqbyTG49voBTJTpyR4axZGIEe7NS+DI3ld36RMKc2/P0Y2mw73VCunTkpWkTuLwoi8/T5rOpdRbuMMRzIDeV5VNH42htvftegvp3X8KTvPpSm5nIdkMCNbo4vn0sj9leAwh3c6b5k2fh0DsYZg7D0cKSqnQlZ0r0rFcr2WlK4uJCE+phwYgI7g7tmNnfi0l9PBjTqw/T+g/AEBrGuL59sbeypGz8CM6W6KjWxrIhQ0mVRsnRggxuLMvn6IIM1qVHU6OPp6FQw9OTRtKje2dezJyLMtyL+T7efLM4jzOletanx1CZoWS7IYF92Sm8Om8qvZydTonIwAcBMGXcgL5UqpXsNCby7dJcGhdm4e3sQnjndtx4owIuV/HGwnREhPLRw7m6OJstujguV2Tx2vxpiAieHTqiHxyK0tePWQM8ifIaiClsCIGduiIizAv0ptaYwB5TMpu1sWzWxrJJG8tGtYqt+gS2GxNbQkVtLDuMCdx6Ip8V40ciIgwd0AXf7s6M6tWTUwVaeKrojrjepo/nrdiZDOrmeuVecfnvDXDKYLeu369JjILlBXyZnYK/a6fmcf59mo+/uRDq1/L2Eh1WVhakDw2msSKL3aYkao1JnC81MtmrHwpRoPT1Qx8aitLPj9hBgygeMYI5nt6ICGXjR8CTRRzISeXTtGg2aX9IDtwdYdxOXlSqlezMTIQVRfxh6niszM1IH+vPOP9e9G3fnsr0GC5XmNhhiGe7IY534mcxqJvrNRF59EEA9OjV3ql+k0bFqrhZ2FhYYmMufFY8nxuVf6DqmWza2FihGzYY/rqCkyU6DuWkcLZET112Cj5dOtLVoQ2pQUEkBQSg9PPDEBpKrK8fIkLBhBHwj2e5+UQBTeVGzpboqda3QNpyB1zcjzIum7WxrE+PpkqjbIE4bQKujo6sLU1kQVQEIsIYj94cyE3j6IJ0VsXNYnCPbt+IyMQHAdDC0cZq7ctzJ1E+fgS+XTox0bsPj/brzojunbAQITsijOvLcpnuMwBbc0vKxo2Ap4o4VqCmd4f29GrrhDo4mDh/fxID/NGFhNDRxo7BPbtwrETPy/OnoRkSRMbQQP6hnMGlchN7s1JatWQLxCML0jlfZuBsqZ7dpmQ2aeL4Iq1FMrGymKXjRtLV1ZmEUQGM9OhJcpg/e7OS+TInlTVJkYzq1/OmiMx+ULFw6exBXhxboOZCmYFt+gSqNfHM8fHExtKCjWoVkYO8EJE79tys8Xz3eD7enTvR2c6RjMAg4gcNIiM4iKkeHnSws2NtUhRPTR3zo/fZWFiyfMooLi80sVkTS5VaybVFWRzIT2fhxAj+FDmJ86V66rJS2aRpKSMczEuHFcVE+XkiIs378tWwsphqnYpNWhUfpcwjol+P7x7UDBQRebSPc/srlWolp4q0XF2UReOSHPy6uLB4QgRZEWGICIVjhrE9MwFlkA+Rgzy5UmFi6kAPzMSMxEH+JAcGog4JIbybG307OLE3J5njhWreT5nLvEBf+jt1oK+TM052NrwVO5P6Qi2H89N4SzUD786dEBEszBQ8NimCa4uzqNHFs1mtYn1GNKdLdFyqMNGvY3sSBg/i6yU51BoS2KaP5y/R0+jbsX29iHg8KIDtLMzMPls+dRQNhVquLMomJdQfn86dOJiTSi/ndqiC/OC5hXy7LI9zZQa2GxNoKjdS3pJUZdYAL9QhIaQFBTG6V2/sLC14LykSXl8J7zzPquRI2llZEePjSyc7e6IDfWh+ooCD+al4dHTG1sKC0J7dsLKwwNLcjA+TorhQZqQyQ0WVRsX69BhYXsBr86fiYGXJ+/FzOF2sZ3dmEosnRmBrafFJayj5wDLSqY/268m1xTnsz0nFwdKSP82fzt78dCL6ulObmUh9oYbVCZEczE3n5uML4Mkithvicba3wdO5I6awMBIDAkgLCqKfkzM9nZ0onjAM7bAg3Nq3JdzNjdzwcNpa2zBr0AC+WpTNRo2KF2aNZ4s2jssLTaxOjMLW0oKBrh1pKNKyp/VZuSFdyW5TEk0LMwlx70JMkA9XKrLYl52KbnjIL2bG7xfAzu3tbfceyktn6aSR9GzfjlPFOnZlJbMmOYq9WSl8nhrN7qxkjuans2Lyo6xJmA0vLCJpiD8iQkZQEMbQMJICWpZyP6cOmIkCazNzfDq5UhLxCOlBgZiJgsyIwTSWGdigVnG2RM/VRVkczkun+fF83lTNZFT/3nyWOp8j+S3h2yaNikq1isuLTOSOHIKnawfqCzXszUrGv5vL9yIy44EXlcwUkjhtoAc+nV0oGzuCSxUmtujiOJCTyubWdHpTuRHTiMGICG2sLNmbm8bZMiNtbKzo2daJ0hERaEJCiQ/wRzs4hET/AJL8A8gKC6M8YgSDXF2xsbTg3fg5HM5PZ19WClcrTFyryOJYgZp1adEczEtnf14aG1ulzm15s1Gj4liBmjdVs+jt3J5KtZKXIicgIv/4pRr1/a4LF/Z2dmKzNpbjBRlUqpVsVKvYqFZxsSKTjxPm4GhtjU337oiNHTP694QXKnhVOR0RYYBzB3LCh5IZNoSM4GCMoaFkDQllwbChzPJq8eRRAd6cKtZxbIGafdkpxAUOZGwfd6oyYjhXZmCjRsUuUxLbDAl34t7bFcH9ualUqVX4d3UlKsCTYPeuZ0TE72EqrIdPHehxraFQw25TMlXqFq1Wo4vn68dyKB05BBEFfsPDae/eAzdra47kpsEfH+OpaaMxN1egEGGEmzuzvbyY7elNlJcXvp1cEBH6u3RghzGBr5Zkca5EjzLA+47E6dGuDXszEzlbamBDhvIOuLsB7jYlc6pYx7wf3qd82DoT8rIiwrhUbqLWmHhH7O42JXG53EhcgDdiaY1PSBCd+vTBwcaWVTHT+GpxNjeX5fFO3Cz6uzr/SPvdtvDebmzTx9NYnsm5ciM7dXF0t7fDpms3+g8ejIgZcT4eXK0wUZedeid19UNJNZbthgQuVWRSMSHidmFf8VABVJgp3nhmxjgulBqp0cezWdcS9O/PTeNcsY4JHr0QGzt8gwNw8/ZEbGz4w9RRNBRo2KprgXOqRMc7cbMpGzeC+BBftEODWBU3i0sVmS2ZnAwl50oNVGdE08HGlnZu7oQ/MgyHLt3p1caB3fo4Ggp1VP1TbTqWal0sZ4p1rE6IpL2d7Uf3ki4PCqC9o7X1F2+oZnC6REe1rqUvpkqj4kBeGmeKtIzs7YbY2uEbFICHrw9ibU3pyDAulBrYoo3ji/QY9mencq0ii2+X5HJtcRbfLs3h2uIsdmcmsS49ho0aFRfKDGzXqujmaIe9qyshYYNx7tMHG3u75lXR05vPFP3w939UUtXGcqJAw/6cVAZ1c2kUkYCHCaBzJwf7mg+TojhdrKNa+0MB6UBeGmeLdYzq447Y2uIbFIB3gD9iY4dpaADnSnXUGhNbHY6SjRoVW/Rxd/KMVZqW71drY9mkieVUsY79piQGOLfDslNHAgcHt8xoO9vmlZMfbT5XomerPv5OpubuZXworyVunuHj8S9rwvcbYOdu7drsXpcWzcki7Z1Av0qr4mB+GmeKdET0ckNs7PAJ9McnMACFnT2awT6cK9ZRm5l4x2vezvndbTV3QThRqOFYXiqBXTohTu3xDw7Ew88HsbGhbOQQLpQY2H5Xc9MdgNpY6rJTubgwk4TBfoiI5mEC2K1H+3ZfVqpVNBTpfgCoUXEgN41zJXrG9uuBWNng7T8I3+BAzB3sSQ+8DTDpTtVsyy9YlVbFkQVqGgo0hLt3RRwd8Q0OwDsgALGzRx/qx/kSHTsyE6nS/Dh3uFkby+6sZC6WG9G1ZMKLHyaAHh4uHU5sNcTTUKi94wU3aWPZl51CU5me2QP7IZbWDBjkh19IIGb29iT4e3KmSMdO468EeOeRoGd0b3fE2gbvAD/8QoIxs7MnxteD00VadmW2yKgfJV91cewwJnJpoYmycSMQkeUPE0A/3y4u5/aYkqgv0NwBuFkbyy5Ty12PC/RGzC3o5+eDf2gwZg6ORHn14WSh+mf/4Z/t8NLGUpeTSmOpgWmefRFLazwH+eI/OBgzBwfmePamoVDD7nsA3G5I4HK5iaemjUFEXniYAHoP7Nzp9M7MJOoLtD8CuMOYyJUKE9owf0TM6ePrTWBoCOaObZjWvxf1BRl3hPevAbi79YbE+HsiCkv6+/m23BB7eyK9+nKyUHPPGbjdmMCVChNLJ41CRJ69LwB/bgPKz4xeHp2cj2zTJ/xoCbfEwQlcW5zdGokIvbwGEDQkBPM2bZnctwf1+RnsyUpmY4byF+Hd/rzazESuVBhRhw5CxIx+PgMJCA3BzMGeKK++nLoHwM3aWPaYkrm00IR++OD79ww0a6063zGF4l4yZuvHyfM4dZcTuV1Bu7Yoi9fmTMDc3IxuHv0IHjIY87ZtmdjbnSO5qewyJbc0QOri/0m//RTgNn08VxdlUfhIKCJCb68BBA0ZjIWjY/Os/r04Waj+2SV8W8Y0lmUyqyVDHf0wARQzhbz93MzxNJa1RiKtlbKNGhWninVs06lwtrPFxrUzI8aNxtLJmVHuXTicnUJTeSani1r0Y9XP9BXeDXCzLo6vl+TwzORRiAge/n4EDh+CWFg2pwR4NZ8r+UEW1fzEAR0r1HC0IINgty6/aqvDfQUoIgsyR4RyaaGJXZlJLSVIfTxVahXbDQlcKDMS7TcAMTPDtV8/xMKSeH9PeGkx+/PTSQ7z58OkuezPTb3nLKzWxlKlUXG+zMD6lHm0tbHG0b0H7bp2xVqk+R3lzOZzpYaWm3dbB+pbZvVmbSznS42sTYrCyc6mRkTa/mJo+vsDVIiIoq2I/KF1E1/HiL49TxzOz+BgXjrbDfHsMSWxOzORam0sR/IzqMtOJqKPOyKCl4sz5x/L4fzSPLo4OuDl2pFDeekcXaD5p2TAT6XMdmMC50sNJA8edCfhsGLyKK4vyWlp623tvak1JrLblNzSOaFv6QgrGj3sXzaYK1r/z/sxA4PDe7kzzqvvNRGZ0M7O5tm3Y2ezOyuJt2Nn8knKPL5Ii2Fdegwb1EqOF6ppKjPwUWIUh/LS2JqVRI/2bZnk1YdL5Zkcyc+g8heW8N291nW5qdRlp1AyKpyX50zg6yW57MlKoVKjYocxga36OD5Nnc8HiZF8nDKPI/np7M9JJbB7l2utrXL3eBT9xhuufwLQxkyheEREJolIVxEx5k98pLn5+YUEdnM5KCLrksL8vztWqOXvyhk8NW0Uf4ycxKq4WWzUKDlRqIHlhbwUNZGRHr0QEazMFFQa4uGlJdRo41iXHv2z0Gparbq143+jWsmBnDS+WpzDpQoTtcYENmti+ThlHn+Jnsbf5k/n/6Ims2L6GF6ZN5Vbj+fz8tzJiMh7vwTP/LcG+JPRr4219YnZfl482s/94PBe3c+unDme15UzeW7mONrb2twUkZvLJkXw/WM51GQmsToxio0ZMezJSqahSMO8QG+sFWb4dHBhSNfueHbsSHs7W/4wayxXFpnYYUy8sznm7sTo5tZ+mI2aWDapVWzSqKjWxrLdmMBWQ0u/3w5jIusyYnh57mRej57Gp6nzeTd+DgdzUrm6KIvwXt1viMjMewE0vw8AbZ3srF9+be4UisYO4+/K6RzMScXdpRt54x/lbeVU2trZIiIsCR/UzDOlnCg1siFDyYUyA0smR2BlZobKx4+Fj0aQP3QoZcMfwcOpA+0dbajWxXLqrmTE7WbMTa3J2e2GhDv159rMJNZnxLRkflq3lVXr4thhSGCrrqXuu00fR112CqwsoWjMMETkj/eSsmZ3bfX/XQDe9VcHB3R1vZ4cFoy/W1deiZrE8hkTGenpweWVhTw+NhxxdsHGN7BZ79uXxkwVp8uN1BdqmeLtgZtjO/KGhhPn78+8gQNZMHw4yf4BiAhPzRjD2RI9VRoVm1pF88G8dOoLtFxcmElDiY5XYmewfM54DuWl8WV2yp0szt1Wm5nEVn08VZpYeGIB69JjsLey3H+vDd8/PSvhtwZ4OwCxNVcoponIZ8ogX06XGVgwKpyV08fxTuwMVH79yIsIJsTBEvdevZuXVVXfCpqrJFyEc9nx8PJSxnj2wdXGnqywMGJ8fYkaOBBDWCiRXt5YmZvz/OxxXC7PpKFQx7XF2Vxfks2OvFReTZjNilnjGO3VBzcba0QE9YgQri/JYW9W8o+89lZdHFUaJZ+nRXO1oqV+EuLWldY+638J7/cA6Nfa/vW8XxcXThRqWJeuJLxndxaMCucf0VOY4e/LwunTyBw6lMFubogIr374EWeBnlPn3PIQaf62QsefEyOxM7dAHzyYnPAhzPcZSNGI4Yzu2ZvuTm04s8gELy7hy6xUXomajDEiDO/uLtibKxARYrt2p27CJP7kE4CduRlvJkfd2V5W0wqvMiOGT1PmcXmhiRtL84j080JEFv2rZft7AuzR2sE5382pze6X506mYNRQ2thYkxIWwC69kqn9e7G6aCFc/YpPy0taZsjTL9EMnAZ8k7V4WVpwUh3FrABvnG0dmrPDhjQvHT2KBcOG4WRtQ6BbF16OmUFcqD/d2jne0XcFHp7sGD+JR9o7UeLnB9nZEBfH2DbtmBLiw8liLdsNCWxQK1mfHs1GtZKvFudwbXHO7ZDtZ5MGinsfd+JvJqI3E5n+ezgRVxExmZkp9mVHhLE+Q8WqhEienzSccA8PNr/xFsVRkYgIi954h13AgW+buQiE55UQ2LE9H86IYLx3v2ZLc4vmnm3a4Wxji6W5GZ4uHejW1oHezu0oHjOUtRnRDOrSiRdDwmDZMj4YN552IvwjLAwMRoy9+9HXzZWDhWqOF2jYmZXSIpOeKGCbIZGAbp2/EZH8n3MainssXXOFwlwh8mbrzdv/mwO860oS5vp7McW7P6P794P/W0bp6HDsLCwIa+dIZ3t7nvpiHfuBNw6fo/bqN5wAxhRWENSpA1ujxvBH1XQ83bswvI8br8yfypqkKD5KnsuXOSk0lRnhuXKSR4ZiL8KuSVPBaOSpQf58PmYsqLVMdu2M6tFQeLacC9lJNBgTOFWkZ8X0sXRp43Dwl/Z//EJWyVtELrUC3PC7AVQoFKXB7l0Z1M2F8Z69WZMUyevKmQzr7U6Jd0+Ce/a4+dTW2uZDwJr6Rt46cobNX33PUSDyiafpaW9L9dwx8Opy+ONSbq0o4WyJgeOFag7mpVOjj+doXganS/UM9+lHJ0tL3g0bwtW5c2mYOpXUrt2wEeHp4X68EhHElA72jHFpR4h7160WFhZFrSL/3x4KheIFe0tLLMzNT5mZma38XWRM62uoiKxsY21VYmVu9qS1udnFyV4eDHPrTEcRBgSGfL+u6dLN3cAH9Rf48FQTq46cperi11wEMl9/C7GwQdmzC29MfYRN8ydwttTAmfJMzpcauViRSUOhlm+W5sPTJczy9WjJJdrZ4WpuhojQpZ0j7s7tcfDwIbJkMaNT1YhCES3/+UgZ49Gb6QP7Y2FmtlZEjL85wJ9NqioULqJQ7HcRoUu37oiVLY/Miry5H5o3Xv2O1cfPs/ZUEx+dauKtI2dZf+4K14GV6ysRa3vM2zoTEhjQPMnNhfhgXyL9BzJn0ADGDejNmP59mOjmwszQIMZGxyAWlth37caiv73Jqzv38eyuOt5tvMIVYN/5JtwG+m5ofU7/u2NMQLfO16u1cUT6e50Rkcfkt3YiPwfQ3NxcLCwsejm7uB4LGjcZ3ZPP08cviISc7OZjwMdnr7L6xHnWNDTyQX0jq0+c5x8HT7H25CWOA3/dtBnTn19n9vOv3pS2zjdGdXBk3IA+9HBuy3S//szt0xWxtCL5pT9T+NyLhI8ey+tVVZwBdrda7fe3qLryHSeAlPx8RCTt34QXaGdpeWSzJpbTxVp6OTsdFpE4EQm4PzNQpL9PaFjDW4dPkffcyzi5duFP6yvZB7x96AzvHTvH+8fP8/6JRtaeuswn567xSeN1tt1qkThZFRXkvfCnm4lLn7ip9+jOVyUa9i1Q01SsZX5XJybHxVN5rpGuAwbyf6vf5zvg48brvH/iAmsaLvH+8Qu8c+Qse4G/1WzFycX1s1/TtnH7nAWFQvb/JXoqPFfOC7Mn4mBtVScio0Sk+/0qKnXv0X9A3d/3HCJi5lwGj3jk5glorr0Fld80U/19M7XNcAA4COwHdt68Sc2Nm6w5chSvocN55ZVXOQ509fTmldHB8NoT5AR6Ik4debfuAACZxaWMjVHy4cnz1Nxs+Zzab5pZ09DEu8fO8MXl79h1o5nxUZFfi8jIX3HdUxysrS78Zd40eKqIdenRZEeEYW9l9bmIuNzXqly7jh3/EqnNxGfIcJ7561+pb4Z3jp3kvRMnWdNwmr/t2MXKd98n+8mnUOaYvgse+ei1KXGptzKWrsBnRAQb9u8HwPjSn5tne3s0r5s8lPa2tixc/Qm3gM8OHiLJYMLKoS1Fr77FijWfY1r+JCV/+r/mT8838cm5a3zQcJHDQMnLf/41FbeCPs5ONz5JmQ8rS/kkZR7vxs9GOywIEXnqty1rKhS/bCJiZmExQmFu0eTS3Z0ZCUk3h02cfLmvX2CDx6CAE/39Ak926ua+28rWfnXr3uDJIrJo5Ky5PLn6U/r7B+Lm4Ym6tJzVe+qaZ06f0dxdhIyFS1hbd4CR4yZi3aEzg0ePpfj5F9n2HaSVViAizbGm7Ju1zfBZ43XeO3aOXcCn9Q309PA4LC3HUP2czntzRJ8e7MtOhRXF7DAm8Oe5k/k4dR7jBvS5JSLx9xfgDyCDFAqFsnXTyojWi/VsfXVpPeHj9tDplz/NBeDNbTXMSUmmb8BguvXtj71zB1w8vBgdE0eHnn0IHP4IT735Jtu//479QD3wzKpVDB0/ofnTg4ebt34Lq1udVOWl7zgOzM7QIj8+pa2LiCzs6GB3qWzccC4uzKRpoZGdhgTeVM3k/cQ5vBs/C7f2bU+KyKAHBfDXjnb2bdpWvbZ5C8eAutZ4ec833/L0O6sIfGQ0IsLk2bN5d8tWTgPHgS+ufMd79U3sAf706WeMjZrPx0ePUfMtrD5xgbUnm1hzqmUZv/jxJ1hYWvxFRDqLSIaTnU1DSlgA+7NTYXkBB3LTqNbF8UnKXF6cM5FqbSzPzhiHpbn5x3cXmx5WgOEDw8Kv77z+NTtuwNtHz7H2zGW2fHuDZuDz2p1Yt3Xi9TVrAfji4tesOt7Iu0fP8t7x89QBr2zcRP+AYF7eWEUt8EF9I2tPNvHu8fPs+B52f/sd/cLCv3EQqc8aMfjGVkM8t5blc3GhiS36uNbjB+J5ee5k/jJvKrtMScwZ5P1PJ8s9rABTpiYmcxjYcOlr3j92jtUnLvDO0bPsAtbu24ermzuPv/46h4D36htbopmTTXxQ38hu4J26/XiHDGHFmo+oBdY0tABcfeICn1+4ynFgvD6LmZ0cYFkOV5bksDOz5fS224eQ/UM5gz/MGs9GtZIPk6Po0tbxwk/3DT+MABUi8tLiV1/hOPDByUt8UN+y/D6ob2Qn8Pdt22nXoRMVr7zCEWDtqYusaWhq/Z0L7AQ+OHocn9BhLPr729QCa09ebPl5QyPvn7jAUWDZZ+tv+nZ2/X6bair7c9NZlz6fPaZkag2JvKGawXOzx/OmaiZf5qSSHh70s577YQTo3aGb24kPvjxAHfDe8fM/zJ5WgG9ur8XZpTOLX703wNXHjjEwNJyKv73NDmDtySbWtn7O+8fOU3npG6pvNjNo3AQyPXtwoURPrSmJak0cbyhn8OKcCbw6bwqVaiWvzZ9KJ0f7c60O76EH+GjIyDEHt373/bGqr77f+/7x83VrTzbVrT3ZVLe6vrFuJ9S9uaO2rmM3t7olr71WdwTq1p66WLemoeV3PqhvrNsDdav276/zDAyue3zVmrpaqFvT0Fi39mRT3YenmureP3G+bvWJprpD8GXssuV1wzs57zuZnVhXm5VS9+q8KXUvRU6se3Xe5LpVcbP3fZQy99h4z94XRUT3n7Z2/L8BADk20CP1JjheAAAAAElFTkSuQmCC',
  userAvatar: 'data:image/png;base64,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',
};

export default ChatBot;
