import React, { Component } from 'react';
import { connect } from 'react-redux';
import { emailChanged, passwordChanged, loginUser } from '../actions';
import { Button, Card, CardSection, Input } from './common';

class LoginForm extends Component {
  onButtonPress() {
    const { email, password } = this.props;
    this.props.loginUser({ email, password });
  }

  onEmailChange(text) {
    this.props.emailChanged(text); // Calling ActionCreator called this.props.emailChanged
  }

  onPasswordChange(text) {
    this.props.passwordChanged(text);
  }

  render() {
    return (
      <Card>
        <CardSection>
          <Input 
            label="Email" 
            placeholder="email@gmail.com" 
            onChangeText={this.onEmailChange.bind(this)} 
            value={this.props.email} 
          />
        </CardSection>
        <CardSection>
          <Input 
            secureTextEntry 
            label="password" 
            placeholder="password" 
            onChangeText={this.onPasswordChange.bind(this)}
          />
        </CardSection>
        <CardSection>
          <Button onPress={this.onButtonPress.bind(this)}>Login</Button>
        </CardSection>
      </Card>   
    );
  }
}

  const mapStateToProps = (state) => {
    return {
      email: state.auth.email,
      password: state.auth.password
    };
  };

export default connect(mapStateToProps, { 
  emailChanged, 
  passwordChanged, 
  loginUser 
})(LoginForm);
