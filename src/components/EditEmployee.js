import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { text } from 'react-native-communications';
import { Button, Card, CardSection } from './common';
import EmployeeForm from './EmployeeForm';
import { employeeSave, employeeUpdate } from '../actions';

class EditEmployee extends Component {
  componentWillMount() {
    // Iterate over every property on incoming employee object, and update our reducer with every property.
    _.each(this.props.employee, (value, prop) => {      
      this.props.employeeUpdate({ prop, value });
    });
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
      </Card>
    );
  }
}

const mapStateToProps = (state) => {
  const { name, phone, shift } = state.employeeForm;
  return { name, phone, shift };
};

export default connect(mapStateToProps, { employeeUpdate, employeeSave })(EditEmployee);