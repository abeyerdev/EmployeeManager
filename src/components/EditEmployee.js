import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { text } from 'react-native-communications';
import { Button, Card, CardSection, Confirm } from './common';
import EmployeeForm from './EmployeeForm';
import { employeeDelete, employeeSave, employeeUpdate } from '../actions';

class EditEmployee extends Component {
  state = { showModal: false };

  componentWillMount() {
    // Iterate over every property on incoming employee object, and update our reducer with every property.
    _.each(this.props.employee, (value, prop) => {      
      this.props.employeeUpdate({ prop, value });
    });
  }

  onAccept() {
    const { uid } = this.props.employee;
    this.props.employeeDelete({ uid });
  }

  onDecline() {
    this.setState({ showModal: false });
  }

  onFirePress() {
    this.setState({ showModal: !this.state.showModal });
  }

  onSavePress() {
    const { name, phone, shift } = this.props;
    this.props.employeeSave({ name, phone, shift, uid: this.props.employee.uid }); // send employees uid so firebase knows who to update
  }

  onTextPress() {
    const { phone, shift } = this.props;
    text(phone, `Your upcoming shift is on ${shift}!`);
  }

  render() {
    // {...this.props} passes along props to EmployeeForm component
    return (
      <Card>        
        <EmployeeForm {...this.props} />
        <CardSection>
          <Button onPress={this.onSavePress.bind(this)}>
            Save Changes
          </Button>
        </CardSection>
        <CardSection>
          <Button onPress={this.onTextPress.bind(this)}>
            Text Schedule
          </Button>
        </CardSection>
        <CardSection>
          <Button onPress={this.onFirePress.bind(this)}>
            Fire Employee
          </Button>
        </CardSection>
        <Confirm 
          visible={this.state.showModal}
          onYes={this.onAccept.bind(this)}
          onNo={this.onDecline.bind(this)}
        >
          Are you sure you want to fire this employee?
        </Confirm>  
      </Card>
    );
  }
}

const mapStateToProps = (state) => {
  const { name, phone, shift } = state.employeeForm;
  return { name, phone, shift };
};

export default connect(mapStateToProps, { 
  employeeDelete, 
  employeeSave, 
  employeeUpdate 
})(EditEmployee);