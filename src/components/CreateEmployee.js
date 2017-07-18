import React, { Component } from 'react';
import { connect } from 'react-redux';
import { employeeCreate, employeeUpdate } from '../actions';
import { Card, CardSection, Button } from './common';
import EmployeeForm from './EmployeeForm';

class CreateEmployee extends Component {
  
  componentWillMount() {
    this.props.employeeUpdate({ name: '', phone: '', shift: 'Monday' }); // clear screen
  }

  onButtonPress() {
    const { name, phone, shift } = this.props;
    this.props.employeeCreate({ name, phone, shift: shift || 'Monday' }); // default shift to Monday
  }

  render() {
    // {...this.props} passes along props to EmployeeForm component
    return (
      <Card>        
        <EmployeeForm />
        <CardSection>
          <Button onPress={this.onButtonPress.bind(this)}>
            Create
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

export default connect(mapStateToProps, { 
  employeeCreate, 
  employeeUpdate 
})(CreateEmployee);