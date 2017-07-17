import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Card, CardSection } from './common';
import EmployeeForm from './EmployeeForm';
import { employeeUpdate } from '../actions';

class EditEmployee extends Component {
  componentWillMount() {
    // Iterate over every property on incoming employee object, and update our reducer with every property.
    _.each(this.props.employee, (value, prop) => {      
      this.props.employeeUpdate({ prop, value });
    });
  }

  onButtonPress() {
    const { name, phone, shift } = this.props;
    this.props.employeeUpdate({ name, phone, shift: shift || 'Monday' }); // default shift to Monday
  }

  render() {
    return (
      <Card>        
        <EmployeeForm />
        <CardSection>
          <Button onPress={this.onButtonPress.bind(this)}>
            Save Changes
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

export default connect(mapStateToProps, { employeeUpdate })(EditEmployee);